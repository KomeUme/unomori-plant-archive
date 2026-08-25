import { Footer, Header } from '../components';

export default function ShopPage() {
  return <main><Header />
    <section className="shop-section standalone-shop"><div><p className="eyebrow">ONLINE STORE</p><h1>記録とともに、<br />次の育て手へ。</h1><p>販売中の株には管理番号を付与しています。お迎え後も、このサイトで育ちの履歴をご覧いただけます。</p></div><div className="shop-links"><a href="https://thebase.com/" target="_blank" rel="noreferrer"><span><small>公式オンラインストア</small>BASE</span><b>→</b></a><a href="https://auctions.yahoo.co.jp/" target="_blank" rel="noreferrer"><span><small>オークション出品</small>Yahoo!オークション</span><b>→</b></a></div></section>
    <section className="purchase-note"><p className="eyebrow">BEFORE PURCHASE</p><h2>管理番号について</h2><p>お迎えいただいた株の管理番号を成長記録ページで検索すると、親株情報と育成履歴をご確認いただけます。</p><a href="/records">成長記録を検索する →</a></section>
    <Footer />
  </main>;
}
