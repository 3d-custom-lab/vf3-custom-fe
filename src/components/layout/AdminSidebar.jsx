import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Warehouse, Car, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-slate-700 text-white"
        : "text-slate-300 hover:bg-slate-700/50"
    }`;

  return (
    <aside className="w-64 bg-slate-800 min-h-screen flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <Users className="text-slate-300" size={24} />
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{user?.name || "Admin User"}</h3>
            <p className="text-slate-400 text-xs">{user?.email || "admin@vf3.com"}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={20} />
          <span className="font-medium">User</span>
        </NavLink>

        <NavLink to="/admin/garas" className={linkClass}>
          <Warehouse size={20} />
          <span className="font-medium">Gara</span>
        </NavLink>

        <NavLink to="/admin/cars" className={linkClass}>
          <Car size={20} />
          <span className="font-medium">Car</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
