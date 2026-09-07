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
      <div className="variety-detail-hero-content">
        <p className="eyebrow">VARIETY / PEDIGREE</p>
        <h1>{variety.name}</h1>
        <p className="variety-botanical">{variety.botanicalName}</p>
        <div className="variety-ledger-intro">
          <p className="eyebrow">PARENT STOCK / CLONE LEDGER</p>
          <h2>親株・血統一覧</h2>
          <p>管理番号は先頭のアルファベットを大分類、続く文字を小分類としてまとめています。各区分内では、列見出しを押して並び替えできます。</p>
        </div>
        <div className="variety-detail-hero-meta">
          <div className="variety-detail-hero-metric"><span>親株数</span><b>{stocks.length}</b></div>
          <a className="variety-detail-back-link" href={siteHref('/mother-plants')}><span aria-hidden="true">←</span> 品種一覧へ戻る</a>
        </div>
      </div>
    </section>
    <section className="section pedigree-section">
      <div className="pedigree-notice"><span>記録の考え方</span><p>「管理鉢数」と「現在保有株数」は別に記録します。現在保有株数には、親株・独立株に加え、同じ鉢に付いた未分離子株も含まれます。鉢ごとの内訳と子株の発生年は、各親株の詳細で確認できます。</p></div>
      {stocks.length ? <ParentStockTable stocks={stocks} /> : <div className="pedigree-empty"><p>親株データは準備中です。</p></div>}
    </section>
    <Footer />
  </main>;
}
