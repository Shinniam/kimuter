import { SearchForm } from '../components/SearchForm';
import { ProxyForm } from '../components/ProxyForm';
import { useSearch } from '../hooks/useSearch';
import { useProxy } from '../hooks/useProxy';

export default function Home() {
  const { query, setQuery, results, suggestions, error: searchError, history, search } = useSearch();
  const { url, setUrl, openProxy, error: proxyError } = useProxy();

  const handleSearch = () => {
    search(query);
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Roboto, Arial, sans-serif',
        background: '#212121',
        color: '#B0BEC5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Incognitoアイコン（SVG） */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: '10px' }}
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM12 14C15.31 14 18 16.69 18 20H6C6 16.69 8.69 14 12 14Z"
            fill="#B0BEC5"
          />
        </svg>
        <h1 style={{ fontSize: '24px', margin: '0', color: '#E0E0E0' }}>Neo Search</h1>
        <p style={{ fontSize: '14px', color: '#90A4AE' }}>シークレットモード風検索</p>
      </div>
      <SearchForm
        query={query}
        setQuery={setQuery}
        results={results}
        suggestions={suggestions}
        error={searchError}
        history={history}
        onSearch={handleSearch}
      />
      <ProxyForm url={url} setUrl={setUrl} openProxy={openProxy} error={proxyError} />
    </div>
  );
}
