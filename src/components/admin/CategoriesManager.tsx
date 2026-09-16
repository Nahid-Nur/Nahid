import React, { useState } from 'react';
import { Category, Book } from '../../types';
import { Layers, Plus, Trash2 } from 'lucide-react';

interface CategoriesManagerProps {
  categories: Category[];
  books: Book[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({
  categories,
  books,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [newCatName, setNewCatName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim());
      setNewCatName('');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">ক্যাটাগরি ব্যবস্থাপনা (Categories)</h2>
        <p className="text-sm text-slate-500 mt-1">আপনার লাইব্রেরির সকল বইয়ের বিভাগসমূহ পরিচালনা করুন</p>
      </div>

      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-800 mb-4">নতুন ক্যাটাগরি যুক্ত করুন</h3>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="ক্যাটাগরির নাম (যেমন: ইতিহাস, বিজ্ঞান, ইসলামিক)..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>সংরক্ষণ করুন</span>
          </button>
        </form>
      </div>

      {/* Categories Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">সকল ক্যাটাগরি তালিকা</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {categories.map((cat) => {
            const count = books.filter(b => b.category === cat.name).length;
            return (
              <div key={cat.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{cat.name}</h4>
                    <span className="text-xs text-slate-400">স্লাগ: {cat.slug}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {count}টি বই
                  </span>
                  <button
                    onClick={() => {
                      if (confirm(`"${cat.name}" ক্যাটাগরি মুছে ফেলতে চান?`)) {
                        onDeleteCategory(cat.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
