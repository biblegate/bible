import React from 'react';
import { Link } from 'react-router-dom';
import { BibleData } from '../types';
import { SEO } from '../components/SEO';
import { ChevronRight } from 'lucide-react';

interface HomePageProps {
  data: BibleData | null;
}

export const HomePage: React.FC<HomePageProps> = ({ data }) => {
  if (!data) return null;

  const books = Object.keys(data);

  return (
    <div className="space-y-16 py-8">
      <SEO 
        title="Bible Web: Holy Bible KJV" 
        description="Read the King James Version of the Holy Bible online. Browse books, chapters, and verses easily." 
      />
      
      <section className="text-center space-y-6">
        <div className="mx-auto w-fit px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-[10px] font-bold text-brand-700 uppercase tracking-widest">
          The Word of God
        </div>
        <h1 className="text-5xl font-serif font-light tracking-tight text-slate-900 sm:text-6xl">
          Authorized King James
        </h1>
        <p className="mx-auto max-w-xl text-neutral-500 font-medium">
          Experience the scriptures in a clean, focused, and minimal interface designed for deep reflection.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {books.map((book) => (
          <Link
            key={book}
            to={`/${book.toLowerCase()}`}
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5 hover:-translate-y-1"
          >
            <span className="text-xl font-serif font-medium text-slate-800 transition-colors group-hover:text-brand-600">{book}</span>
            <span className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Old Testament</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
