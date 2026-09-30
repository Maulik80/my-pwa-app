import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useScoringStore } from './stores/useScoringStore';
import { useNetworkStore } from './stores/useNetworkStore';

function App() {
  const hydrate = useScoringStore((s) => s.hydrate);
  const isHydrated = useScoringStore((s) => s.isHydrated);
  const setOnline = useNetworkStore((s) => s.setOnline);

  // Hydrate scoring session from IndexedDB on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Set initial online status
  useEffect(() => {
    setOnline(navigator.onLine);
  }, [setOnline]);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
