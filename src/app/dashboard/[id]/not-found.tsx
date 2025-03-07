'use client';

import { useAppContext } from '@/context/App/ContextApp';
import { Container, Grid2 as Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams).toString();
  const { setIs404 } = useAppContext();

  useEffect(() => {
    setIs404(true);
    return () => setIs404(false);
  }, []);

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container direction="column" alignItems="center" textAlign="center">
        <Typography variant="h2" gutterBottom>
          404 Страница не найдена
        </Typography>
        <Typography variant="body1">Не удалсь текущую статью</Typography>
        <Link href={`/dashboard?${params}`} component={NextLink}>
          Вернуться
        </Link>
      </Grid>
    </Container>
  );
}
