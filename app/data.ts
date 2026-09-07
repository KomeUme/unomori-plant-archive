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

/** 鉢サイズは、現在の運用で使う号数だけを選べるようにしています。 */
export const potSizes = [2.5, 3, 4, 5] as const;
export type PotSize = (typeof potSizes)[number];

export type AttachedOffsetRecord = {
  /** 親株に付いたままの子株が発生した年 */
  year: number;
  count: number;
};

/**
 * 1レコード = 現在管理している1鉢。
 * 鉢数と株数を別の単位で残すことで、親株に付いた子株も追跡できます。
 */
export type ManagedPot = {
  id: string;
  potSize: PotSize;
  rootedPlantCount: number | null;
  attachedOffsets: AttachedOffsetRecord[];
  breedingReadyPlantCount: number | null;
  notes?: string;
};

export type AnnualCloneRecord = {
  year: number;
  openingPlantCount: number | null;
  openingAttachedOffsetCount: number | null;
  openingBreedingReadyPlantCount: number | null;
  newOffsetCount: number | null;
  separatedOffsetCount: number | null;
  deaths: number | null;
  soldCount: number | null;
  closingPlantCount: number | null;
  closingAttachedOffsetCount: number | null;
  closingBreedingReadyPlantCount: number | null;
};

export type ParentStock = {
  id: string;
  varietySlug: string;
  lineageName: string;
  origin: string;
  /** YYYY.MM.DD。日が未確定の場合は YYYY.MM でも記録可能。 */
  managementStartedOn: string | null;
  image?: string;
  selectionReason: string;
  /** null = 鉢別の現況はまだ未記録。空配列 = 現在は管理鉢がない。 */
  currentPots: ManagedPot[] | null;
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
    botanicalName: 'Gymnocalycium paraguayense',
    type: 'サボテン',
    description: '親株の由来と選抜理由、クローンの推移をこれから整理していきます。',
  },
  {
    slug: 'oukan-ryu',
    name: '王冠竜',
    botanicalName: 'Ferocactus glaucescens',
    type: 'サボテン',
    description: '親株の由来と選抜理由、クローンの推移をこれから整理していきます。',
  },
];

const blankAnnualHistory = (): AnnualCloneRecord[] => [
  { year: 2024, openingPlantCount: null, openingAttachedOffsetCount: null, openingBreedingReadyPlantCount: null, newOffsetCount: null, separatedOffsetCount: null, deaths: null, soldCount: null, closingPlantCount: null, closingAttachedOffsetCount: null, closingBreedingReadyPlantCount: null },
  { year: 2025, openingPlantCount: null, openingAttachedOffsetCount: null, openingBreedingReadyPlantCount: null, newOffsetCount: null, separatedOffsetCount: null, deaths: null, soldCount: null, closingPlantCount: null, closingAttachedOffsetCount: null, closingBreedingReadyPlantCount: null },
  { year: 2026, openingPlantCount: null, openingAttachedOffsetCount: null, openingBreedingReadyPlantCount: null, newOffsetCount: null, separatedOffsetCount: null, deaths: null, soldCount: null, closingPlantCount: null, closingAttachedOffsetCount: null, closingBreedingReadyPlantCount: null },
];

const provisionalParentStockPhotoIds = new Set(['PD-07', 'PD-13']);

const createSasanoyukiParentStock = (id: string): ParentStock => ({
  id,
  varietySlug: 'agave-victoriae-reginae',
  lineageName: '血統情報未登録',
  origin: '由来未登録',
  managementStartedOn: null,
  ...(provisionalParentStockPhotoIds.has(id) ? { image: '/hero-unomori.jpg' } : {}),
  selectionReason: '特徴・選抜理由を記録予定です。',
  currentPots: null,
  notes: '親株IDを登録済み。鉢ごとの管理情報と年次履歴は記録待ちです。',
  annualHistory: blankAnnualHistory(),
});

const createSasanoyukiParentStockRange = (prefix: string, total: number) =>
  Array.from({ length: total }, (_, index) => createSasanoyukiParentStock(`${prefix}-${String(index + 1).padStart(2, '0')}`));

const additionalSasanoyukiParentStockIds = [
  'S(PD)-01', 'S(PD)-02', 'S(H)-03', 'S(H)-04', 'S-05', 'S(PD)-06',
  'B-01', 'B(PD)-02', 'B(PD)-03', 'B-04', 'B(PD)-05', 'B(PD)-06', 'B(PD)-07', 'B-08',
] as const;

/**
 * 管理番号は先頭の文字を大分類、続く文字を小分類として扱います。
 * 例: P → PD / PL / PX。括弧内の記号はサブ分類として表示します。
 * 新規の親株は同じ規則でIDを追加するだけで、一覧にも自動で分類されます。
 */
