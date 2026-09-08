import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function AcclimationGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">FIRST CARE</p><h1>購入直後・植え替え直後の管理</h1><p>環境が変わった株を、状態を見ながら無理なく慣らすための考え方をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>環境に慣らす</h2><p>詳しい内容を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
