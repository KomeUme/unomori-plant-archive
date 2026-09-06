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

type SortKey = 'id' | 'currentHeldPlantCount' | 'managedPotCount' | 'breedingReadyPlantCount' | 'annualNewOffsetCount' | 'annualSoldCount' | 'offsetsPerBreedingPlant';
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
  if (key === 'managedPotCount') return getManagedPotCount(stock);
  if (key === 'breedingReadyPlantCount') return getCurrentBreedingReadyPlantCount(stock);
  if (key === 'annualNewOffsetCount') return getLatestAnnualNewOffsetCount(stock);
  if (key === 'annualSoldCount') return getLatestAnnualSoldCount(stock);
  return getOffsetsPerBreedingPlant(stock);
};

type ParentStockGroup = {
  primary: string;
  prefix: string;
  stocks: ParentStock[];
};

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

    return [...groupMap.values()]
      .sort((a, b) => {
        const aPriority = a.primary === 'U' ? 0 : 1;
        const bPriority = b.primary === 'U' ? 0 : 1;
        return aPriority - bPriority || a.primary.localeCompare(b.primary) || a.prefix.localeCompare(b.prefix);
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

  const label = (key: SortKey, text: string) => `${text}${sortKey === key ? direction === 'asc' ? ' ↑' : ' ↓' : ''}`;

  return <div className="pedigree-table-wrap">
    <table className="pedigree-table">
      <thead><tr>
        <th><button type="button" onClick={() => changeSort('id')}>{label('id', '親株ID')}</button></th>
        <th>血統名・由来</th><th>親株写真</th><th>特徴・選抜理由</th>
        <th><button type="button" onClick={() => changeSort('currentHeldPlantCount')}>{label('currentHeldPlantCount', '現在保有株数')}</button></th>
        <th><button type="button" onClick={() => changeSort('managedPotCount')}>{label('managedPotCount', '管理鉢数')}</button></th>
        <th>主株・独立株</th><th>未分離子株</th>
        <th><button type="button" onClick={() => changeSort('breedingReadyPlantCount')}>{label('breedingReadyPlantCount', '繁殖可能株')}</button></th>
        <th><button type="button" onClick={() => changeSort('annualNewOffsetCount')}>{label('annualNewOffsetCount', '最新年の子株発生')}</button></th>
        <th><button type="button" onClick={() => changeSort('annualSoldCount')}>{label('annualSoldCount', '最新年の販売')}</button></th>
        <th><button type="button" onClick={() => changeSort('offsetsPerBreedingPlant')}>{label('offsetsPerBreedingPlant', '1株あたり年間子株')}</button></th>
        <th>備考</th>
      </tr></thead>
      <tbody>{groupedStocks.map((group) => <Fragment key={`${group.primary}-${group.prefix}`}>
        <tr className="management-group-row"><th colSpan={13} scope="rowgroup"><span>{group.primary}系</span><b>管理記号 {group.prefix}</b><em>{group.stocks.length}株</em></th></tr>
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
  </div>;
}
