import React, { useState } from 'react';
import { getSupabaseConfig, saveSupabaseConfig } from '../../lib/supabaseClient';
import { Database, Key, CheckCircle2, Copy, Shield, Server } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const current = getSupabaseConfig();
  const [supabaseUrl, setSupabaseUrl] = useState(current.url);
  const [supabaseKey, setSupabaseKey] = useState(current.key);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(supabaseUrl.trim(), supabaseKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // Reload to apply client
    window.location.reload();
  };

  const sqlSchema = `
-- Supabase Database Schema for Allbookpdf

CREATE TABLE IF NOT EXISTS books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT,
  language TEXT DEFAULT 'বাংলা',
  description TEXT,
  cover_url TEXT,
  pdf_url TEXT,
  keywords TEXT,
  status TEXT CHECK (status IN ('published', 'draft')) DEFAULT 'published',
  downloads_count INTEGER DEFAULT 0,
  reads_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_books_slug ON books(slug);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);

-- Enable Row Level Security (RLS)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published books
CREATE POLICY "Public read published books" ON books
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

-- Allow authenticated admin users to insert, update, delete
CREATE POLICY "Admin full access" ON books
  FOR ALL USING (auth.role() = 'authenticated');
  `.trim();

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">সিস্টেম সেটিংস ও ডাটাবেস (Settings)</h2>
        <p className="text-sm text-slate-500 mt-1">Supabase কনফিগারেশন এবং ডাটাবেস স্কিমা ব্যবস্থাপনা</p>
      </div>

      {/* Supabase Connection Form */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Supabase প্রজেক্ট কানেকশন</h3>
            <p className="text-xs text-slate-500">আপনার Supabase প্রজেক্টের URL এবং Anon / Public Key দিন</p>
          </div>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>সফলভাবে সেটিংস সংরক্ষিত হয়েছে! পেজ রিলোড হচ্ছে...</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Supabase Project URL
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://xyzproject.supabase.co"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Supabase Anon / Public Key
            </label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsIn..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all"
          >
            <Key className="w-4 h-4" />
            <span>কানেকশন সংরক্ষণ করুন</span>
          </button>
        </form>
      </div>

      {/* Supabase SQL Schema Box (Section 7 prompt requirement) */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">ডাটাবেস SQL স্কিমা (Supabase PostgreSQL SQL Schema)</h3>
              <p className="text-xs text-slate-500">Supabase SQL Editor-এ এই কোড রান করে টেবিল তৈরি করুন</p>
            </div>
          </div>
          <button
            onClick={handleCopySql}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'কপি হয়েছে!' : 'স্কিমা কপি করুন'}</span>
          </button>
        </div>

        <pre className="bg-slate-900 text-slate-200 p-6 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
          {sqlSchema}
        </pre>
      </div>

    </div>
  );
};
