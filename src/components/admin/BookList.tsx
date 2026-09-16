import React, { useState } from 'react';
import { Book } from '../../types';
import { Search, Edit3, Trash2, Eye, CheckCircle, FileText, PlusCircle } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onAddNew: () => void;
  filterStatus?: 'all' | 'published' | 'draft';
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onEditBook,
  onDeleteBook,
  onToggleStatus,
  onAddNew,
  filterStatus = 'all',
}) => {
  const [search, setSearch] = useState('');

  const filtered = books.filter(b => {
    if (filterStatus === 'published' && b.status !== 'published') return false;
    if (filterStatus === 'draft' && b.status !== 'draft') return false;

    const q = search.toLowerCase();
    return !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {filterStatus === 'published' ? 'প্রকাশিত বইসমূহ (Published Books)' : filterStatus === 'draft' ? 'ড্রাফট বইসমূহ (Draft Books)' : 'সকল বই ব্যবস্থাপনা (All Books)'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">মোট {filtered.length}টি বই পাওয়া গেছে</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="বই খুঁজুন..."
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={onAddNew}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>নতুন বই</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-6">বইয়ের নাম</th>
                <th className="py-3 px-6">লেখক</th>
                <th className="py-3 px-6">ক্যাটাগরি</th>
                <th className="py-3 px-6">প্রকাশকাল</th>
                <th className="py-3 px-6">স্ট্যাটাস</th>
                <th className="py-3 px-6 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    কোনো বই পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filtered.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 flex items-center space-x-3">
                      <img 
                        src={book.cover_url} 
                        alt="" 
                        className="w-10 h-12 object-cover rounded-lg shadow-xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="line-clamp-1">{book.title}</span>
                        <span className="text-xs text-slate-400 block font-normal">{book.language || 'বাংলা'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{book.author}</td>
                    <td className="py-4 px-6">
                      <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{book.year || '-'}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => onToggleStatus(book.id)}
                        className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors inline-flex items-center space-x-1 ${book.status === 'published' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
                      >
                        <span>{book.status === 'published' ? 'Published (Click to Draft)' : 'Draft (Click to Publish)'}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => onEditBook(book)}
                        title="সম্পাদনা করুন"
                        className="p-2 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-xl transition-colors inline-flex"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`"${book.title}" বইটি মুছে ফেলতে চান?`)) {
                            onDeleteBook(book.id);
                          }
                        }}
                        title="মুছে ফেলুন"
                        className="p-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors inline-flex"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
