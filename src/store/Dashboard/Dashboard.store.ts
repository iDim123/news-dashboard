import { NewsItem } from '@/models';
import { getFilteredNews } from '@/store/Dashboard/Dashboard.utils';
import { arrayMove } from '@dnd-kit/sortable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  news: NewsItem[];
  filteredNews: NewsItem[];
  activeTags: string[];
  selectedCategory: string | null;
}

const initialState: DashboardState = {
  news: [],
  activeTags: [],
  filteredNews: [],
  selectedCategory: null,
};

const dashboard = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<NewsItem[]>) {
      state.news = action.payload;
      state.filteredNews = action.payload;
    },
    setActiveTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      state.activeTags = state.activeTags.includes(tag)
        ? state.activeTags.filter((t) => t !== tag)
        : [...state.activeTags, tag];
      state.filteredNews = getFilteredNews(state);
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      state.filteredNews = getFilteredNews(state);
    },
    moveNewsItem(
      state,
      action: PayloadAction<{ activeId: number; overId: number }>
    ) {
      const { activeId, overId } = action.payload;
      const oldIndex = state.filteredNews.findIndex(
        (item) => item.id === activeId
      );
      const newIndex = state.filteredNews.findIndex(
        (item) => item.id === overId
      );
      state.filteredNews = arrayMove(state.filteredNews, oldIndex, newIndex);
    },
  },
});

export const { setNews, setActiveTag, setSelectedCategory, moveNewsItem } =
  dashboard.actions;
export const DashboardReducer = dashboard.reducer;
