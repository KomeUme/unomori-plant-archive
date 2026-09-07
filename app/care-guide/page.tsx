import { Footer, Header } from '../components';

const guides = [
  ['01', '光', 'LIGHT', '午前中の柔らかな直射光、または明るい窓辺が基本。急な環境変化は避けます。'],
  ['02', '水', 'WATER', '用土の乾きを確認してからたっぷりと。季節と根の状態に合わせて間隔を変えます。'],
  ['03', '風', 'AIR', '蒸れを防ぎ、健やかな葉と根を育てるために、年間を通して緩やかな風を。'],
];

const guideIntroduction = [
  '本ガイドに記載している植物の育成方法は、あくまで一つの目安としてお考えください。',
  '植物は、種類だけでなく、置き場所、日照、気温、風通し、用土、株の状態などによって適切な管理方法が異なります。そのため、すべての植物に同じ管理方法が当てはまるわけではありません。',
  '特に注意したいのが、育成環境を大きく変える場合です。長期間その植物に適していない環境で管理されていた株や、弱っている株を、いきなり健康な株に適した強い日照や風通しの良い環境へ移すと、急激な環境変化によって大きなダメージを受けることがあります。',
  'これは、長期間病気で入院していた人に、回復させたいからといって突然負担の大きな食事を与えるようなものです。植物も同様に、状態に合わせて少しずつ本来の環境へ戻していく必要があります。',
  'そのため、置き場所や日照などの環境を変更する際は、最低でも1週間程度を目安に、植物の状態を確認しながら徐々に新しい環境へ慣らしてください。本ガイドでは、こうした「環境への慣らし方」についても具体的な方法を記載しています。植物の状態と育成環境を確認しながら、各項目を参考に管理してください。',
];

export default function CareGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">CARE GUIDE</p><h1>栽培ガイド</h1></section>
    <section className="section guide-section page-section"><div className="guide-introduction"><p className="eyebrow">BEFORE YOU BEGIN</p><h2>まず、植物の今の状態を見ます。</h2>{guideIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="guide-grid">{guides.map(([no, title, en, body]) => <article key={no}><span>{no}</span><div className="guide-icon" aria-hidden="true">{no === '01' ? '◐' : no === '02' ? '♢' : '≋'}</div><p className="eyebrow">{en}</p><h3>{title}を整える</h3><p>{body}</p></article>)}</div><div className="season-note"><p className="eyebrow">THIS MONTH / AUGUST</p><b>夏の管理メモ</b><p>強い西日と葉焼けに注意。水やり後は株元に風を通し、夜間の蒸れを避けます。</p></div></section>
    <Footer />
  </main>;
}
