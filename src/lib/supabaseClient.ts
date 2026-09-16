import { createClient } from '@supabase/supabase-js';
import { Book, Category, Author } from '../types';
import { INITIAL_BOOKS, INITIAL_CATEGORIES, INITIAL_AUTHORS } from '../data/mockBooks';

// Helper to get Supabase config from localStorage or fallback
export function getSupabaseConfig() {
  const url = localStorage.getItem('allbookpdf_supabase_url') || '';
  const key = localStorage.getItem('allbookpdf_supabase_key') || '';
  return { url, key };
}

export function saveSupabaseConfig(url: string, key: string) {
  localStorage.setItem('allbookpdf_supabase_url', url);
  localStorage.setItem('allbookpdf_supabase_key', key);
}

const { url, key } = getSupabaseConfig();

// Initialize Supabase client if credentials exist, otherwise dummy client
export const supabase = (url && key) ? createClient(url, key) : null;

// LocalStorage Persistence manager for offline / demo mode & seamless fallback
const STORAGE_KEYS = {
  BOOKS: 'allbookpdf_books_v1',
  CATEGORIES: 'allbookpdf_categories_v1',
  AUTHORS: 'allbookpdf_authors_v1',
  ADMIN_SESSION: 'allbookpdf_admin_session_v1',
};

export function getLocalBooks(): Book[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_BOOKS;
  }
}

export function saveLocalBooks(books: Book[]) {
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
}

export function getLocalCategories(): Category[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveLocalCategories(cats: Category[]) {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cats));
}

export function getLocalAuthors(): Author[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AUTHORS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.AUTHORS, JSON.stringify(INITIAL_AUTHORS));
      return INITIAL_AUTHORS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_AUTHORS;
  }
}

export function saveLocalAuthors(authors: Author[]) {
  localStorage.setItem(STORAGE_KEYS.AUTHORS, JSON.stringify(authors));
}

// Database helper functions (works with Supabase if connected, falls back to LocalStorage)
export async function fetchBooks(): Promise<Book[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return data as Book[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }
  return getLocalBooks();
}

export async function saveBook(bookData: Omit<Book, 'id' | 'created_at' | 'updated_at'> & { id?: string }): Promise<Book> {
  const now = new Date().toISOString();
  const id = bookData.id || `book-${Date.now()}`;
  const fullBook: Book = {
    ...bookData,
    id,
    downloads_count: bookData.downloads_count || 0,
    reads_count: bookData.reads_count || 0,
    created_at: now,
    updated_at: now,
  };

  if (supabase) {
    try {
      const { error } = await supabase.from('books').upsert([fullBook]);
      if (error) throw error;
      return fullBook;
    } catch (err) {
      console.warn('Supabase save failed, saving locally:', err);
    }
  }

  const books = getLocalBooks();
  const index = books.findIndex(b => b.id === id);
  if (index >= 0) {
    books[index] = { ...books[index], ...bookData, updated_at: now };
  } else {
    books.unshift(fullBook);
  }
  saveLocalBooks(books);
  return fullBook;
}

export async function deleteBookRecord(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.warn('Supabase delete failed:', err);
    }
  }

  const books = getLocalBooks();
  const filtered = books.filter(b => b.id !== id);
  saveLocalBooks(filtered);
  return true;
}

export async function incrementBookStats(id: string, type: 'download' | 'read') {
  const books = getLocalBooks();
  const book = books.find(b => b.id === id);
  if (book) {
    if (type === 'download') book.downloads_count = (book.downloads_count || 0) + 1;
    if (type === 'read') book.reads_count = (book.reads_count || 0) + 1;
    saveLocalBooks(books);
  }

  if (supabase) {
    try {
      const field = type === 'download' ? 'downloads_count' : 'reads_count';
      const current = book ? (book[field] || 0) : 1;
      await supabase.from('books').update({ [field]: current }).eq('id', id);
    } catch (e) {
      console.warn('Failed updating stats in Supabase:', e);
    }
  }
}
