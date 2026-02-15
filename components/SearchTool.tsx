
import React, { useState } from 'react';
import { performCommunitySearch } from '../services/geminiService';
import { SearchResult } from '../types';

const SearchTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const res = await performCommunitySearch(query);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-itemEnter">
      <div className="px-2">
        <h2 className="text-2xl font-bold text-gray-800">חיפוש קהילתי חכם</h2>
        <p className="text-gray-500 text-sm">שאל על זמני שבת, מתכונים או מידע מקומי</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="למשל: מה זמני כניסת שבת בחיפה?"
          className="w-full bg-white border border-gray-200 rounded-2xl py-4 pr-12 pl-4 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all group-hover:shadow-md"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <button 
          disabled={loading}
          type="submit"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all"
        >
          {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : 'חפש'}
        </button>
      </form>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium animate-pulse">מחפש בתוצאות גוגל...</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4 animate-itemEnter">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 leading-relaxed text-gray-800">
            <h3 className="text-indigo-900 font-bold mb-3 flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                תשובה חכמה
            </h3>
            <div className="whitespace-pre-wrap">{result.text}</div>
          </div>

          {result.links.length > 0 && (
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-blue-900 font-bold mb-4 text-sm flex items-center gap-2">
                <i className="fa-brands fa-google"></i>
                תוצאות ומקורות מגוגל:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {result.links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-100 hover:border-blue-400 hover:shadow-sm transition-all group"
                  >
                    <span className="text-blue-700 text-sm font-medium truncate ml-4">{link.title}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-blue-300 group-hover:text-blue-600 text-xs"></i>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTool;
