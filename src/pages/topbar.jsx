import { useState, useEffect } from "react";
import {
  BellIcon,
  SearchIcon,
  UserCircleIcon,
  ChevronDownIcon,
  CogIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";

const TopBar = ({ toggleSidebar, sidebarCollapsed }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section - Hamburger menu and breadcrumbs */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
          >
            {sidebarCollapsed ? (
              <ChevronDownIcon className="h-6 w-6 transform rotate-90" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 transform -rotate-90" />
            )}
          </button>

          <div className="hidden md:flex items-center space-x-1 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Dashboard</span>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Products
            </span>
          </div>
        </div>

        {/* Right section - Search, notifications, user menu */}
        <div className="flex items-center space-x-4">
          {/* Search - expands on mobile */}
          <div
            className={`relative ${
              searchOpen ? "w-64" : "w-8"
            } transition-all duration-200`}
          >
            {searchOpen ? (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            ) : null}
            <input
              type="text"
              placeholder={searchOpen ? "Search products..." : ""}
              className={`w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                searchOpen ? "opacity-100" : "opacity-0 absolute"
              }`}
            />
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-1 rounded-full ${
                searchOpen
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 relative"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Notifications (3)
                    </p>
                  </div>
                  {/* Notification items */}
                  <a
                    href="#"
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <UserCircleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          New order received
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* More notifications... */}
                </div>
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <a
                    href="#"
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <UserCircleIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-200">
                Admin
              </span>
              <ChevronDownIcon
                className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                  userMenuOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <UserCircleIcon className="h-4 w-4 mr-2" />
                      Your Profile
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <CogIcon className="h-4 w-4 mr-2" />
                      Settings
                    </div>
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <LogoutIcon className="h-4 w-4 mr-2" />
                      Sign out
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
