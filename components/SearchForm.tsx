import { useState, KeyboardEvent } from 'react';
import { SearchItem } from '../lib/searchData';

type SearchFormProps = {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
  suggestions: string[];
  error: string | null;
  history: string[];
  onSearch: () => void;
};

export const SearchForm = ({ query, setQuery, results, suggestions, error, history, onSearch }: SearchFormProps) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const [preview, setPreview] = useState<string | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (selectedSuggestion >= 0) {
        setQuery(suggestions[selectedSuggestion]);
        setSelectedSuggestion(-1);
      } else {
        console.log('Enter key pressed, triggering search');
        onSearch();
      }
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="検索（日本語・英語）"
          style={{
            width: '100%',
            padding: '10px',
            background: '#424242',
            color: '#E0E0E0',
            border: '1px solid #616161',
            borderRadius: '4px 0 0 4px',
            outline: 'none',
            fontSize: '16px',
          }}
        />
        <button
          onClick={() => {
            console.log('Go button clicked, triggering search');
            onSearch();
          }}
          style={{
            padding: '10px 20px',
            background: '#616161',
            color: '#E0E0E0',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Go
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            background: '#424242',
            border: '1px solid #616161',
            padding: 0,
            margin: 0,
            width: '100%',
            maxWidth: '600px',
            borderRadius: '4px',
            zIndex: 10,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(suggestion);
                setSelectedSuggestion(-1);
                console.log('Suggestion selected, triggering search');
                onSearch();
              }}
              style={{
                padding: '10px',
                cursor: 'pointer',
                background: index === selectedSuggestion ? '#616161' : '#424242',
                color: '#E0E0E0',
                borderBottom: '1px solid #616161',
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <ul style={{ padding: 0, margin: '20px 0' }}>
          {results.map((result, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Result link clicked:', result.link);
                  window.open(`/api/proxy?url=${encodeURIComponent(result.link)}`, '_blank');
                }}
                onMouseEnter={() => setPreview(result.link)}
                onMouseLeave={() => setPreview(null)}
                style={{ color: '#BBDEFB', textDecoration: 'none', fontSize: '18px' }}
              >
                {result.title}
              </a>
              {preview === result.link && (
                <div style={{ background: '#424242', padding: '5px', color: '#90A4AE', fontSize: '14px' }}>
                  {result.link}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && !query && (
        <div style={{ margin: '20px 0' }}>
          <h3 style={{ fontSize: '16px', margin: '5px 0', color: '#E0E0E0' }}>検索履歴</h3>
          <ul style={{ padding: 0, margin: 0 }}>
            {history.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(item);
                  console.log('History item selected, triggering search');
                  onSearch();
                }}
                style={{ cursor: 'pointer', color: '#90A4AE', marginBottom: '5px', fontSize: '14px' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p style={{ color: '#EF5350', margin: '5px 0' }}>{error}</p>}
    </div>
  );
};
