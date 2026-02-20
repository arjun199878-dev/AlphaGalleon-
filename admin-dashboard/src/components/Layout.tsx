import { Outlet, NavLink } from 'react-router-dom';
import { Home, Brain, Settings as SettingsIcon } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Brain Logs', path: '/brain', icon: <Brain size={20} /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight">AlphaGalleon <span className="text-blue-500">Admin</span></h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        v0.1.0 Alpha
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-10">
      <h2 className="text-lg font-semibold text-slate-800">Overview</h2>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
          AG
        </div>
      </div>
    </header>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="mt-16 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
