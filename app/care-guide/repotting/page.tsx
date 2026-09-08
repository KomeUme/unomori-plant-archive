import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function RepottingGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">REPOTTING</p><h1>植え替え直後の管理</h1><p>植え替えによる根への負担を抑え、株を安定させるための管理をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>植え替え後の基本</h2><p>詳しい内容を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
