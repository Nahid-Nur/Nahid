import React, { useState } from 'react';
import { Book } from '../types';
import { X, Download, ZoomIn, ZoomOut, BookOpen, ChevronLeft, ChevronRight, FileText, Info } from 'lucide-react';

interface PdfReaderModalProps {
  book: Book | null;
  onClose: () => void;
  onDownload: (book: Book) => void;
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({ book, onClose, onDownload }) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'pdf' | 'info'>('pdf');
  const totalPages = 15; // Simulated PDF pages for immersive online reader

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-md animate-fadeIn">
      {/* Top Header Bar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 text-white shrink-0">
        <div className="flex items-center space-x-3 truncate">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="truncate">
            <h3 className="text-sm font-bold truncate">{book.title}</h3>
            <p className="text-xs text-slate-400 truncate">{book.author}</p>
          </div>
        </div>

        {/* View Mode & Reader Controls */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('pdf')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${viewMode === 'pdf' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>পিডিএফ ভিউ</span>
          </button>
          <button
            onClick={() => setViewMode('info')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${viewMode === 'info' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>বইয়ের বিবরণ</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {viewMode === 'pdf' && (
            <div className="hidden sm:flex items-center space-x-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setZoom(z => Math.max(60, z - 10))}
                className="p-1.5 text-slate-300 hover:text-white"
                title="ছোট করুন"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(z => Math.min(180, z + 10))}
                className="p-1.5 text-slate-300 hover:text-white"
                title="বড় করুন"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => onDownload(book)}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">ডাউনলোড</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main PDF Viewer Stage */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950">
        {viewMode === 'pdf' ? (
          <div 
            className="bg-white text-slate-900 shadow-2xl rounded-xl transition-all duration-300 w-full max-w-5xl h-full min-h-[700px] flex flex-col relative overflow-hidden"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            {book.pdf_url ? (
              <iframe
                src={book.pdf_url}
                title={book.title}
                className="w-full h-full min-h-[700px] border-0"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-12 text-slate-500">
                <FileText className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-lg font-semibold">কোনো পিডিএফ ফাইল যুক্ত করা হয়নি</p>
                <button
                  onClick={() => onDownload(book)}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold"
                >
                  ডাউনলোড করুন
                </button>
              </div>
            )}
          </div>
        ) : (
          <div 
            className="bg-white text-slate-900 shadow-2xl rounded-xl transition-all duration-300 p-8 sm:p-16 max-w-2xl w-full min-h-[600px] flex flex-col justify-between relative"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-slate-200">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Allbookpdf ডিজিটাল রিডার</span>
                <h1 className="text-3xl font-bold text-slate-900 mt-2">{book.title}</h1>
                <p className="text-sm text-slate-600 mt-1">{book.author}</p>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed font-serif">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-700 first-letter:float-left first-letter:mr-3">
                  {book.description}
                </p>
                <p>
                  বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ সৃষ্টি এই গ্রন্থটি পাঠকসমাজে অত্যন্ত আদৃত। অলবুকপিডিএফ (Allbookpdf) লাইব্রেরির মাধ্যমে আপনি এটি অনলাইনে নির্বিঘ্নে পড়তে পারছেন অথবা এক ক্লিকেই সম্পূর্ণ পিডিএফ ফাইল ডাউনলোড করে সংরক্ষণ করতে পারছেন।
                </p>
                <p>
                  সাহিত্যের আলো ছড়াতে আমাদের এই ক্ষুদ্র প্রয়াস। আপনার বন্ধুদের সাথে শেয়ার করুন এবং লাইব্রেরির সাথেই থাকুন।
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
              <span>Allbookpdf Online Reader v2.5</span>
              <span>পৃষ্ঠা {currentPage}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

