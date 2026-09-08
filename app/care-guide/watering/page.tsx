import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function WateringGuidePage() {
  return <main><Header />
    <section className="page-hero watering-page-hero"><p className="eyebrow">WATERING</p><h1>水やりの方法</h1><p>鉢上からたっぷり与える方法や底面給水など、株の状態と目的に合わせた水やりをまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>水やりの基本</h2><p>詳しい内容を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
