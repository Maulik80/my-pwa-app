import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export default function InstallPrompt() {
  const { isInstallable, isInstalled, isDismissed, install, dismiss } = usePWAInstall();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isInstallable && !isInstalled && !isDismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, isDismissed]);

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    dismiss();
  };

  if (!showPrompt || !isInstallable || isInstalled) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:w-80 z-50 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-slide-up"
      role="dialog"
      aria-label="Install SKPT Cricket app"
    >
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Dismiss install prompt"
      >
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">Install SKPT Cricket</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Add to home screen for quick access
          </p>
        </div>
      </div>
      <button
        onClick={handleInstall}
        className="w-full mt-3 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
      >
        Install App
      </button>
    </div>
  );
}
