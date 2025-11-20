import { useState } from "react";
import { Package, ShoppingCart, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { useAuth } from "../../contexts/AuthContext";

function DashboardPage() {
  const { user } = useAuth();
  const [stats] = useState({
    totalProducts: 5483,
    orders: 2859,
    totalStock: 5483,
    outOfStock: 38,
    revenue: 45200,
    customers: 583000,
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Over View</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Package className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stats.totalProducts}</p>
                    <p className="text-sm text-slate-500">Total Products</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stats.orders}</p>
                    <p className="text-sm text-slate-500">Orders</p>
                  </div>
                </div>
              </div>
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
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">${(stats.revenue / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-slate-500">Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
