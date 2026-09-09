import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function DiagnosisGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">TROUBLESHOOTING</p><h1>よくあるトラブル Q&amp;A</h1><p>葉焼け、徒長、根の不調、病害虫など、株の変化を確認するときの入口をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">PREPARING</p><h2>まず確認すること</h2><p>詳しい内容を追加予定です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
