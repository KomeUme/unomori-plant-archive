import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';

export default function SoilGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">SOIL</p><h1>用土の作り方</h1></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>用土の基本</h2><p>詳しい内容を追加予定です。</p></div></section>
    <Footer />
  </main>;
}
