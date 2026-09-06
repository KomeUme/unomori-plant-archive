'use client';

import { useMemo, useState } from 'react';
import { Footer, Header } from '../components';
import {
  getLatestAnnualAverageBreedingReadyPlantCount,
  getLatestAnnualNewOffsetCount,
  getParentStocksByVariety,
  varieties,
  type ParentStock,
  type Variety,
} from '../data';
import { siteHref } from '../site-url';

type SortKey = 'name' | 'parentCount' | 'annualNewOffsetCount' | 'offsetsPerBreedingPlant';
type SortDirection = 'asc' | 'desc';

const displayNumber = (value: number | null) => value === null ? '—' : `${value}`;

const totalFor = (values: Array<number | null>) => {
  const numbers = values.filter((value): value is number => value !== null);
  return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) : null;
};

const varietyOffsetRate = (stocks: ParentStock[]) => {
  const newOffsets = totalFor(stocks.map(getLatestAnnualNewOffsetCount));
  const breedingPlants = totalFor(stocks.map(getLatestAnnualAverageBreedingReadyPlantCount));
  if (newOffsets === null || breedingPlants === null || breedingPlants <= 0) return null;
  return Math.round((newOffsets / breedingPlants) * 10) / 10;
};

const compareNullableNumber = (a: number | null, b: number | null, direction: SortDirection) => {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return direction === 'asc' ? a - b : b - a;
};

export default function MotherPlantsPage() {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedVarieties = useMemo(() => [...varieties].sort((a, b) => {
    const aStocks = getParentStocksByVariety(a.slug);
    const bStocks = getParentStocksByVariety(b.slug);
    if (sortKey === 'name') return sortDirection === 'asc' ? a.name.localeCompare(b.name, 'ja') : b.name.localeCompare(a.name, 'ja');
    if (sortKey === 'parentCount') return sortDirection === 'asc' ? aStocks.length - bStocks.length : bStocks.length - aStocks.length;
    const aValue = sortKey === 'annualNewOffsetCount'
      ? totalFor(aStocks.map(getLatestAnnualNewOffsetCount))
      : varietyOffsetRate(aStocks);
    const bValue = sortKey === 'annualNewOffsetCount'
      ? totalFor(bStocks.map(getLatestAnnualNewOffsetCount))
      : varietyOffsetRate(bStocks);
    return compareNullableNumber(aValue, bValue, sortDirection);
  }), [sortDirection, sortKey]);

  const chooseSort = (key: SortKey) => {
    if (key === sortKey) setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDirection(key === 'name' ? 'asc' : 'desc');
    }
  };

  const sortLabel = (key: SortKey) => sortKey !== key ? '' : sortDirection === 'asc' ? ' ↑' : ' ↓';

  return <main><Header />
    <section className="page-hero dark-page-hero pedigree-page-hero"><p className="eyebrow">VARIETIES / PEDIGREE</p><h1>品種一覧</h1><p>品種を開くと、親株・血統ごとのクローン推移と年次履歴を確認できます。</p></section>
    <section className="section variety-index-section">
      <div className="section-heading"><div><p className="eyebrow">VARIETY INDEX</p><h2>親株・血統をたどる</h2></div><p>親株数と繁殖記録を品種単位で整理します。数値未登録の項目は「—」で表示されます。</p></div>
      <div className="sort-bar" aria-label="品種一覧の並び替え"><p>表示順</p><div>{([['name', '品種名'], ['parentCount', '親株数'], ['annualNewOffsetCount', '年間子株発生数'], ['offsetsPerBreedingPlant', '1株あたり発生数']] as const).map(([key, label]) => <button type="button" key={key} className={sortKey === key ? 'is-active' : ''} onClick={() => chooseSort(key)}>{label}{sortLabel(key)}</button>)}</div></div>
      <div className="variety-index-list">{sortedVarieties.map((variety) => <VarietyRow key={variety.slug} variety={variety} />)}</div>
    </section>
    <Footer />
  </main>;
}

function VarietyRow({ variety }: { variety: Variety }) {
  const stocks = getParentStocksByVariety(variety.slug);
  const newOffsets = totalFor(stocks.map(getLatestAnnualNewOffsetCount));
  const perStock = varietyOffsetRate(stocks);
  return <a className="variety-index-row" href={siteHref(`/varieties/${variety.slug}`)}>
    <div className="variety-index-image">{variety.image ? <img src={siteHref(variety.image)} alt={`${variety.name}の親株`} /> : <span>{variety.type}</span>}</div>
    <div className="variety-index-name"><p>{variety.type}</p><h3>{variety.name}</h3><span>{variety.botanicalName}</span></div>
    <p className="variety-index-description">{variety.description}</p>
    <dl className="variety-index-metrics"><div><dt>親株数</dt><dd>{stocks.length}</dd></div><div><dt>年間子株発生</dt><dd>{displayNumber(newOffsets)}</dd></div><div><dt>1株あたり</dt><dd>{displayNumber(perStock)}</dd></div></dl>
    <b aria-hidden="true">→</b>
  </a>;
}
