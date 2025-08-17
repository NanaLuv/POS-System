import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  MenuIcon,
  DocumentReportIcon,
  ArchiveIcon,
  CashIcon,
  BellIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(() => {
    // Remember user preference in localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarExpanded") !== "false";
    }
    return true;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation items with submenus and notifications
  const navItems = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
      notification: 3,
    },
    {
      name: "POS",
      icon: ShoppingCartIcon,
      path: "/pos",
      shortcut: "⌘P",
    },
    {
      name: "Inventory",
      icon: CubeIcon,
      subItems: [
        { name: "Products", path: "inventory/products", icon: CubeIcon },
        {
          name: "Categories",
          path: "/inventory/categories",
          icon: ArchiveIcon,
        },
        {
          name: "Purchase Orders",
          path: "/inventory/purchase-orders",
          icon: DocumentReportIcon,
        },
      ],
    },
    {
      name: "Customers",
      icon: UsersIcon,
      path: "/customers",
    },
    {
      name: "Reports",
      icon: ChartBarIcon,
      subItems: [
        { name: "Sales", path: "/reports/sales", icon: CashIcon },
        { name: "Inventory", path: "/reports/inventory", icon: CubeIcon },
      ],
    },
    {
      name: "Settings",
      icon: CogIcon,
      path: "/settings",
    },
  ];

  const toggleSidebar = () => {
    const newState = !expanded;
    setExpanded(newState);
    localStorage.setItem("sidebarExpanded", newState.toString());
  };

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleSubmenu = (name) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const filteredItems = navItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subItems &&
        item.subItems.some((sub) =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobile}
      />

      {/* Sidebar */}
      <aside
        className={`
        fixed md:relative z-40 h-screen bg-indigo-900 text-gray-100
        transition-all duration-300 ease-in-out overflow-hidden
        flex flex-col
        ${expanded ? "w-60" : "w-16"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {expanded ? (
            <h1 className="text-xl font-bold whitespace-nowrap">POS Pro</h1>
          ) : (
            <div className="w-8 h-8 bg-gray-800 rounded-full" />
          )}

          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Search (only visible when expanded) */}
        {expanded && (
          <div className="p-3 border-b border-gray-800">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {filteredItems.map((item) => (
              <li key={item.name}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`
                        flex items-center justify-between w-full p-3 rounded-lg
                        hover:bg-gray-800 transition-colors
                        ${activeSubmenu === item.name ? "bg-gray-800" : ""}
                      `}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`w-5 h-5 ${expanded ? "mr-3" : "mx-auto"}`}
                        />
                        {expanded && <span>{item.name}</span>}
                      </div>
                      {expanded && (
                        <ChevronRightIcon
                          className={`w-4 h-4 transition-transform ${
                            activeSubmenu === item.name ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Sub-items */}
                    {expanded && activeSubmenu === item.name && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <a
                              href={subItem.path}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(subItem.path);
                              }}
                              className={`
                                flex items-center p-2 text-sm rounded
                                hover:bg-gray-800 transition-colors
                                ${
                                  isActive(subItem.path)
                                    ? "bg-indigo-900/50"
                                    : ""
                                }
                              `}
                            >
                              <subItem.icon className="w-4 h-4 mr-2" />
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.path);
                    }}
                    className={`
                      flex items-center justify-between p-3 rounded-lg
                      hover:bg-gray-800 transition-colors
                      ${isActive(item.path) ? "bg-indigo-900" : ""}
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`w-5 h-5 ${expanded ? "mr-3" : "mx-auto"}`}
                      />
                      {expanded && <span>{item.name}</span>}
                    </div>
                    {expanded && item.notification && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.notification}
                      </span>
                    )}
                    {expanded && item.shortcut && (
                      <span className="text-xs text-gray-400 ml-2">
                        {item.shortcut}
                      </span>
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div
          className={`
          p-4 border-t border-gray-800
          ${expanded ? "flex items-center" : "flex justify-center"}
        `}
        >
          <div className={`${expanded ? "mr-3" : ""}`}>
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
          </div>
          {expanded && (
            <div className="truncate">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={toggleMobile}
        className="fixed bottom-6 left-6 z-30 p-3 bg-indigo-600 rounded-full shadow-lg md:hidden"
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <XIcon className="w-6 h-6 text-white" />
        ) : (
          <MenuIcon className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
};

export default Sidebar;
