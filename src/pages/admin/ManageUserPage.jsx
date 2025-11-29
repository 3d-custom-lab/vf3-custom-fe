import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  Eye,
  Trash2,
  Search,
  Shield,
  Mail,
  CreditCard,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import CreateUserModal from "../../components/modal/CreateUserModal";
import { getAllUsers, deleteUser } from "../../services/userService";
import { useToast } from "../../hooks/useToast";
import { formatDate } from "../../utils/dateUtils";

function ManageUserPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    bannedUsers: 0,
  });

  // Filter and Pagination state
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const { showSuccess, showError } = useToast();

  const normalizeStatus = (status) => (status || "").toLowerCase();

  // Fetch users khi component mount hoặc khi filter/pagination thay đổi
  useEffect(() => {
    fetchUsers();
  }, [statusFilter, currentPage, pageSize]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers({
        status: statusFilter,
        page: currentPage,
        size: pageSize,
      });

      if (response.code === 1000 && response.result) {
        const result = response.result;
        setUsers(result.content || []);
        setTotalPages(result.totalPages || 0);
        setTotalElements(result.totalElements || 0);

        // Calculate stats from all users (không phụ thuộc vào filter)
        const allUsers = result.content || [];
        const todayString = new Date().toDateString();
        setStats({
          totalUsers: result.totalElements || 0,
          activeUsers: allUsers.filter(
            (user) => normalizeStatus(user.status) === "active"
          ).length,
          newUsersToday: allUsers.filter((user) => {
            const createdAt = user?.createdAt ? new Date(user.createdAt) : null;
            return (
              createdAt &&
              !isNaN(createdAt.getTime()) &&
              createdAt.toDateString() === todayString
            );
          }).length,
          bannedUsers: allUsers.filter(
            (user) =>
              normalizeStatus(user.status) === "banned" ||
              normalizeStatus(user.status) === "inactive"
          ).length,
        });
      }
    } catch (error) {
      showError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}"?`)
    ) {
      try {
        await deleteUser(user.id);
        showSuccess(`Đã xóa ${user.name} thành công`);
        fetchUsers(); // Refresh lại danh sách
      } catch (error) {
        showError("Không thể xóa người dùng");
      }
    }
  };

  const handleCreateSuccess = () => {
    fetchUsers(); // Refresh list after creating new user
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(0); // Reset về trang đầu khi filter
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "STAFF":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusColor = (status) => {
    switch (normalizeStatus(status)) {
      case "active":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "banned":
      case "inactive":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  // Filter users theo search term (client-side search)
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        const searchValues = [
          user?.name,
          user?.email,
          user?.type, // Thay role = type
          user?.paymentType, // Thêm paymentType
          user?.gender, // Thêm gender
          user?.status, // Thêm status
          user?.id?.toString(),
        ];

        return searchValues
          .filter(Boolean)
          .some((field) => field.toString().toLowerCase().includes(term));
      })
    : [];

  return (
    <div className="flex min-h-screen bg-[#cae3ed]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-6">
          {/* Overview Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              User Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cards giữ nguyên */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.totalUsers}
                    </p>
                    <p className="text-sm text-slate-500">Total Users</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.activeUsers}
                    </p>
                    <p className="text-sm text-slate-500">Active Users</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <UserPlus className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.newUsersToday}
                    </p>
                    <p className="text-sm text-slate-500">New Today</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <UserX className="text-red-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.bannedUsers}
                    </p>
                    <p className="text-sm text-slate-500">Banned/Inactive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    User Management
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Manage user information and access rights
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Create User Button */}
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 cursor-pointer"
                  >
                    <UserPlus size={18} />
                    <span className="hidden sm:inline">Create User</span>
                  </button>

                  {/* Status Filter */}
                  <div className="relative">
                    <Filter
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                      size={18}
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => handleStatusFilterChange(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm font-medium focus:outline-none focus:border-blue-500 hover:border-slate-400 transition-colors cursor-pointer"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="ACTIVE">Active</option>
                      <option value="PENDING">Pending</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="BANNED">Banned</option>
                    </select>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Tìm kiếm người dùng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 hover:border-slate-400 transition-colors w-64"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Updated At
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <span className="text-slate-600">
                            Đang tải dữ liệu...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-16 text-center text-slate-500"
                      >
                        {searchTerm
                          ? "Không tìm thấy người dùng phù hợp"
                          : "Chưa có người dùng nào"}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => {
                      const safeName = user?.name || "Unknown";
                      const safeEmail = user?.email || "No email";
                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-blue-50/50 transition-all duration-200 group"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm font-bold text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                              {user.id}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-200 relative group/avatar">
                                {user.avatar ? (
                                  <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.nextSibling.style.display =
                                        "flex";
                                    }}
                                  />
                                ) : null}
                                <div
                                  className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-sm bg-slate-200 absolute top-0 left-0"
                                  style={{
                                    display: user.avatar ? "none" : "flex",
                                  }}
                                >
                                  {safeName.charAt(0).toUpperCase()}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                  {safeName}
                                </div>
                                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                  <Mail size={10} /> {safeEmail}
                                </div>
                                {/* Hiển thị Gender ở đây */}
                                <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                                  {user.gender || "N/A"}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* Cập nhật: user.type thay vì user.role */}
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getTypeBadgeColor(
                                user.type
                              )}`}
                            >
                              <Shield size={12} />
                              {user.type}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* Cập nhật: Hiển thị Payment Type thay vì Phone */}
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <CreditCard
                                size={14}
                                className="text-slate-400"
                              />
                              <span className="font-medium">
                                {user.paymentType || "FREE"}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                user.status
                              )}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  normalizeStatus(user.status) === "active"
                                    ? "bg-emerald-500"
                                    : normalizeStatus(user.status) === "pending"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                              {user.status || "Unknown"}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {formatDate(user.createdAt, "short")}
                              </span>
                              <span className="text-xs text-slate-400">
                                {
                                  formatDate(user.createdAt, "time").split(
                                    " "
                                  )[1]
                                }
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {formatDate(user.updatedAt, "short")}
                              </span>
                              <span className="text-xs text-slate-400">
                                {
                                  formatDate(user.updatedAt, "time").split(
                                    " "
                                  )[1]
                                }
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="group/btn p-2 rounded-lg bg-blue-50 hover:bg-blue-500 border border-blue-200 hover:border-blue-500 transition-all duration-200 hover:shadow-md cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4 text-blue-600 group-hover/btn:text-white transition-colors" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="group/btn p-2 rounded-lg bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-md cursor-pointer"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:text-white transition-colors" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination - Cập nhật với dữ liệu thực từ API */}
            <div className="px-6 py-4 border-t-2 border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-xl">
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-600">
                  Hiển thị{" "}
                  <span className="font-bold text-slate-900">
                    {filteredUsers.length}
                  </span>{" "}
                  /{" "}
                  <span className="font-bold text-slate-900">
                    {totalElements}
                  </span>{" "}
                  người dùng
                </div>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(0);
                  }}
                  className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="10">10 / trang</option>
                  <option value="15">15 / trang</option>
                  <option value="25">25 / trang</option>
                  <option value="50">50 / trang</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white border border-slate-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  Trước
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i;
                    } else if (currentPage < 3) {
                      pageNum = i;
                    } else if (currentPage > totalPages - 3) {
                      pageNum = totalPages - 5 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-slate-600 hover:bg-white border border-slate-300"
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white border border-slate-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  Sau
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}

export default ManageUserPage;
