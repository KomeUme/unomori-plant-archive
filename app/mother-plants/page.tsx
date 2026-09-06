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
    <section className="page-hero dark-page-hero pedigree-page-hero"><p className="eyebrow">VARIETIES / PEDIGREE</p><h1>親株・血統をたどる</h1></section>
    <section className="section variety-index-section" aria-label="品種一覧">
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
