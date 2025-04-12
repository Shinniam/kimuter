type ProxyFormProps = {
  url: string;
  setUrl: (url: string) => void;
  openProxy: () => void;
  error: string | null;
};

export const ProxyForm = ({ url, setUrl, openProxy, error }: ProxyFormProps) => {
  return (
    <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
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
          onClick={openProxy}
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
      {error && <p style={{ color: '#EF5350', margin: '5px 0' }}>{error}</p>}
    </div>
  );
};
