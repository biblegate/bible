import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BibleData } from '../types';
import { SEO } from '../components/SEO';
import { ChevronLeft } from 'lucide-react';

interface BookPageProps {
  data: BibleData | null;
}

export const BookPage: React.FC<BookPageProps> = ({ data }) => {
  const { book } = useParams<{ book: string }>();
  if (!data || !book) return null;

  const bookKey = Object.keys(data).find(k => k.toLowerCase() === book.toLowerCase());
  const bookData = bookKey ? data[bookKey] : null;

  if (!bookData) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-serif font-light text-slate-400 italic">Book not found</h2>
        <Link to="/" className="text-brand-600 font-bold text-xs uppercase tracking-widest mt-6 inline-block hover:underline">Back to Library</Link>
      </div>
    );
  }

  const chapters = Object.keys(bookData).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="space-y-12">
      <SEO 
        title={`Bible: ${bookKey}`} 
        description={`Explore the chapters in the book of ${bookKey} from the Holy Bible KJV.`} 
      />

      <nav className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link to="/" className="hover:text-brand-600 transition-colors">Library</Link>
        <span className="text-slate-200">/</span>
        <span className="text-slate-900">{bookKey}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-5xl font-serif font-light tracking-tight text-slate-900">{bookKey}</h1>
        <p className="text-sm font-medium text-slate-400">Select a chapter from {bookKey}</p>
      </header>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {chapters.map((chapter) => (
          <Link
            key={chapter}
            to={`/${book.toLowerCase()}/${chapter}`}
            className="flex aspect-square items-center justify-center rounded-xl border border-slate-100 bg-white text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-brand-600 hover:text-white hover:border-brand-600 hover:shadow-lg hover:shadow-brand-600/20 hover:-translate-y-0.5"
          >
            {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
};
