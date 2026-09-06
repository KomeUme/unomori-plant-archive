'use client';

import { Fragment, useMemo, useState } from 'react';
import { getManagementNumberGroup, type ParentStock } from '../../data';
import { siteHref } from '../../site-url';

type SortKey = 'id' | 'currentCloneTotal' | 'annualNewOffsetCount' | 'offsetsPerBreedingPlant';
type SortDirection = 'asc' | 'desc';

const numberOrDash = (value: number | null) => value === null ? '—' : value;

const compare = (a: number | null, b: number | null, direction: SortDirection) => {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return direction === 'asc' ? a - b : b - a;
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
      const result = compare(a[sortKey], b[sortKey], direction);
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
        <th><button type="button" onClick={() => changeSort('currentCloneTotal')}>{label('currentCloneTotal', '現クローン総数')}</button></th>
        <th>大</th><th>中</th><th>小</th>
        <th><button type="button" onClick={() => changeSort('annualNewOffsetCount')}>{label('annualNewOffsetCount', '年間新規子株')}</button></th>
        <th>年間回収</th><th>年末残置</th><th>枯死</th><th>販売</th><th>繁殖可能株</th>
        <th><button type="button" onClick={() => changeSort('offsetsPerBreedingPlant')}>{label('offsetsPerBreedingPlant', '1株あたり年間子株')}</button></th>
        <th>備考</th>
      </tr></thead>
      <tbody>{groupedStocks.map((group) => <Fragment key={`${group.primary}-${group.prefix}`}>
        <tr className="management-group-row"><th colSpan={16} scope="rowgroup"><span>{group.primary}系</span><b>管理記号 {group.prefix}</b><em>{group.stocks.length}株</em></th></tr>
        {group.stocks.map((stock) => <tr key={stock.id}>
          <td><a className="stock-id-link" href={siteHref(`/mothers/${stock.id}`)}><span>{stock.id}</span><b>詳細を見る →</b></a></td>
          <td><strong>{stock.lineageName}</strong><span className="cell-subtext">{stock.origin}</span></td>
          <td>{stock.image ? <a className="stock-table-image" href={siteHref(`/mothers/${stock.id}`)} aria-label={`${stock.id}の詳細を開く`}><img src={siteHref(stock.image)} alt={`${stock.id} 親株写真`} /></a> : <span className="image-pending">未登録</span>}</td>
          <td className="selection-cell">{stock.selectionReason}</td>
          <td>{numberOrDash(stock.currentCloneTotal)}</td><td>{numberOrDash(stock.cloneSizes.large)}</td><td>{numberOrDash(stock.cloneSizes.medium)}</td><td>{numberOrDash(stock.cloneSizes.small)}</td>
          <td>{numberOrDash(stock.annualNewOffsetCount)}</td><td>{numberOrDash(stock.annualRecoveredCount)}</td><td>{numberOrDash(stock.yearEndRetainedOffsetCount)}</td><td>{numberOrDash(stock.annualDeaths)}</td><td>{numberOrDash(stock.annualSoldCount)}</td><td>{numberOrDash(stock.breedingReadyCount)}</td><td>{numberOrDash(stock.offsetsPerBreedingPlant)}</td>
          <td className="notes-cell">{stock.notes}</td>
        </tr>)}
      </Fragment>)}</tbody>
    </table>
  </div>;
}
