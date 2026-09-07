'use client';

import { useState, useSyncExternalStore } from 'react';
import { LanguageToggle } from './language-toggle';
import { siteHref } from './site-url';

function subscribeToHeaderTranslation() {
  return () => undefined;
}

function getClientTranslationSearch() {
  if (!window.location.hostname.endsWith('.translate.goog')) return '';

  const sourceQuery = new URLSearchParams(window.location.search);
  const translateQuery = new URLSearchParams();
  ['_x_tr_sl', '_x_tr_tl', '_x_tr_hl', '_x_tr_pto'].forEach((key) => {
    const value = sourceQuery.get(key);
    if (value) translateQuery.set(key, value);
  });

  const query = translateQuery.toString();
  return query ? `?${query}` : '';
}

function getServerTranslationSearch() {
  return '';
}

export function InstagramIcon() {
  return <svg className="instagram-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.7" r=".75" fill="currentColor" stroke="none" /></svg>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const translationSearch = useSyncExternalStore(subscribeToHeaderTranslation, getClientTranslationSearch, getServerTranslationSearch);
  const headerHref = (path: string) => `${siteHref(path)}${translationSearch}`;

  return <header className="site-header">
    <a className="brand" href={headerHref('/')} aria-label="鵜ノ森 トップ"><span className="brand-mark">鵜</span><span>鵜ノ森 <em>PLANT ARCHIVE</em></span></a>
    <LanguageToggle className="desktop-language-toggle" />
    <nav id="site-navigation" className={menuOpen ? 'is-open' : ''} aria-label="メインナビゲーション" onClick={() => setMenuOpen(false)}><a href={headerHref('/')} className="nav-top">TOP</a><a href={headerHref('/journal')}>記事一覧</a><a href={headerHref('/mother-plants')}>品種</a><a href={headerHref('/care-guide')}>栽培ガイド</a><a href={headerHref('/about')}>ABOUT</a></nav>
    <div className="header-actions"><LanguageToggle className="mobile-language-toggle" /><a className="header-shop" href={headerHref('/shop')} aria-label="オンラインストア" title="オンラインストア"><span className="shopping-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"><path d="M5.4 8.1h13.2l-1.05 10.7H6.45L5.4 8.1Zm3.5-.05V6.65a3.1 3.1 0 0 1 6.2 0v1.4" /></svg></span></a><button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'} aria-controls="site-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}><span /><span /></button></div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div><a className="brand footer-brand" href={siteHref('/')}><span className="brand-mark">鵜</span><span>鵜ノ森 <em>PLANT ARCHIVE</em></span></a><p className="footer-description">笹の雪を中心に、一株ずつの時間を記録する植物アーカイブ。</p></div><div className="footer-message"><p className="eyebrow">UNOMORI / PLANT ARCHIVE</p><p>植物と、その時間を記録する。</p></div><div className="footer-contact"><p>CONTACT</p><a className="footer-instagram" href="https://www.instagram.com/me_happy1121/" target="_blank" rel="noreferrer" aria-label="Instagram @me_happy1121"><InstagramIcon /><span>@me_happy1121</span></a><a className="footer-email" href="mailto:komeume1121@gmail.com">komeume1121@gmail.com</a></div><nav className="footer-nav" aria-label="フッターナビゲーション"><p>EXPLORE</p><div><a href={siteHref('/journal')}>記事一覧</a><a href={siteHref('/records')}>成長記録</a><a href={siteHref('/mother-plants')}>品種</a><a href={siteHref('/care-guide')}>栽培ガイド</a><a href={siteHref('/shop')}>販売情報</a><a href={siteHref('/about')}>ABOUT</a></div></nav></div><small>© 2026 鵜ノ森</small></footer>;
}
