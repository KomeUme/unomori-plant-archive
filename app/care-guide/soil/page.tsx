import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function SoilGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">SOIL</p><h1>用土の作り方</h1><p>無機質用土をベースに、長く使えて再現しやすい配合を紹介します。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">BASIC RECIPE</p><h2>長く使える無機質用土</h2><p>ここでは、主に多肉植物の管理に使う無機質用土を紹介します。シンプルで再現性が高く、幅広い植物に使いやすいことを目標にした配合です。</p><p>根鉢を崩さずに植え替えることも多いため、土が劣化しにくく、長く使えることも大切にしています。すべて小粒で、崩れにくい硬質の用土を選びます。</p><div className="soil-recipe"><p>配合比　6 : 2 : 2 : 1 : 0.5</p><table><thead><tr><th scope="col">用土</th><th scope="col">割合</th></tr></thead><tbody><tr><th scope="row">硬質赤玉土（小粒）</th><td>6</td></tr><tr><th scope="row">硬質鹿沼土（小粒）</th><td>2</td></tr><tr><th scope="row">日向土（小粒）</th><td>2</td></tr><tr><th scope="row">ゼオライト</th><td>1</td></tr><tr><th scope="row">もみ殻くん炭</th><td>0.5</td></tr></tbody></table></div><h3>混ぜ込むもの</h3><p>元肥としてマグァンプK、害虫予防としてオルトランを混ぜ込みます。使用量は、各製品の表示に従って調整してください。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
