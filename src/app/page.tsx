import { fetchCategories, fetchSources } from '@/api/api';
import Main from '@/components/Main/Main';
import { Suspense } from 'react';

export default async function MainPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <MainWrapper />
      </Suspense>
    </main>
  );
}

async function MainWrapper() {
  const sources = await fetchSources();
  const categories = await fetchCategories();

  return <Main sources={sources} categories={categories} />;
}
