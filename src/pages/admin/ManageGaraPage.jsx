import { useState, useEffect } from "react";
import { Package, ShoppingCart, TrendingUp, AlertCircle, Eye, Trash2 } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { getAllGaras, deleteGara } from "../../services/garaService";
import { useToast } from "../../hooks/useToast";

function ManageGaraPage() {
  const [garas, setGaras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGaras: 0,
    totalOrders: 0,
    totalStock: 0,
    outOfStock: 0,
  });
  const { showError, showSuccess } = useToast();

  const handleViewGara = (gara) => {
    // TODO: Navigate to detail page or open modal
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
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {/* Overview Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Over View</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Products Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Package className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stats.totalGaras}</p>
                    <p className="text-sm text-slate-500">Total Garas</p>
                  </div>
                </div>
              </div>

              {/* Orders Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stats.totalOrders}</p>
                    <p className="text-sm text-slate-500">Orders</p>
                  </div>
                </div>
              </div>

              {/* Total Stock Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stats.totalStock}</p>
                    <p className="text-sm text-slate-500">Total Stock</p>
                  </div>
                </div>
              </div>

              {/* Out of Stock Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stats.outOfStock}</p>
                    <p className="text-sm text-slate-500">Out of Stock</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Garas Table */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Gara Management</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage and view all registered garas</p>
                </div>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold text-slate-900">{garas.length}</span> garas
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">ID</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Store ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Services</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <span className="text-slate-600 font-medium">Loading garas...</span>
                        </div>
                      </td>
                    </tr>
                  ) : garas.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Package className="w-16 h-16 text-slate-300 mb-4" />
                          <span className="text-slate-500 font-medium">No garas found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    garas.map((gara, index) => (
                      <tr 
                        key={gara.id} 
                        className="hover:bg-blue-50/50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm font-bold text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                            {gara.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                            {gara.storeId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                {gara.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={gara.image}
                            alt={gara.name}
                            className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-white group-hover:border-blue-200 group-hover:shadow-lg transition-all duration-200"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80?text=No+Image";
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-slate-700">
                            {gara.addressStreet && <div className="font-medium">{gara.addressStreet}</div>}
                            <div className="text-slate-600">{gara.addressWard}, {gara.addressDistrict}</div>
                            <div className="text-slate-500 text-xs mt-1">{gara.addressCity}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-slate-700">{gara.phone}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">
                              <span className="text-base font-bold text-amber-500">★</span>
                              <span className="text-sm font-bold text-amber-700">{gara.ratingAverage}</span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">({gara.ratingCount})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {gara.services.slice(0, 2).map((service, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200"
                              >
                                {service}
                              </span>
                            ))}
                            {gara.services.length > 2 && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                +{gara.services.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewGara(gara)}
                              className="group/btn p-2.5 rounded-lg bg-blue-50 hover:bg-blue-500 border border-blue-200 hover:border-blue-500 transition-all duration-200 hover:shadow-md cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-blue-600 group-hover/btn:text-white transition-colors" />
                            </button>
                            <button
                              onClick={() => handleDeleteGara(gara)}
                              className="group/btn p-2.5 rounded-lg bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-md cursor-pointer"
                              title="Delete Gara"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:text-white transition-colors" />
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
              <div className="px-6 py-4 border-t-2 border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-bold text-slate-900">{garas.length}</span> of <span className="font-semibold">{garas.length}</span> garas
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-300 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer">
                    Previous
                  </button>
                  <button className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                    1
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-300 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer">
                    2
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-300 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer">
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
