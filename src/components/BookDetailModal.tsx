import React from 'react';
import { Book } from '../types';
import { X, BookOpen, Download, Calendar, User, Tag, Globe, FileText, CheckCircle2 } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onReadOnline: (book: Book) => void;
  onDownload: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onReadOnline,
  onDownload,
}) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-slate-100 rounded-full text-slate-600 shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Cover & Quick Actions */}
        <div className="md:w-5/12 bg-slate-50 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-6 bg-slate-200">
            <img
              src={book.cover_url}
              alt={book.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={() => { onReadOnline(book); onClose(); }}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-semibold shadow-md transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>অনলাইনে পড়ুন (Read Online)</span>
            </button>
            <button
              onClick={() => { onDownload(book); }}
              className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-semibold shadow-md transition-all"
            >
              <Download className="w-5 h-5" />
              <span>পিডিএফ ডাউনলোড (Download PDF)</span>
            </button>
          </div>
        </div>

        {/* Right: Full Details */}
        <div className="md:w-7/12 p-6 md:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1 border border-emerald-200/60">
                <Tag className="w-3 h-3 text-emerald-600" />
                <span>{book.category}</span>
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                <Globe className="w-3 h-3 text-slate-500" />
                <span>{book.language || 'বাংলা'}</span>
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>প্রকাশকাল: {book.year || 'অজানা'}</span>
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {book.title}
            </h2>

            <p className="text-base font-medium text-emerald-700 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>লেখক: {book.author}</span>
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">বইয়ের বিবরণ</h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {book.description || 'এই বইটির বিস্তারিত বিবরণ এখনো যুক্ত করা হয়নি।'}
              </p>
            </div>

            {book.keywords && (
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">কিওয়ার্ডসমূহ</h4>
                <div className="flex flex-wrap gap-1.5">
                  {book.keywords.split(',').map((kw, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg">
                      #{kw.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>ফরম্যাট: PDF (সুরক্ষিত ও যাচাইকৃত)</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>১০০% ফ্রি ডাউনলোড</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
