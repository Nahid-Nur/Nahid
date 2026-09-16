import React, { useState, useEffect } from 'react';
import { Book, Category, Author, AdminTab } from './types';
import { 
  fetchBooks, 
  saveBook, 
  deleteBookRecord, 
  incrementBookStats,
  getLocalCategories,
  saveLocalCategories,
  getLocalAuthors,
  saveLocalAuthors
} from './lib/supabaseClient';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BookDetailModal } from './components/BookDetailModal';
import { PdfReaderModal } from './components/PdfReaderModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [currentView, setCurrentView] = useState<'home' | 'admin-login' | 'admin'>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  
  const [selectedBookDetail, setSelectedBookDetail] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      const data = await fetchBooks();
      setBooks(data);
      setCategories(getLocalCategories());
      setAuthors(getLocalAuthors());
    }
    loadData();

    // Check admin session
    const session = localStorage.getItem('allbookpdf_admin_session_v1');
    if (session) {
      setIsAdminLoggedIn(true);
    }

    // Check hash URL for admin routing
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/admin/login') {
        setCurrentView('admin-login');
      } else if (hash.startsWith('#/admin')) {
        if (session) {
          setCurrentView('admin');
        } else {
          setCurrentView('admin-login');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: 'home' | 'admin' | 'admin-login') => {
    setCurrentView(view);
    if (view === 'admin-login') {
      window.location.hash = '#/admin/login';
    } else if (view === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('allbookpdf_admin_session_v1');
    setIsAdminLoggedIn(false);
    handleNavigate('home');
  };

  const handleDownload = async (book: Book) => {
    await incrementBookStats(book.id, 'download');
    // Trigger download / open pdf url
    const link = document.createElement('a');
    link.href = book.pdf_url;
    link.target = '_blank';
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Refresh books count locally
    setBooks(await fetchBooks());
  };

  const handleReadOnline = async (book: Book) => {
    await incrementBookStats(book.id, 'read');
    setReadingBook(book);
    setBooks(await fetchBooks());
  };

  // Admin CRUD operations
  const handleSaveBook = async (bookData: any, status: 'published' | 'draft') => {
    const saved = await saveBook({ ...bookData, status });
    const updatedBooks = await fetchBooks();
    setBooks(updatedBooks);
    setEditingBook(null);
    setAdminTab('books');
    alert(status === 'published' ? 'বইটি সফলভাবে প্রকাশিত হয়েছে!' : 'বইটি ড্রাফট হিসেবে সংরক্ষিত হয়েছে!');
  };

  const handleDeleteBook = async (id: string) => {
    await deleteBookRecord(id);
    setBooks(await fetchBooks());
  };

  const handleToggleStatus = async (id: string) => {
    const book = books.find(b => b.id === id);
    if (book) {
      const newStatus = book.status === 'published' ? 'draft' : 'published';
      await saveBook({ ...book, status: newStatus });
      setBooks(await fetchBooks());
    }
  };

  const handleAddCategory = (catName: string) => {
    const newCat = { id: `cat-${Date.now()}`, name: catName, slug: catName.toLowerCase().replace(/\s+/g, '-') };
    const updated = [...categories, newCat];
    setCategories(updated);
    saveLocalCategories(updated);
  };

  const handleDeleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    saveLocalCategories(updated);
  };

  const handleAddAuthor = (name: string, bio: string) => {
    const newAuthor = { id: `auth-${Date.now()}`, name, bio };
    const updated = [...authors, newAuthor];
    setAuthors(updated);
    saveLocalAuthors(updated);
  };

  const handleDeleteAuthor = (id: string) => {
    const updated = authors.filter(a => a.id !== id);
    setAuthors(updated);
    saveLocalAuthors(updated);
  };

  // Render Admin Login
  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setCurrentView('admin');
          window.location.hash = '#/admin';
        }}
        onBackToHome={() => handleNavigate('home')}
      />
    );
  }

  // Render Admin Dashboard Layout
  if (currentView === 'admin' && isAdminLoggedIn) {
    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        books={books}
        categories={categories}
        authors={authors}
        onSaveBook={handleSaveBook}
        onDeleteBook={handleDeleteBook}
        onToggleStatus={handleToggleStatus}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddAuthor={handleAddAuthor}
        onDeleteAuthor={handleDeleteAuthor}
        editingBook={editingBook}
        onStartEditBook={(book) => setEditingBook(book)}
        onCancelEdit={() => setEditingBook(null)}
        onLogout={handleAdminLogout}
        onGoHome={() => handleNavigate('home')}
      />
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={handleAdminLogout}
      />

      <main className="flex-1">
        <HomeView
          books={books}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenDetail={(book) => setSelectedBookDetail(book)}
          onReadOnline={handleReadOnline}
          onDownload={handleDownload}
        />
      </main>

      <Footer
        categories={categories}
        onSelectCategory={(cat) => { setSelectedCategory(cat); handleNavigate('home'); }}
        onNavigate={handleNavigate}
      />

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBookDetail}
        onClose={() => setSelectedBookDetail(null)}
        onReadOnline={handleReadOnline}
        onDownload={handleDownload}
      />

      {/* PDF Reader Modal */}
      <PdfReaderModal
        book={readingBook}
        onClose={() => setReadingBook(null)}
        onDownload={handleDownload}
      />
    </div>
  );
}
