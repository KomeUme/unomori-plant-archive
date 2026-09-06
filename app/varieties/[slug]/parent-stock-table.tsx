'use client';

import { Fragment, useMemo, useState } from 'react';
import {
  getCurrentAttachedOffsetCount,
  getCurrentBreedingReadyPlantCount,
  getCurrentHeldPlantCount,
  getCurrentRootedPlantCount,
  getLatestAnnualNewOffsetCount,
  getLatestAnnualSoldCount,
  getManagedPotCount,
  getManagementNumberGroup,
  getOffsetsPerBreedingPlant,
  type ParentStock,
} from '../../data';
import { siteHref } from '../../site-url';

type SortKey = 'id' | 'currentHeldPlantCount' | 'breedingReadyPlantCount' | 'offsetsPerBreedingPlant';
type SortDirection = 'asc' | 'desc';

const numberOrDash = (value: number | null) => value === null ? '—' : value;

const compare = (a: number | null, b: number | null, direction: SortDirection) => {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return direction === 'asc' ? a - b : b - a;
};

const valueForSort = (stock: ParentStock, key: Exclude<SortKey, 'id'>) => {
  if (key === 'currentHeldPlantCount') return getCurrentHeldPlantCount(stock);
  if (key === 'breedingReadyPlantCount') return getCurrentBreedingReadyPlantCount(stock);
  return getOffsetsPerBreedingPlant(stock);
};

type ParentStockGroup = {
  primary: string | null;
  prefix: string | null;
  stocks: ParentStock[];
};

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: 'id', label: '管理番号順' },
  { key: 'currentHeldPlantCount', label: '保有株数順' },
  { key: 'breedingReadyPlantCount', label: '繁殖可能株順' },
  { key: 'offsetsPerBreedingPlant', label: '1株あたり年間子株順' },
];

export function ParentStockTable({ stocks }: { stocks: ParentStock[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [direction, setDirection] = useState<SortDirection>('asc');

  const groupedStocks = useMemo(() => {
    const groupMap = new Map<string, ParentStockGroup>();
    stocks.forEach((stock) => {
      const { primary, prefix } = getManagementNumberGroup(stock.id);
      const key = `${primary}-${prefix}`;
      const group = groupMap.get(key) ?? { primary, prefix, stocks: [] };
      group.stocks.push(stock);
      groupMap.set(key, group);
    });

    const orderStocks = (a: ParentStock, b: ParentStock) => {
      if (sortKey === 'id') return direction === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      const result = compare(valueForSort(a, sortKey), valueForSort(b, sortKey), direction);
      return result || a.id.localeCompare(b.id);
    };

    if (sortKey !== 'id') return [{ primary: null, prefix: null, stocks: [...stocks].sort(orderStocks) }];

    return [...groupMap.values()]
      .sort((a, b) => {
        const aPriority = a.primary === 'U' ? 0 : 1;
        const bPriority = b.primary === 'U' ? 0 : 1;
        return aPriority - bPriority || (a.primary ?? '').localeCompare(b.primary ?? '') || (a.prefix ?? '').localeCompare(b.prefix ?? '');
      })
      .map((group) => ({ ...group, stocks: group.stocks.sort(orderStocks) }));
  }, [direction, sortKey, stocks]);

  const changeSort = (key: SortKey) => {
    if (sortKey === key) setDirection((value) => value === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setDirection(key === 'id' ? 'asc' : 'desc');
    }
  };

  const buttonLabel = (key: SortKey, text: string) => `${text}${sortKey === key ? direction === 'asc' ? ' ↑' : ' ↓' : ''}`;

  return <>
    <div className="sort-bar parent-stock-sort-bar" aria-label="親株一覧の並び替え"><p>表示順</p><div>{sortOptions.map(({ key, label }) => <button type="button" key={key} className={sortKey === key ? 'is-active' : ''} aria-pressed={sortKey === key} onClick={() => changeSort(key)}>{buttonLabel(key, label)}</button>)}</div></div>
    <div className="pedigree-table-wrap">
      <table className="pedigree-table">
      <thead><tr>
        <th>親株ID</th>
        <th>血統名・由来</th><th>親株写真</th><th>特徴・選抜理由</th>
        <th>現在保有株数</th>
        <th>管理鉢数</th>
        <th>主株・独立株</th><th>未分離子株</th>
        <th>繁殖可能株</th>
        <th>最新年の子株発生</th>
        <th>最新年の販売</th>
        <th>1株あたり年間子株</th>
        <th>備考</th>
      </tr></thead>
      <tbody>{groupedStocks.map((group) => <Fragment key={`${group.primary}-${group.prefix}`}>
        {group.primary && group.prefix ? <tr className="management-group-row"><th colSpan={13} scope="rowgroup"><span>{group.primary}系</span><b>管理記号 {group.prefix}</b><em>{group.stocks.length}株</em></th></tr> : null}
        {group.stocks.map((stock) => <tr key={stock.id}>
          <td><a className="stock-id-link" href={siteHref(`/mothers/${stock.id}`)}><span>{stock.id}</span><b>詳細を見る →</b></a></td>
          <td><strong>{stock.lineageName}</strong><span className="cell-subtext">{stock.origin}</span></td>
          <td>{stock.image ? <a className="stock-table-image" href={siteHref(`/mothers/${stock.id}`)} aria-label={`${stock.id}の詳細を開く`}><img src={siteHref(stock.image)} alt={`${stock.id} 親株写真`} /></a> : <span className="image-pending">未登録</span>}</td>
          <td className="selection-cell">{stock.selectionReason}</td>
          <td>{numberOrDash(getCurrentHeldPlantCount(stock))}</td><td>{numberOrDash(getManagedPotCount(stock))}</td><td>{numberOrDash(getCurrentRootedPlantCount(stock))}</td><td>{numberOrDash(getCurrentAttachedOffsetCount(stock))}</td>
          <td>{numberOrDash(getCurrentBreedingReadyPlantCount(stock))}</td><td>{numberOrDash(getLatestAnnualNewOffsetCount(stock))}</td><td>{numberOrDash(getLatestAnnualSoldCount(stock))}</td><td>{numberOrDash(getOffsetsPerBreedingPlant(stock))}</td>
          <td className="notes-cell">{stock.notes}</td>
        </tr>)}
      </Fragment>)}</tbody>
      </table>
    </div>
  </>;
}
