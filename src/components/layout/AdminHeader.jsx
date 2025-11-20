import { Search, Bell, Moon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, {user?.name + " - Admin" || "Admin"}!
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell size={20} className="text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Moon size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
