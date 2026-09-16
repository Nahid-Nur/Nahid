import React from 'react';
import { Book } from '../types';
import { BookOpen, Download, Eye, Calendar, User, Tag } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onOpenDetail: (book: Book) => void;
  onReadOnline: (book: Book) => void;
  onDownload: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onOpenDetail,
  onReadOnline,
  onDownload,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Cover Image Container */}
      <div 
        className="relative h-64 bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(book)}
      >
        <img
          src={book.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80'}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-medium bg-emerald-600/90 backdrop-blur-xs px-3 py-1 rounded-full flex items-center space-x-1">
            <Eye className="w-3.5 h-3.5" />
            <span>বিস্তারিত দেখুন</span>
          </span>
        </div>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full shadow-xs flex items-center space-x-1">
          <Tag className="w-3 h-3 text-emerald-600" />
          <span>{book.category}</span>
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{book.year || 'অজানা'}</span>
            </span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
              {book.language || 'বাংলা'}
            </span>
          </div>

          <h3 
            onClick={() => onOpenDetail(book)}
            className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
          >
            {book.title}
          </h3>

          <p className="text-sm text-slate-600 flex items-center space-x-1.5 line-clamp-1">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{book.author}</span>
          </p>

          <p className="text-xs text-slate-500 line-clamp-2 pt-1 leading-relaxed">
            {book.description || 'এই বইটির সংক্ষিপ্ত বিবরণ শীঘ্রই যুক্ত করা হবে।'}
          </p>
        </div>

        {/* Footer Stats & Actions */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1" title="ডাউনলোড সংখ্যা">
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{book.downloads_count || 0}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onReadOnline(book)}
              className="flex items-center space-x-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>পড়ুন</span>
            </button>
            <button
              onClick={() => onDownload(book)}
              className="flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ডাউনলোড</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
