import { CategoryItem, NewsItem, SourceItem } from '@/models';
import qs from 'qs';

export async function fetchNews(newsFilters: {
  [key: string]: string[] | undefined;
}): Promise<NewsItem[]> {
  const { categories, sources } = newsFilters;
  const query = qs.stringify(
    { sources, categories },
    { arrayFormat: 'repeat' }
  );
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news?${query}`);
    return await res.json();
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchRssNews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss-news`);
    return await res.json();
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchCategories(): Promise<CategoryItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    return await res.json();
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchSources(): Promise<SourceItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sources`);
    return await res.json();
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchTags(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
    return await res.json();
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchNewsDetail(
  id: number
): Promise<NewsItem | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`);
    if(res.status === 404) return undefined;
    return await res.json();
  } catch (err) {
    throw new Error('Failed to fetch news.');
  }
}

export async function fetchRelatedNews(
  id: number
): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/relatedNews/${id}`);
    return await res.json();
  } catch (err) {
    throw new Error('Failed to fetch news.');
  }
}