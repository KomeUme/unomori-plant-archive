const buildDate = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date()).replaceAll('/', '.');

export function GuideLastUpdated() {
  return <p className="guide-last-updated">最終更新　{buildDate}</p>;
}
