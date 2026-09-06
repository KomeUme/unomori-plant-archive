import { Footer, Header } from '../components';
import { getParentStocksByVariety, varieties, type Variety } from '../data';
import { siteHref } from '../site-url';

export default function MotherPlantsPage() {
  const sortedVarieties = [...varieties].sort((a, b) => {
    const aStocks = getParentStocksByVariety(a.slug);
    const bStocks = getParentStocksByVariety(b.slug);
    return bStocks.length - aStocks.length || a.name.localeCompare(b.name, 'ja');
  });

  return <main><Header />
    <section className="page-hero dark-page-hero pedigree-page-hero"><p className="eyebrow">VARIETIES / PEDIGREE</p><h1>品種一覧</h1><p>品種を開くと、親株・血統ごとのクローン推移と年次履歴を確認できます。</p></section>
    <section className="section variety-index-section">
      <div className="section-heading"><div><p className="eyebrow">VARIETY INDEX</p><h2>親株・血統をたどる</h2></div><p>親株数が多い品種から表示します。</p></div>
      <div className="variety-index-list">{sortedVarieties.map((variety) => <VarietyRow key={variety.slug} variety={variety} />)}</div>
    </section>
    <Footer />
  </main>;
}

function VarietyRow({ variety }: { variety: Variety }) {
  const stocks = getParentStocksByVariety(variety.slug);
  return <a className="variety-index-row" href={siteHref(`/varieties/${variety.slug}`)}>
    <div className="variety-index-image">{variety.image ? <img src={siteHref(variety.image)} alt={`${variety.name}の親株`} /> : <span>{variety.type}</span>}</div>
    <div className="variety-index-name"><p>{variety.type}</p><h3>{variety.name}</h3><span>{variety.botanicalName}</span></div>
    <p className="variety-index-description">{variety.description}</p>
    <dl className="variety-index-metrics"><div><dt>親株数</dt><dd>{stocks.length}</dd></div></dl>
    <b aria-hidden="true">→</b>
  </a>;
}
