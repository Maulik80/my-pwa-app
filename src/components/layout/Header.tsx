import { useState } from 'react';
import { Menu, Search, Bell, Download, Share } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useUIStore } from '../../stores/useUIStore';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { isIOS } from '../../lib/utils';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function Header() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const { isInstallable, isInstalled, isDismissed, install } = usePWAInstall();
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  const handleInstall = async () => {
    if (isIOS()) {
      setShowIOSInstructions(true);
      return;
    }
    await install();
  };

  const showInstallButton = !isInstalled && !isDismissed && (isInstallable || isIOS());

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 safe-top">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 md:hidden"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">SKPT Cricket</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Install App Button - visible when installable and not installed */}
            {showInstallButton && (
              <Button
                variant="primary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={handleInstall}
                className="mr-1"
                aria-label="Install SKPT Cricket"
                title="Install App"
              >
                <span className="hidden sm:inline">Install App</span>
              </Button>
            )}

            <button
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            {user && (
              <div className="flex items-center gap-2 ml-1">
                <Avatar name={user.name} size="sm" />
                <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[100px] truncate">
                  {user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <Modal open={showIOSInstructions} onClose={() => setShowIOSInstructions(false)} title="Install SKPT Cricket">
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            To install this app on your iOS device:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Share className="w-4 h-4 mt-0.5 shrink-0 text-primary-600" />
              <span>Tap the <strong>Share</strong> button in Safari</span>
            </li>
            <li>
              Scroll down and tap <strong>Add to Home Screen</strong>
            </li>
            <li>
              Tap <strong>Add</strong> to confirm
            </li>
          </ol>
          <Button fullWidth onClick={() => setShowIOSInstructions(false)}>
            Got it
          </Button>
        </div>
      </Modal>
    </>
  );
}
