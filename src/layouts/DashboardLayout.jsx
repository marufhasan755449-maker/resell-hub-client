import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiShoppingBag, FiHeart, FiCreditCard, FiUser,
  FiPlusSquare, FiPackage, FiTruck, FiBarChart2,
  FiUsers, FiCheckSquare, FiPieChart, FiMenu, FiX,
  FiLogOut, FiShoppingCart,
} from "react-icons/fi";
import { useAuth } from "../context/AuthProvider";
import useUser from "../hooks/useUser";
import { useTheme } from "../context/ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const buyerLinks = [
  { path: "/dashboard", label: "Overview", icon: <FiHome /> },
  { path: "/dashboard/my-orders", label: "My Orders", icon: <FiShoppingCart /> },
  { path: "/dashboard/wishlist", label: "Wishlist", icon: <FiHeart /> },
  { path: "/dashboard/payment-history", label: "Payment History", icon: <FiCreditCard /> },
  { path: "/dashboard/profile", label: "Profile", icon: <FiUser /> },
];

const sellerLinks = [
  { path: "/dashboard/seller-overview", label: "Overview", icon: <FiHome /> },
  { path: "/dashboard/add-product", label: "Add Product", icon: <FiPlusSquare /> },
  { path: "/dashboard/my-products", label: "My Products", icon: <FiPackage /> },
  { path: "/dashboard/manage-orders", label: "Manage Orders", icon: <FiTruck /> },
  { path: "/dashboard/sales-analytics", label: "Sales Analytics", icon: <FiBarChart2 /> },
  { path: "/dashboard/profile", label: "Profile", icon: <FiUser /> },
];

const adminLinks = [
  { path: "/dashboard/admin-overview", label: "Overview", icon: <FiHome /> },
  { path: "/dashboard/manage-users", label: "Manage Users", icon: <FiUsers /> },
  { path: "/dashboard/manage-products", label: "Manage Products", icon: <FiShoppingBag /> },
  { path: "/dashboard/admin-orders", label: "All Orders", icon: <FiCheckSquare /> },
  { path: "/dashboard/platform-analytics", label: "Analytics", icon: <FiPieChart /> },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { isAdmin, isSeller } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = isAdmin ? adminLinks : isSeller ? sellerLinks : buyerLinks;
  const roleLabel = isAdmin ? "Admin" : isSeller ? "Seller" : "Buyer";
  const roleBadgeClass = isAdmin
    ? "badge-error"
    : isSeller
    ? "badge-warning"
    : "badge-success";

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out!");
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-base-300">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <FiShoppingBag className="text-white text-sm" />
        </div>
        <span className="font-display font-bold text-lg text-base-content">
          Re<span className="text-primary">Sell</span>Hub
        </span>
      </Link>

      {/* User info */}
      <div className="px-6 py-4 border-b border-base-300">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=0ea5e9&color=fff`}
                alt={user?.displayName}
              />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-base-content truncate">{user?.displayName}</p>
            <span className={`badge badge-sm ${roleBadgeClass} mt-0.5`}>{roleLabel}</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-base-300 space-y-1">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content transition-all w-full"
        >
          {isDark ? <FiSun /> : <FiMoon />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-all w-full"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-base-200">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-base-100 border-r border-base-300 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-base-100 z-50 lg:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-base-100 border-b border-base-300 flex items-center px-4 gap-4 shrink-0">
          <button
            className="lg:hidden btn btn-ghost btn-sm btn-circle"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={20} />
          </button>
          <h1 className="font-display font-semibold text-base-content text-lg">
            Dashboard
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="btn btn-ghost btn-sm rounded-xl text-sm gap-1">
              <FiHome size={14} /> Back to Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
