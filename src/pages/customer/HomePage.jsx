import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { FaCar, FaSignOutAlt, FaUser } from "react-icons/fa";
import { ROUTES } from "../../utils/constants";

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  /**
   * Xử lý đăng xuất
   */
  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.AUTH);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header/Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <FaCar className="text-white text-xl" />
              </div>
              <h1 className="text-xl font-bold text-white">
                VF<span className="text-blue-400">3</span>
              </h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <FaUser className="text-blue-400" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
              >
                <FaSignOutAlt />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-gray-400">
            Explore our premium automotive experience
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <FaCar className="text-blue-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">My Vehicles</h3>
            <p className="text-gray-400 text-sm">
              View and manage your vehicle collection
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Service History
            </h3>
            <p className="text-gray-400 text-sm">
              Track your maintenance and service records
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Profile</h3>
            <p className="text-gray-400 text-sm">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Name</p>
              <p className="text-white font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Gender</p>
              <p className="text-white font-medium">{user?.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Account Type</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                {user?.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
