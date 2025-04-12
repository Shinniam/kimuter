import { useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { ProxyForm } from '../components/ProxyForm';
import { useSearch } from '../hooks/useSearch';
import { useProxy } from '../hooks/useProxy';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { query, setQuery, results, suggestions, error: searchError, history, search } = useSearch();
  const { url, setUrl, openProxy, error: proxyError } = useProxy();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = () => {
    search(query); // 明示的に検索を実行
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Neo Search</h1>
      <button onClick={toggleTheme} style={{ marginBottom: '10px', padding: '5px' }}>
        {theme === 'light' ? 'ダークモード' : 'ライトモード'}
      </button>
      <SearchForm
        query={query}
        setQuery={setQuery}
        results={results}
        suggestions={suggestions}
        error={searchError}
        history={history}
        onSearch={handleSearch} // onSearchを渡す
      />
      <ProxyForm url={url} setUrl={setUrl} openProxy={openProxy} error={proxyError} />
    </div>
  );
}
