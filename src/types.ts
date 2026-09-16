export interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  year: number | string;
  language: string;
  description: string;
  cover_url: string;
  pdf_url: string;
  keywords: string;
  status: 'published' | 'draft';
  downloads_count?: number;
  reads_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  books_count?: number;
}

export type AdminTab = 'dashboard' | 'new-book' | 'books' | 'published' | 'drafts' | 'categories' | 'authors' | 'settings';
