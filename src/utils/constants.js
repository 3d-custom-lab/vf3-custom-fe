// Danh sách các màu cơ bản VF3 (theo hình mẫu)
export const PRESET_COLORS = [
  { name: "Trắng", value: "#FFFFFF" },
  { name: "Đỏ", value: "#E53E3E" },
  { name: "Xanh Dương Đậm", value: "#2B6CB0" },
  { name: "Xám", value: "#718096" },
  { name: "Vàng", value: "#ECC94B" },
  { name: "Hồng Tím", value: "#B794F4" },
  { name: "Xanh Lá Nhạt", value: "#9AE6B4" },
  { name: "Xanh Dương Nhạt", value: "#63B3ED" },
  { name: "Hồng Phấn", value: "#FBB6CE" },
];

// Các bộ phận xe có thể đổi màu
export const COLORABLE_PARTS = ["body", "roof", "body-plastic", "mirrors", "front-chrome", "rear-chrome"];

// Các bộ phận cơ bản của xe (không thể thay đổi)
export const BASE_CAR_PARTS = [
  // Thân xe - Phần 1: Thân chính (có thể đổi màu)
  {
    id: "body",
    name: "Thân xe chính",
    modelPath: "/model/base_car/Thân xe/Thân.glb",
    applyBodyColor: true,
  },
  // Thân xe - Phần 2: Thân cố định (không đổi màu)
  {
    id: "body-fixed",
    name: "Thân xe cố định",
    modelPath: "/model/base_car/Thân xe/Thân ko đổi màu.glb",
    applyBodyColor: false,
  },
  // Thân xe - Phần 3: Nóc xe (có thể đổi màu)
  {
    id: "body-roof",
    name: "Nóc thân xe",
    modelPath: "/model/base_car/Thân xe/Nóc.glb",
    applyBodyColor: true,
  },
  // Thân xe - Phần 4: Nhựa thân nhám (có thể đổi màu)
  {
    id: "body-plastic",
    name: "Nhựa thân nhám",
    modelPath: "/model/base_car/Thân xe/Nhựa thân nhám.glb",
    applyBodyColor: true,
  },
  {
    id: "front-lights",
    name: "Cụm đèn trước",
    modelPath: "/model/base_car/Cụm đèn trước gốc.glb",
    applyBodyColor: false,
  },
  {
    id: "rear-lights",
    name: "Cụm đèn sau",
    modelPath: "/model/base_car/Cụm đèn sau gốc.glb",
    applyBodyColor: false,
  },
  {
    id: "front-chrome",
    name: "Crom trước",
    modelPath: "/model/base_car/Crom trước gốc.glb",
    applyBodyColor: true,
    isGrillePart: true, // Ẩn khi có ca-lăng tùy chỉnh
  },
  {
    id: "rear-chrome",
    name: "Crom sau",
    modelPath: "/model/base_car/Crom sau gốc.glb",
    applyBodyColor: true,
  },
  {
    id: "mirrors",
    name: "Gương",
    modelPath: "/model/base_car/Gương gốc.glb",
    applyBodyColor: true,
  },
  {
    id: "default-wheels",
    name: "Bánh gốc",
    modelPath: "/model/base_car/Bánh gốc.glb",
    applyBodyColor: false,
  },
];

