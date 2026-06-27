import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiShoppingBag, FiUser, FiSettings, FiLogOut, FiList } from "react-icons/fi";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const activeLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-base-content/70 hover:text-primary transition-colors";

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/95 backdrop-blur-md shadow-md"
          : "bg-base-100"
      }`}
    >
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <FiShoppingBag className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl text-base-content">
              Re<span className="text-primary">Sell</span>Hub
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={activeLinkClass} end={link.path === "/"}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-primary"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* User section */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-sm btn-circle avatar ring-2 ring-primary ring-offset-base-100 ring-offset-1"
                >
                  <div className="w-9 rounded-full">
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=0ea5e9&color=fff`}
                      alt={user.displayName}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[999] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-300"
                >
                  <li className="p-2 border-b border-base-200 mb-1">
                    <p className="font-semibold text-base-content text-sm truncate">{user.displayName}</p>
                    <p className="text-xs text-base-content/50 truncate">{user.email}</p>
                  </li>
                  <li>
                    <Link to="/dashboard/profile" className="flex items-center gap-2 rounded-xl">
                      <FiUser size={15} /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-2 rounded-xl">
                      <FiSettings size={15} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/my-orders" className="flex items-center gap-2 rounded-xl">
                      <FiList size={15} /> Orders
                    </Link>
                  </li>
                  <li className="mt-1 border-t border-base-200 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-error rounded-xl w-full"
                    >
                      <FiLogOut size={15} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm rounded-xl font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm rounded-xl font-medium text-white">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden btn btn-ghost btn-sm btn-circle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-base-100 border-t border-base-300 px-4 py-4"
          >
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={activeLinkClass}
                    onClick={() => setMenuOpen(false)}
                    end={link.path === "/"}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {!user && (
                <>
                  <li>
                    <Link to="/login" className="btn btn-ghost btn-sm w-full rounded-xl" onClick={() => setMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="btn btn-primary btn-sm w-full rounded-xl text-white" onClick={() => setMenuOpen(false)}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
