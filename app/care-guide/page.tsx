import { Footer, Header } from '../components';

const guides = [
  ['01', '光', 'LIGHT', '午前中の柔らかな直射光、または明るい窓辺が基本。急な環境変化は避けます。'],
  ['02', '水', 'WATER', '用土の乾きを確認してからたっぷりと。季節と根の状態に合わせて間隔を変えます。'],
  ['03', '風', 'AIR', '蒸れを防ぎ、健やかな葉と根を育てるために、年間を通して緩やかな風を。'],
];

export default function CareGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">CARE GUIDE</p><h1>栽培ガイド</h1><p>植物と長く暮らすための、私たちの基本的な育て方。</p></section>
    <section className="section guide-section page-section"><div className="guide-grid">{guides.map(([no, title, en, body]) => <article key={no}><span>{no}</span><div className="guide-icon" aria-hidden="true">{no === '01' ? '◐' : no === '02' ? '♢' : '≋'}</div><p className="eyebrow">{en}</p><h3>{title}を整える</h3><p>{body}</p></article>)}</div><div className="season-note"><p className="eyebrow">THIS MONTH / AUGUST</p><b>夏の管理メモ</b><p>強い西日と葉焼けに注意。水やり後は株元に風を通し、夜間の蒸れを避けます。</p></div></section>
    <Footer />
  </main>;
}
