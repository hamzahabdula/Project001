import React, { useState } from 'react';
import { Bell, User, HelpCircle, Search, Menu } from 'lucide-react';
import { notifications } from '../../data/mockData';
import Badge from '../ui/Badge';

interface NavbarProps {
  onMenuButtonClick: () => void;
  notificationCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuButtonClick, notificationCount }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 focus:outline-none md:hidden"
              onClick={onMenuButtonClick}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden md:block md:ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-700">Notifications</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(notification.timestamp).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <Badge variant="primary" size="sm">New</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <HelpCircle className="h-6 w-6" />
            </button>

            <div className="border-l border-gray-200 h-6 mx-2"></div>

            <div className="flex items-center">
              <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                  <User className="h-5 w-5" />
                </div>
                <span className="ml-2 text-sm font-medium hidden md:block">Port Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;