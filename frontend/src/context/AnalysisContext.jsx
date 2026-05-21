import { createContext, useContext, useState, useCallback } from 'react';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [result, setResult] = useState(null);
  const [inputPreview, setInputPreview] = useState('');

  const saveResult = useCallback((data, preview = '') => {
    setResult(data);
    setInputPreview(preview);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setInputPreview('');
  }, []);

  return (
    <AnalysisContext.Provider
      value={{ result, inputPreview, saveResult, clearResult }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysisContext must be used within AnalysisProvider');
  return ctx;
}
