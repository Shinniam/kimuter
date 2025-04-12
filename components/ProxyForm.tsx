type ProxyFormProps = {
  url: string;
  setUrl: (url: string) => void;
  openProxy: () => void;
  error: string | null;
};

export const ProxyForm = ({ url, setUrl, openProxy, error }: ProxyFormProps) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        style={{ width: '200px', padding: '5px', marginRight: '5px' }}
      />
      <button onClick={openProxy} style={{ padding: '5px' }}>
        Go
      </button>
      {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}
    </div>
  );
};
