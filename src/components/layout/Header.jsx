import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Car, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/auth");
  };

  const menuItems = [
    { name: "Home", navigate: "/" },
    { name: "Studio", navigate: "/studio" },
    { name: "Discussion", navigate: "/forum" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div>
              <Car className="w-8 h-8 text-cyan-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              3D Custom Lab
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                onClick={() => {
                  if (item.navigate.startsWith("#")) {
                    const section = document.querySelector(item.navigate);
                    section.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate(item.navigate);
                  }
                }}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* User Menu - Desktop */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-full hover:border-cyan-400 transition-all duration-300 group"
                >
                  {/* Avatar Icon */}
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                    <User className="w-5 h-5" />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-linear-to-r from-cyan-500/10 to-blue-600/10 border-b border-cyan-500/20">
                      <p className="text-sm text-gray-400">Đăng nhập với</p>
                      <p className="text-white font-semibold truncate text-sm">
                        {user.email}
                      </p>
                      <p className="text-xs text-cyan-400 mt-1">
                        Role: {user.role}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                      >
                        <FaSignOutAlt />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {isAuthenticated && user && (
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cyan-400 hover:text-blue-400"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-cyan-500/20">
          <div className="px-4 py-4 space-y-3">
              {/* User Info Mobile */}
              {isAuthenticated && user && (
                <div className="pb-3 mb-3 border-b border-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {user.email}
                      </p>
                      <p className="text-xs text-cyan-400">Role: {user.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu Items */}
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-300 hover:text-cyan-400 py-2 font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}

              {/* Auth Buttons Mobile */}
              {isAuthenticated && user ? (
                <div className="pt-3 border-t border-gray-800">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/auth");
                  }}
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Đăng nhập
                </button>
              )}
          </div>
        </div>
      )}
    </nav>
  );
}
