export function Header() {
  return <header className="site-header">
    <a className="brand" href="/" aria-label="HAGUKUMU PLANTS トップ"><span className="brand-mark">H</span><span>HAGUKUMU <em>PLANTS</em></span></a>
    <nav aria-label="メインナビゲーション"><a href="/records">成長記録</a><a href="/mother-plants">親株一覧</a><a href="/care-guide">栽培ガイド</a><a href="/shop" className="nav-shop">オンラインストア ↗</a></nav>
    <a className="menu-shop" href="/shop">STORE</a>
  </header>;
}

export function Footer() {
  return <footer><a className="brand footer-brand" href="/"><span className="brand-mark">H</span><span>HAGUKUMU <em>PLANTS</em></span></a><p>植物と、その時間を記録する。</p><div><a href="/records">成長記録</a><a href="/care-guide">栽培ガイド</a><a href="/shop">販売情報</a></div><small>© 2026 HAGUKUMU PLANTS</small></footer>;
}
