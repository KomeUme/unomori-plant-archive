'use client';

import { useEffect, useMemo, useState } from 'react';
import { Footer, Header } from '../components';
import { plants } from '../data';

export default function RecordsPage() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('すべて');
  useEffect(() => setQuery(new URLSearchParams(window.location.search).get('q') ?? ''), []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return plants.filter((plant) => (family === 'すべて' || plant.family === family) && (!q || [plant.id, plant.name, plant.family, plant.mother].join(' ').toLowerCase().includes(q)));
  }, [query, family]);

  return <main><Header />
    <section className="page-hero"><p className="eyebrow">GROWTH RECORDS</p><h1>植物の成長記録</h1><p>管理番号をもとに、その株の来歴と日々の変化を時系列で確認できます。</p></section>
    <section className="section records-section page-section">
      <div className="record-tools"><div className="inline-search"><span>⌕</span><input aria-label="管理番号や植物名を検索" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="管理番号 / 植物名 / 親株番号" /><button onClick={() => setQuery('')} aria-label="検索語を消去">×</button></div><div className="filter-tabs" aria-label="植物カテゴリ">{['すべて', 'アガベ', 'ビカクシダ', 'アンスリウム'].map((item) => <button key={item} className={family === item ? 'active' : ''} onClick={() => setFamily(item)}>{item}</button>)}</div></div>
      <p className="result-count">{results.length}件の記録</p>
      <div className="record-grid">{results.map((plant) => <a className="plant-card" key={plant.id} href={`/plants/${plant.id}`}><div className="card-image"><img src={plant.image} alt={`${plant.name} ${plant.id}`} /><span className={`status ${plant.status === '養生中' ? 'resting' : ''}`}>{plant.status}</span><span className="view-circle">↗</span></div><div className="card-body"><div className="id-row"><strong>{plant.id}</strong><span>{plant.family}</span></div><h3>{plant.name}</h3><p>{plant.note}</p><div className="card-meta"><span>記録開始 {plant.started}</span><span>親株 {plant.mother}</span></div><span className="text-link">成長履歴を見る <b>→</b></span></div></a>)}</div>
      {results.length === 0 && <div className="empty-state"><b>該当する記録が見つかりませんでした。</b><p>管理番号のハイフンや、植物名をご確認ください。</p><button onClick={() => { setQuery(''); setFamily('すべて'); }}>条件をリセット</button></div>}
    </section><Footer />
  </main>;
}
