import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BibleData } from '../types';
import { SEO } from '../components/SEO';
import { ChevronLeft } from 'lucide-react';

interface ChapterPageProps {
  data: BibleData | null;
}

export const ChapterPage: React.FC<ChapterPageProps> = ({ data }) => {
  const { book, chapter } = useParams<{ book: string; chapter: string }>();
  if (!data || !book || !chapter) return null;

  const bookKey = Object.keys(data).find(k => k.toLowerCase() === book.toLowerCase());
  const chapterData = bookKey ? data[bookKey][chapter] : null;

  if (!chapterData) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-serif font-light text-slate-400 italic">Chapter not found</h2>
        <Link to={`/${book}`} className="text-brand-600 font-bold text-xs uppercase tracking-widest mt-6 inline-block hover:underline">Back to {bookKey || book}</Link>
      </div>
    );
  }

  const verses = Object.keys(chapterData).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="space-y-12">
      <SEO 
        title={`Bible: ${bookKey} chapter ${chapter}`} 
        description={`Read ${bookKey} chapter ${chapter} in the Holy Bible KJV focusing on spiritual growth and wisdom.`} 
      />

      <nav className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link to="/" className="hover:text-brand-600 transition-colors">Library</Link>
        <span className="text-slate-200">/</span>
        <Link to={`/${book}`} className="hover:text-brand-600 transition-colors">{bookKey}</Link>
        <span className="text-slate-200">/</span>
        <span className="text-slate-900">Chapter {chapter}</span>
      </nav>

      <header className="border-b border-slate-100 pb-10">
        <h1 className="text-5xl font-serif font-light tracking-tight text-slate-900">
          {bookKey} <span className="text-brand-600 italic">{chapter}</span>
        </h1>
      </header>

      <div className="space-y-10 max-w-2xl">
        {verses.map((verse) => (
          <div key={verse} id={`v${verse}`} className="group relative pr-4">
            <div className="flex gap-6 items-start">
              <Link 
                to={`/${book.toLowerCase()}/${chapter}/${verse}`}
                className="mt-1 flex-shrink-0 text-[10px] font-black text-slate-200 uppercase tracking-tighter transition-colors group-hover:text-brand-400"
              >
                {verse}
              </Link>
              <p className="text-xl font-serif leading-relaxed text-slate-700 transition-colors group-hover:text-brand-900">
                {chapterData[verse]}
              </p>
            </div>
            {/* Subtle separator */}
            <div className="mt-8 h-px w-8 bg-slate-100 group-last:hidden" />
          </div>
        ))}
      </div>
    </div>
  );
};
