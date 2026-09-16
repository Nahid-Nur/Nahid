import React from 'react';
import { Book, Category, Author } from '../../types';
import { BookOpen, CheckCircle, FileText, Layers, Users, Download, TrendingUp, PlusCircle } from 'lucide-react';

interface AdminDashboardProps {
  books: Book[];
  categories: Category[];
  authors: Author[];
  onNavigateTab: (tab: any) => void;
  onEditBook: (book: Book) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  books,
  categories,
  authors,
  onNavigateTab,
  onEditBook,
}) => {
  const totalBooks = books.length;
  const publishedBooks = books.filter(b => b.status === 'published').length;
  const draftBooks = books.filter(b => b.status === 'draft').length;
  const totalCategories = categories.length;
  const totalAuthors = authors.length;

  const totalDownloads = books.reduce((acc, curr) => acc + (curr.downloads_count || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
            অ্যাডমিন ড্যাশবোর্ড কন্ট্রোল প্যানেল
          </span>
          <h1 className="text-3xl font-bold">স্বাগতম, Allbookpdf এডমিন</h1>
          <p className="text-sm text-emerald-100">
            আপনার লাইব্রেরির সকল বই, ক্যাটাগরি এবং পিডিএফ ফাইল এখান থেকে পরিচালনা করুন।
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('new-book')}
          className="flex items-center space-x-2 bg-white text-emerald-900 hover:bg-emerald-50 px-6 py-3 rounded-2xl font-bold shadow-lg transition-transform hover:scale-105 shrink-0"
        >
          <PlusCircle className="w-5 h-5 text-emerald-700" />
          <span>নতুন বই যোগ করুন</span>
        </button>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          onClick={() => onNavigateTab('books')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">মোট বই</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalBooks}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
            <span>সকল বই দেখুন</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('published')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">প্রকাশিত বই</p>
              <h3 className="text-3xl font-extrabold text-emerald-700 mt-1">{publishedBooks}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-teal-600 font-medium">
            <span>লাইভে আছে</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('drafts')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ড্রাফট বই</p>
              <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{draftBooks}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-amber-600 font-medium">
            <span>অপ্রকাশিত ড্রাফট</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('categories')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ক্যাটাগরি ও লেখক</p>
              <h3 className="text-3xl font-extrabold text-blue-700 mt-1">{totalCategories} / {totalAuthors}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-blue-600 font-medium">
            <span>পরিচালনা করুন</span>
          </div>
        </div>

      </div>

      {/* Additional Stats Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">মোট পিডিএফ ডাউনলোড সংখ্যা</h4>
            <p className="text-xs text-slate-500">পাঠকদের দ্বারা সর্বমোট ডাউনলোড হয়েছে</p>
          </div>
        </div>
        <div className="text-2xl font-extrabold text-purple-700 bg-purple-50 px-5 py-2 rounded-2xl">
          {totalDownloads.toLocaleString()} বার
        </div>
      </div>

      {/* Recent Books Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">সাম্প্রতিক যুক্ত হওয়া বইসমূহ</h3>
          <button
            onClick={() => onNavigateTab('books')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            সব দেখুন →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-6">বইয়ের নাম</th>
                <th className="py-3 px-6">লেখক</th>
                <th className="py-3 px-6">ক্যাটাগরি</th>
                <th className="py-3 px-6">স্ট্যাটাস</th>
                <th className="py-3 px-6 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {books.slice(0, 5).map((book) => (
                <tr key={book.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 flex items-center space-x-3">
                    <img 
                      src={book.cover_url} 
                      alt="" 
                      className="w-10 h-12 object-cover rounded-lg shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <span className="line-clamp-1">{book.title}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{book.author}</td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${book.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {book.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onEditBook(book)}
                      className="text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      সম্পাদনা
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
