import { create } from "zustand";

const initialState = {
  // Màu sắc cho từng bộ phận
  partColors: {
    body: null,
    roof: null,
    "body-plastic": null,
    mirrors: null,
    "front-chrome": null,
    "rear-chrome": null,
  },
  // Bộ phận đang được chọn để đổi màu
  selectedColorPart: "body",

  // CUSTOM CAR PARTS - Các bộ phận tùy chỉnh
  // Mặt xe
  selectedGrille: "grille-default",
  selectedBumper: "bumper-default",
  // Nóc xe
  selectedRoofAccessory: "roof-standard",
  // Thân xe
  selectedChassis: "chassis-standard",
  selectedBodyAccessory: ["body-acc-none"], // Array, default to none
  // Đuôi xe
  selectedRearAccessory: "rear-none",
  // Vành xe
  selectedWheel: "wheel-default",

  // Loading state - chỉ dùng cho lần đầu load trang
  isInitialLoading: true,
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

  // === CUSTOM CAR PARTS SETTERS ===
  // Mặt xe
  setSelectedGrille: (grilleId) => set({ selectedGrille: grilleId }),
  setSelectedBumper: (bumperId) => set({ selectedBumper: bumperId }),

  // Nóc xe
  setSelectedRoofAccessory: (roofId) => set({ selectedRoofAccessory: roofId }),

  // Thân xe
  setSelectedChassis: (chassisId) => set({ selectedChassis: chassisId }),
  setSelectedBodyAccessory: (bodyAccId) =>
    set((state) => {
      // Đảm bảo luôn làm việc với array
      const current = Array.isArray(state.selectedBodyAccessory)
        ? state.selectedBodyAccessory
        : [state.selectedBodyAccessory || "body-acc-none"]; // Fallback nếu là string/null

      // Nếu chọn "Không có"
      if (bodyAccId === "body-acc-none") {
        return { selectedBodyAccessory: ["body-acc-none"] };
      }

      // Nếu chọn phụ kiện khác
      let newSelection = [...current];

      // 1. Nếu đang có "body-acc-none", xóa nó đi
      if (newSelection.includes("body-acc-none")) {
        newSelection = newSelection.filter((id) => id !== "body-acc-none");
      }

      // 2. Toggle item được chọn
      if (newSelection.includes(bodyAccId)) {
        newSelection = newSelection.filter((id) => id !== bodyAccId);
      } else {
        newSelection.push(bodyAccId);
      }

      // 3. Nếu danh sách trống, quay về "body-acc-none"
      if (newSelection.length === 0) {
        newSelection = ["body-acc-none"];
      }

      return { selectedBodyAccessory: newSelection };
    }),

  // Đuôi xe
  setSelectedRearAccessory: (rearAccId) =>
    set({ selectedRearAccessory: rearAccId }),

  // Vành xe
  setSelectedWheel: (wheelId) => set({ selectedWheel: wheelId }),

  // Đặt lại tất cả về mặc định
  resetCustomization: () => set({ ...initialState }),

  // Loading state setter - chỉ dùng cho lần đầu
  setInitialLoading: (isLoading) => set({ isInitialLoading: isLoading }),

  // Lấy tất cả thông tin customization hiện tại
  getAllCustomization: () => {
    const state = get();
    return {
      partColors: state.partColors,
      selectedColorPart: state.selectedColorPart,
      selectedGrille: state.selectedGrille,
      selectedBumper: state.selectedBumper,
      selectedRoofAccessory: state.selectedRoofAccessory,
      selectedChassis: state.selectedChassis,
      selectedBodyAccessory: state.selectedBodyAccessory,
      selectedRearAccessory: state.selectedRearAccessory,
      selectedWheel: state.selectedWheel,
    };
  },
}));
