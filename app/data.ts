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

export const mothers = [
  { id: 'M-AG-003', name: 'Agave titanota “White Ice”', type: 'アガベ', feature: '白い鋸歯・厚葉・短葉傾向', origin: '国内選抜株', descendants: 12 },
  { id: 'M-PL-008', name: 'Platycerium “Jade Girl”', type: 'ビカクシダ', feature: '細葉・多分岐・上向きの草姿', origin: '台湾由来', descendants: 8 },
  { id: 'M-AN-002', name: 'Anthurium crystallinum', type: 'アンスリウム', feature: '濃緑ベルベット・銀白色の葉脈', origin: '実生選抜', descendants: 5 },
  { id: 'M-AG-011', name: 'Agave “SAD”', type: 'アガベ', feature: '強いトップスパイン・コンパクト', origin: '国内選抜株', descendants: 4 },
];
