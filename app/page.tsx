'use client';

import { useMemo, useState } from 'react';

type Plant = {
  id: string;
  name: string;
  family: string;
  status: string;
  mother: string;
  image: string;
  started: string;
  note: string;
  timeline: { date: string; title: string; detail: string }[];
};

const plants: Plant[] = [
  {
    id: 'HG-24-017',
    name: 'Agave titanota “White Ice”',
    family: 'アガベ',
    status: '育成中',
    mother: 'M-AG-003',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85',
    started: '2024.03.18',
    note: '鋸歯の展開が安定。現在は締めて育成中。',
    timeline: [
      { date: '2026.08.12', title: '夏季の展開記録', detail: '新葉2枚を確認。葉幅が増し、鋸歯の白さも安定しています。' },
      { date: '2026.05.04', title: '植え替え', detail: '根張り良好。硬質赤玉主体の用土へ更新しました。' },
      { date: '2025.11.20', title: '冬季管理へ', detail: '灌水間隔を調整し、育成ライト下へ移動しました。' },
    ],
  },
  {
    id: 'HG-25-042',
    name: 'Platycerium “Jade Girl”',
    family: 'ビカクシダ',
    status: '育成中',
    mother: 'M-PL-008',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85',
    started: '2025.06.02',
    note: '胞子葉の分岐が増加。次回は秋口に板替え予定。',
    timeline: [
      { date: '2026.08.03', title: '胞子葉の成長', detail: '分岐が明瞭になり、葉色も良好です。葉水は朝に限定。' },
      { date: '2026.04.16', title: '貯水葉を確認', detail: '新しい貯水葉が展開。施肥濃度を通常の半分へ調整しました。' },
      { date: '2025.10.09', title: '板付け', detail: '通気を優先した薄めの水苔でコルク板へ固定しました。' },
    ],
  },
  {
    id: 'HG-25-106',
    name: 'Anthurium crystallinum',
    family: 'アンスリウム',
    status: '養生中',
    mother: 'M-AN-002',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85',
    started: '2025.10.27',
    note: '新葉硬化待ち。湿度を保ちつつ風を確保。',
    timeline: [
      { date: '2026.07.28', title: '新葉の硬化開始', detail: '葉脈のコントラストが強くなり、葉幅は前回比約1.2倍です。' },
      { date: '2026.02.10', title: '発根確認', detail: '透明ポット越しに新根を確認。通常管理へ段階移行しました。' },
      { date: '2025.11.03', title: '導入・養生', detail: '根を確認後、水苔と軽石の混合用土へ植え付けました。' },
    ],
  },
];

