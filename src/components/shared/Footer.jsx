import { Link } from "react-router-dom";
import { FiShoppingBag, FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <FiShoppingBag className="text-white text-lg" />
              </div>
              <span className="font-display font-bold text-xl">
                Re<span className="text-primary-500">Sell</span>Hub
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Bangladesh's trusted second-hand marketplace. Buy & sell pre-owned products safely and efficiently.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: <FiFacebook />, href: "#" },
                { icon: <FiTwitter />, href: "#" },
                { icon: <FiInstagram />, href: "#" },
                { icon: <FiLinkedin />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "All Products", path: "/products" },
                { label: "Categories", path: "/categories" },
                { label: "About Us", path: "/about" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-primary-400 text-sm transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Electronics", "Furniture", "Vehicles", "Fashion", "Mobile Phones", "Books"].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat}`}
                    className="text-white/60 hover:text-primary-400 text-sm transition-colors"
                  >
                    → {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <FiMapPin className="text-primary-400 shrink-0" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <FiPhone className="text-primary-400 shrink-0" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <FiMail className="text-primary-400 shrink-0" />
                support@resellhub.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-custom px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-sm">
            © {year} ReSellHub. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Made with ❤️ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
