import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Anchor, 
  Truck, 
  Package, 
  FileText, 
  Home, 
  Calendar, 
  Briefcase, 
  Settings, 
  HelpCircle,
  X,
  Ship,
  BarChart3,
  Warehouse,
  DollarSign,
  Camera,
  Users,
  History,
  Cloud,
  AlertTriangle,
  TestTube
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const mainNavItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Vessel Operations', path: '/vessels', icon: Ship },
    { name: 'Port Services', path: '/services', icon: Briefcase },
    { name: 'Documentation', path: '/documents', icon: FileText },
    { name: 'Cargo Management', path: '/cargo', icon: Package },
    { name: 'Warehouse Management', path: '/warehouse', icon: Warehouse },
    { name: 'Port Visitors', path: '/visitors', icon: Users },
    { name: 'Gate Control', path: '/gate', icon: Truck },
    { name: 'Security Cameras', path: '/security', icon: Camera },
    { name: 'Weather Monitoring', path: '/weather', icon: Cloud },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Finance', path: '/finance', icon: DollarSign },
    { name: 'Penalties', path: '/penalties', icon: AlertTriangle },
    { name: 'History', path: '/history', icon: History },
    { name: 'Testing', path: '/testing', icon: TestTube }
  ];

  const secondaryNavItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavItem = ({ item }: { item: typeof mainNavItems[0] }) => {
    const active = isActive(item.path);
    const Icon = item.icon;

    return (
      <Link
        to={item.path}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          active
            ? 'text-white bg-primary-700'
            : 'text-gray-300 hover:text-white hover:bg-primary-700'
        }`}
      >
        <Icon className="mr-3 h-5 w-5" />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar component for mobile */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-primary-600 transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen z-50`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <Anchor className="h-8 w-8 text-white" />
            <span className="ml-2 text-white text-lg font-bold">HarborFlow</span>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          <div className="border-t border-primary-700 px-2 py-4 space-y-1">
            {secondaryNavItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;