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
  return { title: `${variety.name}｜親株管理｜鵜ノ森`, description: `${variety.name}の親株管理とクローン推移の記録。` };
}

export default async function VarietyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const variety = getVarietyBySlug(slug);
  if (!variety) notFound();
  const stocks = getParentStocksByVariety(slug);

  return <main><Header />
    <section className="variety-detail-hero">
      <div className="variety-detail-hero-content">
        <p className="eyebrow">VARIETY / PARENT STOCKS</p>
        <h1>親株一覧</h1>
        <div className="variety-ledger-intro">
          <div className="variety-ledger-heading"><h2>{variety.name}</h2></div>
          <p className="variety-botanical">{variety.botanicalName}</p>
          <span className="variety-parent-stock-count">親株ID {stocks.length}件</span>
          <p>管理番号で親株を一覧化しています。括弧内の記号は補助情報として扱い、並び順には反映しません。</p>
        </div>
        <a className="variety-detail-back-link" href={siteHref('/mother-plants')}><span aria-hidden="true">←</span> 品種一覧へ戻る</a>
      </div>
    </section>
    <section className="section pedigree-section">
      {stocks.length ? <ParentStockTable stocks={stocks} showFoliageFilter={variety.slug === 'agave-victoriae-reginae'} /> : <div className="pedigree-empty"><p>親株データは準備中です。</p></div>}
    </section>
    <Footer />
  </main>;
}
