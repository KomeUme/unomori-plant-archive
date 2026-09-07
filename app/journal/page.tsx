'use client';

import { type MouseEvent, useMemo, useSyncExternalStore } from 'react';
import { Footer, Header } from '../components';
import { articles, compareManagementNumberIds, getManagementNumberGroup, getParentStockById, getRelatedArticlesForParentStock, parentStocks } from '../data';
import { siteHref } from '../site-url';

const categoryTabs = ['すべて', 'アガベ', 'サボテン', '育成方法', 'その他', 'お知らせ'];
const varietiesByCategory: Record<string, string[]> = {
  アガベ: ['笹の雪', '笹吹雪', 'パリー・トランカータ', '華厳', 'White Ice'],
  サボテン: ['海王丸', '王冠竜', '瑞昌玉', 'プナ・ボンニアエ'],
  その他: ['アロエ', 'ラウリンゼ', 'ボンバックス'],
};
const otherVarietyKey = '__other__';
const articlesPerPage = 12;
const managementFamilyOrder = ['U', 'B', 'PD', 'PL', 'PX', 'S', 'X'];
const managementFamilyLabels: Record<string, string> = {
  U: 'U系', B: 'B系', PD: 'PD系', PL: 'PL系', PX: 'PX系', S: 'S系', X: 'X系',
};

const getManagementFamily = (id: string) => {
  const { prefix } = getManagementNumberGroup(id);
  if (prefix.startsWith('PD')) return 'PD';
  if (prefix.startsWith('PL')) return 'PL';
  if (prefix.startsWith('PX')) return 'PX';
  if (prefix.startsWith('U')) return 'U';
  if (prefix.startsWith('B')) return 'B';
  if (prefix.startsWith('S')) return 'S';
  if (prefix.startsWith('X')) return 'X';
  return prefix;
};

const articleTime = (date: string) => new Date(`${date.replaceAll('.', '-')}T00:00:00`).getTime();
const subscribeToLocation = (callback: () => void) => {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
};
const getLocationSearch = () => window.location.search;
const getServerLocationSearch = () => '';

