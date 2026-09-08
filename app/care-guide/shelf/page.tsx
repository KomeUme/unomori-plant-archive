import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function ShelfGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">SHELF</p><h1>自作棚の作り方</h1></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>棚づくりの基本</h2><p>詳しい内容を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
