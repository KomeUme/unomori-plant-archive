'use client';

import { useState, useSyncExternalStore } from 'react';
import { LanguageToggle } from './language-toggle';
import { siteHref } from './site-url';

function subscribeToTopHref() {
  return () => undefined;
}

function getClientTopHref() {
  if (!window.location.hostname.endsWith('.translate.goog')) return siteHref('/');

  const sourceQuery = new URLSearchParams(window.location.search);
  const translateQuery = new URLSearchParams();
  ['_x_tr_sl', '_x_tr_tl', '_x_tr_hl', '_x_tr_pto'].forEach((key) => {
    const value = sourceQuery.get(key);
    if (value) translateQuery.set(key, value);
  });

  const query = translateQuery.toString();
  return `${siteHref('/')}${query ? `?${query}` : ''}`;
}

function getServerTopHref() {
  return siteHref('/');
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const homeHref = useSyncExternalStore(subscribeToTopHref, getClientTopHref, getServerTopHref);

  return <header className="site-header">
    <a className="brand" href={homeHref} aria-label="鵜ノ森 トップ"><span className="brand-mark">鵜</span><span>鵜ノ森 <em>PLANT ARCHIVE</em></span></a>
    <LanguageToggle className="desktop-language-toggle" />
    <nav id="site-navigation" className={menuOpen ? 'is-open' : ''} aria-label="メインナビゲーション" onClick={() => setMenuOpen(false)}><a href={siteHref('/')} className="nav-top">TOP</a><a href={siteHref('/journal')}>記事一覧</a><a href={siteHref('/mother-plants')}>品種</a><a href={siteHref('/care-guide')}>栽培ガイド</a></nav>
    <div className="header-actions"><LanguageToggle className="mobile-language-toggle" /><a className="header-shop" href={siteHref('/shop')} aria-label="オンラインストア" title="オンラインストア"><span className="shopping-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"><path d="M5.4 8.1h13.2l-1.05 10.7H6.45L5.4 8.1Zm3.5-.05V6.65a3.1 3.1 0 0 1 6.2 0v1.4" /></svg></span></a><button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'} aria-controls="site-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}><span /><span /></button></div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div><a className="brand footer-brand" href={siteHref('/')}><span className="brand-mark">鵜</span><span>鵜ノ森 <em>PLANT ARCHIVE</em></span></a><p className="footer-description">笹の雪を中心に、一株ずつの時間を記録する植物アーカイブ。</p></div><div className="footer-message"><p className="eyebrow">UNOMORI / PLANT ARCHIVE</p><p>植物と、その時間を記録する。</p></div><nav className="footer-nav" aria-label="フッターナビゲーション"><p>EXPLORE</p><div><a href={siteHref('/journal')}>記事一覧</a><a href={siteHref('/records')}>成長記録</a><a href={siteHref('/mother-plants')}>品種</a><a href={siteHref('/care-guide')}>栽培ガイド</a><a href={siteHref('/shop')}>販売情報</a></div></nav></div><small>© 2026 鵜ノ森</small></footer>;
}
