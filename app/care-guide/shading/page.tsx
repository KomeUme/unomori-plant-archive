import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

function ShadingDiagram() {
  return <figure className="shading-diagram"><svg viewBox="0 0 620 190" role="img" aria-labelledby="shading-diagram-title"><title id="shading-diagram-title">遮光ネットで太陽光を和らげ、双葉の植物に届けるイメージ</title><g className="shading-diagram-sun"><circle cx="42" cy="82" r="15" /><path d="M42 48v10M42 106v10M8 82h10M76 82h10M18 58l7 7M59 99l7 7M66 58l-7 7M25 99l-7 7" /></g><g className="shading-diagram-strong-rays"><path d="M108 60h162M108 88h162M108 116h162" /></g><g className="shading-diagram-net"><path d="M292 26v138M308 26v138M324 26v138" /></g><g className="shading-diagram-soft-rays"><path d="M344 60h156M344 88h156M344 116h156" /></g><g className="shading-diagram-plant"><path d="M518 137h54l-5 32h-44zM522 137h46M545 137v-32M545 124c-14 0-23-9-22-22 13 0 22 8 22 22M545 118c0-13 8-22 21-22 1 13-8 22-21 22" /></g><text x="14" y="174">太陽光</text><text x="283" y="184">遮光ネット</text><text x="531" y="184">植物</text></svg></figure>;
}

export default function ShadingGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">SHADING</p><h1>遮光の方法と考え方</h1><p>季節や株の状態に合わせて、光を和らげるための考え方をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">WHY SHADE</p><h2>遮光の目的</h2><p>多肉植物の多くは日本に自生しておらず、原産地とは異なる環境で管理することになります。四季によって変わる気温や光量に合わせて、遮光ネットなどで与える光の量を調整し、株ごとに適切な環境を作ることが必要です。</p><p>特に注意したいのは梅雨明けから秋口です。気温は高く、生長できる温度でありながら、曇天や雨が続いて光量が足りない梅雨は、徒長などのトラブルが起こりやすい時期です。梅雨が明け、その直後に強い日差しと高温多湿にさらされると、急な環境変化が大きな負担となり、葉焼けや、重症化に伴う腐り・ジュレにつながる場合があります。</p><ShadingDiagram /><h3>葉焼けを防ぐ</h3><p>急な強光は葉焼けを起こし、葉の表面が白く傷むことがあります。重症化すると傷んだ部分から菌が入り、腐敗につながる場合もあります。葉焼けの跡は基本的に消えず、成長で目立たなくなる、または葉が更新されるまで待つことになります。</p><p>多肉植物は生長がゆっくりなため、一度の失敗が数年、場合によっては十数年にわたって残ることがあります。遮光は、光量をただ弱めるためではなく、株が受ける急な環境変化のストレスを減らし、ダメージを最小限にするための管理です。</p><h3>具体的な遮光の方法</h3><p>遮光ネットの選び方や張り方、時期ごとの調整方法を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
