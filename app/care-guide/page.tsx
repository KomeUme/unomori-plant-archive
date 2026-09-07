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

const agaveAnnualPlan = [
  { period: '1–2月', phase: '冬 / 休眠', place: '霜・冷たい雨を避け、明るい場所へ。耐寒性が低い品種は室内に取り込む。', water: '十分に乾かす。必要な場合のみ、暖かい日の午前に少量。', care: '低温と過湿を重ねない。凍結・寒風・結露にも注意。' },
  { period: '3–4月', phase: '春 / 再始動', place: '日差しと風に少しずつ慣らし、屋外の明るい場所へ。', water: '用土がしっかり乾いてから、鉢底から流れるまで与える。', care: '植え替え・鉢増しの適期。環境を変えた株は急に強光へ出さない。' },
  { period: '5月', phase: '春 / 生育', place: '日当たりと風通しを確保。株の状態に合わせて直射へ。', water: '乾き具合を見て、メリハリよく与える。', care: '必要に応じて少量の肥料。根の動き・葉の張りを確認する。' },
  { period: '6–7月', phase: '梅雨', place: '雨よけと風通しを優先。鉢同士の間隔もあける。', water: '雨天・曇天が続くときは控え、乾きが遅い鉢は待つ。', care: '長雨と蒸れを避ける。株元に水が溜まらないよう確認。' },
  { period: '8–9月', phase: '夏 / 高温期', place: '強い日差しに弱い株・幼株は遮光し、風を通す。', water: '高温の時間帯を避け、乾き具合を見て朝夕に与える。', care: '蒸れを最優先で防ぐ。葉焼け・根腐れの兆候をこまめに確認。' },
  { period: '10–11月', phase: '秋 / 冬支度', place: '引き続きよく日に当て、霜前までに越冬場所を整える。', water: '気温の低下に合わせて回数を徐々に減らす。', care: '追肥は控え、冬に向けて株を締める。冷たい雨を避ける準備をする。' },
];

export default function CareGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">CARE GUIDE</p><h1>栽培ガイド</h1></section>
    <section className="section guide-section page-section"><div className="guide-introduction"><p className="eyebrow">BEFORE YOU BEGIN</p><h2>まず、植物の今の状態を見ます。</h2>{guideIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><section className="agave-annual-guide" aria-labelledby="agave-annual-title"><header><p className="eyebrow">ANNUAL PLAN / AGAVE</p><h2 id="agave-annual-title">アガベの年間育成表</h2><p>日本での鉢植え栽培を前提にした、春秋型を主な目安です。品種・地域・株の状態による違いを優先してください。</p></header><div className="agave-annual-table-wrap"><table className="agave-annual-table"><thead><tr><th scope="col">時期</th><th scope="col">状態</th><th scope="col">置き場所</th><th scope="col">水やり</th><th scope="col">主な管理</th></tr></thead><tbody>{agaveAnnualPlan.map((item) => <tr key={item.period}><th scope="row">{item.period}</th><td><b>{item.phase}</b></td><td>{item.place}</td><td>{item.water}</td><td>{item.care}</td></tr>)}</tbody></table></div><p className="agave-annual-note">雨よけ・風通し・排水性は年間を通して大切です。水やりは日付で決めず、用土の乾きと株の状態を見て判断してください。</p></section><div className="guide-grid">{guides.map(([no, title, en, body]) => <article key={no}><span>{no}</span><div className="guide-icon" aria-hidden="true">{no === '01' ? '◐' : no === '02' ? '♢' : '≋'}</div><p className="eyebrow">{en}</p><h3>{title}を整える</h3><p>{body}</p></article>)}</div><div className="season-note"><p className="eyebrow">THIS MONTH / AUGUST</p><b>夏の管理メモ</b><p>強い西日と葉焼けに注意。水やり後は株元に風を通し、夜間の蒸れを避けます。</p></div></section>
    <Footer />
  </main>;
}
