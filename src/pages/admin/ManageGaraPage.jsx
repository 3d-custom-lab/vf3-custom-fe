import { useState, useEffect } from "react";
import { Package, ShoppingCart, TrendingUp, AlertCircle, Users, DollarSign } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { getAllGaras } from "../../services/garaService";
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
  const { showError } = useToast();

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
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* No of users */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">No of users</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Users className="text-slate-600" size={28} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-800">583 K</p>
                  <p className="text-sm text-slate-500">Total Customers</p>
                </div>
              </div>
            </div>

            {/* Inventory Values */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Inventory Values</h4>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56 * 0.68} ${2 * Math.PI * 56}`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#60a5fa"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56 * 0.32} ${2 * Math.PI * 56}`}
                      strokeDashoffset={`-${2 * Math.PI * 56 * 0.68}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800">68%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-600">Sold units</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600">Total units</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top 10 Stores */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Top 10 Stores by sales</h4>
              <div className="space-y-3">
                {[
                  { name: "Gateway Mall", value: 474 },
                  { name: "The Ructic Fox", value: 713 },
                  { name: "Velvet Vine", value: 509 },
                  { name: "Blue Horizon", value: 569 },
                  { name: "NebulaN Nexus", value: 365 },
                  { name: "Crimson Crafters", value: 344 },
                  { name: "Tidal Treasures", value: 274 },
                  { name: "Whimsy Well", value: 213 },
                  { name: "Moonstone", value: 131 },
                  { name: "Emporium", value: 176 },
                ].map((store, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">{store.name}</span>
                        <span className="text-xs font-semibold text-slate-700">{store.value}k</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(store.value / 713) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Garas Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">Gara Management</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Store ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Services</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="ml-3 text-slate-500">Loading garas...</span>
                        </div>
                      </td>
                    </tr>
                  ) : garas.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                        No garas found
                      </td>
                    </tr>
                  ) : (
                    garas.map((gara) => (
                      <tr key={gara.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-slate-900">{gara.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-600">{gara.storeId}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">{gara.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={gara.image}
                            alt={gara.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/64?text=No+Image";
                            }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-900">
                            {gara.addressStreet && <div>{gara.addressStreet}</div>}
                            <div>{gara.addressWard}, {gara.addressDistrict}</div>
                            <div className="text-slate-500">{gara.addressCity}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-600">{gara.phone}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-amber-500">★</span>
                            <span className="text-sm font-medium text-slate-900">{gara.ratingAverage}</span>
                            <span className="text-sm text-slate-500">({gara.ratingCount})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {gara.services.slice(0, 2).map((service, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700"
                              >
                                {service}
                              </span>
                            ))}
                            {gara.services.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                                +{gara.services.length - 2}
                              </span>
                            )}
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
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-medium">{garas.length}</span> garas
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
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
