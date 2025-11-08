import { create } from "zustand";

const initialState = {
  bodyColor: "#1E40AF",
  wheels: "sport",
  mirrors: "standard",
  headlights: "led",
  accessories: [],
};

export const useCustomizationStore = create((set, get) => ({
  ...initialState,

  setBodyColor: (color) => set({ bodyColor: color }),

  setWheels: (wheels) => set({ wheels }),

  setMirrors: (mirrors) => set({ mirrors }),

  setHeadlights: (headlights) => set({ headlights }),

  toggleAccessory: (accessory) =>
    set((state) => ({
      accessories: state.accessories.includes(accessory)
        ? state.accessories.filter((a) => a !== accessory)
        : [...state.accessories, accessory],
    })),

  resetCustomization: () => set(initialState),

  getAllCustomization: () => {
    const state = get();
    return {
      bodyColor: state.bodyColor,
      wheels: state.wheels,
      mirrors: state.mirrors,
      headlights: state.headlights,
      accessories: state.accessories,
    };
  },
}));
