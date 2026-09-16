import React, { useState } from 'react';
import { BookOpen, Search, ShieldCheck, Menu, X, BookMarked, Layers, User, LogOut } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catSlug: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (view: 'home' | 'admin' | 'admin-login') => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigate,
  isAdminLoggedIn,
  onAdminLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { onNavigate('home'); onSelectCategory('all'); }}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
                Allbookpdf
              </span>
              <span className="block text-xs font-medium text-slate-500 tracking-wider">
                বাংলা ইবুক ও পিডিএফ লাইব্রেরি
              </span>
            </div>
          </div>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center space-x-6 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="বইয়ের নাম, লেখক বা কিওয়ার্ড দিয়ে খুঁজুন..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center space-x-1.5 text-slate-700 hover:text-emerald-700 font-medium text-sm px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>বিভাগসমূহ</span>
              </button>

              {categoryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
                  <button
                    onClick={() => { onSelectCategory('all'); setCategoryDropdownOpen(false); onNavigate('home'); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 ${selectedCategory === 'all' ? 'font-semibold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    সকল বই (All Books)
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { onSelectCategory(cat.name); setCategoryDropdownOpen(false); onNavigate('home'); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 ${selectedCategory === cat.name ? 'font-semibold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>অ্যাডমিন ড্যাশবোর্ড</span>
                </button>
                <button
                  onClick={onAdminLogout}
                  title="লগআউট"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('admin-login')}
                className="flex items-center space-x-1.5 border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>অ্যাডমিন লগইন</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile search input */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="বই বা লেখকের নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2">বিভাগসমূহ</div>
          <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
            <button
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); onNavigate('home'); }}
              className={`text-left px-3 py-1.5 rounded-lg text-sm ${selectedCategory === 'all' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'}`}
            >
              সকল বই
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { onSelectCategory(cat.name); setMobileMenuOpen(false); onNavigate('home'); }}
                className={`text-left px-3 py-1.5 rounded-lg text-sm truncate ${selectedCategory === cat.name ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col space-y-2">
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center space-x-2 bg-emerald-600 text-white w-full py-2.5 rounded-xl font-medium text-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>অ্যাডমিন ড্যাশবোর্ড</span>
                </button>
                <button
                  onClick={() => { onAdminLogout(); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 w-full py-2.5 rounded-xl font-medium text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>লগআউট</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => { onNavigate('admin-login'); setMobileMenuOpen(false); }}
                className="flex items-center justify-center space-x-2 border border-slate-300 text-slate-700 w-full py-2.5 rounded-xl font-medium text-sm"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>অ্যাডমিন লগইন</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
