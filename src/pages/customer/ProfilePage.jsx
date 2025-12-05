import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EditProfileModal from "../../components/modal/EditProfileModal";
import ChangePasswordModal from "../../components/modal/ChangePasswordModal";
import { getUserInfo, updateUserProfile } from "../../services/userService";
import useToast from "../../hooks/useToast";
import Toast from "../../components/ui/Toast";
import {
  User,
  Mail,
  Calendar,
  Shield,
  CreditCard,
  Activity,
  CheckCircle2,
  Hash,
  Edit3,
  Key,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      setLoading(true);
      const response = await getUserInfo();

      if (response.code === 1000 && response.result) {
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

  const handleSaveProfile = async (formData) => {
    try {
      const response = await updateUserProfile(userInfo.id, formData);

      if (response.code === 1000 && response.result) {
        setUserInfo(response.result);
        showSuccess("Profile updated successfully!");
        setIsEditModalOpen(false);
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error) {
      showError(
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile"
      );
      throw error;
    }
  };

  // Helper component for detail cards
  const DetailCard = ({
    icon: Icon,
    label,
    value,
    colorClass = "text-blue-400",
  }) => (
    <div className="bg-slate-800/40 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/60 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-slate-100 font-semibold truncate">
            {value || "Not specified"}
          </p>
        </div>
        <div
          className={`p-2 rounded-xl bg-slate-900/50 ${colorClass} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
          <div className="bg-slate-800 p-8 rounded-3xl border border-red-500/20 shadow-2xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-slate-400 mb-6">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium cursor-pointer"
            >
              Return Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0B1120] relative overflow-hidden font-sans selection:bg-indigo-500/30">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-indigo-900/20 to-transparent opacity-50" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          {/* Main Profile Card */}
          <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
            {/* Cover Banner */}
            <div className="h-48 w-full bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900/90"></div>
            </div>

            <div className="px-8 pb-8 md:px-12 md:pb-12 -mt-20 relative">
              {/* Profile Header Section */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">
                {/* Avatar with Rings */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-br from-indigo-500 to-fuchsia-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative w-40 h-40 rounded-full p-1 bg-slate-900">
                    <img
                      src={
                        userInfo?.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          userInfo?.name || "User"
                        )}&background=random`
                      }
                      alt={userInfo?.name}
                      className="w-full h-full rounded-full object-cover border-4 border-slate-900 shadow-inner"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-slate-900 ${userInfo?.status === "ACTIVE"
                        ? "bg-emerald-500"
                        : "bg-slate-500"
                        }`}
                    ></div>
                  </div>
                </div>

                {/* Name and Badges */}
                <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                  <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    {userInfo?.name}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                      <Mail size={14} />
                      {userInfo?.email}
                    </div>

                    {/* Dynamic Role Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${userInfo?.type === "ADMIN"
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                        }`}
                    >
                      {userInfo?.type}
                    </span>

                    {/* Dynamic Payment Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border flex items-center gap-1 ${userInfo?.paymentType === "FREE"
                        ? "bg-slate-700/30 border-slate-600 text-slate-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}
                    >
                      <CreditCard size={12} />
                      {userInfo?.paymentType}
                    </span>
                  </div>
                </div>

                {/* Header Actions (Desktop) */}
                <div className="hidden md:flex gap-3">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="cursor-pointer px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 group"
                  >
                    <Edit3
                      size={18}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => setIsChangePasswordModalOpen(true)}
                    className="cursor-pointer px-6 py-3 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 border border-slate-700"
                    title="Change Password"
                  >
                    <Key size={18} />
                    <span>Change Password</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-linear-to-r from-transparent via-slate-700 to-transparent mb-10"></div>

              {/* Bento Grid Layout for Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <DetailCard
                  icon={Hash}
                  label="User ID"
                  value={`#${userInfo?.id}`}
                  colorClass="text-purple-400"
                />
                <DetailCard
                  icon={User}
                  label="Gender"
                  value={userInfo?.gender}
                  colorClass="text-pink-400"
                />
                <DetailCard
                  icon={Calendar}
                  label="Joined Date"
                  value={
                    userInfo?.createdAt
                      ? new Date(userInfo.createdAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" }
                      )
                      : null
                  }
                  colorClass="text-emerald-400"
                />
                <DetailCard
                  icon={Activity}
                  label="Last Updated"
                  value={
                    userInfo?.updatedAt
                      ? new Date(userInfo.updatedAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" }
                      )
                      : null
                  }
                  colorClass="text-orange-400"
                />
              </div>

              {/* Account Status Banner */}
              <div className="bg-linear-to-r from-slate-800/50 to-slate-800/30 rounded-2xl p-6 border border-slate-700/50 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${userInfo?.status === "ACTIVE"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-slate-500/10 text-slate-400"
                      }`}
                  >
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Account Status</h3>
                    <p className="text-slate-400 text-sm">
                      Your account is currently{" "}
                      <span className="lowercase">{userInfo?.status}</span> and
                      operating normally.
                    </p>
                  </div>
                </div>
                {userInfo?.paymentType === "FREE" && (
                  <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer">
                    Upgrade Plan
                  </button>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="col-span-2 flex items-center justify-center gap-2 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsChangePasswordModalOpen(true)}
                  className="col-span-2 flex items-center justify-center gap-2 py-3 bg-slate-800 text-slate-200 rounded-xl border border-slate-700 cursor-pointer"
                >
                  <Key size={18} />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userInfo={userInfo}
        onSave={handleSaveProfile}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        userId={userInfo?.id}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
    </>
  );
}
