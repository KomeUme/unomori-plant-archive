import { Footer, Header } from '../components';
import { siteHref } from '../site-url';

const guides = [
  ['01', '光', '株の状態を見ながら、少しずつ日差しに慣らします。急に強い光へ移すことは避けます。'],
  ['02', '風', '蒸れを避けるため、年間を通して緩やかな風を確保します。強風が続く場所では株を守ります。'],
  ['03', '水', '用土の乾きと根の状態を確認してから与えます。季節ごとの気温と生育に合わせて間隔を調整します。'],
  ['04', '土', '水はけと通気性を基本に、根の状態と置き場所に合わせて配合を選びます。'],
];

const guideIntroduction = [
  '本ガイドに記載している植物の育成方法は、あくまで一つの目安としてお考えください。',
  '植物は、種類だけでなく、置き場所、日照、気温、風通し、用土、株の状態などによって適切な管理方法が異なります。そのため、すべての植物に同じ管理方法が当てはまるわけではありません。',
  '特に注意したいのが、育成環境を大きく変える場合です。長期間その植物に適していない環境で管理されていた株や、弱っている株を、いきなり健康な株に適した強い日照や風通しの良い環境へ移すと、急激な環境変化によって大きなダメージを受けることがあります。',
  'これは、長期間病気で入院していた人に、回復させたいからといって突然ステーキのような負担の大きな食事を与えるようなものです。植物も同様に、状態に合わせて少しずつ適切な環境へ戻していく必要があります。',
  'そのため、置き場所や日照などの環境を変更する際は、最低でも1週間程度を目安に、植物の状態を確認しながら徐々に新しい環境へ慣らしてください。本ガイドでは、こうした「環境への慣らし方」についても具体的な方法を記載しています。植物の状態と育成環境を確認しながら、各項目を参考に管理してください。',
];

export default function CareGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">CARE GUIDE</p><h1>栽培ガイド</h1></section>
    <section className="section guide-section page-section"><div className="guide-content"><div className="guide-introduction"><p className="eyebrow">BEFORE YOU BEGIN</p><h2>まず、植物の今の状態を見ます。</h2>{guideIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><figure className="agave-annual-graph"><picture><source media="(max-width: 720px)" srcSet={siteHref('/agave-annual-graph-mobile.jpg')} /><img src={siteHref('/agave-annual-graph-desktop.jpg')} alt="アガベの年間育成グラフ。月ごとの育成状態、水やり量、植え替え適期を示す。" /></picture></figure><div className="annual-graph-note"><p className="eyebrow">ABOUT THE SEASONS</p><p>日本では四季によって、気温・日照・降水量・湿度が大きく変わります。こうした短期間の環境変化は、植物が原生地で経験する条件とは異なることがあります。栽培では日本の季節に合わせながら、原生地に近い光・風・水・温度のバランスを、株の状態に応じて整えることが大切です。</p></div><div className="guide-points-heading"><p className="eyebrow">CARE POINTS</p><h2>栽培におけるポイント</h2><p className="guide-priority">優先順位　光 <span>＞</span> 風 <span>＞</span> 水 <span>＞</span> 土</p></div><div className="guide-grid">{guides.map(([no, title, body]) => <article key={no}><span className="guide-point-number">{no}</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className="season-note"><p className="eyebrow">THIS MONTH / AUGUST</p><b>夏の管理メモ</b><p>強い西日と葉焼けに注意。水やり後は株元に風を通し、夜間の蒸れを避けます。</p></div></div></section>
    <Footer />
  </main>;
}
