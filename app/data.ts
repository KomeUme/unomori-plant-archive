import { instagramArticles } from './instagram-articles';

export type Plant = {
  id: string;
  name: string;
  family: string;
  status: string;
  mother: string;
  image: string;
  started: string;
  note: string;
  timeline: { date: string; title: string; detail: string }[];
};

export const plants: Plant[] = [
  {
    id: 'HG-24-017', name: 'Agave titanota “White Ice”', family: 'アガベ', status: '育成中', mother: 'M-AG-003',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85', started: '2024.03.18', note: '鋸歯の展開が安定。現在は締めて育成中。',
    timeline: [
      { date: '2026.08.12', title: '夏季の展開記録', detail: '新葉2枚を確認。葉幅が増し、鋸歯の白さも安定しています。' },
      { date: '2026.05.04', title: '植え替え', detail: '根張り良好。硬質赤玉主体の用土へ更新しました。' },
      { date: '2025.11.20', title: '冬季管理へ', detail: '灌水間隔を調整し、育成ライト下へ移動しました。' },
    ],
  },
  {
    id: 'HG-25-042', name: 'Platycerium “Jade Girl”', family: 'ビカクシダ', status: '育成中', mother: 'M-PL-008',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85', started: '2025.06.02', note: '胞子葉の分岐が増加。次回は秋口に板替え予定。',
    timeline: [
      { date: '2026.08.03', title: '胞子葉の成長', detail: '分岐が明瞭になり、葉色も良好です。葉水は朝に限定。' },
      { date: '2026.04.16', title: '貯水葉を確認', detail: '新しい貯水葉が展開。施肥濃度を通常の半分へ調整しました。' },
      { date: '2025.10.09', title: '板付け', detail: '通気を優先した薄めの水苔でコルク板へ固定しました。' },
    ],
  },
  {
    id: 'HG-25-106', name: 'Anthurium crystallinum', family: 'アンスリウム', status: '養生中', mother: 'M-AN-002',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85', started: '2025.10.27', note: '新葉硬化待ち。湿度を保ちつつ風を確保。',
    timeline: [
      { date: '2026.07.28', title: '新葉の硬化開始', detail: '葉脈のコントラストが強くなり、葉幅は前回比約1.2倍です。' },
      { date: '2026.02.10', title: '発根確認', detail: '透明ポット越しに新根を確認。通常管理へ段階移行しました。' },
      { date: '2025.11.03', title: '導入・養生', detail: '根を確認後、水苔と軽石の混合用土へ植え付けました。' },
    ],
  },
];

export type CloneSizeCounts = {
  large: number | null;
  medium: number | null;
  small: number | null;
};

export type AnnualCloneRecord = {
  year: number;
  openingCloneCount: number | null;
  newOffsetCount: number | null;
  recoveredCount: number | null;
  retainedOffsetCount: number | null;
  deaths: number | null;
  soldCount: number | null;
  closingCloneCount: number | null;
};

export type ParentStock = {
  id: string;
  varietySlug: string;
  lineageName: string;
  origin: string;
  image?: string;
  selectionReason: string;
  currentCloneTotal: number | null;
  cloneSizes: CloneSizeCounts;
  annualNewOffsetCount: number | null;
  annualRecoveredCount: number | null;
  yearEndRetainedOffsetCount: number | null;
  annualDeaths: number | null;
  annualSoldCount: number | null;
  breedingReadyCount: number | null;
  offsetsPerBreedingPlant: number | null;
  notes: string;
  annualHistory: AnnualCloneRecord[];
};

export type Variety = {
  slug: string;
  name: string;
  botanicalName: string;
  type: string;
  description: string;
  image?: string;
};

export const varieties: Variety[] = [
  {
    slug: 'agave-victoriae-reginae',
    name: '笹の雪',
    botanicalName: 'Agave victoriae-reginae',
    type: 'アガベ',
    description: '白い葉模様と株姿の違いを中心に、親株ごとの血統・クローン推移を記録します。',
    image: '/hero-unomori.jpg',
  },
  {
    slug: 'kaio-maru',
    name: '海王丸',
    botanicalName: '学名確認中',
    type: 'サボテン',
    description: '親株の由来と選抜理由、クローンの推移をこれから整理していきます。',
  },
  {
    slug: 'oukan-ryu',
    name: '王冠竜',
    botanicalName: '学名確認中',
    type: 'サボテン',
    description: '親株の由来と選抜理由、クローンの推移をこれから整理していきます。',
  },
];

const blankAnnualHistory = (): AnnualCloneRecord[] => [
  { year: 2024, openingCloneCount: null, newOffsetCount: null, recoveredCount: null, retainedOffsetCount: null, deaths: null, soldCount: null, closingCloneCount: null },
  { year: 2025, openingCloneCount: null, newOffsetCount: null, recoveredCount: null, retainedOffsetCount: null, deaths: null, soldCount: null, closingCloneCount: null },
  { year: 2026, openingCloneCount: null, newOffsetCount: null, recoveredCount: null, retainedOffsetCount: null, deaths: null, soldCount: null, closingCloneCount: null },
];