const mothers = [
  { id: 'M-AG-003', name: 'Agave titanota “White Ice”', type: 'アガベ', feature: '白い鋸歯・厚葉・短葉傾向', origin: '国内選抜株', descendants: 12 },
  { id: 'M-PL-008', name: 'Platycerium “Jade Girl”', type: 'ビカクシダ', feature: '細葉・多分岐・上向きの草姿', origin: '台湾由来', descendants: 8 },
  { id: 'M-AN-002', name: 'Anthurium crystallinum', type: 'アンスリウム', feature: '濃緑ベルベット・銀白色の葉脈', origin: '実生選抜', descendants: 5 },
  { id: 'M-AG-011', name: 'Agave “SAD”', type: 'アガベ', feature: '強いトップスパイン・コンパクト', origin: '国内選抜株', descendants: 4 },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Plant | null>(null);
  const [family, setFamily] = useState('すべて');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return plants.filter((plant) => {
      const matchesFamily = family === 'すべて' || plant.family === family;
      const matchesQuery = !q || [plant.id, plant.name, plant.family, plant.mother].join(' ').toLowerCase().includes(q);
      return matchesFamily && matchesQuery;
    });
  }, [query, family]);

  function jumpToRecords() {
    document.getElementById('records')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="HAGUKUMU PLANTS トップ">
          <span className="brand-mark">H</span>
          <span>HAGUKUMU <em>PLANTS</em></span>
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#records">成長記録</a>
          <a href="#mothers">親株一覧</a>
          <a href="#guide">栽培ガイド</a>
          <a href="#shop" className="nav-shop">オンラインストア ↗</a>
        </nav>
        <a className="menu-shop" href="#shop">STORE</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">GROWTH ARCHIVE / TOKYO</p>
          <h1>一株ずつ、<br />育ちの履歴を。</h1>
          <p className="hero-lead">私たちが育てる植物の成長、親株の特徴、日々の管理方法を、管理番号とともに記録しています。</p>
          <div className="hero-search" role="search">
            <label htmlFor="hero-query">管理番号・植物名から探す</label>
            <div className="search-row">
              <span aria-hidden="true">⌕</span>
              <input id="hero-query" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && jumpToRecords()} placeholder="例：HG-24-017" />
              <button onClick={jumpToRecords}>検索する</button>
            </div>
          </div>
          <p className="search-hint"><span /> 管理番号は商品タグ・販売証明書に記載されています</p>
        </div>
        <div className="hero-image-wrap">
          <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1400&q=90" alt="光の中で育つ鉢植えの植物" />
          <div className="image-caption"><span>001</span><p>Every plant has<br />its own story.</p></div>
          <div className="hero-stamp">GROWN<br />WITH CARE<br /><b>●</b> TOKYO</div>
        </div>
      </section>

      <section className="intro-band">
        <p>育てる人へ、確かな記録を。</p>
        <div><span>記録株数 <b>148</b></span><span>親株 <b>29</b></span><span>更新記事 <b>326</b></span></div>
      </section>

      <section className="section records-section" id="records">
        <div className="section-heading">
          <div><p className="eyebrow">GROWTH RECORDS</p><h2>植物の成長記録</h2></div>
          <p>管理番号をもとに、その株の来歴と日々の変化を時系列で確認できます。</p>
        </div>
        <div className="record-tools">
          <div className="inline-search"><span>⌕</span><input aria-label="管理番号や植物名を検索" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="管理番号 / 植物名 / 親株番号" /><button onClick={() => setQuery('')} aria-label="検索語を消去">×</button></div>
          <div className="filter-tabs" aria-label="植物カテゴリ">
            {['すべて', 'アガベ', 'ビカクシダ', 'アンスリウム'].map((item) => <button key={item} className={family === item ? 'active' : ''} onClick={() => setFamily(item)}>{item}</button>)}
          </div>
        </div>
        <p className="result-count">{results.length}件の記録</p>
        <div className="record-grid">
          {results.map((plant) => (
            <article className="plant-card" key={plant.id}>
              <button className="card-image" onClick={() => setSelected(plant)} aria-label={`${plant.id}の成長記録を見る`}>
                <img src={plant.image} alt={`${plant.name} ${plant.id}`} />
                <span className={`status ${plant.status === '養生中' ? 'resting' : ''}`}>{plant.status}</span>
                <span className="view-circle">↗</span>
              </button>
              <div className="card-body">
                <div className="id-row"><strong>{plant.id}</strong><span>{plant.family}</span></div>
                <h3>{plant.name}</h3>
                <p>{plant.note}</p>
                <div className="card-meta"><span>記録開始 {plant.started}</span><span>親株 {plant.mother}</span></div>
                <button className="text-link" onClick={() => setSelected(plant)}>成長履歴を見る <span>→</span></button>
              </div>
            </article>
          ))}
        </div>
        {results.length === 0 && <div className="empty-state"><b>該当する記録が見つかりませんでした。</b><p>管理番号のハイフンや、植物名をご確認ください。</p><button onClick={() => { setQuery(''); setFamily('すべて'); }}>条件をリセット</button></div>}
      </section>

      <section className="section mother-section" id="mothers">
        <div className="section-heading light">
          <div><p className="eyebrow">MOTHER PLANTS</p><h2>親株の管理情報</h2></div>
          <p>形質を次世代へ繋ぐため、由来と特徴を記録しています。</p>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>管理番号</th><th>品種・系統</th><th>分類</th><th>特徴</th><th>由来</th><th>子株記録</th></tr></thead>
            <tbody>{mothers.map((mother) => <tr key={mother.id}><td><b>{mother.id}</b></td><td>{mother.name}</td><td><span className="type-pill">{mother.type}</span></td><td>{mother.feature}</td><td>{mother.origin}</td><td><a href="#records">{mother.descendants}株 →</a></td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="section guide-section" id="guide">
        <div className="section-heading">
          <div><p className="eyebrow">CARE GUIDE</p><h2>栽培ガイド</h2></div>
          <p>植物と長く暮らすための、私たちの基本的な育て方。</p>
        </div>
        <div className="guide-grid">
          {[
            ['01', '光', 'LIGHT', '午前中の柔らかな直射光、または明るい窓辺が基本。急な環境変化は避けます。'],
            ['02', '水', 'WATER', '用土の乾きを確認してからたっぷりと。季節と根の状態に合わせて間隔を変えます。'],
            ['03', '風', 'AIR', '蒸れを防ぎ、健やかな葉と根を育てるために、年間を通して緩やかな風を。'],
          ].map(([no, title, en, body]) => <article key={no}><span>{no}</span><div className="guide-icon" aria-hidden="true">{no === '01' ? '◐' : no === '02' ? '♢' : '≋'}</div><p className="eyebrow">{en}</p><h3>{title}を整える</h3><p>{body}</p><a href="#records">詳しい管理記録を見る →</a></article>)}
        </div>
        <div className="season-note"><p className="eyebrow">THIS MONTH / AUGUST</p><b>夏の管理メモ</b><p>強い西日と葉焼けに注意。水やり後は株元に風を通し、夜間の蒸れを避けます。</p></div>
      </section>

      <section className="shop-section" id="shop">
        <div><p className="eyebrow">ONLINE STORE</p><h2>記録とともに、<br />次の育て手へ。</h2><p>販売中の株には管理番号を付与しています。お迎え後も、このサイトで育ちの履歴をご覧いただけます。</p></div>
        <div className="shop-links">
          <a href="https://thebase.com/" target="_blank" rel="noreferrer"><span><small>公式オンラインストア</small>BASE</span><b>→</b></a>
          <a href="https://auctions.yahoo.co.jp/" target="_blank" rel="noreferrer"><span><small>オークション出品</small>Yahoo!オークション</span><b>→</b></a>
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">H</span><span>HAGUKUMU <em>PLANTS</em></span></a><p>植物と、その時間を記録する。</p><div><a href="#records">成長記録</a><a href="#guide">栽培ガイド</a><a href="#shop">販売情報</a></div><small>© 2026 HAGUKUMU PLANTS</small></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><section className="record-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="閉じる">×</button><div className="modal-top"><img src={selected.image} alt={selected.name} /><div><p className="eyebrow">PLANT RECORD</p><strong className="modal-id">{selected.id}</strong><h2 id="modal-title">{selected.name}</h2><p>{selected.note}</p><dl><div><dt>分類</dt><dd>{selected.family}</dd></div><div><dt>親株</dt><dd>{selected.mother}</dd></div><div><dt>記録開始</dt><dd>{selected.started}</dd></div></dl></div></div><div className="timeline"><h3>成長タイムライン</h3>{selected.timeline.map((event, index) => <article key={event.date}><div className="timeline-marker"><span>{index + 1}</span></div><time>{event.date}</time><div><h4>{event.title}</h4><p>{event.detail}</p></div></article>)}</div></section></div>}
    </main>
  );
}
