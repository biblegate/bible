/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BibleLayout } from './components/BibleLayout';
import { useBibleData } from './hooks/useBibleData';
import { HomePage } from './pages/HomePage';
import { BookPage } from './pages/BookPage';
import { ChapterPage } from './pages/ChapterPage';
import { VersePage } from './pages/VersePage';

export default function App() {
  const { data, loading, error } = useBibleData();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-neutral-600">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-sm font-medium text-neutral-500">Loading Bible data...</p>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <BibleLayout>
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/:book" element={<BookPage data={data} />} />
            <Route path="/:book/:chapter" element={<ChapterPage data={data} />} />
            <Route path="/:book/:chapter/:verse" element={<VersePage data={data} />} />
          </Routes>
        </BibleLayout>
      </Router>
    </HelmetProvider>
  );
}

