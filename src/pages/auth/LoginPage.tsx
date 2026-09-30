import { useNavigate } from 'react-router-dom';
import { Crown, Shield, Eye } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginAsSuperAdmin, loginAsAdmin, loginAsViewer, isLoading } = useAuthStore();

  const handleSuperAdminLogin = () => {
    loginAsSuperAdmin();
    navigate('/super-admin');
  };

  const handleAdminLogin = () => {
    loginAsAdmin();
    navigate('/admin');
  };

  const handleViewerLogin = () => {
    loginAsViewer();
    navigate('/viewer');
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-white" />
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full border-2 border-white" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full border-2 border-white" />
      </div>

      {/* Logo */}
      <div className="relative z-10 text-center mb-8">
        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20">
          <span className="text-white font-bold text-3xl">🏏</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">SKPT Cricket</h1>
        <p className="text-primary-200 text-sm">Live Scoring & Tournament Management</p>
      </div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-sm p-6 bg-white/95 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">Choose Login Type</h2>

        <div className="space-y-3">
          <Button
            onClick={handleSuperAdminLogin}
            loading={isLoading}
            fullWidth
            size="lg"
            icon={<Crown className="w-5 h-5" />}
          >
            Super Admin Login
          </Button>

          <Button
            onClick={handleAdminLogin}
            variant="secondary"
            loading={isLoading}
            fullWidth
            size="lg"
            icon={<Shield className="w-5 h-5" />}
          >
            Admin Login
          </Button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Button
            onClick={handleViewerLogin}
            variant="outline"
            fullWidth
            size="lg"
            icon={<Eye className="w-5 h-5" />}
          >
            Continue as Viewer
          </Button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-500 mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p><span className="font-medium">Super Admin:</span> admin@skpt.com / admin123</p>
            <p><span className="font-medium">Admin:</span> scorer@skpt.com / scorer123</p>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <p className="relative z-10 text-primary-300 text-xs mt-6">
        Version 1.0.0 • PWA Demo
      </p>
    </div>
  );
}
