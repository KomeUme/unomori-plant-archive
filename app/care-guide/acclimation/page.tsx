import { Footer, Header } from '../../components';
import { siteHref } from '../../site-url';
import { GuideLastUpdated } from '../last-updated';

export default function AcclimationGuidePage() {
  return <main><Header />
    <section className="page-hero"><p className="eyebrow">FIRST CARE</p><h1>購入直後の管理</h1><p>新しい環境に移した株を、光を中心に少しずつ慣らすための考え方をまとめます。</p></section>
    <section className="section guide-section page-section"><div className="guide-detail-content"><a className="back-link" href={siteHref('/care-guide#acclimation')}>← 栽培ガイドへ戻る</a><p className="eyebrow">ACCLIMATION</p><h2>環境に慣らす</h2><p>購入した株は、それまでの栽培環境や売り場に置かれていた期間が分かりません。見た目が健康でも、光量や風通しが足りない環境で過ごしたことで、すでに弱っていることがあります。</p><p>まずは光を少し抑えた場所から始め、株の反応を確認しながら段階的に本来の環境へ移します。植物にとって環境の変化は大きな負担です。魚の水合わせのように、数日から数週間かけて気長に順化させることが大切です。</p><h3>慣らす期間の目安</h3><p>通常は最低1週間。徒長が目立つ、葉色が悪いなど弱りが見える株は、2週間から1か月ほどかけてゆっくり慣らします。この短い期間に、極端な低光量でなければ目に見える徒長が急に進むことは多くありません。</p><h3>慣らさずに置くリスク</h3><p>急な強光は葉焼けを招き、重症化すると傷んだ部分から菌が入り、腐敗につながることがあります。症状が表れなくても、生育の鈍化や長期的な不調につながる場合があります。</p><h3>例外と考え方</h3><p>元の栽培環境が明確で、そこよりも弱い光・刺激の少ない場所へ移す場合は、遮光を急ぐ必要はありません。それでも、不確かな株ほど一度様子を見るほうが安全です。徒長を恐れて急に強い環境へ移すより、まずは最低1週間かけて株を慣らしてください。</p><GuideLastUpdated /></div></section>
    <Footer />
  </main>;
}
