// Danh sách các màu preset
export const PRESET_COLORS = [
  { name: "Electric Blue", value: "#1E40AF" },
  { name: "Pearl White", value: "#F8FAFC" },
  { name: "Midnight Black", value: "#0F172A" },
  { name: "Racing Red", value: "#DC2626" },
  { name: "Silver Metallic", value: "#94A3B8" },
  { name: "Forest Green", value: "#059669" },
  { name: "Sunset Orange", value: "#EA580C" },
  { name: "Royal Purple", value: "#7C3AED" },
];

// Cấu hình các bộ phận xe VF3
export const CAR_PARTS = {
  // Vành xe
  WHEELS: [
    {
      id: "wheel-1",
      name: "Vành 1",
      description: "Vành tiêu chuẩn",
      modelPath: "/model/Vành/Lốp Vành 1.glb",
      thumbnail: "/model/Vành/Lốp Vành 1.glb",
    },
    {
      id: "wheel-2",
      name: "Vành 2",
      description: "Vành thể thao",
      modelPath: "/model/Vành/Lốp Vành 2.glb",
      thumbnail: "/model/Vành/Lốp Vành 2.glb",
    },
    {
      id: "wheel-3",
      name: "Vành 3",
      description: "Vành cao cấp",
      modelPath: "/model/Vành/Lốp Vành 3.glb",
      thumbnail: "/model/Vành/Lốp Vành 3.glb",
    },
    {
      id: "wheel-x",
      name: "Mâm X",
      description: "Mâm X độc quyền",
      modelPath: "/model/Vành/Lốp MâmX.glb",
      thumbnail: "/model/Vành/Lốp MâmX.glb",
    },
  ],

  // Ca-lăng
  GRILLES: [
    {
      id: "grille-1",
      name: "Ca-lăng 1",
      description: "Ca-lăng tiêu chuẩn",
      modelPath: "/model/Calang/Calang1.glb",
      thumbnail: "/model/Calang/Calang1.glb",
    },
    {
      id: "grille-2",
      name: "Ca-lăng 2",
      description: "Ca-lăng thể thao",
      modelPath: "/model/Calang/Calang2.glb",
      thumbnail: "/model/Calang/Calang2.glb",
    },
    {
      id: "grille-3",
      name: "Ca-lăng 3",
      description: "Ca-lăng sang trọng",
      modelPath: "/model/Calang/Calang3.glb",
      thumbnail: "/model/Calang/Calang3.glb",
    },
    {
      id: "grille-4",
      name: "Ca-lăng 4",
      description: "Ca-lăng đặc biệt",
      modelPath: "/model/Calang/Calang4.glb",
      thumbnail: "/model/Calang/Calang4.glb",
    },
  ],

  // Nóc xe
  ROOFS: [
    {
      id: "roof-standard",
      name: "Không có",
      description: "Nóc xe tiêu chuẩn",
      modelPath: null,
      thumbnail: null,
    },
    {
      id: "roof-rack",
      name: "Giá nóc",
      description: "Giá nóc đơn giản",
      modelPath: "/model/Nóc/Giá nóc.glb",
      thumbnail: "/model/Nóc/Giá nóc.glb",
    },
    {
      id: "roof-rack-full",
      name: "Giá nóc + Thang + Cốp",
      description: "Giá nóc đầy đủ",
      modelPath: "/model/Nóc/Giá nóc + Thang + Cốp hông.glb",
      thumbnail: "/model/Nóc/Giá nóc + Thang + Cốp hông.glb",
    },
    {
      id: "roof-tai-1",
      name: "Tai nóc 1",
      description: "Tai nóc kiểu 1",
      modelPath: "/model/Nóc/Tai1.glb",
      thumbnail: "/model/Nóc/Tai1.glb",
    },
    {
      id: "roof-tai-2",
      name: "Tai nóc 2",
      description: "Tai nóc kiểu 2",
      modelPath: "/model/Nóc/Tai2.glb",
      thumbnail: "/model/Nóc/Tai2.glb",
    },
    {
      id: "roof-tai-3",
      name: "Tai nóc 3",
      description: "Tai nóc kiểu 3",
      modelPath: "/model/Nóc/Tai3.glb",
      thumbnail: "/model/Nóc/Tai3.glb",
    },
  ],

  // Bệ chân
  CHASSIS: [
    {
      id: "chassis-standard",
      name: "Không có",
      description: "Không bệ chân",
      modelPath: null,
      thumbnail: null,
    },
    {
      id: "chassis-1",
      name: "Bệ chân 1",
      description: "Bệ chân bảo vệ gầm",
      modelPath: "/model/Bệ chân/Bệ chân1.glb",
      thumbnail: "/model/Bệ chân/Bệ chân1.glb",
    },
  ],
};

