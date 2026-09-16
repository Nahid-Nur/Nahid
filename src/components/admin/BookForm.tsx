import React, { useState, useEffect } from 'react';
import { Book, Category } from '../../types';
import { Upload, FileText, Image as ImageIcon, CheckCircle, ArrowLeft, Plus, Sparkles } from 'lucide-react';

interface BookFormProps {
  categories: Category[];
  initialBook?: Book | null;
  onSaveBook: (bookData: any, status: 'published' | 'draft') => void;
  onCancel: () => void;
  onAddNewCategory: (catName: string) => void;
}

export const BookForm: React.FC<BookFormProps> = ({
  categories,
  initialBook,
  onSaveBook,
  onCancel,
  onAddNewCategory,
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'উপন্যাস');
  const [newCatInput, setNewCatInput] = useState('');
  const [showNewCatModal, setShowNewCatModal] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [language, setLanguage] = useState('বাংলা');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title);
      setSlug(initialBook.slug);
      setAuthor(initialBook.author);
      setCategory(initialBook.category);
      setYear(initialBook.year);
      setLanguage(initialBook.language || 'বাংলা');
      setDescription(initialBook.description);
      setKeywords(initialBook.keywords);
      setCoverUrl(initialBook.cover_url);
      setPdfUrl(initialBook.pdf_url);
    }
  }, [initialBook]);

  // Auto-generate clean slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!initialBook) {
      // Create safe slug
      const generated = val
        .trim()
        .toLowerCase()
        .replace(/[^\w\s\u0980-\u09FF-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generated || `book-${Date.now()}`);
    }
  };

  // Simulate file upload with file reader / object url or mock storage
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingCover(true);
      setTimeout(() => {
        // Create local object URL or mock cloud url
        const fakeUrl = URL.createObjectURL(file);
        setCoverUrl(fakeUrl);
        setUploadingCover(false);
      }, 800);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingPdf(true);
      setTimeout(() => {
        const fakeUrl = URL.createObjectURL(file);
        setPdfUrl(fakeUrl);
        setUploadingPdf(false);
      }, 1000);
    }
  };

  const handleSubmit = (status: 'published' | 'draft') => {
    if (!title.trim() || !author.trim()) {
      alert('দয়া করে বইয়ের নাম এবং লেখকের নাম লিখুন।');
      return;
    }

    const payload = {
      ...(initialBook ? { id: initialBook.id } : {}),
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      author,
      category,
      year,
      language,
      description,
      keywords,
      cover_url: coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      pdf_url: pdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status,
      downloads_count: initialBook ? initialBook.downloads_count : 0,
      reads_count: initialBook ? initialBook.reads_count : 0,
    };

    onSaveBook(payload, status);
  };

  const handleAddNewCategorySubmit = () => {
    if (newCatInput.trim()) {
      onAddNewCategory(newCatInput.trim());
      setCategory(newCatInput.trim());
      setNewCatInput('');
      setShowNewCatModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onCancel}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-emerald-700 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>তালিকায় ফিরে যান</span>
        </button>
        <h2 className="text-2xl font-bold text-slate-900">
          {initialBook ? 'বই সম্পাদনা করুন (Edit Book)' : 'নতুন বই যোগ করুন (Add New Book)'}
        </h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-8">
        
        {/* Row 1: Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              বইয়ের নাম (Book Title) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="উদাহরণ: পথের পাঁচালী"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              ইউআরএল স্লাগ (Slug)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="pother-panchali"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Row 2: Author & Category & Year */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              লেখক (Author) *
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="বিভূতিভূষণ বন্দ্যোপাধ্যায়"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                ক্যাটাগরি (Category) *
              </label>
              <button
                type="button"
                onClick={() => setShowNewCatModal(!showNewCatModal)}
                className="text-xs text-emerald-600 hover:underline font-semibold flex items-center space-x-0.5"
              >
                <Plus className="w-3 h-3" />
                <span>নতুন ক্যাটাগরি</span>
              </button>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              প্রকাশকাল (Publication Year)
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="১৯২৯"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* New Category Input Modal / Box if triggered */}
        {showNewCatModal && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3">
            <input
              type="text"
              value={newCatInput}
              onChange={(e) => setNewCatInput(e.target.value)}
              placeholder="নতুন ক্যাটাগরির নাম লিখুন (যেমন: রোমান্স)..."
              className="flex-1 px-4 py-2 bg-white border border-emerald-300 rounded-xl text-sm"
            />
            <button
              type="button"
              onClick={handleAddNewCategorySubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xs"
            >
              সংরক্ষণ
            </button>
            <button
              type="button"
              onClick={() => setShowNewCatModal(false)}
              className="text-slate-500 hover:text-slate-700 text-sm font-semibold px-2"
            >
              বাতিল
            </button>
          </div>
        )}

        {/* Row 3: Upload Cover & PDF File */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Cover Upload */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
              বইয়ের কভার ইমেজ (JPG, PNG, WebP)
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-28 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                {coverUrl ? (
                  <img src={coverUrl} alt="Cover preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleCoverUpload}
                  className="hidden"
                  id="cover-upload-input"
                />
                <label
                  htmlFor="cover-upload-input"
                  className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>{uploadingCover ? 'আপলোড হচ্ছে...' : 'কভার পরিবর্তন করুন'}</span>
                </label>
                <input
                  type="text"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="বা ইমেজ URL দিন..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* PDF File Upload */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
              পিডিএফ ফাইল (PDF File)
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-28 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0 text-slate-500">
                <FileText className="w-8 h-8 text-red-500 mb-1" />
                <span className="text-[10px] font-bold">PDF</span>
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="pdf-upload-input"
                />
                <label
                  htmlFor="pdf-upload-input"
                  className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-red-600" />
                  <span>{uploadingPdf ? 'আপলোড হচ্ছে...' : 'পিডিএফ আপলোড করুন'}</span>
                </label>
                <input
                  type="text"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="বা পিডিএফ URL দিন..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 truncate"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Row 4: Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
            বইয়ের বিবরণ (Description)
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="বইটি সম্পর্কে বিস্তারিত লিখুন..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        {/* Row 5: SEO Keywords */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
            এসইও কিওয়ার্ড (SEO Keywords)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="বাংলা বই, বাংলা PDF, বাংলা উপন্যাস, বিভূতিভূষণ"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-sm shadow-md transition-all"
          >
            Draft হিসেবে সংরক্ষণ করুন
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>বই প্রকাশ করুন</span>
          </button>
        </div>

      </div>
    </div>
  );
};
