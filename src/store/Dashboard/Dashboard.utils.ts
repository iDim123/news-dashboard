import { NewsItem } from "@/models";
import { DashboardState } from "@/store/Dashboard/Dashboard.store";

export function getFilteredNews(state: DashboardState): NewsItem[] {
  const { news, activeTags, selectedCategory } = state;
  let result = news;

  if (activeTags.length > 0) {
    result = result.filter((newsItem) =>
      activeTags.some((tag) => newsItem.tags.includes(tag))
    );
  }

  if (selectedCategory) {
    result = result.filter(
      (newsItem) => newsItem.category === selectedCategory
    );
  }

  return result;
}
