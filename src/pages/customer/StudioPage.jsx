import { useState, useRef } from "react";
import { Save, RotateCcw, Settings2, Palette, Disc3, Boxes, CarFront, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Scene } from "../../components/3d/Scene";
import { ColorPicker } from "../../components/ui/ColorPicker";
import { PartColorSelector } from "../../components/ui/PartColorSelector";
import { PartSelector } from "../../components/ui/PartSelector";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import Header from "../../components/layout/Header";
import { useCustomizationStore } from "../../store/customizationStore";
import { CAR_PARTS } from "../../utils/constants";

const PART_LABELS = {
  body: "thân xe",
  mirrors: "gương",
  "front-chrome": "crom trước",
  "rear-chrome": "crom sau",
};

export const Studio = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("color");
  const canvasRef = useRef(null);

  const {
    partColors,
    selectedColorPart,
    selectedWheel,
    selectedGrille,
    selectedRoof,
    selectedChassis,
    setCurrentPartColor,
    setSelectedWheel,
    setSelectedGrille,
    setSelectedRoof,
    setSelectedChassis,
    resetCustomization,
  } = useCustomizationStore();

  // Handle save customization
  const handleSave = async () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tên thiết kế");
      return;
    }

    setIsSaving(true);

    try {
      alert("Thiết kế đã được lưu thành công!");
      setShowSaveModal(false);
      setTitle("");
      setDescription("");
    } catch {
      alert("Có lỗi xảy ra khi lưu thiết kế");
    } finally {
      setIsSaving(false);
    }
  };

  const handleColorChange = (color) => {
    if (selectedColorPart) {
      setCurrentPartColor(color);
    }
  };

  const currentColor = selectedColorPart ? partColors[selectedColorPart] : "#FFFFFF";
  const currentPartLabel = selectedColorPart ? PART_LABELS[selectedColorPart] : "bộ phận";

  const tabs = [
    { id: "color", label: "Màu sắc", icon: Palette },
    { id: "wheels", label: "Vành xe", icon: Disc3 },
    { id: "grilles", label: "Ca-lăng", icon: Boxes },
    { id: "roofs", label: "Nóc xe", icon: CarFront },
    { id: "chassis", label: "Bệ chân", icon: Shield },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
              Studio 3D tùy chỉnh xe
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Thiết kế chiếc VF3 độc đáo của riêng bạn với các bộ phận thực tế
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 3D Canvas */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
              >
                <div
                  ref={canvasRef}
                  className="w-full h-[600px] bg-linear-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800"
                >
                  <Scene autoRotate={false} enableControls={true} />
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowSaveModal(true)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-5 h-5" /> Lưu thiết kế
                    </button>
                    <button
                      onClick={resetCustomization}
                      className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 rounded-xl font-semibold transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-5 h-5" /> Đặt lại
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden sticky top-24"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-white">
                    <Settings2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Tùy chỉnh bộ phận</h2>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-700">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-20 px-4 py-3 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs">{tab.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {activeTab === "color" && (
                      <motion.div
                        key="color"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {/* Part selector */}
                        <PartColorSelector />
                        
                        {/* Divider */}
                        <div className="border-t border-slate-200 dark:border-slate-700" />
                        
                        {/* Color picker */}
                        {selectedColorPart ? (
                          <ColorPicker
                            value={currentColor}
                            onChange={handleColorChange}
                            partName={currentPartLabel}
                          />
                        ) : (
                          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            <Palette className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">Vui lòng chọn bộ phận để bắt đầu tô màu</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "wheels" && (
                      <motion.div
                        key="wheels"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                          Chọn vành xe
                        </h3>
                        <PartSelector
                          parts={CAR_PARTS.WHEELS}
                          selectedId={selectedWheel}
                          onSelect={setSelectedWheel}
                        />
                      </motion.div>
                    )}

                    {activeTab === "grilles" && (
                      <motion.div
                        key="grilles"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                          Chọn ca-lăng
                        </h3>
                        <PartSelector
                          parts={CAR_PARTS.GRILLES}
                          selectedId={selectedGrille}
                          onSelect={setSelectedGrille}
                        />
                      </motion.div>
                    )}

                    {activeTab === "roofs" && (
                      <motion.div
                        key="roofs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                          Chọn phụ kiện nóc
                        </h3>
                        <PartSelector
                          parts={CAR_PARTS.ROOFS}
                          selectedId={selectedRoof}
                          onSelect={setSelectedRoof}
                        />
                      </motion.div>
                    )}

                    {activeTab === "chassis" && (
                      <motion.div
                        key="chassis"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                          Chọn bệ chân
                        </h3>
                        <PartSelector
                          parts={CAR_PARTS.CHASSIS}
                          selectedId={selectedChassis}
                          onSelect={setSelectedChassis}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Save Modal */}
          <Modal
            isOpen={showSaveModal}
            onClose={() => setShowSaveModal(false)}
            title="Lưu thiết kế"
          >
            <div className="space-y-4">
              <Input
                label="Tên thiết kế *"
                placeholder="VD: VF3 Blue Dream"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                label="Mô tả"
                placeholder="Chia sẻ về thiết kế của bạn..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Đang lưu..." : "Lưu và chia sẻ"}
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Studio;
