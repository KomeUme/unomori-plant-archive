import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function ShadingGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">SHADING</p><h1>遮光の方法と考え方</h1><p>季節や株の状態に合わせて、光を和らげるための考え方をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>遮光の基本</h2><p>詳しい内容を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
