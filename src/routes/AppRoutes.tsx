import { lazy, Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import AppLayout from '../components/layout/AppLayout';
import RoleGuard from '../components/common/RoleGuard';
import NetworkStatus from '../components/common/NetworkStatus';
import InstallPrompt from '../components/common/InstallPrompt';
import UpdatePrompt from '../components/common/UpdatePrompt';
import { usePWAUpdate } from '../hooks/usePWAUpdate';

// Auth Pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

// Super Admin Pages
const DashboardPage = lazy(() => import('../pages/super-admin/DashboardPage'));
const TournamentsPage = lazy(() => import('../pages/super-admin/TournamentsPage'));
const TeamsPage = lazy(() => import('../pages/super-admin/TeamsPage'));
const MatchesPage = lazy(() => import('../pages/super-admin/MatchesPage'));
const AdminRolesPage = lazy(() => import('../pages/super-admin/AdminRolesPage'));
const AssignScorerPage = lazy(() => import('../pages/super-admin/AssignScorerPage'));

// Admin Pages
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const LiveScoringPage = lazy(() => import('../pages/admin/LiveScoringPage'));
const MatchDetailsPage = lazy(() => import('../pages/admin/MatchDetailsPage'));

// Viewer Pages
const ViewerDashboardPage = lazy(() => import('../pages/viewer/ViewerDashboardPage'));
const LiveMatchesPage = lazy(() => import('../pages/viewer/LiveMatchesPage'));
const ViewerTournamentsPage = lazy(() => import('../pages/viewer/TournamentsPage'));
const PointsTablePage = lazy(() => import('../pages/viewer/PointsTablePage'));
const ViewerTeamsPage = lazy(() => import('../pages/viewer/TeamsPage'));
const ViewerMatchDetailsPage = lazy(() => import('../pages/viewer/MatchDetailsPage'));

// Error Pages
const NotFoundPage = lazy(() => import('../pages/errors/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('../pages/errors/UnauthorizedPage'));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-3 animate-pulse">
          <span className="text-primary-600 font-bold">S</span>
        </div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated, role } = useAuthStore();
  const { needRefresh, updateServiceWorker } = usePWAUpdate();
  const [updateDismissed, setUpdateDismissed] = useState(false);

  // Redirect based on role
  const getHomeRoute = () => {
    if (!isAuthenticated) return '/login';
    switch (role) {
      case 'super_admin':
        return '/super-admin';
      case 'admin':
        return '/admin';
      case 'viewer':
        return '/viewer';
      default:
        return '/login';
    }
  };

  return (
    <>
      <NetworkStatus />
      <InstallPrompt />
      {needRefresh && !updateDismissed && (
        <UpdatePrompt
          onUpdate={() => updateServiceWorker(true)}
          onDismiss={() => setUpdateDismissed(true)}
        />
      )}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Super Admin Routes */}
          <Route
            path="/super-admin"
            element={
              <RoleGuard allowedRoles={['super_admin']}>
                <AppLayout />
              </RoleGuard>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="matches" element={<MatchesPage />} />
            <Route path="admin-roles" element={<AdminRolesPage />} />
            <Route path="assign-scorer" element={<AssignScorerPage />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <RoleGuard allowedRoles={['admin', 'super_admin']}>
                <AppLayout />
              </RoleGuard>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="matches/:id/score" element={<LiveScoringPage />} />
            <Route path="matches/:id/details" element={<MatchDetailsPage />} />
          </Route>

          {/* Viewer Routes */}
          <Route
            path="/viewer"
            element={
              <RoleGuard allowedRoles={['viewer', 'admin', 'super_admin']}>
                <AppLayout />
              </RoleGuard>
            }
          >
            <Route index element={<ViewerDashboardPage />} />
            <Route path="live-matches" element={<LiveMatchesPage />} />
            <Route path="tournaments" element={<ViewerTournamentsPage />} />
            <Route path="points-table" element={<PointsTablePage />} />
            <Route path="teams" element={<ViewerTeamsPage />} />
            <Route path="matches/:id" element={<ViewerMatchDetailsPage />} />
          </Route>

          {/* Error Routes */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Root & Catch All */}
          <Route path="/" element={<Navigate to={getHomeRoute()} replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
