/**
 * Offline Fallback Component
 * Shown when the app is offline but still functional for local demo use
 */

import { WifiOff, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

interface OfflineFallbackProps {
  onContinue?: () => void;
}

export default function OfflineFallback({ onContinue }: OfflineFallbackProps) {
  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
          <WifiOff className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">You're Offline</h1>
        <p className="text-primary-200 mb-8 leading-relaxed">
          SKPT Cricket is still available for local demo use.
          <br />
          Your locally saved scoring data remains available on this device.
        </p>

        <div className="space-y-3">
          <Button
            onClick={handleContinue}
            fullWidth
            size="lg"
            icon={<RefreshCw className="w-5 h-5" />}
          >
            Continue Offline
          </Button>
        </div>

        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm text-primary-300">
            All data is stored locally on your device. Changes will be saved and can be synced when you're back online.
          </p>
        </div>
      </div>
    </div>
  );
}
