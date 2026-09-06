import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer, Header } from '../../components';
import { plants } from '../../data';
import { siteHref } from '../../site-url';

type PageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return plants.map((plant) => ({ id: plant.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const plant = plants.find((item) => item.id === id);
  if (!plant) return { title: '記録が見つかりません｜鵜ノ森' };
  return {
    title: `${plant.id}｜${plant.name}｜鵜ノ森`,
    description: `${plant.name}（${plant.id}）の成長記録。${plant.note}`,
    openGraph: { title: `${plant.id}｜${plant.name}`, description: plant.note, images: [{ url: plant.image }] },
    twitter: { card: 'summary_large_image', title: `${plant.id}｜${plant.name}`, description: plant.note, images: [plant.image] },
  };
}

export default async function PlantDetailPage({ params }: PageProps) {
  const { id } = await params;
  const plant = plants.find((item) => item.id === id);
  if (!plant) notFound();
  return <main><Header />
    <section className="plant-detail"><a className="back-link" href={siteHref('/records')}>← 成長記録一覧へ戻る</a><div className="detail-top"><img src={plant.image} alt={`${plant.name} ${plant.id}`} /><div><p className="eyebrow">PLANT RECORD</p><strong className="detail-id">{plant.id}</strong><h1>{plant.name}</h1><p className="detail-note">{plant.note}</p><dl><div><dt>分類</dt><dd>{plant.family}</dd></div><div><dt>親株</dt><dd>{plant.mother}</dd></div><div><dt>記録開始</dt><dd>{plant.started}</dd></div><div><dt>現在の状態</dt><dd>{plant.status}</dd></div></dl></div></div></section>
    <section className="section timeline-section"><div className="section-heading"><div><p className="eyebrow">GROWTH TIMELINE</p><h2>成長タイムライン</h2></div><p>育成時の観察と管理内容を、更新日順に記録しています。</p></div><div className="timeline">{plant.timeline.map((event, index) => <article key={event.date}><div className="timeline-marker"><span>{index + 1}</span></div><time>{event.date}</time><div><h3>{event.title}</h3><p>{event.detail}</p></div></article>)}</div></section>
    <Footer />
  </main>;
}
