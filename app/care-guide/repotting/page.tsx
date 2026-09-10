import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function RepottingGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">REPOTTING</p><h1>植え替え直後の管理</h1><p>植え替えによる根への負担を抑え、株を安定させるための管理をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide#repotting')}>← 栽培ガイドへ戻る</a><p className="eyebrow">AFTER REPOTTING</p><h2>植え替えは株にとって大きな負担</h2><p>植え替え直後の株は、手術を終えた後のような状態だと考えてください。本来は生涯同じ土地で育つ植物が土から抜かれ、根に触れられ、新しい用土へ移されます。どんなに丁寧な植え替えでも根が折れたり傷ついたりするため、植物にとっては大きなストレスです。</p><h3>なぜ植え替えが必要？</h3><p>鉢植えでは、自然とは異なり根を伸ばせる範囲が鉢の中に限られます。時間とともに根は古くなり、用土も劣化します。根と土が固まりすぎると通気性が失われ、根が酸欠状態になることがあります。また、用土の粒が崩れて泥化すると水はけが悪くなり、いつまでも乾きにくくなります。</p><p>そのため、定期的に根と用土の状態を確認し、適切なタイミングで植え替えを行います。一時的なダメージや生育が止まるリスクはありますが、根の環境を整え、次の成長期に健全に育てるために必要な管理です。</p><h3>植え替え後の管理</h3><p>植え替え後は、健康なときには問題なく耐えられる日差し・風・水やりにも過敏になり、ダメージを受ける場合があります。株の反応を見ながら、急な環境変化を避けて安定させることが大切です。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
