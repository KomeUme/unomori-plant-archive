import { Footer, Header, InstagramIcon } from '../components';

export default function AboutPage() {
  return <main>
    <Header />
    <section className="page-hero about-page-hero"><p className="eyebrow">ABOUT UNOMORI</p><h1>鵜ノ森について</h1><p>笹の雪を中心に、一株ごとの個性と育つ時間を記録する植物アーカイブです。</p></section>
    <section className="section about-section"><div className="about-layout"><div className="about-copy"><p className="eyebrow">CONTACT</p><h2>連絡先</h2><p>栽培や掲載内容、販売に関するお問い合わせは、InstagramのDMまたはメールよりご連絡ください。</p><div className="about-contact-links"><a className="about-instagram-link" href="https://www.instagram.com/me_happy1121/" target="_blank" rel="noreferrer" aria-label="Instagram @me_happy1121"><span className="about-contact-icon"><InstagramIcon /></span><strong>@me_happy1121</strong><b aria-hidden="true">↗</b></a><a className="about-email-link" href="mailto:komeume1121@gmail.com"><span>EMAIL</span><strong>komeume1121@gmail.com</strong><b aria-hidden="true">→</b></a></div></div><div className="contact-form-card contact-form-placeholder"><p className="eyebrow">INQUIRY FORM</p><h2>お問い合わせ</h2><p>お問い合わせフォームは準備中です。現在はInstagramのDMまたはメールをご利用ください。</p></div></div></section>
    <Footer />
  </main>;
}
