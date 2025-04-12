export type SearchItem = {
  title: string;
  link: string;
};

export const searchData: SearchItem[] = [
  { title: 'Google', link: 'https://www.google.com' },
  { title: 'Yahoo', link: 'https://www.yahoo.co.jp' },
  { title: 'Wiki', link: 'https://www.wikipedia.org' },
];

export const searchIndex: Record<string, SearchItem[]> = {};

searchData.forEach((item) => {
  const key = item.title.toLowerCase();
  searchIndex[key] = searchIndex[key] || [];
  searchIndex[key].push(item);
});