export const parentStocks: ParentStock[] = [
  ...createSasanoyukiParentStockRange('PD', 13),
  ...createSasanoyukiParentStockRange('PL', 8),
  ...createSasanoyukiParentStockRange('PX', 1),
  ...additionalSasanoyukiParentStockIds.map(createSasanoyukiParentStock),
  {
    id: 'UM-01',
    varietySlug: 'agave-victoriae-reginae',
    lineageName: '笹の雪 / 実生株',
    origin: '実生株',
    managementStartedOn: null,
    image: '/hero-unomori.jpg',
    selectionReason: '白い葉模様・肉厚な葉姿。葉の重なりと輪郭の個性を記録対象としています。',
    currentPots: [
      {
        id: 'UM-01-P01',
        potSize: 4,
        rootedPlantCount: 1,
        attachedOffsets: [{ year: 2026, count: 1 }],
        breedingReadyPlantCount: 1,
        notes: '主株1株と、2026年発生の未分離子株1株を同じ4号鉢で管理。',
      },
    ],
    notes: '現在は4号鉢1鉢で2株を管理。子株は発生年と分離・回収年を分けて記録します。',
    annualHistory: blankAnnualHistory().map((record) => record.year === 2026 ? {
      ...record,
      newOffsetCount: 2,
      separatedOffsetCount: 1,
      soldCount: 1,
      closingPlantCount: 2,
      closingAttachedOffsetCount: 1,
      closingBreedingReadyPlantCount: 1,
    } : record),
  },
  createSasanoyukiParentStock('X-01'),
];

export type ManagementNumberGroup = {
  primary: string;
  prefix: string;
};

export function getManagementNumberGroup(id: string): ManagementNumberGroup {
  const [rawPrefix = id] = id.split('-');
  // 括弧内は記録上の補助情報であり、一覧での分類・表示順には用いない。
  const prefix = rawPrefix.replace(/\([^)]*\)/g, '');
  return { primary: prefix.slice(0, 1), prefix };
}

/**
 * 例: B-01 / B(PD)-02 / B(PD)-03 は、すべて B系の番号順として扱う。
 * PD / PL / PX のように括弧外にある英字は、分類・並び順に反映する。
 */
export function compareManagementNumberIds(first: string, second: string) {
  const firstGroup = getManagementNumberGroup(first);
  const secondGroup = getManagementNumberGroup(second);
  const prefixComparison = firstGroup.prefix.localeCompare(secondGroup.prefix);
  if (prefixComparison !== 0) return prefixComparison;

  const firstNumber = Number(first.match(/-(\d+)$/)?.[1] ?? Number.POSITIVE_INFINITY);
  const secondNumber = Number(second.match(/-(\d+)$/)?.[1] ?? Number.POSITIVE_INFINITY);
  if (firstNumber !== secondNumber) return firstNumber - secondNumber;
  return first.localeCompare(second);
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

const sumNullable = (values: Array<number | null>) => {
  if (values.some((value) => value === null)) return null;
  return values.reduce<number>((sum, value) => sum + (value ?? 0), 0);
};

export function getManagedPotCount(stock: ParentStock) {
  return stock.currentPots === null ? null : stock.currentPots.length;
}

export function getCurrentRootedPlantCount(stock: ParentStock) {
  if (stock.currentPots === null) return null;
  return sumNullable(stock.currentPots.map((pot) => pot.rootedPlantCount));
}

export function getCurrentAttachedOffsetCount(stock: ParentStock) {
  if (stock.currentPots === null) return null;
  return stock.currentPots.reduce((total, pot) => total + pot.attachedOffsets.reduce((sum, offset) => sum + offset.count, 0), 0);
}

export function getCurrentHeldPlantCount(stock: ParentStock) {
  const rooted = getCurrentRootedPlantCount(stock);
  const attached = getCurrentAttachedOffsetCount(stock);
  return rooted === null || attached === null ? null : rooted + attached;
}

export function getCurrentBreedingReadyPlantCount(stock: ParentStock) {
  if (stock.currentPots === null) return null;
  return sumNullable(stock.currentPots.map((pot) => pot.breedingReadyPlantCount));
}

export function getPotSizeSummary(stock: ParentStock, potSize: PotSize) {
  if (stock.currentPots === null) return null;
  const pots = stock.currentPots.filter((pot) => pot.potSize === potSize);
  const rootedPlantCount = sumNullable(pots.map((pot) => pot.rootedPlantCount));
  const attachedOffsetCount = pots.reduce((total, pot) => total + pot.attachedOffsets.reduce((sum, offset) => sum + offset.count, 0), 0);
  return {
    potCount: pots.length,
    rootedPlantCount,
    attachedOffsetCount,
    heldPlantCount: rootedPlantCount === null ? null : rootedPlantCount + attachedOffsetCount,
  };
}

export function getLatestRecordedAnnualHistory(stock: ParentStock) {
  return stock.annualHistory
    .filter((record) => Object.entries(record).some(([key, value]) => key !== 'year' && value !== null))
    .sort((a, b) => b.year - a.year)[0] ?? null;
}

export function getLatestAnnualNewOffsetCount(stock: ParentStock) {
  return getLatestRecordedAnnualHistory(stock)?.newOffsetCount ?? null;
}

export function getLatestAnnualSoldCount(stock: ParentStock) {
  return getLatestRecordedAnnualHistory(stock)?.soldCount ?? null;
}

export function getLatestAnnualAverageBreedingReadyPlantCount(stock: ParentStock) {
  const record = getLatestRecordedAnnualHistory(stock);
  if (!record) return null;
  const opening = record.openingBreedingReadyPlantCount;
  const closing = record.closingBreedingReadyPlantCount;
  if (opening !== null && closing !== null) return (opening + closing) / 2;
  return opening ?? closing;
}

export function getOffsetsPerBreedingPlant(stock: ParentStock) {
  const newOffsets = getLatestAnnualNewOffsetCount(stock);
  const averageBreedingPlants = getLatestAnnualAverageBreedingReadyPlantCount(stock);
  if (newOffsets === null || averageBreedingPlants === null || averageBreedingPlants <= 0) return null;
  return Math.round((newOffsets / averageBreedingPlants) * 10) / 10;
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
