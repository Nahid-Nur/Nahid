import React, { useState } from 'react';
import { Author, Book } from '../../types';
import { Users, Plus, Trash2 } from 'lucide-react';

interface AuthorsManagerProps {
  authors: Author[];
  books: Book[];
  onAddAuthor: (name: string, bio: string) => void;
  onDeleteAuthor: (id: string) => void;
}

export const AuthorsManager: React.FC<AuthorsManagerProps> = ({
  authors,
  books,
  onAddAuthor,
  onDeleteAuthor,
}) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddAuthor(name.trim(), bio.trim());
      setName('');
      setBio('');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">লেখক ব্যবস্থাপনা (Authors)</h2>
        <p className="text-sm text-slate-500 mt-1">লাইব্রেরির লেখক তালিকা ও সংক্ষিপ্ত জীবনী পরিচালনা করুন</p>
      </div>

      {/* Add Author Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-800">নতুন লেখক যুক্ত করুন</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">লেখকের নাম *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="উদাহরণ: বিভূতিভূষণ বন্দ্যোপাধ্যায়"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">লেখকের সংক্ষিপ্ত জীবনী (Bio)</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="লেখকের সাহিত্যকর্ম ও পরিচিতি..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>লেখক সংরক্ষণ করুন</span>
          </button>
        </form>
      </div>

      {/* Authors Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">সকল লেখক তালিকা</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {authors.map((author) => {
            const count = books.filter(b => b.author === author.name).length;
            return (
              <div key={author.id} className="p-5 sm:px-6 flex items-start justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{author.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">{author.bio || 'জীবনী দেওয়া হয়নি।'}</p>
                    <span className="inline-block mt-2 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      বই সংখ্যা: {count}টি
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`"${author.name}" লেখককে মুছে ফেলতে চান?`)) {
                      onDeleteAuthor(author.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
