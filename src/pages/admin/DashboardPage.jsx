import { useAuth } from "../../contexts/AuthContext";
import { FaUsers, FaChartLine, FaCog, FaCar, FaUser } from "react-icons/fa";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <AdminHeader />

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <AdminSidebar />
        </div>
        <main className="lg:col-span-9">
          {/* Welcome Section */}
          <div className="bg-linear-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard 👑
            </h2>
            <p className="text-gray-300">
              Welcome back, {user?.email}! Manage your platform from here.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stat Card 1 */}
            <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <FaUsers className="text-purple-400 text-xl" />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  +12.5%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1,234</h3>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <FaCar className="text-blue-400 text-xl" />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  +8.2%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">567</h3>
              <p className="text-gray-400 text-sm">Active Vehicles</p>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <FaChartLine className="text-cyan-400 text-xl" />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  +15.3%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">89</h3>
              <p className="text-gray-400 text-sm">Bookings Today</p>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-green-400 text-sm font-medium">
                  +23.1%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">$45.2K</h3>
              <p className="text-gray-400 text-sm">Revenue</p>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaCog className="text-purple-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-all duration-300 text-left font-medium">
                  Manage Users
                </button>
                <button className="w-full px-4 py-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all duration-300 text-left font-medium">
                  View Reports
                </button>
                <button className="w-full px-4 py-3 bg-cyan-500/10 text-cyan-400 rounded-xl hover:bg-cyan-500/20 transition-all duration-300 text-left font-medium">
                  System Settings
                </button>
                <button className="w-full px-4 py-3 bg-pink-500/10 text-pink-400 rounded-xl hover:bg-pink-500/20 transition-all duration-300 text-left font-medium">
                  Analytics Dashboard
                </button>
              </div>
            </div>

            {/* Admin Info */}
            <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaUser className="text-purple-400" />
                Admin Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Full Name</p>
                  <p className="text-white font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email Address</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Role</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                    {user?.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaChartLine className="text-purple-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-gray-300 text-sm">
                    New user registration: john@example.com
                  </p>
                </div>
                <span className="text-xs text-gray-500">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <p className="text-gray-300 text-sm">
                    Vehicle booking confirmed: VF3-2024
                  </p>
                </div>
                <span className="text-xs text-gray-500">15 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <p className="text-gray-300 text-sm">
                    System backup completed successfully
                  </p>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
