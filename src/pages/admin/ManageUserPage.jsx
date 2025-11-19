import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";

export default function ManageUserPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <AdminSidebar />
        </div>

        <main className="lg:col-span-9">
          <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-4 underline">Manage Users</h2>
            <p className="text-gray-400">This is the ManageUser component inside the admin folder.</p>
            <p className="text-gray-400 mt-3">AdminHeader appears above, AdminSidebar on the left.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
