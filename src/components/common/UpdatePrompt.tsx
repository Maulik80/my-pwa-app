/**
 * PWA Update Prompt Component
 * Shows when a new service worker version is available
 */

import { RefreshCw, X } from 'lucide-react';

interface UpdatePromptProps {
  onUpdate: () => void;
  onDismiss: () => void;
}

export default function UpdatePrompt({ onUpdate, onDismiss }: UpdatePromptProps) {
  return (
    <div className="fixed bottom-20 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:w-80 z-50 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-slide-up">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Dismiss update notification"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
          <RefreshCw className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">New Version Available</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            A new version of SKPT Cricket is available. Update to get the latest features.
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={onUpdate}
          className="flex-1 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          Update Now
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
}
