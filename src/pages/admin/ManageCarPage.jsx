import { useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Car,
} from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { useToast } from "../../hooks/useToast";

function ManageCarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-emerald-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
      </div>
    </div>
  );
}

export default ManageCarPage;
