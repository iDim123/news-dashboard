'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { CategoryItem, SourceItem } from '@/models';
import qs from 'qs';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Zoom,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';

type Props = {
  sources: SourceItem[];
  categories: CategoryItem[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Main(props: Props) {
  const { sources, categories } = props;
  const searchParams = useSearchParams();

  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setVisible(true);
    }, 500);

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams).toString();
    const { sources, categories } = qs.parse(params);

    if (Array.isArray(sources)) setSelectedSource(sources as string[]);
    if (Array.isArray(categories)) setSelectedCategory(categories as string[]);
  }, [searchParams]);

  function getSelectValue(event: any) {
    const value = event.target.value;
    const result = typeof value === 'string' ? value.split(',') : value;
    return result;
  }

  const handleSourceChange = (event) => {
    const result = getSelectValue(event);
    setSelectedSource(result);
  };

  const handleCategoryChange = (event) => {
    const result = getSelectValue(event);
    setSelectedCategory(result);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Настройка новостной ленты
      </Typography>
      <Box display="flex" gap={2}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="source-checkbox-label">Источники</InputLabel>
          <Select
            multiple
            labelId="source-checkbox-label"
            id="source-checkbox"
            value={selectedSource}
            onChange={handleSourceChange}
            input={<OutlinedInput label="Источники" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {sources.map((source) => (
              <MenuItem key={source.id} value={source.name}>
                <Checkbox checked={selectedSource.includes(source.name)} />
                <ListItemText primary={source.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="category-checkbox-label">Категории</InputLabel>
          <Select
            multiple
            labelId="category-checkbox-label"
            id="category-checkbox"
            value={selectedCategory}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Категории" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                <Checkbox checked={selectedCategory.includes(cat.name)} />
                <ListItemText primary={cat.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Link
        href={`/dashboard?${qs.stringify(
          {
            sources: selectedSource,
            categories: selectedCategory,
          },
          { arrayFormat: 'repeat' }
        )}`}
        color="secondary"
        component={NextLink}
      >
        Перейти к новостям
      </Link>
      <Box sx={{ display: 'flex' }}>
        <Zoom in={isVisible} timeout={1000} unmountOnExit>
          <Typography variant="h2"></Typography>
        </Zoom>
      </Box>
    </Container>
  );
}
