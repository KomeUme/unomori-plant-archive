import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function WateringGuidePage() {
  return <main><Header />
    <section className="page-hero watering-page-hero"><p className="eyebrow">WATERING</p><h1>水やりの方法</h1><p>鉢上からたっぷり与える方法や底面給水など、株の状態と目的に合わせた水やりをまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide')}>← 栽培ガイドへ戻る</a><p className="eyebrow">WATERING BASICS</p><h2>鉢底から流れるまで、たっぷりと</h2><p>水やりの基本は、株の頭側から鉢の土へたっぷり水をかけ、鉢底の穴から水がしっかり流れ出るまで与えることです。少量ではなく、鉢全体に水が通る量を意識します。</p><h3>水を流す意味</h3><p>根は栄養を吸うだけでなく、呼吸や分泌物も出しています。たっぷり水を流すことで、用土に溜まった不要な分泌物や肥料、水道水由来の可溶性塩類を流し、排水後には新しい空気が入る余地を作れます。根を健全な状態に保つための水やりです。</p><h3>シャワーのように与える</h3><p>少量の水やりは、人の肌を少し濡らすだけで体をきれいに洗えない状態に似ています。人がシャワーを浴びるように、鉢の中まで水を通すつもりでたっぷり与えてください。</p><h3>株を濡らしたくないとき</h3><p>植物の地上部に水がかかっても問題ないことが多いですが、綿毛や肌の質感が重要な品種は、株元の土へ直接水を注ぎます。株をできるだけ濡らさず、鉢底の穴からたっぷり水が溢れるまで注ぎます。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
