'use client';

import { useState } from 'react';
import { Footer, Header } from '../components';
import { articles } from '../data';
import { siteHref } from '../site-url';

const categoryTabs = ['すべて', 'アガベ', 'サボテン', '育成方法', 'その他', 'お知らせ'];
const varietiesByCategory: Record<string, string[]> = {
  アガベ: ['笹の雪', '笹吹雪', 'パリー・トランカータ', '華厳', 'White Ice'],
  サボテン: ['海王丸', '王冠竜', '瑞昌玉', 'プナ・ボンニアエ'],
  その他: ['アロエ', 'ラウリンゼ', 'ボンバックス'],
};
const otherVarietyKey = '__other__';

const articleTime = (date: string) => new Date(`${date.replaceAll('.', '-')}T00:00:00`).getTime();

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('すべて');
  const [activeVariety, setActiveVariety] = useState('');
  const [activeManagementNumber, setActiveManagementNumber] = useState('');
  const [sortMode, setSortMode] = useState<'newest' | 'oldest' | 'popular'>('newest');
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
    return inCategory && inVariety && inManagementNumber;
  });
  const displayedArticles = [...filteredArticles].sort((first, second) => {
    if (sortMode === 'popular') return (second.popularity ?? 0) - (first.popularity ?? 0) || articleTime(second.date) - articleTime(first.date);
    return sortMode === 'newest' ? articleTime(second.date) - articleTime(first.date) : articleTime(first.date) - articleTime(second.date);
  });
  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveVariety('');
    setActiveManagementNumber('');
  };
  const selectVariety = (variety: string) => {
    setActiveVariety(variety);
    setActiveManagementNumber('');
  };

  return <main><Header />
    <section className="section journal-section page-section">
      <header className="journal-list-heading"><p>ARTICLE ARCHIVE</p><h1>記事・お知らせ</h1></header>
      <div className="journal-browse" aria-label="記事を絞り込む">
        <div className="journal-filter-step"><p>分類</p><div className="journal-category-tabs">{categoryTabs.map((category) => <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} onClick={() => selectCategory(category)}>{category}</button>)}</div></div>
        {showVarietyStep && <div className="journal-filter-step journal-subfilter"><p>品種を選ぶ</p><div className="journal-category-tabs journal-variety-tabs"><button type="button" className={!activeVariety ? 'is-active' : ''} onClick={() => selectVariety('')}>すべて</button>{featuredVarieties.map((variety) => <button type="button" key={variety} className={activeVariety === variety ? 'is-active' : ''} onClick={() => selectVariety(variety)}>{variety}</button>)}{otherVarieties.length > 0 && <button type="button" className={activeVariety === otherVarietyKey ? 'is-active' : ''} onClick={() => selectVariety(otherVarietyKey)}>その他の品種</button>}</div></div>}
        {activeVariety === '笹の雪' && <div className="journal-filter-step journal-management-filter"><p>笹の雪の管理番号</p><div className="journal-management-list"><button type="button" className={!activeManagementNumber ? 'is-active' : ''} onClick={() => setActiveManagementNumber('')}>すべて</button>{managementNumbers.map((number) => <button type="button" key={number} className={activeManagementNumber === number ? 'is-active' : ''} onClick={() => setActiveManagementNumber(number)}>{number}</button>)}</div></div>}
      </div>
      <div className="journal-list-tools"><p className="journal-result-count">{displayedArticles.length} 件の記事</p><div className="journal-sort-control"><span>表示順</span><div className="journal-sort-tabs"><button type="button" className={sortMode === 'newest' ? 'is-active' : ''} onClick={() => setSortMode('newest')}>新しい順</button><button type="button" className={sortMode === 'oldest' ? 'is-active' : ''} onClick={() => setSortMode('oldest')}>古い順</button><button type="button" className={sortMode === 'popular' ? 'is-active' : ''} onClick={() => setSortMode('popular')}>人気</button></div></div></div>
      <div className="article-list">{displayedArticles.map((article) => <a className="article-row" href={siteHref(`/journal/${article.slug}`)} key={article.slug}><img src={article.image} alt={article.title} /><div><p className="article-meta"><span>{article.category}</span>{article.date}</p><h2>{article.title}</h2><p>{article.excerpt}</p>{article.managementNumbers && article.managementNumbers.length > 0 && <p className="article-management">管理番号 <span>{article.managementNumbers.join(' / ')}</span></p>}<b>続きを読む →</b></div></a>)}</div>
      {!displayedArticles.length && <p className="journal-empty">該当する記事はありません。</p>}
    </section>
    <Footer />
  </main>;
}
