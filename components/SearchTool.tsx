
import React, { useState } from 'react';
import { performCommunitySearch } from '../services/geminiService';
import { SearchResult } from '../types';

const SearchTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    const res = await performCommunitySearch(query);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-itemEnter">
      <h2 className="text-2xl font-bold">חיפוש מידע קהילתי</h2>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          placeholder="למשל: זמני שבת השבוע או מתכון לחלה" 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          className="flex-grow p-4 bg-white rounded-2xl border border-gray-100 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500" 
        />
        <button className="bg-indigo-600 text-white px-6 rounded-2xl">{loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-search"></i>}</button>
      </form>

      {result && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.text}</p>
          </div>
          <div className="grid gap-2">
            {result.links.map((l, i) => (
              <a key={i} href={l.uri} target="_blank" className="bg-indigo-50 p-3 rounded-xl text-indigo-700 text-xs font-bold flex justify-between items-center">
                {l.title} <i className="fa-solid fa-external-link"></i>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTool;
