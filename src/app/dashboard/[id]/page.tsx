import { fetchNewsDetail, fetchRelatedNews } from '@/api/api';
import NewsDetail from '@/components/NewsDetail/NewsDetail';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import DetailNewsSkeleton from '@/ui/Skeleton/DetailNewsSkeleton';

export default async function NewsDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = Number(params.id);

  return (
    <main>
      <Suspense fallback={<DetailNewsSkeleton />}>
        <NewsDetailWrapper id={id} />
      </Suspense>
    </main>
  );
}

async function NewsDetailWrapper({ id }: { id: number }) {
  const newsDetails = await fetchNewsDetail(id);
  const related = await fetchRelatedNews(id);

  if (!newsDetails) notFound();

  return <NewsDetail article={newsDetails} related={related} />;
}
