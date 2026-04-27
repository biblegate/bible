import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BibleLayoutProps {
  children: React.ReactNode;
}

export const BibleLayout: React.FC<BibleLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-surface font-sans text-[#1a1a1a]">
      {/* Sidebar - Visible on Desktop */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 group">
            <BookOpen className="h-6 w-6 text-brand-600 transition-transform group-hover:scale-110" />
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Bible<span className="text-brand-600">KJV</span>
            </h1>
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">Authorized Version</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Quick Navigation</div>
          <Link to="/" className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-colors">
            Library
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400 uppercase tracking-tight">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            DB: kjv_nested.json
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Home Link */}
            <Link to="/" className="md:hidden flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" />
              <span className="font-bold text-slate-800">KJV</span>
            </Link>
            <nav className="hidden sm:flex items-center text-xs space-x-2 text-slate-400 font-medium">
              <Link to="/" className="hover:text-brand-600 transition-colors">Library</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:block relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-8 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-xs w-32 focus:w-48 focus:ring-2 focus:ring-brand-600/10 outline-none transition-all"
              />
              <svg className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto w-full max-w-4xl"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-slate-100 bg-white py-6 px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Bible Web</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-600 transition-colors">Topics</a>
              <a href="#" className="hover:text-brand-600 transition-colors">About</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
