import { Footer, Header } from './components';
import { articles } from './data';
import { siteHref } from './site-url';

export default function Home() {
  return <main>
    <Header />
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">鵜ノ森 / PLANT ARCHIVE</p>
        <h1>一株ごとの個性の<br />記録日記。</h1>
        <p className="hero-lead">笹の雪を中心に栽培している24歳、めーと申します。育成環境や日々の管理を、一株ごとの記録として残しています。</p>
      </div>
      <div className="hero-image-wrap"><img src={siteHref('/hero-unomori.jpg')} alt="鵜ノ森で育てている植物" /><div className="image-caption"><span>001</span><p>Every plant has<br />its own story.</p></div><div className="hero-stamp">GROWN<br />WITH CARE<br /><b>●</b> TOKYO</div></div>
    </section>
    <section className="event-section"><div className="event-card event-card-pending"><div><p className="eyebrow">NEXT EVENT</p><h2>次回のイベント情報は未定です。</h2></div></div></section>
    <section className="section journal-section"><div className="section-heading"><div><p className="journal-overline">お知らせ・記事</p><h2>新着記事</h2></div></div><div className="article-list">{articles.slice(0, 4).map((article) => <a className="article-row" href={siteHref(`/journal/${article.slug}`)} key={article.slug}><img src={article.image} alt={article.title} /><div><p className="article-meta"><span>{article.category}</span>{article.date}</p><h3>{article.title}</h3><p>{article.excerpt}</p><b>続きを読む →</b></div></a>)}</div><div className="journal-cta-wrap"><a className="journal-cta" href={siteHref('/journal')}><span>VIEW ALL ARTICLES</span>記事一覧を見る <b>→</b></a></div></section>
    <Footer />
  </main>;
}
