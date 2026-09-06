'use client';

import { useEffect, useSyncExternalStore } from 'react';

const googleTranslateParameters = new Set([
  '_x_tr_hl',
  '_x_tr_pto',
  '_x_tr_sl',
  '_x_tr_tl',
]);

function isTranslatedPage() {
  if (typeof window === 'undefined') return false;

  const language = new URLSearchParams(window.location.search).get('_x_tr_tl');
  return window.location.hostname.endsWith('.translate.goog') || language === 'en';
}

function sourcePageUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

  if (!configuredSiteUrl) return window.location.href;

  const configuredUrl = new URL(configuredSiteUrl);
  const basePath = configuredUrl.pathname.replace(/\/$/, '');
  const currentPath = window.location.pathname;
  const routePath = currentPath.startsWith(basePath)
    ? currentPath.slice(basePath.length) || '/'
    : currentPath;
  const searchParams = new URLSearchParams(window.location.search);

  googleTranslateParameters.forEach((parameter) => searchParams.delete(parameter));
  const search = searchParams.toString();
  const normalisedRoute = routePath.startsWith('/') ? routePath : `/${routePath}`;

  return `${configuredUrl.origin}${basePath}${normalisedRoute}${search ? `?${search}` : ''}${window.location.hash}`;
}

function isLocalAddress(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function subscribeToLanguage() {
  return () => undefined;
}

function getClientLanguage() {
  return isTranslatedPage();
}

function getServerLanguage() {
  return false;
}

/**
 * English is served through Google Translate only after a visitor asks for it.
 * This keeps the Japanese archive as the source of truth while including future
 * articles and ledger updates in the requested translation automatically.
 */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const english = useSyncExternalStore(subscribeToLanguage, getClientLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.lang = english ? 'en' : 'ja';
  }, [english]);

  function switchLanguage() {
    const japaneseUrl = sourcePageUrl();

    if (english) {
      window.location.assign(japaneseUrl);
      return;
    }

    if (isLocalAddress(window.location.hostname)) {
      window.alert('英語表示は、公開サイト上でご利用いただけます。');
      return;
    }

    const translateUrl = new URL('https://translate.google.com/translate');
    translateUrl.searchParams.set('sl', 'ja');
    translateUrl.searchParams.set('tl', 'en');
    translateUrl.searchParams.set('u', japaneseUrl);
    window.location.assign(translateUrl.toString());
  }

  return (
    <button
      className={`language-toggle ${className}`.trim()}
      type="button"
      aria-label={english ? '日本語表示に戻る' : '英語で表示する'}
      title={english ? '日本語表示に戻る' : 'English'}
      onClick={switchLanguage}
    >
      {english ? 'JP' : 'EN'}
    </button>
  );
}
