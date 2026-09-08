import { Footer, Header } from '../components';
import { siteHref } from '../site-url';
import { AnnualCareChart } from './annual-care-chart';

const guides = [
  {
    icon: 'light',
    title: '光',
    body: '株の状態を見ながら、光の強さを調整します。季節によっても光量が大きく変化するため、葉色や葉焼けの兆候に合わせて置き場所を変えます。',
    more: '同じ品種でも個体差により好む光の強さが変わるため、棚の上での配置などにより調整します。',
  },
  {
    icon: 'wind',
    title: '風',
    body: '年間を通して穏やかな風を確保し、菌（カビなど）の発生や病害虫を防ぎます。また、用土を早く乾かして乾湿のメリハリを作ります。',
    more: '多くの多肉植物はCAM型光合成であり夜間に気孔を開くため、空気を停滞させないことでスムーズな呼吸を助けます。',
  },
  {
    icon: 'water',
    title: '水',
    body: '用土の乾きと根の状態を確認してから与えます。季節ごとに変わる用土の乾く速度と生育に合わせて間隔を調整します。',
    more: '気温が低い時期や根が弱っている時期は、量よりもタイミングを見極め、鉢を持ったときの重さを確認しながら調整します。',
  },
  {
    icon: 'soil',
    title: '土',
    body: '市販の培養土は、手頃で扱いやすくおすすめです。',
    more: '最も望ましいのは、置き場所や水やりの頻度に合わせて基本用土を自分で配合することです。ただし、光・風・水の3つを適切に整えられれば、極論どんな土でも育成は可能です。土の配合は、まずこの3項目を把握してから見直すと良いでしょう。',
  },
];

function GuidePointIcon({ type }: { type: string }) {
  if (type === 'light') return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="5" /><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M25.2 6.8l-2.8 2.8M9.6 22.4l-2.8 2.8" /></svg>;
  if (type === 'wind') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 11h15c4 0 4-5 1-5-1.5 0-2.4.9-2.7 1.8M4 16h22M4 21h16c4 0 4 5 1 5-1.5 0-2.4-.9-2.7-1.8" /></svg>;
  if (type === 'water') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4c-3.7 5.1-7 8.5-7 13a7 7 0 0 0 14 0c0-4.5-3.3-7.9-7-13Z" /><path d="M12.5 20c.6 1.4 1.8 2.2 3.5 2.4" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 10h24M4 16h24M4 22h24" /><circle cx="10" cy="13" r="1" /><circle cx="21" cy="19" r="1" /></svg>;
}

const guideIntroduction = [
  {
    title: 'ガイドの前提',
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

const seasonalCare = [
  { item: '育成状態', values: ['最低気温が安定すると生育が始まる', '梅雨は生育を抑える\n高温時は緩慢', '再び生育が進む', '休眠・緩やか'] },
  { item: '植え替え', values: ['成長期直前に行うのが望ましい', '原則控える\n緊急時のみ', '補助的な適期。\n休眠期前の秋口に行い、根はあまりいじらない', '原則控える\n緊急時のみ'] },
  { item: '遮光', values: ['冬越し後の環境変化による強い日差しに注意', '梅雨の晴れ間・梅雨明けの強い日差しに注意', '寒暖差と日差しの変化に注意', '室内管理で温度が保たれる場合は、光量不足に注意'] },
  { item: '肥料', values: ['月1〜2回', '状態を見て調整', '月1〜2回', '基本不要'] },
  { item: '水やり頻度', values: ['徐々に増やす', '梅雨は徒長を防ぐため乾かし気味に。\n高温時は株の様子を見て調整', '徐々に増やす', '控える。\n株の様子を見て調整'] },
  { item: '水やりの時間帯', values: ['いつでも可', '夕方、日が暮れてから。\n蛇口の水温に注意し、鉢の温度が下がるまでたっぷり与える', '気温が落ち着いた後はいつでも可', '与える場合は日中、気温が上がってから。\n夜間凍結の心配がない日のみ'] },
];

export default function CareGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">CARE GUIDE</p><h1>栽培ガイド</h1><p>サボテン、アガベ、夏型コーデックスを育ててきた実体験をもとに、栽培の要点をまとめています。関東圏の屋外・多肉棚での管理を前提とした内容のため、お住まいの地域や環境に合わせて参考程度にご活用ください。一個人の経験に基づくものなので、複数の情報源や生産者の意見も併せてご参照ください。</p></section>
    <section className="section guide-section page-section"><div className="guide-content"><div className="guide-introduction"><p className="eyebrow">BEFORE YOU BEGIN</p><h2>まず、植物の状態を確認。</h2>{guideIntroduction.map(({ title, paragraphs }) => <div className="guide-intro-block" key={title}><h3>{title}</h3>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>)}</div><div className="guide-points-heading"><p className="eyebrow">CARE POINTS</p><h2>栽培におけるポイント</h2><p className="guide-priority">優先順位　光 <span>＞</span> 風 <span>＞</span> 水 <span>＞</span> 土</p></div><div className="guide-grid">{guides.map(({ icon, title, body, more }) => <article key={title}><span className="guide-point-icon"><GuidePointIcon type={icon} /></span><h3>{title}</h3><p>{body} {more}</p></article>)}</div><a className="guide-method-link guide-method-link-primary" href={siteHref('/care-guide/watering')}><div><p className="guide-method-label">はじめに確認</p><h2>水やりの方法</h2></div><span>詳しく見る <b aria-hidden="true">→</b></span></a><a className="guide-method-link guide-method-link-secondary" href={siteHref('/care-guide/soil')}><div><p className="eyebrow">SOIL</p><h2>用土の作り方</h2></div><span>詳しく見る <b aria-hidden="true">→</b></span></a><div className="guide-points-heading annual-guide-heading"><p className="eyebrow">ANNUAL CARE</p><h2>年間を通した育成方法</h2></div><AnnualCareChart /><div className="annual-chart-scope"><p><b>対象</b>　サボテン、アガベ、夏型コーデックスなど</p><p>地域・置き場所・雨の当たり方・株の状態によって変わるため、表は目安として使い、日々の状態を見ながら調整してください。</p></div><div className="annual-graph-note"><p className="eyebrow">ABOUT THE SEASONS</p><p>日本では四季によって、気温・日照・降水量・湿度が大きく変わります。こうした短期間の環境変化は、植物が原生地で経験する条件とは異なることがあります。栽培では日本の季節に合わせながら、原生地に近い光・風・水・温度のバランスを、株の状態に応じて整えることが大切です。</p></div><div className="seasonal-care seasonal-care-with-link"><div className="guide-points-heading seasonal-care-heading"><p className="eyebrow">SEASONAL CARE</p><h2>季節ごとの注意点</h2></div><div className="seasonal-care-table-wrap"><table className="seasonal-care-table"><thead><tr><th scope="col">項目</th>{['春', '夏', '秋', '冬'].map((season) => <th scope="col" key={season}>{season}</th>)}</tr></thead><tbody>{seasonalCare.map(({ item, values }) => <tr key={item}><th scope="row">{item}</th>{values.map((value, index) => <td key={`${item}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div><a className="guide-method-link guide-method-link-secondary shelf-guide-link" href={siteHref('/care-guide/shelf')}><div><p className="eyebrow">SHELF</p><h2>自作棚の作り方</h2><p className="guide-method-description">ホームセンターで揃う自作棚の作り方。</p></div><span>詳しく見る <b aria-hidden="true">→</b></span></a></div></section>
    <Footer />
  </main>;
}
