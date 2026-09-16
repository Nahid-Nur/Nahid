import React from 'react';
import { AdminTab, Book, Category, Author } from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { BookForm } from './BookForm';
import { BookList } from './BookList';
import { CategoriesManager } from './CategoriesManager';
import { AuthorsManager } from './AuthorsManager';
import { SettingsView } from './SettingsView';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  Layers, 
  Users, 
  Settings, 
  LogOut, 
  Globe,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  books: Book[];
  categories: Category[];
  authors: Author[];
  onSaveBook: (bookData: any, status: 'published' | 'draft') => void;
  onDeleteBook: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: string) => void;
  onAddAuthor: (name: string, bio: string) => void;
  onDeleteAuthor: (id: string) => void;
  editingBook: Book | null;
  onStartEditBook: (book: Book) => void;
  onCancelEdit: () => void;
  onLogout: () => void;
  onGoHome: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  books,
  categories,
  authors,
  onSaveBook,
  onDeleteBook,
  onToggleStatus,
  onAddCategory,
  onDeleteCategory,
  onAddAuthor,
  onDeleteAuthor,
  editingBook,
  onStartEditBook,
  onCancelEdit,
  onLogout,
  onGoHome,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard' as AdminTab, label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { id: 'new-book' as AdminTab, label: 'নতুন বই যোগ করুন', icon: PlusCircle },
    { id: 'books' as AdminTab, label: 'সকল বই', icon: BookOpen },
    { id: 'published' as AdminTab, label: 'প্রকাশিত বই', icon: CheckCircle },
    { id: 'drafts' as AdminTab, label: 'ড্রাফট বই', icon: FileText },
    { id: 'categories' as AdminTab, label: 'ক্যাটাগরি', icon: Layers },
    { id: 'authors' as AdminTab, label: 'লেখক', icon: Users },
    { id: 'settings' as AdminTab, label: 'সেটিংস', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold">A</div>
          <span className="font-bold text-lg">Allbookpdf Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 flex flex-col justify-between transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 space-y-6">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 pb-6 border-b border-slate-800">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-wide">Allbookpdf</span>
              <span className="block text-[11px] text-emerald-400 font-medium">অ্যাডমিন কন্ট্রোল প্যানেল</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onSelectTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-slate-800 space-y-3">
          <button
            onClick={onGoHome}
            className="w-full flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>ওয়েবসাইট দেখুন</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {currentTab === 'dashboard' && (
          <AdminDashboard
            books={books}
            categories={categories}
            authors={authors}
            onNavigateTab={onSelectTab}
            onEditBook={(book) => { onStartEditBook(book); onSelectTab('new-book'); }}
          />
        )}

        {currentTab === 'new-book' && (
          <BookForm
            categories={categories}
            initialBook={editingBook}
            onSaveBook={onSaveBook}
            onCancel={() => { onCancelEdit(); onSelectTab('books'); }}
            onAddNewCategory={onAddCategory}
          />
        )}

        {currentTab === 'books' && (
          <BookList
            books={books}
            filterStatus="all"
            onEditBook={(book) => { onStartEditBook(book); onSelectTab('new-book'); }}
            onDeleteBook={onDeleteBook}
            onToggleStatus={onToggleStatus}
            onAddNew={() => { onCancelEdit(); onSelectTab('new-book'); }}
          />
        )}

        {currentTab === 'published' && (
          <BookList
            books={books}
            filterStatus="published"
            onEditBook={(book) => { onStartEditBook(book); onSelectTab('new-book'); }}
            onDeleteBook={onDeleteBook}
            onToggleStatus={onToggleStatus}
            onAddNew={() => { onCancelEdit(); onSelectTab('new-book'); }}
          />
        )}

        {currentTab === 'drafts' && (
          <BookList
            books={books}
            filterStatus="draft"
            onEditBook={(book) => { onStartEditBook(book); onSelectTab('new-book'); }}
            onDeleteBook={onDeleteBook}
            onToggleStatus={onToggleStatus}
            onAddNew={() => { onCancelEdit(); onSelectTab('new-book'); }}
          />
        )}

        {currentTab === 'categories' && (
          <CategoriesManager
            categories={categories}
            books={books}
            onAddCategory={onAddCategory}
            onDeleteCategory={onDeleteCategory}
          />
        )}

        {currentTab === 'authors' && (
          <AuthorsManager
            authors={authors}
            books={books}
            onAddAuthor={onAddAuthor}
            onDeleteAuthor={onDeleteAuthor}
          />
        )}

        {currentTab === 'settings' && <SettingsView />}
      </main>

    </div>
  );
};
