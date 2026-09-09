import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

function ShadingDiagram() {
  return <figure className="shading-diagram"><svg viewBox="0 0 620 190" role="img" aria-labelledby="shading-diagram-title"><title id="shading-diagram-title">遮光ネットで太陽光を和らげるイメージ</title><g className="shading-diagram-sun"><circle cx="66" cy="82" r="23" /><path d="M66 24v16M66 124v16M8 82h16M108 82h16M25 41l11 11M96 112l11 11M107 41 96 52M36 112 25 123" /></g><g className="shading-diagram-strong-rays"><path d="M126 48 282 34M126 72 282 68M126 96 282 102M126 120 282 136" /></g><g className="shading-diagram-net"><path d="M300 24v142M320 24v142M280 42h60M280 66h60M280 90h60M280 114h60M280 138h60M280 162h60M280 24l60 60M280 72l60 60M280 120l46 46M340 24l-60 60M340 72l-60 60M326 120l-46 46" /></g><g className="shading-diagram-soft-rays"><path d="M350 48 538 57M350 72 538 76M350 96 538 95M350 120 538 114" /></g><text x="36" y="174">太陽光</text><text x="260" y="184">遮光ネット</text><text x="474" y="174">やわらげる</text></svg><figcaption>遮光ネットで、株に届く強い光を和らげます。</figcaption></figure>;
}

export default function ShadingGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">SHADING</p><h1>遮光の方法と考え方</h1><p>季節や株の状態に合わせて、光を和らげるための考え方をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">WHY SHADE</p><h2>遮光の目的</h2><p>多肉植物の多くは日本に自生しておらず、原産地とは異なる環境で管理することになります。四季によって変わる気温や光量に合わせて、遮光ネットなどで与える光の量を調整することが必要です。</p><p>特に注意したいのは梅雨明けから秋口です。気温は高いのに曇天や雨が続く梅雨は、見た目では分かりにくくても株が弱りやすい時期です。その直後に強い日差しと高温多湿にさらされると、急な環境変化が大きな負担になります。</p><ShadingDiagram /><h3>葉焼けを防ぐ</h3><p>急な強光は葉焼けを起こし、葉の表面が白く傷むことがあります。重症化すると傷んだ部分から菌が入り、腐敗につながる場合もあります。葉焼けの跡は基本的に消えず、成長で目立たなくなる、または葉が更新されるまで待つことになります。</p><p>多肉植物は生長がゆっくりなため、一度の失敗が数年、場合によっては十数年にわたって残ることがあります。遮光は、光量をただ弱めるためではなく、株が受ける急な環境変化のストレスを減らし、ダメージを最小限にするための管理です。</p><h3>具体的な遮光の方法</h3><p>遮光ネットの選び方や張り方、時期ごとの調整方法を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
