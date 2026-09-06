import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer, Header } from '../../components';
import { articles } from '../../data';
import { siteHref } from '../../site-url';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: '記事が見つかりません｜鵜ノ森' };
  return { title: `${article.title}｜鵜ノ森`, description: article.excerpt, openGraph: { title: article.title, description: article.excerpt, images: [{ url: article.image }] }, twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [article.image] } };
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return <main><Header />
    <article className="journal-detail"><a className="back-link" href={siteHref('/journal')}>← 記事一覧へ戻る</a><p className="article-meta"><span>{article.category}</span>{article.date}</p><h1>{article.title}</h1><p className="journal-lead">{article.excerpt}</p>{article.tags && <div className="article-tags detail-tags" aria-label="記事の分類タグ">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}<img src={article.image} alt={article.title} /><div className="journal-body"><p>{article.body}</p>{article.sourceUrl && <a className="instagram-source" href={article.sourceUrl} target="_blank" rel="noreferrer">Instagramの投稿を見る ↗</a>}</div></article>
    <Footer />
  </main>;
}
