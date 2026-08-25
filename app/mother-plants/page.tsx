import { Footer, Header } from '../components';
import { mothers } from '../data';

export default function MotherPlantsPage() {
  return <main><Header />
    <section className="page-hero dark-page-hero"><p className="eyebrow">MOTHER PLANTS</p><h1>親株の管理情報</h1><p>形質を次世代へ繋ぐため、由来と特徴を記録しています。</p></section>
    <section className="section mother-section page-section"><div className="table-wrap"><table><thead><tr><th>管理番号</th><th>品種・系統</th><th>分類</th><th>特徴</th><th>由来</th><th>子株記録</th></tr></thead><tbody>{mothers.map((mother) => <tr key={mother.id}><td><b>{mother.id}</b></td><td>{mother.name}</td><td><span className="type-pill">{mother.type}</span></td><td>{mother.feature}</td><td>{mother.origin}</td><td><a href="/records">{mother.descendants}株 →</a></td></tr>)}</tbody></table></div></section>
    <Footer />
  </main>;
}
