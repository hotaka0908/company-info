'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import QuickButtons from '@/components/QuickButtons';

interface SearchResult {
  query: string;
  answer: string;
}

export default function Home() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '検索に失敗しました');
      }

      setSearchResult({
        query,
        answer: data.answer,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索中にエラーが発生しました');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickButtonClick = (query: string) => {
    handleSearch(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              会社情報検索
            </h1>
            <p className="text-gray-600 text-lg">
              AIが会社の情報をわかりやすく教えます
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          {!searchResult && (
            <QuickButtons onButtonClick={handleQuickButtonClick} />
          )}

          {error && (
            <div className="w-full max-w-3xl mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">エラー: {error}</p>
            </div>
          )}

          {searchResult && (
            <div className="w-full max-w-3xl mt-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-sm text-gray-500 mb-2">質問</h2>
                  <p className="text-xl font-semibold text-gray-800">
                    {searchResult.query}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-500 mb-3">回答</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {searchResult.answer}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSearchResult(null)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    ← 新しい質問をする
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>AI会社情報検索システム</p>
      </footer>
    </div>
  );
}
