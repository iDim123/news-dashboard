'use client';

import { useEffect } from 'react';
import { NewsItem } from '@/models';
import { Grid2 as Grid } from '@mui/material';
import PopularTopicsWidget from '@/components/Dashboard/PopularTopicsWidget';
import TagCloudWidget from '@/components/Dashboard/TagCloudWidget';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  moveNewsItem,
  setActiveTag,
  setNews,
  setSelectedCategory,
} from '@/store/Dashboard';
import { SortableContext } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { shallowEqual } from 'react-redux';
import DraggableCard from '@/components/Dashboard/DraggableCard';

type Props = {
  news: NewsItem[];
};

export default function Dashboard(props: Props) {
  const { news } = props;

  const dispatch = useAppDispatch();
  const { filteredNews, selectedCategory, activeTags } = useAppSelector(
    (state) => ({
      filteredNews: state.dashboard.filteredNews,
      selectedCategory: state.dashboard.selectedCategory,
      activeTags: state.dashboard.activeTags,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(setNews(news));
  }, [news]);

  const handleTagClick = (tag: string) => {
    dispatch(setActiveTag(tag));
  };

  const handleCategoryClick = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(
        moveNewsItem({ activeId: Number(active.id), overId: Number(over.id) })
      );
    }
  };

  return (
    <>
      <PopularTopicsWidget
        news={news}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      <TagCloudWidget
        news={news}
        activeTags={activeTags}
        onTagClick={handleTagClick}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredNews.map((item) => item.id)}>
          <Grid container spacing={2}>
            {filteredNews.map((item) => (
              <DraggableCard key={item.id} item={item} />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </>
  );
}
