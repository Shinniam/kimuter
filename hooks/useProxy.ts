import { useState } from 'react';

export const useProxy = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const openProxy = async () => {
    if (!url) {
      setError('URLを入力してください。');
      return;
    }

    try {
      // URLの形式を検証
      const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
      if (!urlPattern.test(url)) {
        setError('有効なURLを入力してください（例: https://example.com）。');
        return;
      }

      const encodedUrl = encodeURIComponent(url);
      const proxyUrl = `/api/proxy?url=${encodedUrl}`;

      // プロキシAPIを直接呼び出してエラーを確認
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error('プロキシAPIがエラーを返しました。');
      }

      const newWindow = window.open(proxyUrl, '_blank');
      if (!newWindow) {
        setError('ポップアップがブロックされました。ブラウザの設定を確認してください。');
        return;
      }

      setError(null);
      setUrl('');
    } catch (err) {
      setError('プロキシの実行に失敗しました。URLが正しいか確認してください。');
      console.error(err);
    }
  };

  return { url, setUrl, openProxy, error };
};
