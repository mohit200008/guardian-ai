import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeMessage, analyzeUrl } from '../api/analyze';
import { useAnalysisContext } from '../context/AnalysisContext';
import { SCAN_PHASES, PHASE_MS, MIN_SCAN_MS } from '../constants/scanPhases';

export function useScanExperience() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePhase, setActivePhase] = useState(-1);
  const intervalRef = useRef(null);
  const { saveResult } = useAnalysisContext();
  const navigate = useNavigate();

  const clearPhaseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const run = useCallback(
    async (type, payload, preview = '') => {
      setLoading(true);
      setError(null);
      setActivePhase(0);

      intervalRef.current = setInterval(() => {
        setActivePhase((p) => Math.min(p + 1, SCAN_PHASES.length - 1));
      }, PHASE_MS);

      const minDelay = new Promise((r) => setTimeout(r, MIN_SCAN_MS));

      try {
        const apiCall =
          type === 'message'
            ? analyzeMessage(payload)
            : analyzeUrl(payload);

        // Gemini can take 20–40s; wait for API (min delay only applies in parallel)
        const [response] = await Promise.all([
          apiCall,
          minDelay,
        ]);

        clearPhaseTimer();
        setActivePhase(SCAN_PHASES.length - 1);
        await new Promise((r) => setTimeout(r, 500));

        saveResult(response.data, preview);
        navigate('/results');
      } catch (err) {
        setError(err.message);
      } finally {
        clearPhaseTimer();
        setLoading(false);
        setActivePhase(-1);
      }
    },
    [saveResult, navigate]
  );

  return {
    loading,
    error,
    activePhase,
    run,
    clearError: () => setError(null),
  };
}
