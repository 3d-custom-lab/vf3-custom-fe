import { useState } from "react";
import { X, Upload, Save, Loader2 } from "lucide-react";
import { createModel } from "../../services/modelService";
import { uploadFile } from "../../services/fileService";
import { useToast } from "../../hooks/useToast";

export const MODEL_TYPES = [
    { value: "SEAT_BASE", label: "Bệ chân" },
    { value: "SWINGARM", label: "Calang" },
    { value: "ROOF", label: "Nóc" },
    { value: "RIM", label: "Vành" },
    { value: "HINGE", label: "Bản lề" },
    { value: "FRONT_BUMPER", label: "Cản trước" },
    { value: "TRUNK_LID", label: "Cốp sau" },
    { value: "HOOD", label: "Nắp capo" },
    { value: "WING", label: "Cánh gió" },
    { value: "FLAG_TRUNK_LID", label: "Nắp cốp cờ" },
    { value: "FIN_X", label: "Vây X" },
    { value: "OTHER", label: "Khác" }
];

export default function CreateModelModal({ isOpen, onClose, onSuccess, garas }) {
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        garaId: "",
        affiliateLink: "",
        type: "SEAT_BASE",
        file: null
    });
    const { showError, showSuccess } = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                file: e.target.files[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.garaId) {
            showError("Please select a Gara");
            return;
        }
        if (!formData.file) {
            showError("Please upload a file");
            return;
        }

        try {
            setCreating(true);
            let fileUrl = "";

            // 1. Upload File
            const uploadResponse = await uploadFile(
                formData.file,
                "FILE", // Using "FILE" as "MODEL" is not in the allowed list (USER, FILE, POST)
                "0", // Temporary ID or 0 as we don't have model ID yet
                "0" // Assuming uploadedBy is 0 or handled by backend
            );

            if (uploadResponse.code === 0 && uploadResponse.result) {
                fileUrl = uploadResponse.result.url;
            } else {
                throw new Error("Failed to upload model file");
            }

            // 2. Create Model
            const modelData = {
                garaId: formData.garaId,
                affiliateLink: formData.affiliateLink,
                type: formData.type,
                url: fileUrl // Sending file URL
            };

            const response = await createModel(modelData);

            if (response.code === 1000) {
                showSuccess("Model created successfully");
                onSuccess();
                onClose();
                setFormData({
                    garaId: "",
                    affiliateLink: "",
                    type: "SEAT_BASE",
                    file: null
                });
            } else {
                throw new Error(response.message || "Failed to create model");
            }

        } catch (error) {
            console.error("Error creating model:", error);
            showError(error.message || "Failed to create model");
        } finally {
            setCreating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Add New Model</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Upload a new 3D model component</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-4">
                        {/* Gara Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Select Gara <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="garaId"
                                    value={formData.garaId}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer hover:bg-slate-100"
                                    required
                                >
                                    <option value="" className="text-slate-400">Choose a garage...</option>
                                    {garas.map(gara => (
                                        <option key={gara.id} value={gara.id} className="text-slate-900">
                                            {gara.name} (ID: {gara.id})
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Type Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Component Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer hover:bg-slate-100"
                                    required
                                >
                                    {MODEL_TYPES.map(type => (
                                        <option key={type.value} value={type.value} className="text-slate-900">
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Affiliate Link */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Affiliate Link
                            </label>
                            <input
                                type="text"
                                name="affiliateLink"
                                value={formData.affiliateLink}
                                onChange={handleInputChange}
                                placeholder="https://example.com/product..."
                                className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Model File <span className="text-red-500">*</span>
                            </label>
                            <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer relative group ${formData.file ? 'border-blue-500 bg-blue-50/30' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                                }`}>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    required={!formData.file}
                                />

                                <div className={`p-3 rounded-full mb-3 transition-colors ${formData.file ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'}`}>
                                    <Upload size={24} />
                                </div>

                                {formData.file ? (
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-blue-700 break-all max-w-[250px]">
                                            {formData.file.name}
                                        </p>
                                        <p className="text-xs text-blue-500 mt-1">
                                            {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-slate-700">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Supported formats: GLB, GLTF, OBJ
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={creating}
                            className="flex-1 px-4 py-2.5 text-white bg-blue-600 rounded-xl hover:bg-blue-700 font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
                        >
                            {creating ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Create Model</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
