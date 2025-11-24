import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Warehouse, Car, Podcast, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 mx-3 rounded-lg transition-all duration-200 ${
      isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
    }`;

  return (
    <aside className="w-64 bg-[#265267] min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40 shadow-lg">
      {/* User Profile Section */}
      <div className="pt-8 pb-6 px-6 flex flex-col items-center border-b border-white/10">
        <div className="w-20 h-20 rounded-full bg-white p-1 mb-3 overflow-hidden shadow-lg">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
              <Users className="text-slate-500" size={32} />
            </div>
          )}
        </div>
        <h3 className="text-white font-semibold text-base mb-1">
          {user?.name || "Admin"}
        </h3>
        <p className="text-slate-300 text-xs">
          {user?.email || "admin@example.com"}
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

        <NavLink to="/admin/cars" className={linkClass}>
          <Car size={20} />
          <span className="font-medium text-sm">Car Management</span>
        </NavLink>

        <NavLink to="/admin/forum" className={linkClass}>
          <Podcast size={20} />
          <span className="font-medium text-sm">Forum Management</span>
        </NavLink>

        {/* <NavLink to="/admin/settings" className={linkClass}>
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </NavLink> */}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="cursor-pointer w-full flex items-center gap-3 px-6 py-3 rounded-lg text-slate-300 hover:bg-white/5 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
