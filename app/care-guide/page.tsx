import { Footer, Header } from '../components';
import { AnnualCareChart } from './annual-care-chart';

const guides = [
  {
    no: '01',
    title: '光',
    body: '株の状態を見ながら、少しずつ日差しに慣らします。急に強い光へ移すことは避けます。',
    more: '季節や天候による光の強さも見ながら、葉色や葉焼けの兆候に合わせて置き場所を調整します。',
  },
  {
    no: '02',
    title: '風',
    body: '蒸れを避けるため、年間を通して緩やかな風を確保します。強風が続く場所では株を守ります。',
    more: '風は用土を乾かす速さにも関わります。雨の後や水やり後は、株元に湿気をためないことを意識します。',
  },
  {
    no: '03',
    title: '水',
    body: '用土の乾きと根の状態を確認してから与えます。季節ごとの気温と生育に合わせて間隔を調整します。',
    more: '気温が低い時期や根が弱っている時期は、量よりもタイミングを優先し、乾き方を確認しながら調整します。',
  },
  {
    no: '04',
    title: '土',
    body: '市販の培養土は、手頃で扱いやすくおすすめです。',
    more: '最も望ましいのは、置き場所や水やりの頻度に合わせて基本用土を自分で配合することです。ただし、光・風・水の3つを適切に整えられれば、土の選択肢を極端に狭める必要はありません。土の配合は、まずこの3項目を把握してから見直すとよいでしょう。',
  },
];

const guideIntroduction = [
  {
    title: 'このガイドの前提',
    paragraphs: [
      '本ガイドに記載している植物の育成方法は、あくまで一つの目安としてお考えください。',
      '植物は、種類だけでなく、置き場所、日照、気温、風通し、用土、株の状態などによって適切な管理方法が異なります。そのため、すべての植物に同じ管理方法が当てはまるわけではありません。',
    ],
  },
  {
    title: '環境を急に変えない',
    paragraphs: [
      '特に注意したいのが、育成環境を大きく変える場合です。長期間その植物に適していない環境で管理されていた株や、弱っている株を、いきなり健康な株に適した強い日照や風通しの良い環境へ移すと、急激な環境変化によって大きなダメージを受けることがあります。',
      'これは、長期間病気で入院していた人に、回復させたいからといって突然ステーキのような負担の大きな食事を与えるようなものです。植物も同様に、状態に合わせて少しずつ適切な環境へ戻していく必要があります。',
      'そのため、置き場所や日照などの環境を変更する際は、最低でも1週間程度を目安に、植物の状態を確認しながら徐々に新しい環境へ慣らしてください。本ガイドでは、こうした「環境への慣らし方」についても具体的な方法を記載しています。植物の状態と育成環境を確認しながら、各項目を参考に管理してください。',
    ],
  },
];

export default function CareGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">CARE GUIDE</p><h1>栽培ガイド</h1></section>
    <section className="section guide-section page-section"><div className="guide-content"><div className="guide-introduction"><p className="eyebrow">BEFORE YOU BEGIN</p><h2>まず、植物の今の状態を見ます。</h2>{guideIntroduction.map(({ title, paragraphs }) => <div className="guide-intro-block" key={title}><h3>{title}</h3>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>)}</div><AnnualCareChart /><div className="annual-chart-scope"><p><b>対象</b>　サボテン、アガベ、夏型コーデックスなど</p><p>地域・置き場所・雨の当たり方・株の状態によって変わるため、表は目安として使い、日々の状態を見ながら調整してください。</p></div><div className="annual-graph-note"><p className="eyebrow">ABOUT THE SEASONS</p><p>日本では四季によって、気温・日照・降水量・湿度が大きく変わります。こうした短期間の環境変化は、植物が原生地で経験する条件とは異なることがあります。栽培では日本の季節に合わせながら、原生地に近い光・風・水・温度のバランスを、株の状態に応じて整えることが大切です。</p></div><div className="guide-points-heading"><p className="eyebrow">CARE POINTS</p><h2>栽培におけるポイント</h2><p className="guide-priority">優先順位　光 <span>＞</span> 風 <span>＞</span> 水 <span>＞</span> 土</p></div><div className="guide-grid">{guides.map(({ no, title, body, more }) => <article key={no}><span className="guide-point-number">{no}</span><h3>{title}</h3><p>{body} {more}</p></article>)}</div><div className="season-note"><p className="eyebrow">THIS MONTH / AUGUST</p><b>夏の管理メモ</b><p>強い西日と葉焼けに注意。水やり後は株元に風を通し、夜間の蒸れを避けます。</p></div></div></section>
    <Footer />
  </main>;
}
