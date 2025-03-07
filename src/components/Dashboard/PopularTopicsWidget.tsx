'use client';

import { Box, Typography, Chip } from '@mui/material';
import { NewsItem } from '@/models';
import { useEffect, useState } from 'react';

type Topic = {
  category: string;
  likes: number;
};

type Props = {
  news: NewsItem[];
  selectedCategory: string | null;
  onCategoryClick: (topic: string | null) => void;
};

export default function PopularCategoryWidget(props: Props) {
  const { news, selectedCategory, onCategoryClick } = props;
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const data = news.reduce<Record<string, number>>(
      (tmp, { category, likes }) => {
        tmp[category] = (tmp[category] || 0) + likes;
        return tmp;
      },
      {}
    );

    const sortedCategoriesByLikes = Object.entries(data)
      .map(([category, likes]) => ({ category, likes }))
      .sort((a, b) => b.likes - a.likes);

    setTopics(sortedCategoriesByLikes);
  }, [news]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Популярные темы
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip
          label="Все"
          onClick={() => onCategoryClick(null)}
          variant={selectedCategory === null ? 'filled' : 'outlined'}
          sx={{ cursor: 'pointer' }}
        />
        {topics.map((topic) => (
          <Chip
            key={topic.category}
            label={`${topic.category} (${topic.likes})`}
            onClick={() => onCategoryClick(topic.category)}
            variant={
              selectedCategory === topic.category ? 'filled' : 'outlined'
            }
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
    </Box>
  );
}
