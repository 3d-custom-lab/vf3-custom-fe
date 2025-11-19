import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { getUserInfo } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load user information from API
   */
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        setLoading(true);
        const response = await getUserInfo();
        if (response.code === 0 || response.code === 1000) {
          setUserInfo(response.result);
        } else {
          setError("Failed to load user information");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24">
          <div className="bg-linear-to-br from-slate-800/80 via-slate-850/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-700/50 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <img
                  src={userInfo?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(userInfo?.name || "User")}
                  alt={userInfo?.name}
                  className="w-32 h-32 rounded-full border-4 border-blue-500/50 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-slate-800">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">{userInfo?.name}</h1>
              <p className="text-slate-400 mb-4">{userInfo?.email}</p>
              
              <div className="flex gap-3">
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  userInfo?.type === "ADMIN" 
                    ? "bg-red-500/20 text-red-400 border border-red-500/50"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                }`}>
                  {userInfo?.type}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  userInfo?.status === "ACTIVE"
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                }`}>
                  {userInfo?.status}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  userInfo?.paymentType === "FREE"
                    ? "bg-slate-500/20 text-slate-400 border border-slate-500/50"
                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                }`}>
                  {userInfo?.paymentType}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-slate-400 text-sm font-semibold mb-2">Gender</h3>
                <p className="text-white text-lg">{userInfo?.gender || "Not specified"}</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-slate-400 text-sm font-semibold mb-2">User ID</h3>
                <p className="text-white text-lg">#{userInfo?.id}</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-slate-400 text-sm font-semibold mb-2">Member Since</h3>
                <p className="text-white text-lg">
                  {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-slate-400 text-sm font-semibold mb-2">Last Updated</h3>
                <p className="text-white text-lg">
                  {userInfo?.updatedAt ? new Date(userInfo.updatedAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 border border-slate-600"
              >
                Back to Home
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
