'use client';

import { useState } from 'react';
import { siteHref } from './site-url';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href={siteHref('/')} aria-label="鵜ノ森 トップ"><span className="brand-mark">鵜</span><span>鵜ノ森 <em>PLANT ARCHIVE</em></span></a>
    <nav id="site-navigation" className={menuOpen ? 'is-open' : ''} aria-label="メインナビゲーション" onClick={() => setMenuOpen(false)}><a href={siteHref('/')} className="nav-top">TOP</a><a href={siteHref('/journal')}>記事一覧</a><a href={siteHref('/mother-plants')}>品種</a><a href={siteHref('/care-guide')}>栽培ガイド</a></nav>
    <div className="header-actions"><a className="header-shop" href={siteHref('/shop')} aria-label="オンラインストア"><span className="shopping-mark" aria-hidden="true" /></a><button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'} aria-controls="site-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}><span /><span /></button></div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div><a className="brand footer-brand" href={siteHref('/')}><span className="brand-mark">鵜</span><span>鵜ノ森 <em>PLANT ARCHIVE</em></span></a><p className="footer-description">笹の雪を中心に、一株ずつの時間を記録する植物アーカイブ。</p></div><div className="footer-message"><p className="eyebrow">UNOMORI / PLANT ARCHIVE</p><p>植物と、その時間を記録する。</p></div><nav className="footer-nav" aria-label="フッターナビゲーション"><p>EXPLORE</p><div><a href={siteHref('/journal')}>記事一覧</a><a href={siteHref('/records')}>成長記録</a><a href={siteHref('/mother-plants')}>品種</a><a href={siteHref('/care-guide')}>栽培ガイド</a><a href={siteHref('/shop')}>販売情報</a></div></nav></div><small>© 2026 鵜ノ森</small></footer>;
}
