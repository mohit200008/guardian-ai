import { useState, useCallback } from 'react';
import { analyzeMessage, analyzeUrl } from '../api/analyze.js';

export function useAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (type, payload) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response =
        type === 'message'
          ? await analyzeMessage(payload)
          : await analyzeUrl(payload);
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, run, reset };
}
