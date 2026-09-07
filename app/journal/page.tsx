'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { Footer, Header } from '../components';
import { articles, getParentStockById, getRelatedArticlesForParentStock } from '../data';
import { siteHref } from '../site-url';

const categoryTabs = ['すべて', 'アガベ', 'サボテン', '育成方法', 'その他', 'お知らせ'];
const varietiesByCategory: Record<string, string[]> = {
  アガベ: ['笹の雪', '笹吹雪', 'パリー・トランカータ', '華厳', 'White Ice'],
  サボテン: ['海王丸', '王冠竜', '瑞昌玉', 'プナ・ボンニアエ'],
  その他: ['アロエ', 'ラウリンゼ', 'ボンバックス'],
};
const otherVarietyKey = '__other__';
const initialArticleCount = 12;
const additionalArticleCount = 10;

const articleTime = (date: string) => new Date(`${date.replaceAll('.', '-')}T00:00:00`).getTime();
const subscribeToLocation = () => () => {};
const getParentStockIdFromLocation = () => new URLSearchParams(window.location.search).get('parent') ?? '';
const getServerParentStockId = () => '';

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('すべて');
  const [activeVariety, setActiveVariety] = useState('');
  const [activeManagementNumber, setActiveManagementNumber] = useState('');
  const [sortMode, setSortMode] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [visibleArticleCount, setVisibleArticleCount] = useState(initialArticleCount);

  const parentStockIdFromLocation = useSyncExternalStore(subscribeToLocation, getParentStockIdFromLocation, getServerParentStockId);
  const activeParentStockId = getParentStockById(parentStockIdFromLocation)?.id ?? '';

  const activeParentStock = getParentStockById(activeParentStockId);
  const relatedArticleSlugs = useMemo(() => new Set(activeParentStock ? getRelatedArticlesForParentStock(activeParentStock).map((article) => article.slug) : []), [activeParentStock]);
  const varieties = varietiesByCategory[activeCategory] ?? [];
  const varietyCounts = Object.fromEntries(varieties.map((variety) => [variety, articles.filter((article) => article.tags?.includes(variety) && (article.categories?.includes(activeCategory) || article.category === activeCategory)).length]));
  const featuredVarieties = varieties.filter((variety) => varietyCounts[variety] > 5);
  const otherVarieties = varieties.filter((variety) => varietyCounts[variety] <= 5);
  const showVarietyStep = featuredVarieties.length > 0 && (featuredVarieties.length > 1 || otherVarieties.length > 0);
  const managementNumbers = [...new Set(articles.filter((article) => article.tags?.includes('笹の雪')).flatMap((article) => article.managementNumbers ?? []))];
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
  const displayedArticles = sortedArticles.slice(0, visibleArticleCount);
  const remainingArticleCount = Math.max(0, sortedArticles.length - displayedArticles.length);
  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveVariety('');
    setActiveManagementNumber('');
    setVisibleArticleCount(initialArticleCount);
  };
  const selectVariety = (variety: string) => {
    setActiveVariety(variety);
    setActiveManagementNumber('');
    setVisibleArticleCount(initialArticleCount);
  };
  const selectManagementNumber = (managementNumber: string) => {
    setActiveManagementNumber(managementNumber);
    setVisibleArticleCount(initialArticleCount);
  };
  const selectSortMode = (mode: 'newest' | 'oldest' | 'popular') => {
    setSortMode(mode);
    setVisibleArticleCount(initialArticleCount);
  };

  return <main><Header />
    <section className="section journal-section page-section">
      <header className="journal-list-heading"><p>ARTICLE ARCHIVE</p><h1>記事・お知らせ</h1></header>
      {activeParentStock && <div className="journal-parent-context"><div><p>RELATED TO PARENT STOCK</p><strong>{activeParentStock.id} 関連記事</strong><span>記事内の名称・管理番号をもとに自動抽出</span></div><a href={siteHref(`/mothers/${activeParentStock.id}`)}>← 親株詳細に戻る</a></div>}
      <div className="journal-browse" aria-label="記事を絞り込む">
        <div className="journal-filter-step"><p>分類</p><div className="journal-category-tabs">{categoryTabs.map((category) => <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} onClick={() => selectCategory(category)}>{category}</button>)}</div></div>
        {showVarietyStep && <div className="journal-filter-step journal-subfilter"><p>品種を選ぶ</p><div className="journal-category-tabs journal-variety-tabs"><button type="button" className={!activeVariety ? 'is-active' : ''} onClick={() => selectVariety('')}>すべて</button>{featuredVarieties.map((variety) => <button type="button" key={variety} className={activeVariety === variety ? 'is-active' : ''} onClick={() => selectVariety(variety)}>{variety}</button>)}{otherVarieties.length > 0 && <button type="button" className={activeVariety === otherVarietyKey ? 'is-active' : ''} onClick={() => selectVariety(otherVarietyKey)}>その他の品種</button>}</div></div>}
        {activeVariety === '笹の雪' && <div className="journal-filter-step journal-management-filter"><p>笹の雪の管理番号</p><div className="journal-management-list"><button type="button" className={!activeManagementNumber ? 'is-active' : ''} onClick={() => selectManagementNumber('')}>すべて</button>{managementNumbers.map((number) => <button type="button" key={number} className={activeManagementNumber === number ? 'is-active' : ''} onClick={() => selectManagementNumber(number)}>{number}</button>)}</div></div>}
      </div>
      <div className="journal-list-tools"><p className="journal-result-count">{sortedArticles.length} 件の記事{sortedArticles.length > displayedArticles.length && <span>（{displayedArticles.length} 件を表示中）</span>}</p><div className="journal-sort-control"><span>表示順</span><div className="journal-sort-tabs"><button type="button" className={sortMode === 'newest' ? 'is-active' : ''} onClick={() => selectSortMode('newest')}>新しい順</button><button type="button" className={sortMode === 'oldest' ? 'is-active' : ''} onClick={() => selectSortMode('oldest')}>古い順</button><button type="button" className={sortMode === 'popular' ? 'is-active' : ''} onClick={() => selectSortMode('popular')}>人気</button></div></div></div>
      <div className="article-list">{displayedArticles.map((article) => <a className="article-row" href={siteHref(`/journal/${article.slug}${activeParentStock ? `?parent=${activeParentStock.id}` : ''}`)} key={article.slug}><img src={article.image} alt={article.title} /><div><p className="article-meta"><span>{article.category}</span>{article.date}</p><h2>{article.title}</h2><p>{article.excerpt}</p>{article.managementNumbers && article.managementNumbers.length > 0 && <p className="article-management">管理番号 <span>{article.managementNumbers.join(' / ')}</span></p>}<b>続きを読む →</b></div></a>)}</div>
      {remainingArticleCount > 0 && <div className="journal-load-more"><button type="button" onClick={() => setVisibleArticleCount((count) => count + additionalArticleCount)}>もっと見る <span>あと {remainingArticleCount} 件</span></button></div>}
      {!sortedArticles.length && <p className="journal-empty">該当する記事はありません。</p>}
    </section>
    <Footer />
  </main>;
}
