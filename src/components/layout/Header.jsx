import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { User, Wrench } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import { getUserInfo } from "../../services/userService";
import Toast from "../ui/Toast";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const userMenuRef = useRef(null);
  const { toast, showInfo, hideToast } = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        try {
          const response = await getUserInfo();
          if (response.code === 1000 && response.result) setUserInfo(response.result);
        } catch { }
      } else setUserInfo(null);
    };
    fetchUserInfo();
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setUserInfo(null);
    navigate("/auth");
  };

  const handleGaraRegister = () => {
    setIsUserMenuOpen(false);
    showInfo("Chức năng này sẽ sớm được ra mắt trong thời gian sớm nhất", 4000);
  };

  const menuItems = [
    { name: "Home", navigate: "/" },
    { name: "Studio", navigate: "/studio" },
    { name: "Discussion", navigate: "/forum" },
  ];

  const displayUser = userInfo || user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1F]/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <img src="/img/logo-header.webp" className="w-11 group-hover:rotate-6 transition" />
            <h1 className="text-2xl font-bold text-white tracking-wide">
              3DCustom<span className="text-cyan-400">Lab</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <p
                key={item.name}
                className="relative text-gray-300 hover:text-cyan-400 cursor-pointer font-medium transition"
                onClick={() => navigate(item.navigate)}
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </p>
            ))}

            {isAuthenticated && displayUser ? (
              <div ref={userMenuRef} className="relative">
                <div
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="cursor-pointer w-11 h-11 rounded-full overflow-hidden border border-cyan-500/50 shadow-md hover:shadow-cyan-500/20 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                >
                  {displayUser.avatar ? (
                    <img src={displayUser.avatar} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-[#0D1329]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                    <div className="px-4 py-4 border-b border-cyan-500/30">
                      <p className="text-white font-semibold truncate">{displayUser.email}</p>
                      <p className="text-xs text-cyan-400 mt-1">Role: {displayUser.type || displayUser.role}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <p
                        onClick={() => { navigate("/profile"); setIsUserMenuOpen(false); }}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300 cursor-pointer"
                      >
                        <User size={18} /> Profile
                      </p>
                      <p
                        onClick={handleGaraRegister}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300 cursor-pointer"
                      >
                        <Wrench size={18} /> Đăng kí trở thành Gara
                      </p>
                      <p
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 cursor-pointer"
                      >
                        <FaSignOutAlt size={18} /> Đăng xuất
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="px-6 py-2 rounded-full text-white font-semibold cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/40 transition"
              >
                Đăng nhập
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {isAuthenticated && displayUser && (
              <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/50 shadow-md">
                {displayUser.avatar ? (
                  <img src={displayUser.avatar} className="w-full h-full object-cover" />
                ) : <User className="w-5 h-5 text-white m-auto" />}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white cursor-pointer hover:text-cyan-400 transition"
            >
              {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#10172B] border-t border-cyan-500/20 animate-slide-down">
          <div className="px-5 py-4 space-y-3">
            {isAuthenticated && displayUser && (
              <div className="pb-4 border-b border-cyan-500/10">
                <p className="text-white font-semibold">{displayUser.email}</p>
                <p className="text-xs text-cyan-400">Role: {displayUser.type || displayUser.role}</p>
              </div>
            )}

            {menuItems.map((item) => (
              <p
                key={item.name}
                onClick={() => { setIsMenuOpen(false); navigate(item.navigate); }}
                className="text-gray-300 hover:text-cyan-400 font-medium cursor-pointer py-2"
              >
                {item.name}
              </p>
            ))}

            {isAuthenticated ? (
              <div className="pt-3 border-t border-cyan-500/10 space-y-2">
                <p
                  onClick={() => { setIsMenuOpen(false); navigate("/profile"); }}
                  className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 cursor-pointer py-2"
                >
                  <User size={18} /> Profile
                </p>
                <p
                  onClick={() => { setIsMenuOpen(false); handleGaraRegister(); }}
                  className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 cursor-pointer py-2"
                >
                  <Wrench size={18} /> Đăng kí Gara
                </p>
                <p
                  onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                  className="flex items-center gap-2 text-rose-400 hover:text-rose-300 cursor-pointer py-2"
                >
                  <FaSignOutAlt /> Đăng xuất
                </p>
              </div>
            ) : (
              <button
                onClick={() => { setIsMenuOpen(false); navigate("/auth"); }}
                className="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-md hover:shadow-cyan-500/40 cursor-pointer"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} duration={toast.duration} />
      )}
    </nav>
  );
}
