import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-gray-800/60 text-white"
        : "text-gray-300 hover:bg-gray-800/30"
    }`;

  return (
    <aside className="w-64 hidden lg:block">
      <div className="h-full py-6 px-4 bg-linear-to-br from-gray-900/30 to-gray-800/30 border-r border-gray-800">
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers />
            <span>Manage Users</span>
          </NavLink>

          <NavLink to="/admin/garas" className={linkClass}>
            <FaTachometerAlt />
            <span>Manage Garas</span>
          </NavLink>

          <NavLink to="/admin/cars" className={linkClass}>
            <FaTachometerAlt />
            <span>Manage Cars</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
