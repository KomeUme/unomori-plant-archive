'use client';

import { useSyncExternalStore } from 'react';
import { getParentStockById } from '../../data';
import { siteHref } from '../../site-url';

const subscribeToLocation = () => () => {};
const getParentStockIdFromLocation = () => new URLSearchParams(window.location.search).get('parent') ?? '';
const getServerParentStockId = () => '';

export function JournalDetailBackLink() {
  const parentIdFromLocation = useSyncExternalStore(subscribeToLocation, getParentStockIdFromLocation, getServerParentStockId);
  const parentStockId = getParentStockById(parentIdFromLocation)?.id ?? null;

  const hasParentStock = parentStockId !== null;
  return <a className="back-link" href={siteHref(hasParentStock ? `/mothers/${parentStockId}` : '/journal')}>
    {hasParentStock ? `← ${parentStockId} の親株詳細に戻る` : '← 記事一覧へ戻る'}
  </a>;
}
