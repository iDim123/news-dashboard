'use client';

import { NewsItem } from '@/models';
import { Container, Chip, Box } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';

const getRandomSize = () => Math.floor(Math.random() * 10) + 12;

type Props = {
  news: NewsItem[];
  activeTags: string[];
  onTagClick: (tag: string) => void;
};

export default function TagCloudWidget(props: Props) {
  const { news, activeTags, onTagClick } = props;
  const [tagSizes, setTagSizes] = useState<number[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const allTags = news.flatMap((item) => item.tags);
    const tags = [...new Set(allTags)];

    setTags(tags);
    setTagSizes(tags.map(() => getRandomSize()));
  }, [news]);

  const handleTagClick = useCallback(
    (tag: string) => {
      onTagClick(tag);
    },
    [onTagClick]
  );

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {tags.map((tag, index) => (
          <TagMemo
            key={tag}
            tag={tag}
            isActive={activeTags.includes(tag)}
            fontSize={tagSizes[index]}
            onClick={handleTagClick}
          />
        ))}
      </Box>
    </Container>
  );
}

type TagProps = {
  tag: string;
  fontSize: number;
  isActive: boolean;
  onClick: (tag: string) => void;
};

const Tag = ({ tag, fontSize, isActive, onClick }: TagProps) => {
  return (
    <Chip
      clickable
      label={tag}
      color={isActive ? 'primary' : 'secondary'}
      sx={{
        fontSize: fontSize,
        padding: '8px',
      }}
      onClick={() => onClick(tag)}
    />
  );
};

const TagMemo = memo(Tag);
