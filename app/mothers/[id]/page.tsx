import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer, Header } from '../../components';
import {
  getCurrentAttachedOffsetCount,
  getCurrentBreedingReadyPlantCount,
  getCurrentHeldPlantCount,
  getCurrentRootedPlantCount,
  getManagedPotCount,
  getParentStockById,
  getPotSizeSummary,
  getVarietyBySlug,
  parentStocks,
  potSizes,
  type ManagedPot,
  type ParentStock,
} from '../../data';
import { siteHref } from '../../site-url';
import { ParentStockDetailImage } from './parent-stock-detail-image';

type PageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

const displayNumber = (value: number | null) => value === null ? '—' : `${value}`;

export function generateStaticParams() {
  return parentStocks.map((stock) => ({ id: stock.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const stock = getParentStockById(id);
  if (!stock) return { title: '親株が見つかりません｜鵜ノ森' };
  return { title: `${stock.id}｜親株・血統管理｜鵜ノ森`, description: `${stock.id} ${stock.lineageName}の親株・クローン年次記録。` };
}

export default async function MotherDetailPage({ params }: PageProps) {
  const { id } = await params;
  const stock = getParentStockById(id);
  if (!stock) notFound();
  const variety = getVarietyBySlug(stock.varietySlug);
  if (!variety) notFound();

  return <main><Header />
    <section className="stock-detail-top">
      <a className="back-link" href={siteHref(`/varieties/${variety.slug}`)}>← {variety.name}の親株一覧へ戻る</a>
      <div className="stock-detail-card">
        <div className="stock-detail-image">{stock.image ? <ParentStockDetailImage image={stock.image} lineageName={stock.lineageName} stockId={stock.id} /> : <span>PHOTO<br />PENDING</span>}</div>
        <div className="stock-detail-copy"><p className="eyebrow">PARENT STOCK / {variety.name}</p><strong>{stock.id}</strong><h1>{stock.lineageName}</h1><div className="stock-provenance"><p>由来：{stock.origin}</p><p>管理開始日：{stock.managementStartedOn ?? '未記録'}</p></div><p>{stock.selectionReason}</p><dl><div><dt>品種</dt><dd>{variety.name}</dd></div><div><dt>学名・系統</dt><dd>{variety.botanicalName}</dd></div><div><dt>備考</dt><dd>{stock.notes}</dd></div></dl></div>
      </div>
    </section>
    <section className="section stock-ledger-section">
      <div className="section-heading"><div><p className="eyebrow">CURRENT STOCK LEDGER</p><h2>現在の在庫内訳</h2></div><p>鉢の個数と株の数を分け、親株に付いたままの子株も発生年別に記録します。</p></div>
      <CurrentLedger stock={stock} />
    </section>
    <section className="section annual-history-section">
      <div className="section-heading"><div><p className="eyebrow">ANNUAL STOCK HISTORY</p><h2>年次履歴</h2></div><p>発生・分離・販売を別に記録し、年をまたいで親株に付く子株も追跡します。</p></div>
      <div className="annual-table-wrap"><table className="annual-history-table"><thead><tr><th>年</th><th>年初保有株</th><th>年初未分離子株</th><th>新規子株発生</th><th>分離・回収</th><th>販売</th><th>枯死</th><th>年末保有株</th><th>年末未分離子株</th></tr></thead><tbody>{stock.annualHistory.slice().sort((a, b) => b.year - a.year).map((record) => <tr key={record.year}><th>{record.year}</th><td>{displayNumber(record.openingPlantCount)}</td><td>{displayNumber(record.openingAttachedOffsetCount)}</td><td>{displayNumber(record.newOffsetCount)}</td><td>{displayNumber(record.separatedOffsetCount)}</td><td>{displayNumber(record.soldCount)}</td><td>{displayNumber(record.deaths)}</td><td>{displayNumber(record.closingPlantCount)}</td><td>{displayNumber(record.closingAttachedOffsetCount)}</td></tr>)}</tbody></table></div>
      <p className="history-footnote">※ 「分離・回収」は親株から外して別鉢へ移した数で、保有株数を減らす処理ではありません。年末保有株数は、年初保有株数＋新規子株発生－販売－枯死で確認します。</p>
    </section>
    <Footer />
  </main>;
}

function CurrentLedger({ stock }: { stock: ParentStock }) {
  const metrics = [
    ['現在保有株数', getCurrentHeldPlantCount(stock)], ['管理鉢数', getManagedPotCount(stock)], ['主株・独立株', getCurrentRootedPlantCount(stock)],
    ['未分離子株', getCurrentAttachedOffsetCount(stock)], ['繁殖可能株', getCurrentBreedingReadyPlantCount(stock)],
  ] as const;
  return <>
    <div className="current-ledger-grid">{metrics.map(([label, value]) => <div key={label}><p>{label}</p><b>{displayNumber(value)}</b></div>)}</div>
    <p className="current-ledger-note">※ 現在保有株数は、手元にある主株・独立株・未分離子株の合計です。販売済み・枯死した株は含めません。</p>
    <PotSizeSummary stock={stock} />
    <ManagedPotTable stock={stock} />
  </>;
}

function PotSizeSummary({ stock }: { stock: ParentStock }) {
  return <div className="pot-size-summary">
    <div className="pot-inventory-heading"><div><p className="eyebrow">POT SIZE OVERVIEW</p><h3>鉢サイズ別の内訳</h3></div><p>鉢サイズは 2.5・3・4・5号で記録します。</p></div>
    <div className="pot-size-summary-wrap"><table className="pot-size-summary-table"><thead><tr><th>鉢サイズ</th>{potSizes.map((potSize) => <th key={potSize}>{potSize}号</th>)}</tr></thead><tbody>
      <tr><th>管理鉢数</th>{potSizes.map((potSize) => <td key={potSize}>{displayNumber(getPotSizeSummary(stock, potSize)?.potCount ?? null)}</td>)}</tr>
      <tr><th>保有株数</th>{potSizes.map((potSize) => <td key={potSize}>{displayNumber(getPotSizeSummary(stock, potSize)?.heldPlantCount ?? null)}</td>)}</tr>
    </tbody></table></div>
  </div>;
}

function ManagedPotTable({ stock }: { stock: ParentStock }) {
  return <div className="pot-inventory">
    <div className="pot-inventory-heading"><div><p className="eyebrow">CURRENT POT INVENTORY</p><h3>現在の鉢・株群台帳</h3></div><p>各行を1鉢として管理します。未分離子株は、発生年ごとに残します。</p></div>
    {stock.currentPots === null ? <p className="pot-inventory-empty">鉢ごとの記録は未登録です。</p> : <div className="managed-pot-table-wrap"><table className="managed-pot-table"><thead><tr><th>鉢ID</th><th>鉢サイズ</th><th>未分離子株（発生年別）</th><th>鉢内株数</th><th>繁殖可能株</th><th>備考</th></tr></thead><tbody>{stock.currentPots.length ? stock.currentPots.map((pot) => <ManagedPotRow key={pot.id} pot={pot} />) : <tr><td colSpan={6}>現在管理している鉢はありません。</td></tr>}</tbody></table></div>}
  </div>;
}

function ManagedPotRow({ pot }: { pot: ManagedPot }) {
  const attachedCount = pot.attachedOffsets.reduce((total, offset) => total + offset.count, 0);
  const heldPlantCount = pot.rootedPlantCount === null ? null : pot.rootedPlantCount + attachedCount;
  const attachedOffsetLabel = pot.attachedOffsets.length
    ? pot.attachedOffsets.slice().sort((a, b) => a.year - b.year).map((offset) => `${offset.year}年：${offset.count}株`).join(' / ')
    : '0株';
  return <tr><th>{pot.id}</th><td>{pot.potSize}号</td><td>{attachedOffsetLabel}</td><td>{displayNumber(heldPlantCount)}</td><td>{displayNumber(pot.breedingReadyPlantCount)}</td><td>{pot.notes || '—'}</td></tr>;
}
