import { useState, useCallback } from "react";

/**
 * provides default behaviour for <ScreenWithLoadingActivity />
 * can change behaviour by changing onSuccess, onError independently
 * this should normally work in all cases
 * changing loadingState, reloadToggle not recommended. Better to do it on your own
 */
const useLoadingScreen = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [reloadToggle, setReloadToggle] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const onSuccess = useCallback((res) => setResult(res), []);

  const onError = useCallback((err) => setError(err), []);

  const setScreenLoadingState = useCallback((ls) => {
    setLoadingState(ls);
  }, []);

  const reloadScreen = () => setReloadToggle((r) => !r);
  return [
    loadingState,
    setScreenLoadingState,
    reloadToggle,
    reloadScreen,
    onSuccess,
    onError,
    result,
    error,
  ];
};

export default useLoadingScreen;
