import { useState, useEffect, useCallback } from 'react';
import { searchData, searchIndex, SearchItem } from '../lib/searchData';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('searchHistory');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    }
  }, []);

  const getCache = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem(key);
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  }, []);

  const setCache = useCallback((key: string, value: SearchItem[]) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, []);

  const addToHistory = useCallback((q: string) => {
    if (!q || history.includes(q)) return;
    const newHistory = [q, ...history].slice(0, 5);
    setHistory(newHistory);
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  }, [history]);

  const search = useCallback((q: string) => {
    console.log('Search function called with query:', q);
    if (!q) {
      setResults([]);
      setSuggestions([]);
      setError(null);
      console.log('Query is empty, resetting results');
      return;
    }

    const queryLower = q.toLowerCase();
    const cachedResults = getCache(queryLower);

    if (cachedResults) {
      setResults(cachedResults);
      setError(null);
      console.log('Found cached results:', cachedResults);
      return;
    }

    const start = performance.now();
    try {
      const matchedItems: SearchItem[] = [];
      Object.keys(searchIndex).forEach((key) => {
        if (key.includes(queryLower)) {
          matchedItems.push(...searchIndex[key]);
        }
      });

      if (!matchedItems.length) {
        const filtered = searchData.filter((item) =>
          item.title.toLowerCase().includes(queryLower)
        );
        matchedItems.push(...filtered);
      }

      if (matchedItems.length === 0) {
        setError('結果が見つかりませんでした。');
        console.log('No results found');
      } else {
        setError(null);
        addToHistory(queryLower);
        console.log('Results found:', matchedItems);
      }

      setResults(matchedItems);
      setCache(queryLower, matchedItems);
    } catch (err) {
      setError('検索中にエラーが発生しました。');
      setResults([]);
      console.error('Error during search:', err);
    }
    const end = performance.now();
    console.log(`Search took ${end - start}ms`);
  }, [getCache, setCache, addToHistory]);

  const suggest = useCallback((q: string) => {
    if (!q) {
      setSuggestions([]);
      return;
    }

    const queryLower = q.toLowerCase();
    const matchedSuggestions = searchData
      .filter((item) => item.title.toLowerCase().startsWith(queryLower))
      .map((item) => item.title)
      .slice(0, 3);

    setSuggestions(matchedSuggestions);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      suggest(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, suggest]);

  return { query, setQuery, results, suggestions, error, history, search };
};
