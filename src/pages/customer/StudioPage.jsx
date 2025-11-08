import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Settings2 } from "lucide-react";
import { Scene } from "../../components/3d/Scene";
import { Button } from "../../components/ui/Button";
import { ColorPicker } from "../../components/ui/ColorPicker";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import Header from "../../components/layout/Header";
import { useCustomizationStore } from "../../store/customizationStore";
import {
  WHEEL_OPTIONS,
  MIRROR_OPTIONS,
  HEADLIGHT_OPTIONS,
  ACCESSORY_OPTIONS,
} from "../../utils/constants";

export const Studio = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("color");
  const canvasRef = useRef(null);

  const {
    bodyColor,
    wheels,
    mirrors,
    headlights,
    accessories,
    setBodyColor,
    setWheels,
    setMirrors,
    setHeadlights,
    toggleAccessory,
    resetCustomization,
    getAllCustomization,
  } = useCustomizationStore();

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tên thiết kế");
      return;
    }

    setIsSaving(true);

    try {
      const canvas = canvasRef.current?.querySelector("canvas");
      const imageUrl = canvas ? canvas.toDataURL("image/png") : "placeholder";

      const customizationData = getAllCustomization();
      const userId = generateUserId();
      const username = getUsername();

      const { error } = await supabase.from("posts").insert({
        user_id: userId,
        username,
        title,
        description,
        image_url: imageUrl,
        customization_data: customizationData,
      });

      if (error) throw error;

      alert("Thiết kế đã được lưu thành công!");
      setShowSaveModal(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving design:", error);
      alert("Có lỗi xảy ra khi lưu thiết kế");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "color", label: "Màu sắc", icon: "🎨" },
    { id: "wheels", label: "Bánh xe", icon: "⚙️" },
    { id: "mirrors", label: "Gương", icon: "🪞" },
    { id: "lights", label: "Đèn", icon: "💡" },
    { id: "accessories", label: "Phụ kiện", icon: "✨" },
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
              Studio tùy chỉnh 3D
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Thiết kế chiếc VF3 độc đáo của riêng bạn
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
                  <Button onClick={() => setShowSaveModal(true)}>
                    <Save className="w-5 h-5" /> Lưu thiết kế
                  </Button>
                  <Button variant="outline" onClick={resetCustomization}>
                    <RotateCcw className="w-5 h-5" /> Đặt lại
                  </Button>
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
                  <h2 className="text-xl font-bold">Tùy chỉnh</h2>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-20 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <div className="text-xl mb-1">{tab.icon}</div>
                    <div className="text-xs">{tab.label}</div>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[600px] overflow-y-auto">
                {activeTab === "color" && (
                  <ColorPicker value={bodyColor} onChange={setBodyColor} />
                )}

                {activeTab === "wheels" && (
                  <div className="space-y-3">
                    {WHEEL_OPTIONS.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setWheels(option.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          wheels === option.id
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-semibold mb-1">{option.name}</div>
                        <div className="text-sm opacity-80">
                          {option.description}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {activeTab === "mirrors" && (
                  <div className="space-y-3">
                    {MIRROR_OPTIONS.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMirrors(option.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          mirrors === option.id
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-semibold mb-1">{option.name}</div>
                        <div className="text-sm opacity-80">
                          {option.description}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {activeTab === "lights" && (
                  <div className="space-y-3">
                    {HEADLIGHT_OPTIONS.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setHeadlights(option.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          headlights === option.id
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-semibold mb-1">{option.name}</div>
                        <div className="text-sm opacity-80">
                          {option.description}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {activeTab === "accessories" && (
                  <div className="space-y-3">
                    {ACCESSORY_OPTIONS.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleAccessory(option.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          accessories.includes(option.id)
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-semibold mb-1">{option.name}</div>
                        <div className="text-sm opacity-80">
                          {option.description}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
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
            <Button className="w-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Đang lưu..." : "Lưu và chia sẻ"}
            </Button>
          </div>
        </Modal>
        </div>
      </div>
    </>
  );
};

export default Studio;
