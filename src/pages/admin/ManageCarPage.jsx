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
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <AdminHeader />
      </div>
    </div>
  );
}

export default ManageCarPage;
