import React from 'react';
import { BookOpen, Heart, Mail, ShieldCheck } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (cat: string) => void;
  onNavigate: (view: 'home' | 'admin-login') => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, onSelectCategory, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">Allbookpdf</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              বাংলা সাহিত্যের ক্লাসিক, উপন্যাস, কবিতা ও শিক্ষামূলক ইবুক পড়ুন অনলাইনে অথবা বিনামূল্যে ডাউনলোড করুন নিরাপদ পিডিএফ ফরম্যাটে।
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('admin-login')}
                className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>অ্যাডমিন পোর্টাল</span>
              </button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base border-l-2 border-emerald-500 pl-3">জনপ্রিয় বিভাগ</h3>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => { onSelectCategory(cat.name); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-400 transition-colors text-slate-400 hover:translate-x-1 transform inline-block duration-200"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base border-l-2 border-emerald-500 pl-3">অন্যান্য ক্যাটাগরি</h3>
            <ul className="space-y-2 text-sm">
              {categories.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => { onSelectCategory(cat.name); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-400 transition-colors text-slate-400 hover:translate-x-1 transform inline-block duration-200"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About / Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base border-l-2 border-emerald-500 pl-3">যোগাযোগ ও তথ্য</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              আমাদের লক্ষ্য বাংলা বই বিশ্ববাসীর কাছে পৌঁছে দেওয়া। কোনো কপিরাইট সমস্যা থাকলে আমাদের ইমেইল করুন।
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>support@allbookpdf.com</span>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Allbookpdf. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center space-x-1 mt-3 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for Bengali readers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
