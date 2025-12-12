// Danh sách các màu cơ bản VF3 (theo hình mẫu)
export const PRESET_COLORS = [
  { name: "Đen", value: "#000000" },
  { name: "Trắng", value: "#FFFFFF" },
  { name: "Xám", value: "#878a8a" },
  { name: "Đỏ", value: "#cb2828" },
  { name: "Vàng", value: "#e9b714" },
  { name: "Xanh Lá", value: "#5b7b5f" },
  { name: "Xanh Dương", value: "#113bbe" },
  { name: "Xanh Titan", value: "#2B6CB0" },
  { name: "Hồng Tím", value: "#967399" },
  { name: "Hồng Phấn", value: "#e79e9f" },
];

// Các bộ phận xe có thể đổi màu
export const COLORABLE_PARTS = [
  "body",
  "roof",
  "body-plastic",
  "mirrors",
  "front-chrome",
  "rear-chrome",
];

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
    name: "Thanh chữ V trước",
    modelPath: "/model/base_car/Crom trước gốc.glb",
    applyBodyColor: true,
    isGrillePart: true, // Ẩn khi có ca-lăng tùy chỉnh
  },
  {
    id: "rear-chrome",
    name: "Thanh chữ V sau",
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
    id: "tire-default",
    name: "Lốp gốc",
    modelPath: "/model/base_car/Bánh xe/Lốp gốc.glb",
    applyBodyColor: false,
  },
  {
    id: "rim-default",
    name: "Mâm gốc",
    modelPath: "/model/base_car/Bánh xe/Mâm gốc.glb",
    applyBodyColor: false,
  },
  {
    id: "hubcap-default",
    name: "Ốp Lazang gốc",
    modelPath: "/model/base_car/Bánh xe/Ốp Lazang gốc.glb",
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
        affiliateLink: "",
      },
      {
        id: "grille-1",
        name: "Mặt đèn tròn 1",
        description: "Mặt ca-lăng đèn tròn 1",
        category: "Mặt xe",
        modelPath:
          "/model/custom_car/Mặt xe/Mặt Calang/Mặt đèn tròn 1/Mặt đèn tròn 1.glb",
        thumbnail:
          "/model/custom_car/Mặt xe/Mặt Calang/Mặt đèn tròn 1/Mặt đèn tròn 1.png",
        affiliateLink: "",
        hidesOriginalLights: true,
      },
      {
        id: "grille-2",
        name: "Mặt đèn tròn 2",
        description: "Mặt ca-lăng đèn tròn 2",
        category: "Mặt xe",
        modelPath:
          "/model/custom_car/Mặt xe/Mặt Calang/Mặt đèn tròn 2/Mặt đèn tròn 2.glb",
        thumbnail:
          "/model/custom_car/Mặt xe/Mặt Calang/Mặt đèn tròn 2/Mặt đèn tròn 2.png",
        affiliateLink: "",
        hidesOriginalLights: true,
      },
      {
        id: "grille-3",
        name: "Tiểu Defender",
        description: "Mặt ca-lăng kiểu Defender",
        category: "Mặt xe",
        modelPath:
          "/model/custom_car/Mặt xe/Mặt Calang/Tiểu Defender/Tiểu Defender.glb",
        thumbnail:
          "/model/custom_car/Mặt xe/Mặt Calang/Tiểu Defender/Tiểu Defender.png",
        affiliateLink: "",
        hidesOriginalLights: true,
      },
      {
        id: "grille-4",
        name: "Tiểu G63",
        description: "Mặt ca-lăng kiểu G63",
        category: "Mặt xe",
        modelPath: "/model/custom_car/Mặt xe/Mặt Calang/Tiểu G63/Tiểu G63.glb",
        thumbnail: "/model/custom_car/Mặt xe/Mặt Calang/Tiểu G63/Tiểu G63.png",
        affiliateLink: "",
        hidesOriginalLights: true,
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
        affiliateLink: "",
      },
      {
        id: "bumper-1",
        name: "Cản trước + sau",
        description: "Cản bảo vệ toàn diện",
        category: "Mặt xe",
        modelPath: "/model/custom_car/Mặt xe/Cản trước + sau.glb",
        thumbnail: "/model/custom_car/Mặt xe/Cản trước + sau.glb",
        affiliateLink: "",
        hidesOriginalLights: true,
      },
    ],
  },

  // 2. NÓC XE - Roof Parts
  ROOF: {
    ACCESSORIES: [
      {
        id: "roof-standard",
        name: "Nóc xe tiêu chuẩn",
        description: "Nóc xe tiêu chuẩn",
        category: "Nóc xe",
        modelPath: null,
        thumbnail: null,
        affiliateLink: "",
      },
      {
        id: "roof-rack",
        name: "Giá nóc",
        description: "Giá nóc đơn giản",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Nóc xe/Nóc xe.glb",
        thumbnail: "/model/custom_car/Nóc xe/Nóc xe/Nóc xe.png",
        affiliateLink: "",
      },
      {
        id: "roof-rack-full",
        name: "Giá nóc + Thang + Cốp",
        description: "Giá nóc đầy đủ phụ kiện",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Giá nóc + Thang + Cốp hông.glb",
        thumbnail: "/model/custom_car/Nóc xe/Giá nóc + Thang + Cốp hông.png",
        affiliateLink: "",
      },
      {
        id: "roof-capo",
        name: "Nắp Capo + Cánh Gió",
        description: "Nắp capo thể thao với cánh gió",
        category: "Nóc xe",
        modelPath:
          "/model/custom_car/Nóc xe/Nắp Capo + Cánh Gió/Nắp Capo + Cánh Gió.glb",
        thumbnail:
          "/model/custom_car/Nóc xe/Nắp Capo + Cánh Gió/Nắp Capo + Cánh Gió.png",
        affiliateLink: "",
      },
      {
        id: "roof-tai-1",
        name: "Tai nóc 1",
        description: "Tai nóc kiểu 1",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Tai nóc 1/Tai nóc 1.glb",
        thumbnail: "/model/custom_car/Nóc xe/Tai nóc 1/Tai nóc 1.png",
        affiliateLink: "",
      },
      {
        id: "roof-tai-2",
        name: "Tai nóc 2",
        description: "Tai nóc kiểu 2",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Tai nóc 2/Tai nóc 2.glb",
        thumbnail: "/model/custom_car/Nóc xe/Tai nóc 2/Tai nóc 2.png",
        affiliateLink: "",
      },
      {
        id: "roof-tai-3",
        name: "Tai nóc 3",
        description: "Tai nóc kiểu 3",
        category: "Nóc xe",
        modelPath: "/model/custom_car/Nóc xe/Tai nóc 3/Tai nóc 3.glb",
        thumbnail: "/model/custom_car/Nóc xe/Tai nóc 3/Tai nóc 3.png",
        affiliateLink: "",
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
        affiliateLink: "",
      },
      {
        id: "chassis-1",
        name: "Bệ chân 1",
        description: "Bệ chân bảo vệ gầm xe",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Bệ chân 1/Bệ chân 1.glb",
        thumbnail: "/model/custom_car/Thân xe/Bệ chân 1/Bệ chân 1.png",
        affiliateLink: "",
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
        affiliateLink: "",
      },
      {
        id: "body-ban-le",
        name: "Bản lề",
        description: "Bản lề trang trí",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Bản lề/Bản lề.glb",
        thumbnail: "/model/custom_car/Thân xe/Bản lề/Bản lề.png",
        affiliateLink: "",
      },
      {
        id: "body-vay-x-xanh",
        name: "Vây phản quang xanh",
        description: "Vây phản quang màu xanh",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Vây xanh/Vây xanh.glb",
        thumbnail: "/model/custom_car/Thân xe/Vây xanh/Vây xanh.png",
        affiliateLink: "",
      },
      {
        id: "body-vay-x-do",
        name: "Vây phản quang đỏ",
        description: "Vây phản quang màu đỏ",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Vây đỏ/Vây đỏ.glb",
        thumbnail: "/model/custom_car/Thân xe/Vây đỏ/Vây đỏ.png",
        affiliateLink: "",
      },
      {
        id: "body-nap-cop-vn",
        name: "Nắp cốp cờ VN",
        description: "Nắp cốp với cờ Việt Nam",
        category: "Thân xe",
        modelPath: "/model/custom_car/Thân xe/Nắp cốp VN/Nắp cốp VN.glb",
        thumbnail: "/model/custom_car/Thân xe/Nắp cốp VN/Nắp cốp VN.png",
        affiliateLink: "",
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
        affiliateLink: "",
      },
      {
        id: "rear-cop-sau",
        name: "Cốp sau",
        description: "Cốp sau bổ sung",
        category: "Đuôi xe",
        modelPath: "/model/custom_car/Đuôi xe/Cốp sau/Cốp sau.glb",
        thumbnail: "/model/custom_car/Đuôi xe/Cốp sau/Cốp sau.png",
        affiliateLink: "",
      },
    ],
  },

  // 5. BÁNH XE - Wheels
  WHEELS: [
    // Vành 1B
    {
      id: "wheel-1b",
      name: "Vành 1B",
      description: "Vành 1B - Đen",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/1B/1B.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/1B/1B.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXQQ4MRW55-DaN4k/",
    },
    // Vành 1BL
    {
      id: "wheel-1bl",
      name: "Vành 1BL",
      description: "Vành 1BL - Đen Bóng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/1BL/1BL.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/1BL/1BL.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXQQ4MRW55-DaN4k/",
    },
    // Vành 1R
    {
      id: "wheel-1r",
      name: "Vành 1R",
      description: "Vành 1R - Đỏ",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/1R/1R.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/1R/1R.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 1W
    {
      id: "wheel-1w",
      name: "Vành 1W",
      description: "Vành 1W - Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/1W/1W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/1W/1W.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 2B-B-B
    {
      id: "wheel-2b-b-b",
      name: "Vành 2B-B-B",
      description: "Vành 2B-B-B - Đen/Đen/Đen",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-B-B/2B-B-B.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-B-B/2B-B-B.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 2B-B-W
    {
      id: "wheel-2b-b-w",
      name: "Vành 2B-B-W",
      description: "Vành 2B-B-W - Đen/Đen/Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-B-W/2B-B-W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-B-W/2B-B-W.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 2B-BL-B
    {
      id: "wheel-2b-bl-b",
      name: "Vành 2B-BL-B",
      description: "Vành 2B-BL-B - Đen/Đen Bóng/Đen",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-BL-B/2B-BL-B.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-BL-B/2B-BL-B.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 2B-R-B
    {
      id: "wheel-2b-r-b",
      name: "Vành 2B-R-B",
      description: "Vành 2B-R-B - Đen/Đỏ/Đen",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-R-B/2B-R-B.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-R-B/2B-R-B.png",
      affiliateLink: "",
    },
    // Vành 2B-W-B
    {
      id: "wheel-2b-w-b",
      name: "Vành 2B-W-B",
      description: "Vành 2B-W-B - Đen/Trắng/Đen",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-B/2B-W-B.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-B/2B-W-B.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 2B-W-G
    {
      id: "wheel-2b-w-g",
      name: "Vành 2B-W-G",
      description: "Vành 2B-W-G - Đen/Trắng/Xanh Lá",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-G/2B-W-G.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-G/2B-W-G.png",
      affiliateLink: "",
    },
    // Vành 2B-W-GR
    {
      id: "wheel-2b-w-gr",
      name: "Vành 2B-W-GR",
      description: "Vành 2B-W-GR - Đen/Trắng/Xám",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-GR/2B-W-GR.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-GR/2B-W-GR.png",
      affiliateLink: "",
    },
    // Vành 2B-W-R
    {
      id: "wheel-2b-w-r",
      name: "Vành 2B-W-R",
      description: "Vành 2B-W-R - Đen/Trắng/Đỏ",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-R/2B-W-R.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-R/2B-W-R.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 2B-W-W
    {
      id: "wheel-2b-w-w",
      name: "Vành 2B-W-W",
      description: "Vành 2B-W-W - Đen/Trắng/Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-W/2B-W-W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-W/2B-W-W.png",
      affiliateLink: "",
    },
    // Vành 2B-W-Y
    {
      id: "wheel-2b-w-y",
      name: "Vành 2B-W-Y",
      description: "Vành 2B-W-Y - Đen/Trắng/Vàng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-Y/2B-W-Y.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2B-W-Y/2B-W-Y.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 2W-W-W
    {
      id: "wheel-2w-w-w",
      name: "Vành 2W-W-W",
      description: "Vành 2W-W-W - Trắng/Trắng/Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/2W-W-W/2W-W-W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/2W-W-W/2W-W-W.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXVoyP3sw2-rEita/",
    },
    // Vành 3B
    {
      id: "wheel-3b",
      name: "Vành 3B",
      description: "Vành 3B - Đen",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/3B/3B.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/3B/3B.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXQQ4MRW55-DaN4k/",
    },
    // Vành 3BL
    {
      id: "wheel-3bl",
      name: "Vành 3BL",
      description: "Vành 3BL - Đen Bóng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/3BL/3BL.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/3BL/3BL.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 3R
    {
      id: "wheel-3r",
      name: "Vành 3R",
      description: "Vành 3R - Đỏ",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/3R/3R.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/3R/3R.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXQQ4MRW55-DaN4k/",
    },
    // Vành 3W
    {
      id: "wheel-3w",
      name: "Vành 3W",
      description: "Vành 3W - Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/3W/3W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/3W/3W.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 4B
    {
      id: "wheel-4b",
      name: "Vành 4B",
      description: "Vành 4B - Đen",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/4B/4B.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/4B/4B.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 4BL
    {
      id: "wheel-4bl",
      name: "Vành 4BL",
      description: "Vành 4BL - Đen Bóng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/4BL/4BL.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/4BL/4BL.png",
      affiliateLink: "",
    },
    // Vành 4R
    {
      id: "wheel-4r",
      name: "Vành 4R",
      description: "Vành 4R - Đỏ",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/4R/4R.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/4R/4R.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXQQ4MRW55-DaN4k/",
    },
    // Vành 4W
    {
      id: "wheel-4w",
      name: "Vành 4W",
      description: "Vành 4W - Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/4W/4W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/4W/4W.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXm5L6VRNa-priAh/",
    },
    // Vành 5R
    {
      id: "wheel-5r",
      name: "Vành 5R",
      description: "Vành 5R - Đỏ",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/5R/5R.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/5R/5R.png",
      affiliateLink: "",
    },
    // Vành 5W
    {
      id: "wheel-5w",
      name: "Vành 5W",
      description: "Vành 5W - Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/5W/5W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/5W/5W.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXVoyP3sw2-rEita/",
    },
    // Vành 6W
    {
      id: "wheel-6w",
      name: "Vành 6W",
      description: "Vành 6W - Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/6W/6W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/6W/6W.png",
      affiliateLink: "",
    },
    // Vành 8W
    {
      id: "wheel-8w",
      name: "Vành 8W",
      description: "Vành 8W - Trắng",
      category: "Vành",
      modelPath: "/model/custom_car/Bánh xe/Ốp Lazang/8W/8W.glb",
      thumbnail: "/model/custom_car/Bánh xe/Ốp Lazang/8W/8W.png",
      affiliateLink: "https://vt.tiktok.com/ZSHTXVoyP3sw2-rEita/",
    },
    {
      id: "wheel-1",
      name: "Vành 1",
      description: "Vành tiêu chuẩn",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp Vành 1.glb",
      thumbnail: "/model/custom_car/Vành/Lốp Vành 1.glb",
      affiliateLink: "",
    },
    {
      id: "wheel-2",
      name: "Vành 2",
      description: "Vành thể thao",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp Vành 2.glb",
      thumbnail: "/model/custom_car/Vành/Lốp Vành 2.glb",
      affiliateLink: "",
    },
    {
      id: "wheel-3",
      name: "Vành 3",
      description: "Vành cao cấp",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp Vành 3.glb",
      thumbnail: "/model/custom_car/Vành/Lốp Vành 3.glb",
      affiliateLink: "",
    },
    {
      id: "wheel-x-xanh",
      name: "Mâm X xanh",
      description: "Mâm X độc quyền màu xanh",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp MâmX xanh.glb",
      thumbnail: "/model/custom_car/Vành/Lốp MâmX xanh.glb",
      affiliateLink: "",
    },
    {
      id: "wheel-x-do",
      name: "Mâm X đỏ",
      description: "Mâm X độc quyền màu đỏ",
      category: "Vành",
      modelPath: "/model/custom_car/Vành/Lốp MâmX đỏ.glb",
      thumbnail: "/model/custom_car/Vành/Lốp MâmX đỏ.glb",
      affiliateLink: "",
    },
    {
      id: "wheel-default",
      name: "Bánh gốc",
      description: "Bánh xe tiêu chuẩn",
      category: "Vành",
      modelPath: null,
      thumbnail: null,
      affiliateLink: "",
    },
  ],
};
