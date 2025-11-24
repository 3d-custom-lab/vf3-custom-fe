import { useState, useEffect } from "react";
import { Users, UserCheck, UserPlus, UserX, Eye, Trash2, Search, Shield, Mail, CreditCard } from "lucide-react"; // Thêm icon CreditCard
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { getAllUsers, deleteUser } from "../../services/userService";
import { useToast } from "../../hooks/useToast";

function ManageUserPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    bannedUsers: 0,
  });
  
  const { showSuccess, showError } = useToast()

  const normalizeStatus = (status) => (status || "").toLowerCase();

  const formatDate = (dateValue) => {
    const date = dateValue ? new Date(dateValue) : null;
    if (!date || Number.isNaN(date.getTime())) return "N/A";
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        
        if (response.code === 1000 && response.result) {
          const result = response.result || [];
          setUsers(result);
          
          // Calculate stats
          const todayString = new Date().toDateString();
          setStats({
            totalUsers: result.length,
            activeUsers: result.filter(user => normalizeStatus(user.status) === "active").length,
            newUsersToday: result.filter(user => {
              const createdAt = user?.createdAt ? new Date(user.createdAt) : null;
              return createdAt && !Number.isNaN(createdAt.getTime()) && createdAt.toDateString() === todayString;
            }).length,
            bannedUsers: result.filter(user => normalizeStatus(user.status) === "banned" || normalizeStatus(user.status) === "inactive").length,
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        showError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

  const handleDeleteUser = async (user) => {
      if (window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
        try {
          await deleteUser(user.id);
          showSuccess(`Deleted ${user.name} successfully`);
          setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
          setStats(prev => ({...prev, totalUsers: prev.totalUsers - 1}));
        } catch (error) {
          console.error("Error deleting user:", error);
          showError("Failed to delete user");
        }
      }
    };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "ADMIN": return "bg-purple-100 text-purple-700 border-purple-200";
      case "STAFF": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusColor = (status) => {
    switch (normalizeStatus(status)) {
      case "active": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "banned": 
      case "inactive": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter((user) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    const searchValues = [
      user?.name,
      user?.email,
      user?.type,          // Thay role = type
      user?.paymentType,   // Thêm paymentType
      user?.gender,        // Thêm gender
      user?.status,        // Thêm status
      user?.id?.toString(),
    ];

    return searchValues
      .filter(Boolean) 
      .some((field) => field.toString().toLowerCase().includes(term));
  }) : [];

  return (
    <div className="flex min-h-screen bg-[#cae3ed]">
        <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-6">
          {/* Overview Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">User Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cards giữ nguyên */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
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
                    <p className="text-2xl font-bold text-slate-800">{stats.activeUsers}</p>
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
                    <p className="text-2xl font-bold text-slate-800">{stats.newUsersToday}</p>
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
                    <p className="text-2xl font-bold text-slate-800">{stats.bannedUsers}</p>
                    <p className="text-sm text-slate-500">Banned/Inactive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">User Management</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage access and user details</p>
                </div>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">User Info</th>
                    {/* CẬP NHẬT HEADER TABLE: Role -> Type, Contact -> Payment */}
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <span className="text-slate-600">Loading users...</span>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="px-6 py-16 text-center text-slate-500">No users found</td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-slate-500">No users match your search</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user,index) => {
                      const safeName = user?.name || "Unknown";
                      const safeEmail = user?.email || "No email";
                      return (
                      <tr key={user.id} className="hover:bg-blue-50/50 transition-all duration-200 group">
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
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div 
                                    className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-sm bg-slate-200 absolute top-0 left-0"
                                    style={{ display: user.avatar ? 'none' : 'flex' }}
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
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getTypeBadgeColor(user.type)}`}>
                                <Shield size={12} />
                                {user.type}
                            </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                             {/* Cập nhật: Hiển thị Payment Type thay vì Phone */}
                             <div className="flex items-center gap-2 text-sm text-slate-600">
                                <CreditCard size={14} className="text-slate-400"/>
                                <span className="font-medium">{user.paymentType || "FREE"}</span>
                             </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${normalizeStatus(user.status) === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                {user.status || "Unknown"}
                             </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {formatDate(user.createdAt)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button className="group/btn p-2 rounded-lg bg-blue-50 hover:bg-blue-500 border border-blue-200 hover:border-blue-500 transition-all duration-200 hover:shadow-md" title="View Details">
                              <Eye className="w-4 h-4 text-blue-600 group-hover/btn:text-white transition-colors" />
                            </button>
                            <button 
                                onClick={() => handleDeleteUser(user)}
                                className="group/btn p-2 rounded-lg bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-md" title="Delete User">
                              <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:text-white transition-colors" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )})
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination giữ nguyên */}
            <div className="px-6 py-4 border-t-2 border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-xl">
              <div className="text-sm text-slate-600">
                Showing <span className="font-bold text-slate-900">{filteredUsers.length}</span> of <span className="font-bold text-slate-900">{users.length}</span> users
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white border border-slate-300 rounded-lg transition-all">Previous</button>
                <button className="px-3 py-1.5 text-sm font-bold bg-blue-600 text-white rounded-lg shadow-md">1</button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white border border-slate-300 rounded-lg transition-all">Next</button>
              </div>
            </div>
          </div>
          </main>
      </div>
    </div>
  );
}

export default ManageUserPage;