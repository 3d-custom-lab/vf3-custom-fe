import { useState, useEffect } from "react";
import { Package, Plus, Eye, X } from "lucide-react";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { getAllModels, getModelById } from "../../services/modelService";
import { getAllGaras } from "../../services/garaService";
import { useToast } from "../../hooks/useToast";
import CreateModelModal, { MODEL_TYPES } from "../../components/modal/CreateModelModal";

function ManageModelPage() {
  const [models, setModels] = useState([]);
  const [garas, setGaras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // View Modal State
  const [selectedModel, setSelectedModel] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const { showError } = useToast();

  useEffect(() => {
    fetchModels();
    fetchGaras();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const response = await getAllModels();
      if (response.code === 1000 && response.result) {
        setModels(response.result);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      showError("Failed to load models");
    } finally {
      setLoading(false);
    }
  };

  const fetchGaras = async () => {
    try {
      const response = await getAllGaras();
      if (response.code === 1000 && response.result) {
        setGaras(response.result);
      }
    } catch (error) {
      console.error("Error fetching garas:", error);
    }
  };

  const handleViewModel = async (id) => {
    try {
      const response = await getModelById(id);
      if (response.code === 1000 && response.result) {
        setSelectedModel(response.result);
        setIsViewModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching model details:", error);
      showError("Failed to load model details");
    }
  };

  const getModelTypeLabel = (value) => {
    const type = MODEL_TYPES.find(t => t.value === value);
    return type ? type.label : value;
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Model Management</h1>
              <p className="text-slate-500 mt-1">Manage 3D models and components</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={20} />
              <span>Add New Model</span>
            </button>
          </div>

          {/* Models Table */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-800">All Models</h3>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold text-slate-900">{models.length}</span> models
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Gara ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Component URL</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Affiliate Link</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <span className="text-slate-600 font-medium">Loading models...</span>
                        </div>
                      </td>
                    </tr>
                  ) : models.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Package className="w-12 h-12 text-slate-300 mb-4" />
                          <span className="text-slate-500 font-medium">No models found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    models.map((model) => (
                      <tr key={model.id} className="hover:bg-blue-50/50 transition-all duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-slate-700">#{model.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {model.garaId}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getModelTypeLabel(model.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-[200px]">
                          <div className="truncate text-sm text-slate-600" title={model.componentUrl}>
                            {model.componentUrl}
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-[200px]">
                          <div className="truncate text-sm text-slate-600" title={model.affiliateLink}>
                            {model.affiliateLink}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-500">
                            {new Date(model.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleViewModel(model.id)}
                            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-500 border border-blue-200 hover:border-blue-500 transition-all duration-200 group/btn cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-600 group-hover/btn:text-white transition-colors" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Create Model Modal */}
      <CreateModelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchModels}
        garas={garas}
      />

      {/* View Details Modal */}
      {isViewModalOpen && selectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Model Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">ID</label>
                  <p className="text-slate-800 font-medium">#{selectedModel.id}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">Gara ID</label>
                  <p className="text-slate-800 font-medium">{selectedModel.garaId}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">Type</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                    {getModelTypeLabel(selectedModel.type)}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">Created At</label>
                  <p className="text-slate-800 font-medium">{new Date(selectedModel.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Component URL</label>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 break-all text-sm text-slate-600">
                  {selectedModel.componentUrl}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Affiliate Link</label>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 break-all text-sm text-slate-600">
                  {selectedModel.affiliateLink}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageModelPage;
