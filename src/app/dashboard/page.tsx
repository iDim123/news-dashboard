import { fetchNews } from '@/api/api';
import StoreProvider from '@/app/StoreProvider';
import Dashboard from '@/components/Dashboard/Dashboard';
import { Suspense } from 'react';
import qs from 'qs';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';
import DashboardSkeleton from '@/ui/Skeleton/DashboardSkeleton';

interface Props {
  searchParams: Promise<{ [key: string]: string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: Props) {
  const newsFilters = (await searchParams) || {};
  const query = qs.stringify(newsFilters, { arrayFormat: 'repeat' });

  return (
    <StoreProvider>
      <Container maxWidth="lg">
        <Link
          sx={{ padding: 2 }}
          href={`/?${query}`}
          color="secondary"
          component={NextLink}
        >
          Перейти к настройкам
        </Link>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardWrapper newsFilters={newsFilters} />
        </Suspense>
      </Container>
    </StoreProvider>
  );
}

async function DashboardWrapper({
  newsFilters,
}: {
  newsFilters: { [key: string]: string[] | undefined };
}) {
  const news = await fetchNews(newsFilters);

  return <Dashboard news={news} />;
}