export default function JournalPage() {
  const locationSearch = useSyncExternalStore(subscribeToLocation, getLocationSearch, getServerLocationSearch);
  const searchParams = useMemo(() => new URLSearchParams(locationSearch), [locationSearch]);
  const activeCategoryParam = searchParams.get('category') ?? 'すべて';
  const activeCategory = categoryTabs.includes(activeCategoryParam) ? activeCategoryParam : 'すべて';
  const activeVarietyParam = searchParams.get('variety') ?? '';
  const activeManagementFamilyParam = searchParams.get('managementFamily') ?? '';
  const activeManagementNumber = searchParams.get('management') ?? '';
  const sortModeParam = searchParams.get('sort') ?? 'newest';
  const sortMode = sortModeParam === 'oldest' || sortModeParam === 'popular' ? sortModeParam : 'newest';
  const parentStockIdFromLocation = searchParams.get('parent') ?? '';
  const activeParentStockId = getParentStockById(parentStockIdFromLocation)?.id ?? '';

  const activeParentStock = getParentStockById(activeParentStockId);
  const relatedArticleSlugs = useMemo(() => new Set(activeParentStock ? getRelatedArticlesForParentStock(activeParentStock).map((article) => article.slug) : []), [activeParentStock]);
  const varieties = varietiesByCategory[activeCategory] ?? [];
  const varietyCounts = Object.fromEntries(varieties.map((variety) => [variety, articles.filter((article) => article.tags?.includes(variety) && (article.categories?.includes(activeCategory) || article.category === activeCategory)).length]));
  const featuredVarieties = varieties.filter((variety) => varietyCounts[variety] > 5);
  const otherVarieties = varieties.filter((variety) => varietyCounts[variety] <= 5);
  const showVarietyStep = featuredVarieties.length > 0 && (featuredVarieties.length > 1 || otherVarieties.length > 0);
  const activeVariety = activeVarietyParam === otherVarietyKey || varieties.includes(activeVarietyParam) ? activeVarietyParam : '';
  const managementNumbers = parentStocks.filter((stock) => stock.varietySlug === 'agave-victoriae-reginae').map((stock) => stock.id).sort(compareManagementNumberIds);
  const managementFamilies = [...new Set(managementNumbers.map(getManagementFamily))].sort((first, second) => {
    const firstIndex = managementFamilyOrder.indexOf(first);
    const secondIndex = managementFamilyOrder.indexOf(second);
    return (firstIndex === -1 ? Number.POSITIVE_INFINITY : firstIndex) - (secondIndex === -1 ? Number.POSITIVE_INFINITY : secondIndex) || first.localeCompare(second);
  });
  const activeManagementFamily = managementFamilies.includes(activeManagementFamilyParam) ? activeManagementFamilyParam : '';
  const managementNumbersInFamily = managementNumbers.filter((number) => getManagementFamily(number) === activeManagementFamily);
  const isVictoriaReginaeSelection = activeCategory === 'アガベ' && activeVariety === '笹の雪';
  const filteredArticles = articles.filter((article) => {
    const inCategory = activeCategory === 'すべて' || article.categories?.includes(activeCategory) || article.category === activeCategory;
    const inVariety = !activeVariety || (activeVariety === otherVarietyKey ? otherVarieties.some((variety) => article.tags?.includes(variety)) : article.tags?.includes(activeVariety));
    const inManagementNumber = !activeManagementNumber || article.managementNumbers?.includes(activeManagementNumber);
    const inParentStock = !activeParentStock || relatedArticleSlugs.has(article.slug);
    return inCategory && inVariety && inManagementNumber && inParentStock;
  });
  const sortedArticles = [...filteredArticles].sort((first, second) => {
    if (sortMode === 'popular') return (second.popularity ?? 0) - (first.popularity ?? 0) || articleTime(second.date) - articleTime(first.date);
    return sortMode === 'newest' ? articleTime(second.date) - articleTime(first.date) : articleTime(first.date) - articleTime(second.date);
  });
  const totalPages = Math.max(1, Math.ceil(sortedArticles.length / articlesPerPage));
  const pageParam = Number.parseInt(searchParams.get('page') ?? '1', 10);
  const currentPage = Math.min(Math.max(Number.isFinite(pageParam) ? pageParam : 1, 1), totalPages);
  const displayedArticles = sortedArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);
  const journalHref = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(locationSearch);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    const query = params.toString();
    return siteHref(`/journal/${query ? `?${query}` : ''}`);
  };
  const handleFilterNavigation = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest('a');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const updateLocation = () => {
      window.history.pushState({}, '', link.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    if ('startViewTransition' in document) document.startViewTransition(updateLocation);
    else updateLocation();
  };

  return <main><Header />
    <section className="section journal-section page-section">
      <header className="journal-list-heading"><p>ARTICLE ARCHIVE</p><h1>記事・お知らせ</h1></header>
      {activeParentStock && <div className="journal-parent-context"><div><p>RELATED TO PARENT STOCK</p><strong>{activeParentStock.id} 関連記事</strong><span>記事内の名称・管理番号をもとに自動抽出</span></div><a href={siteHref(`/mothers/${activeParentStock.id}`)}>← 親株詳細に戻る</a></div>}
      <div className="journal-browse" aria-label="記事を絞り込む" onClick={handleFilterNavigation}>
        {isVictoriaReginaeSelection ? <div className="journal-active-category"><p>分類</p><div><span>笹の雪</span><a href={journalHref({ category: null, variety: null, managementFamily: null, management: null, page: null })} aria-label="笹の雪の絞り込みを解除する">×</a></div></div> : <><div className="journal-filter-step"><p>分類</p><div className="journal-category-tabs">{categoryTabs.map((category) => <a key={category} className={activeCategory === category ? 'is-active' : ''} href={journalHref({ category: category === 'すべて' ? null : category, variety: null, managementFamily: null, management: null, page: null })}>{category}</a>)}</div></div>{showVarietyStep && <div className="journal-filter-step journal-subfilter"><p>品種を選ぶ</p><div className="journal-category-tabs journal-variety-tabs"><a className={!activeVariety ? 'is-active' : ''} href={journalHref({ variety: null, managementFamily: null, management: null, page: null })}>すべて</a>{featuredVarieties.map((variety) => <a key={variety} className={activeVariety === variety ? 'is-active' : ''} href={journalHref({ variety, managementFamily: null, management: null, page: null })}>{variety}</a>)}{otherVarieties.length > 0 && <a className={activeVariety === otherVarietyKey ? 'is-active' : ''} href={journalHref({ variety: otherVarietyKey, managementFamily: null, management: null, page: null })}>その他の品種</a>}</div></div>}</>}
        {isVictoriaReginaeSelection && <div className="journal-filter-step journal-management-family-filter"><p>笹の雪の系統を選ぶ</p><div className="journal-category-tabs journal-management-family-tabs">{managementFamilies.map((family) => <a key={family} className={activeManagementFamily === family ? 'is-active' : ''} href={journalHref({ managementFamily: family, management: null, page: null })}>{managementFamilyLabels[family] ?? `${family}系`}</a>)}</div></div>}
        {isVictoriaReginaeSelection && activeManagementFamily && <div className="journal-filter-step journal-management-filter"><p>{managementFamilyLabels[activeManagementFamily] ?? `${activeManagementFamily}系`}の管理番号</p><div className="journal-management-list">{managementNumbersInFamily.map((number) => <a key={number} className={activeManagementNumber === number ? 'is-active' : ''} href={journalHref({ management: number, page: null })}>{number}</a>)}</div></div>}
      </div>
      <div className="journal-list-tools"><p className="journal-result-count">{sortedArticles.length} 件の記事{sortedArticles.length > articlesPerPage && <span>（{currentPage} / {totalPages} ページ）</span>}</p><div className="journal-sort-control"><span>表示順</span><div className="journal-sort-tabs"><a className={sortMode === 'newest' ? 'is-active' : ''} href={journalHref({ sort: null, page: null })}>新しい順</a><a className={sortMode === 'oldest' ? 'is-active' : ''} href={journalHref({ sort: 'oldest', page: null })}>古い順</a><a className={sortMode === 'popular' ? 'is-active' : ''} href={journalHref({ sort: 'popular', page: null })}>人気</a></div></div></div>
      <div className="article-list">{displayedArticles.map((article) => <a className="article-row" href={siteHref(`/journal/${article.slug}${activeParentStock ? `?parent=${activeParentStock.id}` : ''}`)} key={article.slug}><img src={article.image} alt={article.title} /><div><p className="article-meta"><span>{article.category}</span>{article.date}</p><h2>{article.title}</h2><p>{article.excerpt}</p>{article.managementNumbers && article.managementNumbers.length > 0 && <p className="article-management">管理番号 <span>{article.managementNumbers.join(' / ')}</span></p>}<b>続きを読む →</b></div></a>)}</div>
      {totalPages > 1 && <nav className="journal-pagination" aria-label="記事一覧のページ"><a className={currentPage === 1 ? 'is-disabled' : ''} aria-disabled={currentPage === 1} href={currentPage === 1 ? undefined : journalHref({ page: String(currentPage - 1) })}>← 前へ</a><div>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <a key={page} className={page === currentPage ? 'is-active' : ''} aria-current={page === currentPage ? 'page' : undefined} href={journalHref({ page: page === 1 ? null : String(page) })}>{page}</a>)}</div><a className={currentPage === totalPages ? 'is-disabled' : ''} aria-disabled={currentPage === totalPages} href={currentPage === totalPages ? undefined : journalHref({ page: String(currentPage + 1) })}>次へ →</a></nav>}
      {!sortedArticles.length && <p className="journal-empty">該当する記事はありません。</p>}
    </section>
    <Footer />
  </main>;
}
