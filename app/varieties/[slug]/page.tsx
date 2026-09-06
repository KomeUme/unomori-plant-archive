import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer, Header } from '../../components';
import { getParentStocksByVariety, getVarietyBySlug, varieties } from '../../data';
import { siteHref } from '../../site-url';
import { ParentStockTable } from './parent-stock-table';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return varieties.map((variety) => ({ slug: variety.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const variety = getVarietyBySlug(slug);
  if (!variety) return { title: '品種が見つかりません｜鵜ノ森' };
  return { title: `${variety.name}｜親株・血統管理｜鵜ノ森`, description: `${variety.name}の親株・血統とクローン推移の記録。` };
}

export default async function VarietyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const variety = getVarietyBySlug(slug);
  if (!variety) notFound();
  const stocks = getParentStocksByVariety(slug);

  return <main><Header />
    <section className="variety-detail-hero">
      <div><p className="eyebrow">VARIETY / PEDIGREE</p><h1>{variety.name}</h1><p className="variety-botanical">{variety.botanicalName}</p><p className="variety-description">{variety.description}</p></div>
      <div className="variety-detail-hero-metric"><span>REGISTERED PARENTS</span><b>{stocks.length}</b><p>親株・血統の記録</p></div>
    </section>
    <section className="section pedigree-section">
      <a className="pedigree-back-link" href={siteHref('/mother-plants')}><span aria-hidden="true">←</span> 品種一覧へ戻る</a>
      <div className="section-heading"><div><p className="eyebrow">PARENT STOCK / CLONE LEDGER</p><h2>親株・血統一覧</h2></div><p>管理番号は先頭のアルファベットを大分類、続く文字を小分類としてまとめています。各区分内では、列見出しを押して並び替えできます。</p></div>
      <div className="pedigree-notice"><span>記録の考え方</span><p>子株は「発生した年」と「回収した年」を別に記録します。小さくて親株に残す子株は、年末残置として翌年の回収へつなげます。</p></div>
      {stocks.length ? <ParentStockTable stocks={stocks} /> : <div className="pedigree-empty"><p>親株データは準備中です。</p></div>}
    </section>
    <Footer />
  </main>;
}
