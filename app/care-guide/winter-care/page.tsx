import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function WinterCareGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">WINTER CARE</p><h1>冬越し・霜対策</h1><p>気温が下がる時期の水やり、霜対策、置き場所を見直すための要点をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide#winter-care')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>冬の管理</h2><p>詳しい内容を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
