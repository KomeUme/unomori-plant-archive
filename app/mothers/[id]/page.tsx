import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer, Header } from '../../components';
import { getParentStockById, getVarietyBySlug, parentStocks, type ParentStock } from '../../data';
import { siteHref } from '../../site-url';

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
        <div className="stock-detail-image">{stock.image ? <img src={siteHref(stock.image)} alt={`${stock.id} ${stock.lineageName}`} /> : <span>PHOTO<br />PENDING</span>}</div>
        <div className="stock-detail-copy"><p className="eyebrow">PARENT STOCK / {variety.name}</p><strong>{stock.id}</strong><h1>{stock.lineageName}</h1><p className="stock-origin">由来：{stock.origin}</p><p>{stock.selectionReason}</p><dl><div><dt>品種</dt><dd>{variety.name}</dd></div><div><dt>学名・系統</dt><dd>{variety.botanicalName}</dd></div><div><dt>備考</dt><dd>{stock.notes}</dd></div></dl></div>
      </div>
    </section>
    <section className="section stock-ledger-section">
      <div className="section-heading"><div><p className="eyebrow">CURRENT CLONE LEDGER</p><h2>現在の管理値</h2></div><p>このページでは、親株から発生した子株の状態と年間の出入りを一株ごとに記録します。</p></div>
      <CurrentLedger stock={stock} />
    </section>
    <section className="section annual-history-section">
      <div className="section-heading"><div><p className="eyebrow">ANNUAL CLONE HISTORY</p><h2>年次履歴</h2></div><p>発生数と回収数を別欄で記録することで、親株に残置した子株も翌年まで追跡できます。</p></div>
      <div className="annual-table-wrap"><table className="annual-history-table"><thead><tr><th>年</th><th>年初クローン数</th><th>新規子株発生数</th><th>回収数</th><th>年末残置数</th><th>枯死数</th><th>販売数</th><th>年末クローン数</th></tr></thead><tbody>{stock.annualHistory.slice().sort((a, b) => b.year - a.year).map((record) => <tr key={record.year}><th>{record.year}</th><td>{displayNumber(record.openingCloneCount)}</td><td>{displayNumber(record.newOffsetCount)}</td><td>{displayNumber(record.recoveredCount)}</td><td>{displayNumber(record.retainedOffsetCount)}</td><td>{displayNumber(record.deaths)}</td><td>{displayNumber(record.soldCount)}</td><td>{displayNumber(record.closingCloneCount)}</td></tr>)}</tbody></table></div>
      <p className="history-footnote">※ 「新規子株発生数」はその年に確認した子株数、「回収数」は株分けして親株から外した数です。小さな子株は年末残置数として翌年の回収記録につなげます。</p>
    </section>
    <Footer />
  </main>;
}

function CurrentLedger({ stock }: { stock: ParentStock }) {
  const metrics = [
    ['現クローン総数', stock.currentCloneTotal], ['大サイズ', stock.cloneSizes.large], ['中サイズ', stock.cloneSizes.medium], ['小サイズ', stock.cloneSizes.small],
    ['年間新規子株発生数', stock.annualNewOffsetCount], ['年間回収数', stock.annualRecoveredCount], ['年末時点の残置子株数', stock.yearEndRetainedOffsetCount], ['枯死数', stock.annualDeaths],
    ['販売数', stock.annualSoldCount], ['繁殖可能サイズの株数', stock.breedingReadyCount], ['1繁殖可能株あたり年間子株発生数', stock.offsetsPerBreedingPlant],
  ] as const;
  return <div className="current-ledger-grid">{metrics.map(([label, value]) => <div key={label}><p>{label}</p><b>{displayNumber(value)}</b></div>)}</div>;
}