// Cấu hình các bộ phận xe VF3 có thể tùy chỉnh (từ folder custom_car)
export const CUSTOM_CAR_PARTS = {
  // 1. MẶT XE - Front Parts
  FRONT: {
    // Ca-lăng (Grilles)
    GRILLES: [
      {
        id: "grille-default",
        name: "Không có",
        description: "Sử dụng crom trước gốc",
        category: "Mặt xe",
        modelPath: null,
        thumbnail: null,
      },
      {
        id: "grille-1",
        name: "Ca-lăng 1",
        description: "Ca-lăng tiêu chuẩn",
        category: "Mặt xe",
        modelPath: "/model/custom_car/Mặt xe/Calang/Calang1.glb",
        thumbnail: "/model/custom_car/Mặt xe/Calang/Calang1.glb",
      },
      {
        id: "grille-2",
        name: "Ca-lăng 2",
        description: "Ca-lăng thể thao",
        category: "Mặt xe",
        modelPath: "/model/custom_car/Mặt xe/Calang/Calang2.glb",
        thumbnail: "/model/custom_car/Mặt xe/Calang/Calang2.glb",
      },
      {
        id: "grille-3",
        name: "Ca-lăng 3",
        description: "Ca-lăng sang trọng",
        category: "Mặt xe",
        modelPath: "/model/custom_car/Mặt xe/Calang/Calang3.glb",
        thumbnail: "/model/custom_car/Mặt xe/Calang/Calang3.glb",
      },
      {
        id: "grille-4",
        name: "Ca-lăng 4",
        description: "Ca-lăng đặc biệt",
        category: "Mặt xe",
        modelPath: "/model/custom_car/Mặt xe/Calang/Calang4.glb",
        thumbnail: "/model/custom_car/Mặt xe/Calang/Calang4.glb",
      },
    ],
    // Cản trước + sau
    BUMPERS: [
      {
        id: "bumper-default",
        name: "Không có",
        description: "Không có cản",
        category: "Mặt xe",
        modelPath: null,
        thumbnail: null,
      },
      {
        id: "bumper-1",
        name: "Cản trước + sau",
        description: "Cản bảo vệ toàn diện",
        category: "Mặt xe",
        modelPath: "/model/custom_car/Mặt xe/Cản trước + sau.glb",
        thumbnail: "/model/custom_car/Mặt xe/Cản trước + sau.glb",
      },
    ],
  },

  // 2. NÓC XE - Roof Parts
  ROOF: {
    ACCESSORIES: [
      {
        id: "roof-standard",
        name: "Không có",
        description: "Nóc xe tiêu chuẩn",
        category: "Nóc xe",
        modelPath: null,
        thumbnail: null,
      },
      {
        id: "roof-rack",
        name: "Giá nóc",
        description: "Giá nóc đơn giản",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Giá nóc.glb",
        thumbnail: "/model/custom_car/Nóc xe/Giá nóc.glb",
      },
      {
        id: "roof-rack-full",
        name: "Giá nóc + Thang + Cốp",
        description: "Giá nóc đầy đủ phụ kiện",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Giá nóc + Thang + Cốp hông.glb",
        thumbnail: "/model/custom_car/Nóc xe/Giá nóc + Thang + Cốp hông.glb",
      },
      {
        id: "roof-capo",
        name: "Nắp Capo + Cánh Gió",
        description: "Nắp capo thể thao với cánh gió",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Nắp Capo + Cánh Gió.glb",
        thumbnail: "/model/custom_car/Nóc xe/Nắp Capo + Cánh Gió.glb",
      },
      {
        id: "roof-tai-1",
        name: "Tai nóc 1",
        description: "Tai nóc kiểu 1",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Tai1.glb",
        thumbnail: "/model/custom_car/Nóc xe/Tai1.glb",
      },
      {
        id: "roof-tai-2",
        name: "Tai nóc 2",
        description: "Tai nóc kiểu 2",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Tai2.glb",
        thumbnail: "/model/custom_car/Nóc xe/Tai2.glb",
      },
      {
        id: "roof-tai-3",
        name: "Tai nóc 3",
        description: "Tai nóc kiểu 3",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Tai3.glb",
        thumbnail: "/model/custom_car/Nóc xe/Tai3.glb",
      },
    ],
  },

  // 3. THÂN XE - Body Parts
  BODY: {
    // Bệ chân
    CHASSIS: [
      {
        id: "chassis-standard",
        name: "Không có",
        description: "Không có bệ chân",
        category: "Thân xe",
        modelPath: null,
        thumbnail: null,
      },
      {
        id: "chassis-1",
        name: "Bệ chân 1",
        description: "Bệ chân bảo vệ gầm xe",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Bệ chân/Bệ chân1.glb",
        thumbnail: "/model/custom_car/Thân xe/Bệ chân/Bệ chân1.glb",
      },
    ],
    // Phụ kiện thân
    ACCESSORIES: [
      {
        id: "body-acc-none",
        name: "Không có",
        description: "Không có phụ kiện",
        category: "Thân xe",
        modelPath: null,
        thumbnail: null,
      },
      {
        id: "body-ban-le",
        name: "Bản lề",
        description: "Bản lề trang trí",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Bản lề.glb",
        thumbnail: "/model/custom_car/Thân xe/Bản lề.glb",
      },
      {
        id: "body-vay-x",
        name: "Vây X",
        description: "Vây X thể thao",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Vây X.glb",
        thumbnail: "/model/custom_car/Thân xe/Vây X.glb",
      },
      {
        id: "body-nap-cop-vn",
        name: "Nắp cốp cờ VN",
        description: "Nắp cốp với cờ Việt Nam",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Nắp cốp cờ vn.glb",
        thumbnail: "/model/custom_car/Thân xe/Nắp cốp cờ vn.glb",
      },
    ],
  },

  // 4. ĐUÔI XE - Rear Parts
  REAR: {
    ACCESSORIES: [
      {
        id: "rear-none",
        name: "Không có",
        description: "Không có phụ kiện đuôi",
        category: "Đuôi xe",
        modelPath: null,
        thumbnail: null,
      },
      {
        id: "rear-cop-sau",
        name: "Cốp sau",
        description: "Cốp sau bổ sung",
        category: "Đuôi xe",
        modelPath: "/model/custom_car/Đuôi xe/Cốp sau.glb",
        thumbnail: "/model/custom_car/Đuôi xe/Cốp sau.glb",
      },
    ],
  },

  // 5. VÀNH XE - Wheels
  WHEELS: [
    {
      id: "wheel-default",
      name: "Bánh gốc",
      description: "Bánh xe tiêu chuẩn",
      category: "Vành",
      modelPath: null,
      thumbnail: "/model/base_car/Bánh gốc.glb",
    },
    {
      id: "wheel-1",
      name: "Vành 1",
      description: "Vành tiêu chuẩn",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp Vành 1.glb",
      thumbnail: "/model/custom_car/Vành/Lốp Vành 1.glb",
    },
    {
      id: "wheel-2",
      name: "Vành 2",
      description: "Vành thể thao",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp Vành 2.glb",
      thumbnail: "/model/custom_car/Vành/Lốp Vành 2.glb",
    },
    {
      id: "wheel-3",
      name: "Vành 3",
      description: "Vành cao cấp",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp Vành 3.glb",
      thumbnail: "/model/custom_car/Vành/Lốp Vành 3.glb",
    },
    {
      id: "wheel-x",
      name: "Mâm X",
      description: "Mâm X độc quyền",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp MâmX.glb",
      thumbnail: "/model/custom_car/Vành/Lốp MâmX.glb",
    },
  ],
};

