import { useState } from 'react';

export const useProxy = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const openProxy = () => {
    if (!url) {
      setError('URLを入力してください。');
      return;
    }

    try {
      const encodedUrl = encodeURIComponent(url);
      window.open(`/api/proxy?url=${encodedUrl}`, '_blank');
      setError(null);
      setUrl('');
    } catch {
      setError('プロキシの実行に失敗しました。');
    }
  };

  return { url, setUrl, openProxy, error };
};
