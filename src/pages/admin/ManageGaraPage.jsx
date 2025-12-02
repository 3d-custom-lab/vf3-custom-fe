import { useState, useEffect } from "react";
import { Package, ShoppingCart, TrendingUp, AlertCircle, Eye, Trash2 } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { getAllGaras, deleteGara } from "../../services/garaService";
import { useToast } from "../../hooks/useToast";

function ManageGaraPage() {
  const [garas, setGaras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalGaras: 0,
    totalOrders: 0,
    totalStock: 0,
    outOfStock: 0,
  });
  const { showError, showSuccess } = useToast();

  const handleViewGara = (gara) => {
    showSuccess(`Viewing ${gara.name}`);
  };

  const handleDeleteGara = async (gara) => {
    if (window.confirm(`Are you sure you want to delete "${gara.name}"?`)) {
      try {
        await deleteGara(gara.id);
        showSuccess(`Deleted ${gara.name} successfully`);
        fetchGaras(); // Refresh the list
      } catch (error) {
        showError("Failed to delete gara");
      }
    }
  };

  useEffect(() => {
    fetchGaras();
  }, []);

  const fetchGaras = async () => {
    try {
      setLoading(true);
      const response = await getAllGaras();
      
      if (response.code === 1000 && response.result) {
        setGaras(response.result);
        // Calculate stats
        setStats({
          totalGaras: response.result.length,
          totalOrders: 2859, // Mock data as per design
          totalStock: 5483,
          outOfStock: 38,
        });
      }
    } catch (error) {
      console.error("Error fetching garas:", error);
      showError("Failed to load garas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#cae3ed]">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          {/* Overview Section */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-slate-700 mb-3 md:mb-4">Over View</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {/* Total Products Card */}
              <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <Package className="text-emerald-600" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold text-slate-800 truncate">{stats.totalGaras}</p>
                    <p className="text-xs sm:text-sm text-slate-500">Total Garas</p>
                  </div>
                </div>
              </div>

              {/* Orders Card */}
              <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <ShoppingCart className="text-blue-600" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold text-slate-800 truncate">{stats.totalOrders}</p>
                    <p className="text-xs sm:text-sm text-slate-500">Orders</p>
                  </div>
                </div>
              </div>

              {/* Total Stock Card */}
              <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <TrendingUp className="text-purple-600" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold text-slate-800 truncate">{stats.totalStock}</p>
                    <p className="text-xs sm:text-sm text-slate-500">Total Stock</p>
                  </div>
                </div>
              </div>

              {/* Out of Stock Card */}
              <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                    <AlertCircle className="text-amber-600" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold text-slate-800 truncate">{stats.outOfStock}</p>
                    <p className="text-xs sm:text-sm text-slate-500">Out of Stock</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Garas Table */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">Gara Management</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage and view all registered garas</p>
                </div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Total: <span className="font-semibold text-slate-900">{garas.length}</span> garas
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200">
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">ID</div>
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Store ID</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider hidden sm:table-cell">Image</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Address</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider hidden lg:table-cell">Phone</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Rating</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider hidden md:table-cell">Services</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <span className="text-sm sm:text-base text-slate-600 font-medium">Loading garas...</span>
                        </div>
                      </td>
                    </tr>
                  ) : garas.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Package className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mb-4" />
                          <span className="text-sm sm:text-base text-slate-500 font-medium">No garas found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    garas.map((gara, index) => (
                      <tr 
                        key={gara.id} 
                        className="hover:bg-blue-50/50 transition-all duration-200 group"
                      >
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-xs sm:text-sm font-bold text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                            {gara.id}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-purple-100 text-purple-700">
                            {gara.storeId}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors max-w-[120px] sm:max-w-none truncate">
                                {gara.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">
                          <img
                            src={gara.image}
                            alt={gara.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-md border-2 border-white group-hover:border-blue-200 group-hover:shadow-lg transition-all duration-200"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80?text=No+Image";
                            }}
                          />
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 max-w-[200px]">
                          <div className="text-xs sm:text-sm text-slate-700">
                            {gara.addressStreet && <div className="font-medium truncate">{gara.addressStreet}</div>}
                            <div className="text-slate-600 truncate">{gara.addressWard}, {gara.addressDistrict}</div>
                            <div className="text-slate-500 text-[10px] sm:text-xs mt-1 truncate">{gara.addressCity}</div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap hidden lg:table-cell">
                          <span className="text-xs sm:text-sm font-medium text-slate-700">{gara.phone}</span>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-amber-50 rounded-lg border border-amber-200">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                              <span className="text-xs sm:text-sm font-bold text-amber-700">{gara.ratingAverage}</span>
                            </div>
                            <span className="text-[10px] sm:text-xs text-slate-500 font-medium">({gara.ratingCount})</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 max-w-[200px]">
                            {gara.services.slice(0, 2).map((service, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200"
                              >
                                {service}
                              </span>
                            ))}
                            {gara.services.length > 2 && (
                              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                +{gara.services.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <button
                              onClick={() => handleViewGara(gara)}
                              className="group/btn p-1.5 sm:p-2 md:p-2.5 rounded-lg bg-blue-50 hover:bg-blue-500 border border-blue-200 hover:border-blue-500 transition-all duration-200 hover:shadow-md cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 group-hover/btn:text-white transition-colors" />
                            </button>
                            <button
                              onClick={() => handleDeleteGara(gara)}
                              className="group/btn p-1.5 sm:p-2 md:p-2.5 rounded-lg bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-md cursor-pointer"
                              title="Delete Gara"
                            >
                              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 group-hover/btn:text-white transition-colors" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {garas.length > 0 && (
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t-2 border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
                  Showing <span className="font-bold text-slate-900">{garas.length}</span> of <span className="font-semibold">{garas.length}</span> garas
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-300 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer">
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                    1
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-300 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer">
                    2
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-300 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageGaraPage;
