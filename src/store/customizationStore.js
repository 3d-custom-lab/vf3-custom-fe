import { create } from "zustand";

const initialState = {
  // Màu sắc cho từng bộ phận
  partColors: {
    body: null, // Không có màu
    mirrors: null, // Không có màu
    "front-chrome": null, // Không có màu
    "rear-chrome": null, // Không có màu
  },
  // Bộ phận đang được chọn để đổi màu
  selectedColorPart: "body",
  // Các bộ phận xe được chọn
  selectedWheel: "wheel-default",
  selectedGrille: "grille-1",
  selectedRoof: "roof-standard",
  selectedChassis: "chassis-standard",
};

export const useCustomizationStore = create((set, get) => ({
  ...initialState,

  // Chọn bộ phận để đổi màu
  setSelectedColorPart: (partId) => set({ selectedColorPart: partId }),

  // Thay đổi màu của bộ phận đang chọn
  setPartColor: (partId, color) =>
    set((state) => ({
      partColors: {
        ...state.partColors,
        [partId]: color,
      },
    })),

  // Thay đổi màu của bộ phận hiện tại đang chọn
  setCurrentPartColor: (color) =>
    set((state) => ({
      partColors: {
        ...state.partColors,
        [state.selectedColorPart]: color,
      },
    })),

  // Chọn vành xe
  setSelectedWheel: (wheelId) => set({ selectedWheel: wheelId }),

  // Chọn ca-lăng
  setSelectedGrille: (grilleId) => set({ selectedGrille: grilleId }),

  // Chọn nóc xe
  setSelectedRoof: (roofId) => set({ selectedRoof: roofId }),

  // Chọn bệ chân
  setSelectedChassis: (chassisId) => set({ selectedChassis: chassisId }),

  // Đặt lại tất cả về mặc định
  resetCustomization: () => set({ ...initialState }),

  // Lấy tất cả thông tin customization hiện tại
  getAllCustomization: () => {
    const state = get();
    return {
      partColors: state.partColors,
      selectedColorPart: state.selectedColorPart,
      selectedWheel: state.selectedWheel,
      selectedGrille: state.selectedGrille,
      selectedRoof: state.selectedRoof,
      selectedChassis: state.selectedChassis,
    };
  },
}));
