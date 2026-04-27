import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BibleData } from '../types';
import { SEO } from '../components/SEO';
import { ChevronLeft, Share2 } from 'lucide-react';

interface VersePageProps {
  data: BibleData | null;
}

export const VersePage: React.FC<VersePageProps> = ({ data }) => {
  const { book, chapter, verse } = useParams<{ book: string; chapter: string; verse: string }>();
  if (!data || !book || !chapter || !verse) return null;

  const bookKey = Object.keys(data).find(k => k.toLowerCase() === book.toLowerCase());
  const verseText = bookKey ? data[bookKey][chapter]?.[verse] : null;

  if (!verseText) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-serif font-light text-slate-400 italic">Verse not found</h2>
        <Link to={`/${book}/${chapter}`} className="text-brand-600 font-bold text-xs uppercase tracking-widest mt-6 inline-block hover:underline">Back to Chapter {chapter}</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-8">
      <SEO 
        title={`Bible: ${bookKey} ${chapter}:${verse}`} 
        description={`Bible: ${bookKey} ${chapter}:${verse} ${verseText}`} 
      />

      <nav className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link to="/" className="hover:text-brand-600 transition-colors">Library</Link>
        <span className="text-slate-200">/</span>
        <Link to={`/${book}`} className="hover:text-brand-600 transition-colors">{bookKey}</Link>
        <span className="text-slate-200">/</span>
        <Link to={`/${book}/${chapter}`} className="hover:text-brand-600 transition-colors">Chapter {chapter}</Link>
        <span className="text-slate-200">/</span>
        <span className="text-slate-900">Verse {verse}</span>
      </nav>

      <div className="max-w-3xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-serif font-light text-slate-900">
          {bookKey} <span className="text-brand-600 italic">{chapter}:{verse}</span>
        </h2>
        
        <div className="relative bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-12 sm:p-20 transition-transform duration-500 hover:scale-[1.01]">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-5 py-1.5 text-[10px] font-black text-brand-600 border border-slate-100 rounded-full shadow-sm tracking-widest uppercase">
            Holy Scripture
          </span>
          <p className="text-3xl sm:text-4xl font-serif leading-[1.6] text-slate-800 italic">
            "{verseText}"
          </p>
        </div>

        <div className="pt-8 flex justify-center gap-4">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${verseText} - ${bookKey} ${chapter}:${verse}`);
              alert('Verse copied to clipboard!');
            }}
            className="px-8 py-3 bg-brand-600 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30 active:scale-95 flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Verse
          </button>
        </div>
      </div>
    </div>
  );
};
