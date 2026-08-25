'use client';

import { useState } from 'react';
import { Footer, Header } from './components';
import { plants } from './data';

export default function Home() {
  const [query, setQuery] = useState('');
  const searchHref = `/records${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`;

  return <main>
    <Header />
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">GROWTH ARCHIVE / TOKYO</p>
        <h1>一株ずつ、<br />育ちの履歴を。</h1>
        <p className="hero-lead">私たちが育てる植物の成長、親株の特徴、日々の管理方法を、管理番号とともに記録しています。</p>
        <form className="hero-search" role="search" action="/records">
          <label htmlFor="hero-query">管理番号・植物名から探す</label>
          <div className="search-row"><span aria-hidden="true">⌕</span><input id="hero-query" name="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例：HG-24-017" /><a href={searchHref}>検索する</a></div>
        </form>
        <p className="search-hint"><span /> 管理番号は商品タグ・販売証明書に記載されています</p>
      </div>
      <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1400&q=90" alt="光の中で育つ鉢植えの植物" /><div className="image-caption"><span>001</span><p>Every plant has<br />its own story.</p></div><div className="hero-stamp">GROWN<br />WITH CARE<br /><b>●</b> TOKYO</div></div>
    </section>
    <section className="intro-band"><p>育てる人へ、確かな記録を。</p><div><span>記録株数 <b>148</b></span><span>親株 <b>29</b></span><span>更新記事 <b>326</b></span></div></section>
    <section className="section portal-section">
      <div className="section-heading"><div><p className="eyebrow">EXPLORE THE ARCHIVE</p><h2>記録をたどる</h2></div><p>育成記録、親株の情報、日々の栽培方法を、それぞれのページで詳しくご覧いただけます。</p></div>
      <div className="portal-grid">
        <a href="/records"><span>01</span><strong>植物の成長記録</strong><p>管理番号から、その株の来歴と変化を確認。</p><b>記録を探す →</b></a>
        <a href="/mother-plants"><span>02</span><strong>親株一覧</strong><p>由来、特徴、子株の記録を一覧で確認。</p><b>親株を見る →</b></a>
        <a href="/care-guide"><span>03</span><strong>栽培ガイド</strong><p>光・水・風を整える、基本の管理方法。</p><b>育て方を読む →</b></a>
      </div>
    </section>
    <section className="section latest-section"><div className="section-heading"><div><p className="eyebrow">LATEST RECORDS</p><h2>新着の成長記録</h2></div><a className="section-link" href="/records">すべての記録を見る →</a></div><div className="record-grid">{plants.map((plant) => <a className="plant-card" key={plant.id} href={`/plants/${plant.id}`}><div className="card-image"><img src={plant.image} alt={`${plant.name} ${plant.id}`} /><span className={`status ${plant.status === '養生中' ? 'resting' : ''}`}>{plant.status}</span><span className="view-circle">↗</span></div><div className="card-body"><div className="id-row"><strong>{plant.id}</strong><span>{plant.family}</span></div><h3>{plant.name}</h3><p>{plant.note}</p><div className="card-meta"><span>記録開始 {plant.started}</span><span>親株 {plant.mother}</span></div></div></a>)}</div></section>
    <section className="home-shop"><p className="eyebrow">ONLINE STORE</p><h2>記録とともに、<br />次の育て手へ。</h2><a href="/shop">販売情報を見る →</a></section>
    <Footer />
  </main>;
}
