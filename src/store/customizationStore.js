import { create } from "zustand";

const initialState = {
  bodyColor: "#1E40AF", // Màu thân xe
  selectedWheel: "wheel-1", // ID của vành được chọn
  selectedGrille: "grille-1", // ID của ca-lăng được chọn
  selectedRoof: "roof-standard", // ID của nóc được chọn
  selectedChassis: "chassis-standard", // ID của bệ chân được chọn
};

export const useCustomizationStore = create((set, get) => ({
  ...initialState,

  // Thay đổi màu thân xe
  setBodyColor: (color) => set({ bodyColor: color }),

  // Chọn vành xe
  setSelectedWheel: (wheelId) => set({ selectedWheel: wheelId }),

  // Chọn ca-lăng
  setSelectedGrille: (grilleId) => set({ selectedGrille: grilleId }),

  // Chọn nóc xe
  setSelectedRoof: (roofId) => set({ selectedRoof: roofId }),

  // Chọn bệ chân
  setSelectedChassis: (chassisId) => set({ selectedChassis: chassisId }),

  // Đặt lại tất cả về mặc định
  resetCustomization: () => set(initialState),

  // Lấy tất cả thông tin customization hiện tại
  getAllCustomization: () => {
    const state = get();
    return {
      bodyColor: state.bodyColor,
      selectedWheel: state.selectedWheel,
      selectedGrille: state.selectedGrille,
      selectedRoof: state.selectedRoof,
      selectedChassis: state.selectedChassis,
    };
  },
}));
