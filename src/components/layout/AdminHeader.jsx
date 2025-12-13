import { Search, Bell, Moon, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminHeader({ onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-emerald-100 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Menu button + Title */}
          <div className="flex items-center gap-3">
            {/* Hamburger menu for mobile/tablet */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            >
              <Menu size={24} className="text-emerald-900" />
            </button>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-950">
              <span className="hidden sm:inline">Welcome back, Admin!</span>
              <span className="sm:hidden">Admin Panel</span>
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer group">
              <Bell size={18} className="text-emerald-700 sm:w-5 sm:h-5 group-hover:text-emerald-600" />
            </button>
            <button className="hidden sm:block p-2 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer group">
              <Moon size={20} className="text-emerald-700 group-hover:text-emerald-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
