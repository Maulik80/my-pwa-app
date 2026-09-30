import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ToastContainer from '../ui/Toast';

export default function AppLayout() {
  return (
    <div className="flex h-dvh bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-20 md:pb-6 md:pl-6">
          <Outlet />
        </main>
        <MobileNav />
      </div>
      <ToastContainer />
    </div>
  );
}
