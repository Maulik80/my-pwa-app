import { useEffect, useState, useRef } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useNetworkStore } from '../../stores/useNetworkStore';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { updateLastOnlineAt } from '../../lib/pwa/storage';

export default function NetworkStatus() {
  const { isOnline } = useNetworkStore();
  useNetworkStatus();
  const [showBackOnline, setShowBackOnline] = useState(false);
  const prevOnlineRef = useRef(isOnline);

  useEffect(() => {
    if (isOnline) {
      updateLastOnlineAt();
    }
  }, [isOnline]);

  useEffect(() => {
    // Detect transition from offline to online
    if (isOnline && !prevOnlineRef.current) {
      setShowBackOnline(true);
      const timer = setTimeout(() => setShowBackOnline(false), 3000);
      prevOnlineRef.current = isOnline;
      return () => clearTimeout(timer);
    }
    prevOnlineRef.current = isOnline;
  }, [isOnline]);

  if (isOnline && !showBackOnline) return null;

  if (isOnline && showBackOnline) {
    return (
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium animate-fade-in"
        role="status"
        aria-live="polite"
      >
        <Wifi className="w-4 h-4" />
        <span>Back Online</span>
        <span className="hidden sm:inline">— Your local demo data remains available.</span>
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium"
      role="status"
      aria-live="polite"
    >
      <WifiOff className="w-4 h-4" />
      <span>Offline Mode</span>
      <span className="hidden sm:inline">— Your local demo data is being saved on this device.</span>
    </div>
  );
}
