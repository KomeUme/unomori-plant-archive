import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function RepottingGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">REPOTTING</p><h1>植え替え直後の管理</h1><p>植え替えによる根への負担を抑え、株を安定させるための管理をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">AFTER REPOTTING</p><h2>植え替えは株にとって大きな負担</h2><p>植え替え直後の株は、手術を終えた後のような状態だと考えてください。本来は同じ場所で長く育つ植物が土から抜かれ、根に触れられ、新しい用土へ移されます。根に傷がつくこともあり、植物にとっては大きなストレスです。</p><p>この時期は、健康なときには問題なく耐えられる日差し・風・水やりにも過敏になり、ダメージを受ける場合があります。植え替え後は株の反応を見ながら、急な環境変化を避けて安定させることが大切です。</p><h3>植え替えが必要な理由</h3><p>鉢植えでは、根を伸ばせる範囲が限られます。時間とともに根は古くなり、用土も劣化します。根と土が固まりすぎると通気性が失われ、根が酸欠状態になることがあります。</p><p>そのため定期的に根と用土の状態を確認し、植え替えを行います。一時的なダメージや生育が止まるリスクはありますが、根の環境を整え、次の成長期に健全に育てるために必要な管理です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
