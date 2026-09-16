import React, { useState } from 'react';
import { Book, Category } from '../types';
import { BookCard } from './BookCard';
import { Search, BookOpen, Sparkles, TrendingUp, Download, ShieldCheck, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  books: Book[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenDetail: (book: Book) => void;
  onReadOnline: (book: Book) => void;
  onDownload: (book: Book) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  books,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenDetail,
  onReadOnline,
  onDownload,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'latest' | 'popular'>('all');

  // Filter books by category and search query
  const filteredBooks = books.filter(book => {
    if (book.status !== 'published') return false;
    
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      book.title.toLowerCase().includes(q) || 
      book.author.toLowerCase().includes(q) || 
      book.keywords.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const displayBooks = activeTab === 'latest' 
    ? [...filteredBooks].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    : activeTab === 'popular'
    ? [...filteredBooks].sort((a, b) => (b.downloads_count || 0) - (a.downloads_count || 0))
    : filteredBooks;

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/80 backdrop-blur-md text-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-600/50 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>বাংলাদেশের সর্ববৃহৎ ফ্রি বাংলা ইবুক ও পিডিএফ লাইব্রেরি</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            প্রিয় সব বাংলা বই এখন <span className="text-emerald-400">অনলাইনে ও বিনামূল্যে</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ক্ল্যাসিক উপন্যাস, কবিতা, ইসলামিক বই, ইতিহাস এবং শিক্ষামূলক হাজার হাজার পিডিএফ বই পড়ুন কিংবা এক ক্লিকেই ডাউনলোড করুন।
          </p>

          {/* Search bar inside Hero */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-2">
              <span className="pl-3 text-emerald-300">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="বইয়ের নাম বা লেখকের নাম লিখে অনুসন্ধান করুন..."
                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-300 focus:outline-none text-sm sm:text-base"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-md">
                খুঁজুন
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-emerald-400">{books.length}+</div>
              <div className="text-xs text-slate-400">মোট বই</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{categories.length}+</div>
              <div className="text-xs text-slate-400">ক্যাটাগরি</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">১০০%</div>
              <div className="text-xs text-slate-400">ফ্রি ডাউনলোড</div>
            </div>
          </div>

        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-xs ${selectedCategory === 'all' ? 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-lg' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
          >
            📚 সকল বই (All)
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-xs ${selectedCategory === cat.name ? 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-lg' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <span>{selectedCategory === 'all' ? 'সকল প্রকাশিত বই' : `${selectedCategory} ক্যাটাগরির বই`}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
                {filteredBooks.length}টি বই
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">অনলাইনে পড়ুন অথবা নিরাপদ পিডিএফ ফরম্যাটে ডাউনলোড করুন</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 bg-slate-200/70 p-1 rounded-xl text-sm font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-lg transition-colors ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              সব বই
            </button>
            <button
              onClick={() => setActiveTab('latest')}
              className={`px-4 py-1.5 rounded-lg transition-colors ${activeTab === 'latest' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              সর্বশেষ সংযোজন
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-4 py-1.5 rounded-lg transition-colors ${activeTab === 'popular' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              জনপ্রিয়
            </button>
          </div>
        </div>

        {displayBooks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">কোনো বই খুঁজে পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              আপনার অনুসন্ধানের সাথে মিলছে এমন কোনো বই পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন অথবা ক্যাটাগরি পরিবর্তন করুন।
            </p>
            <button
              onClick={() => { onSelectCategory('all'); onSearchChange(''); }}
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:bg-emerald-700 transition-colors"
            >
              <span>সকল বই দেখুন</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onOpenDetail={onOpenDetail}
                onReadOnline={onReadOnline}
                onDownload={onDownload}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
