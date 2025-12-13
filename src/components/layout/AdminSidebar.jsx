import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Warehouse, Car, Podcast, LogOut, X, Cuboid } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserInfo } from "../../services/userService";

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response.code === 1000 && response.result) {
          setUserInfo(response.result);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 mx-3 rounded-lg transition-all duration-200 ${isActive ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/20" : "text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white"
    }`;

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-emerald-900 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50 shadow-xl transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* User Profile Section */}
        <div className="pt-8 pb-6 px-6 flex flex-col items-center border-b border-emerald-800">
          <div className="w-20 h-20 rounded-full bg-emerald-800 p-1 mb-3 overflow-hidden shadow-lg ring-2 ring-emerald-700">
            {userInfo?.avatar ? (
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center">
                <Users className="text-emerald-600" size={32} />
              </div>
            )}
          </div>
          <h3 className="text-white font-semibold text-base mb-1">
            {userInfo?.name || "Admin"}
          </h3>
          <p className="text-emerald-200/70 text-xs">
            {userInfo?.email || "Loading..."}
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 space-y-1">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            <Users size={20} />
            <span className="font-medium text-sm">User Management</span>
          </NavLink>

          <NavLink to="/admin/garas" className={linkClass}>
            <Warehouse size={20} />
            <span className="font-medium text-sm">Gara Management</span>
          </NavLink>

          <NavLink to="/admin/models" className={linkClass}>
            <Cuboid size={20} />
            <span className="font-medium text-sm">Model Management</span>
          </NavLink>

          <NavLink to="/admin/cars" className={linkClass}>
            <Car size={20} />
            <span className="font-medium text-sm">Car Management</span>
          </NavLink>

          <NavLink to="/admin/forum" className={linkClass}>
            <Podcast size={20} />
            <span className="font-medium text-sm">Forum Management</span>
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-emerald-800">
          <button
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center gap-3 px-6 py-3 rounded-lg text-emerald-100/70 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200 group"
          >
            <LogOut size={20} className="group-hover:text-red-200" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
