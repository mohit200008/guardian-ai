import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeMessage, analyzeUrl } from '../api/analyze';
import { useAnalysisContext } from '../context/AnalysisContext';

export function useAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { saveResult } = useAnalysisContext();
  const navigate = useNavigate();

  const run = useCallback(
    async (type, payload, preview = '') => {
      setLoading(true);
      setError(null);

      try {
        const response =
          type === 'message'
            ? await analyzeMessage(payload)
            : await analyzeUrl(payload);
        saveResult(response.data, preview);
        navigate('/results');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [saveResult, navigate]
  );

  return { loading, error, run, clearError: () => setError(null) };
}
