import { useState, KeyboardEvent } from 'react';
import { SearchItem } from '../lib/searchData';

type SearchFormProps = {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
  suggestions: string[];
  error: string | null;
  history: string[];
};

export const SearchForm = ({ query, setQuery, results, suggestions, error, history }: SearchFormProps) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const [preview, setPreview] = useState<string | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
      setQuery(suggestions[selectedSuggestion]);
      setSelectedSuggestion(-1);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="検索（日本語・英語）"
        style={{ width: '200px', padding: '5px', marginRight: '5px' }}
      />

      {suggestions.length > 0 && (
        <ul style={{ position: 'absolute', background: '#fff', border: '1px solid #ccc', padding: 0, margin: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(suggestion);
                setSelectedSuggestion(-1);
              }}
              style={{
                padding: '5px',
                cursor: 'pointer',
                background: index === selectedSuggestion ? '#e0e0e0' : '#fff',
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <ul style={{ padding: 0, margin: '10px 0' }}>
          {results.map((result, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`/api/proxy?url=${encodeURIComponent(result.link)}`, '_blank');
                }}
                onMouseEnter={() => setPreview(result.link)}
                onMouseLeave={() => setPreview(null)}
                style={{ color: '#1a0dab', textDecoration: 'none' }}
              >
                {result.title}
              </a>
              {preview === result.link && (
                <div style={{ position: 'absolute', background: '#f0f0f0', padding: '5px' }}>
                  {result.link}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && !query && (
        <div style={{ margin: '10px 0' }}>
          <h3 style={{ fontSize: '14px', margin: '5px 0' }}>検索履歴</h3>
          <ul style={{ padding: 0, margin: 0 }}>
            {history.map((item, index) => (
              <li
                key={index}
                onClick={() => setQuery(item)}
                style={{ cursor: 'pointer', color: '#666', marginBottom: '5px' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}
    </div>
  );
};