const createSasanoyukiParentStock = (id: string): ParentStock => ({
  id,
  varietySlug: 'agave-victoriae-reginae',
  lineageName: '血統情報未登録',
  origin: '由来未登録',
  selectionReason: '特徴・選抜理由を記録予定です。',
  currentCloneTotal: null,
  cloneSizes: { large: null, medium: null, small: null },
  annualNewOffsetCount: null,
  annualRecoveredCount: null,
  yearEndRetainedOffsetCount: null,
  annualDeaths: null,
  annualSoldCount: null,
  breedingReadyCount: null,
  offsetsPerBreedingPlant: null,
  notes: '親株IDを登録済み。その他の管理情報は記録待ちです。',
  annualHistory: blankAnnualHistory(),
});

const createSasanoyukiParentStockRange = (prefix: string, total: number) =>
  Array.from({ length: total }, (_, index) => createSasanoyukiParentStock(`${prefix}-${String(index + 1).padStart(2, '0')}`));

/**
 * 管理番号は先頭の文字を大分類、続く文字を小分類として扱います。
 * 例: P → PD / PL / PX。新規の親株は同じ規則でIDを追加するだけで、一覧にも自動で分類されます。
 */
export const parentStocks: ParentStock[] = [
  ...createSasanoyukiParentStockRange('PD', 13),
  ...createSasanoyukiParentStockRange('PL', 8),
  ...createSasanoyukiParentStockRange('PX', 1),
  {
    id: 'UM-01',
    varietySlug: 'agave-victoriae-reginae',
    lineageName: '笹の雪 / 鵜ノ森管理株',
    origin: '鵜ノ森管理株',
    image: '/hero-unomori.jpg',
    selectionReason: '白い葉模様・肉厚な葉姿。葉の重なりと輪郭の個性を記録対象としています。',
    currentCloneTotal: null,
    cloneSizes: { large: null, medium: null, small: null },
    annualNewOffsetCount: null,
    annualRecoveredCount: null,
    yearEndRetainedOffsetCount: null,
    annualDeaths: null,
    annualSoldCount: null,
    breedingReadyCount: null,
    offsetsPerBreedingPlant: null,
    notes: '初回の数値入力待ち。小さな子株は、発生年と回収年を分けて年次履歴へ記録します。',
    annualHistory: blankAnnualHistory(),
  },
  createSasanoyukiParentStock('X-01'),
];

export type ManagementNumberGroup = {
  primary: string;
  prefix: string;
};

export function getManagementNumberGroup(id: string): ManagementNumberGroup {
  const [prefix = id] = id.split('-');
  return { primary: prefix.slice(0, 1), prefix };
}

export function getVarietyBySlug(slug: string) {
  return varieties.find((variety) => variety.slug === slug);
}

export function getParentStocksByVariety(slug: string) {
  return parentStocks.filter((stock) => stock.varietySlug === slug);
}

export function getParentStockById(id: string) {
  return parentStocks.find((stock) => stock.id === id);
}

export type Article = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  body: string;
  sourceUrl?: string;
  categories?: readonly string[];
  tags?: readonly string[];
  managementNumbers?: readonly string[];
  popularity?: number;
};

const siteArticles: Article[] = [
  {
    slug: 'summer-care-2026', category: '育成方法', categories: ['育成方法'], tags: ['夏季管理'], date: '2026.08.22', title: '夏の終わり、株元の風を見直す',
    excerpt: '気温が高い時期こそ、灌水量だけではなく風の通り道を整えることが大切です。今月の育成環境で意識していることを記録します。',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=85',
    body: '高温期は用土の乾きが早くなりますが、水を増やす前に株元の風を確認します。灌水後に熱気と湿気を残さないことが、葉の傷みを減らす基本です。朝の時間帯に水を与え、午後はやわらかな送風を保つようにしています。',
  },
  {
    slug: 'autumn-green-market', category: 'お知らせ', categories: ['お知らせ'], tags: ['イベント'], date: '2026.08.10', title: 'GREEN MARKET 出店のお知らせ',
    excerpt: '9月14日（日）、代々木公園で開催されるGREEN MARKETに出店します。育成記録付きの株と、管理用品をお持ちします。',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=85',
    body: '会場では、アガベ、ビカクシダ、アンスリウムの育成株を中心に販売予定です。すべての対象株には管理番号を付与し、こちらの記録サイトで来歴をご確認いただけます。',
  },
  {
    slug: 'agave-white-ice-update', category: 'アガベ', categories: ['アガベ'], tags: ['White Ice', 'HG-24-017'], managementNumbers: ['HG-24-017'], date: '2026.08.03', title: 'White Ice の葉幅と鋸歯の変化',
    excerpt: '管理番号 HG-24-017 の夏季記録。新葉2枚が展開し、葉幅と鋸歯の白さが安定してきました。',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1000&q=85',
    body: '今回の新葉は前回よりも葉幅が増し、鋸歯の出方も揃ってきました。日照を急に強めず、風を保ちながら締めて育成しています。詳細な履歴は個別の成長記録ページにも掲載しています。',
  },
];

export const articles: Article[] = [...instagramArticles, ...siteArticles];

export const event = {
  label: 'NEXT EVENT', date: '2026.09.14 SUN', name: 'GREEN MARKET 2026 AUTUMN', place: '代々木公園 ケヤキ並木', time: '10:00 – 16:00',
};
