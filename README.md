# 🚗 VF3 Custom Lab - Frontend

> **3D Car Customization Platform** - Nền tảng tùy chỉnh xe VF3 3D với khả năng lắp ráp bộ phận, thay đổi màu sắc, chia sẻ thiết kế và tham gia cộng đồng.

[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.181-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan.svg)](https://tailwindcss.com/)

---

## 📋 Tổng quan

**VF3 Custom Lab** là ứng dụng web cho phép người dùng:
- 🎨 **Tùy chỉnh xe 3D**: Thay đổi màu sắc, vành, ca-lăng, nóc, bệ chân
- 🔧 **Lắp ráp bộ phận**: Xe được ghép từ các bộ phận riêng lẻ (base_car + custom parts)
- 👁️ **Preview realtime**: Xem thay đổi tức thì trên canvas 3D
- 💾 **Lưu thiết kế**: Lưu và chia sẻ cấu hình xe của bạn
- 💬 **Forum cộng đồng**: Thảo luận và chia sẻ thiết kế với người khác
- 🔐 **Authentication**: JWT + OTP với phân quyền admin/user

---

## 🚀 Quick Start

### Yêu cầu
- Node.js >= 20
- npm >= 9

### Cài đặt

```powershell
# Clone repository
git clone <repo-url>
cd vf3-fe

# Cài đặt dependencies
npm install

# Cấu hình environment
cp .env.example .env
# Cập nhật VITE_API_BASE_URL trong .env

# Chạy dev server
npm run dev
# → http://localhost:5173
```

### Scripts

```bash
npm run dev        # Development server với hot reload
npm run build      # Build cho production
npm run preview    # Preview build production
npm run lint       # Chạy ESLint kiểm tra code
```

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1** - UI Framework với latest features
- **Vite 7.1** - Build tool cực nhanh
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **React Router 7.9** - Routing và navigation

### 3D & Visualization
- **Three.js 0.181** - 3D rendering engine
- **React Three Fiber 9.4** - React renderer cho Three.js
- **@react-three/drei 10.7** - Helpers cho R3F

### State Management & API
- **Zustand 5.0** - Lightweight state management
- **Axios 1.13** - HTTP client
- **React Color 2.19** - Color picker component

### UI & Animation
- **Framer Motion 12.23** - Animation library
- **Lucide React 0.553** - Icon library

---

## 📁 Cấu trúc dự án

```
vf3-fe/
├── public/
│   └── model/               # 3D Models (.glb files)
│       ├── base_car/        # Bộ phận cơ bản (7 parts)
│       │   ├── Thân xe.glb
│       │   ├── Bánh gốc.glb
│       │   ├── Cụm đèn trước gốc.glb
│       │   ├── Cụm đèn sau gốc.glb
│       │   ├── Crom trước gốc.glb
│       │   ├── Crom sau gốc.glb
│       │   └── Gương gốc.glb
│       ├── Vành/           # Vành tùy chỉnh (4 options)
│       ├── Calang/         # Ca-lăng (4 options)
│       ├── Nóc/            # Phụ kiện nóc (6 options)
│       └── Bệ chân/        # Bệ chân (2 options)
│
├── src/
│   ├── components/
│   │   ├── 3d/            # 3D Components
│   │   │   ├── BaseCar.jsx       # Render base car từ base_car parts
│   │   │   ├── CarModel.jsx      # Main car assembly với customization
│   │   │   ├── ModelPart.jsx     # Universal .glb loader
│   │   │   └── Scene.jsx         # 3D Scene setup (camera, lights, controls)
│   │   ├── auth/          # Authentication components
│   │   ├── forum/         # Forum components (posts, comments)
│   │   ├── landing/       # Landing page sections
│   │   ├── layout/        # Headers, footers, sidebars
│   │   ├── modal/         # Modals (login, register, profile, etc.)
│   │   └── ui/            # Reusable UI components
│   │       ├── ColorPicker.jsx   # Color picker với presets
│   │       ├── PartSelector.jsx  # Generic part selector
│   │       └── ...
│   │
│   ├── pages/
│   │   ├── customer/
│   │   │   ├── HomePage.jsx      # Landing page
│   │   │   ├── StudioPage.jsx    # 3D Customization studio
│   │   │   ├── ForumPage.jsx     # Forum với search & pagination
│   │   │   └── ProfilePage.jsx   # User profile
│   │   ├── admin/         # Admin pages (dashboard, manage users/posts/cars)
│   │   └── auth/          # Auth pages
│   │
│   ├── store/
│   │   ├── customizationStore.js # Zustand store cho car customization
│   │   │                         # - bodyColor, selectedWheel, selectedGrille, 
│   │   │                         #   selectedRoof, selectedChassis
│   │   └── authStore.js          # (nếu có) Auth state
│   │
│   ├── services/
│   │   ├── authService.js        # Auth API calls
│   │   ├── postService.js        # Forum posts API
│   │   ├── commentService.js     # Comments API
│   │   └── userService.js        # User management API
│   │
│   ├── utils/
│   │   ├── api.js               # Axios instance với interceptors
│   │   ├── constants.js         # BASE_CAR_PARTS, CAR_PARTS, PRESET_COLORS
│   │   ├── cookieUtils.js       # Cookie helpers
│   │   └── jwtUtils.js          # JWT decode/validate
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx      # Auth context provider
│   │
│   ├── hooks/
│   │   └── useToast.js          # Toast notification hook
│   │
│   ├── App.jsx                  # Root component với routes
│   └── main.jsx                 # Entry point
│
├── CUSTOMIZATION_SYSTEM.md      # Chi tiết hệ thống 3D customization
├── README_SUMMARY.md            # Tổng kết dự án
└── package.json
```

---

## 🎯 Features chính

### 1. 🚗 3D Car Customization Studio (`/studio`)

**Kiến trúc mới:**
- ✅ Xe được **lắp ráp từ 7 bộ phận cơ bản** trong `base_car/`
- ✅ **Không dùng VF3.glb** nữa - xe hoàn toàn modular
- ✅ **Màu sắc độc lập** cho từng bộ phận
- ✅ **Thay thế bộ phận** realtime (vành, ca-lăng, nóc, bệ chân)

**Bộ phận cơ bản (Base Car):**
1. Thân xe - **Có thể đổi màu**
2. Cụm đèn trước/sau
3. Crom trước/sau
4. Gương
5. Bánh gốc (ẩn khi chọn vành tùy chỉnh)

**Bộ phận tùy chỉnh:**
- **Vành xe**: 5 options (Bánh gốc + 4 vành custom)
- **Ca-lăng**: 4 options
- **Nóc xe**: 6 options (không có, giá nóc, tai nóc 1-3, full)
- **Bệ chân**: 2 options (có/không)

**Màu sắc:**
- 8 preset colors
- Custom color picker
- Apply realtime chỉ cho thân xe

### 2. 💬 Forum cộng đồng (`/forum`)
- Đăng bài, comment, reply
- Search với debounce 400ms
- Pagination (size=20)
- Protected route

### 3. 🔐 Authentication
- JWT token lưu trong cookie `auth_token`
- OTP verification
- Role-based access (admin/user)
- Auto token refresh

### 4. 👤 User Profile (`/profile`)
- Xem/sửa thông tin cá nhân
- Đổi mật khẩu
- Lịch sử thiết kế

### 5. 🎨 Landing Page (`/`)
- Hero section
- Features showcase
- Testimonials
- Modern, responsive UI

---

## 🗺️ Routes

| Route | Mô tả | Protected | Role |
|-------|-------|-----------|------|
| `/` | Landing page | ❌ | Public |
| `/auth` | Login/Register | ❌ | Public |
| `/studio` | **3D Customization Studio** | ✅ | User |
| `/forum` | Forum cộng đồng | ✅ | User |
| `/profile` | User profile | ✅ | User |
| `/admin/dashboard` | Admin dashboard | ✅ | Admin |
| `/admin/users` | Quản lý users | ✅ | Admin |
| `/admin/posts` | Quản lý posts | ✅ | Admin |
| `/admin/cars` | Quản lý xe/parts | ✅ | Admin |

---

## 🔧 API Integration

**Base URL:** `import.meta.env.VITE_API_BASE_URL`

### Authentication
```
POST /auth/login           # Login với username/password
POST /auth/register        # Đăng ký user mới
POST /auth/introspect      # Validate token
POST /auth/otp/send        # Gửi OTP
POST /auth/otp/verify      # Verify OTP
```

### User Management
```
GET  /users/my-info        # Lấy thông tin user hiện tại
PUT  /users/my-info        # Cập nhật thông tin
POST /users/change-password # Đổi mật khẩu
```

### Forum
```
GET  /posts                # Lấy danh sách posts (query: keyword, page, size)
POST /posts                # Tạo post mới
GET  /posts/{id}           # Chi tiết post
PUT  /posts/{id}           # Cập nhật post
DELETE /posts/{id}         # Xóa post

GET  /comments/post/{postId}          # Comments của post
POST /comments                         # Tạo comment
GET  /comments/replies/{parentId}     # Replies của comment
```

### Car Customization (Future)
```
POST /customizations       # Lưu cấu hình xe
GET  /customizations       # Lấy danh sách cấu hình
GET  /customizations/{id}  # Chi tiết cấu hình
```

---

## 🎨 3D Customization System

### Workflow

```
User Interface (StudioPage)
    ↓ (Zustand Store)
State Management (customizationStore)
    ↓ (Props)
3D Components (CarModel + BaseCar)
    ↓ (useGLTF)
Three.js Rendering (Scene)
    ↓
Canvas Display
```

### Components

**BaseCar.jsx**
- Load và render 7 bộ phận cơ bản từ `base_car/`
- Apply màu cho thân xe
- Logic ẩn bánh gốc khi user chọn vành custom

**CarModel.jsx**
- Assembly toàn bộ xe (BaseCar + custom parts)
- Quản lý selected parts từ store
- Auto rotate animation

**ModelPart.jsx**
- Universal component load bất kỳ .glb nào
- Material properties (metalness, roughness, shadows)
- Optional color application

**Scene.jsx**
- Camera setup (PerspectiveCamera)
- Lighting (ambient, directional, spot, hemisphere)
- OrbitControls
- Environment & shadows

### State Management (Zustand)

```javascript
// customizationStore.js
{
  bodyColor: string,           // Màu thân xe
  selectedWheel: string,       // ID vành (wheel-default, wheel-1, ...)
  selectedGrille: string,      // ID ca-lăng
  selectedRoof: string,        // ID nóc
  selectedChassis: string,     // ID bệ chân
  
  // Actions
  setBodyColor,
  setSelectedWheel,
  setSelectedGrille,
  setSelectedRoof,
  setSelectedChassis,
  resetCustomization
}
```

---

## 🔒 Authentication Flow

1. **Login**: User nhập credentials → Backend trả JWT token
2. **Store**: Token lưu vào cookie `auth_token` (httpOnly recommended)
3. **Init**: App đọc cookie và parse JWT khi load
4. **Requests**: Axios interceptor tự động attach `Bearer {token}`
5. **Protected Routes**: `ProtectedRoute` component check token validity
6. **Refresh**: Token expired → redirect to `/auth`

---

## 📦 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 🐛 Troubleshooting

### Model không hiển thị?
- Kiểm tra đường dẫn file .glb trong `constants.js`
- Verify file tồn tại trong `public/model/`
- Check console cho CORS errors

### Màu không apply?
- Check `applyBodyColor` prop trong BaseCar/ModelPart
- Verify mesh naming trong file .glb
- Review logic trong `ModelPart.jsx`

### Authentication issues?
- Check cookie `auth_token` trong DevTools
- Verify token chưa expired
- Check CORS settings trên backend

### Performance issues?
- Giảm polycount của models (< 100k)
- Compress textures
- Optimize shadow quality
- Preload models

---

## 🚀 Deployment

### Build Production

```bash
npm run build
```

Build output → `dist/` folder

### Preview

```bash
npm run preview
```

### Deploy

Deploy `dist/` folder lên:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Nginx

**Note**: Đảm bảo cấu hình SPA routing (fallback to index.html)

---

## 🤝 Contributing

### Workflow
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Commit Convention
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### Code Standards
- Run `npm run lint` before commit
- Follow component structure
- Add comments cho logic phức tạp
- Test trên multiple browsers

---

## 📚 Tài liệu bổ sung

- **[CUSTOMIZATION_SYSTEM.md](./CUSTOMIZATION_SYSTEM.md)** - Chi tiết kỹ thuật hệ thống 3D
- **[README_SUMMARY.md](./README_SUMMARY.md)** - Tổng kết và deliverables

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Team

**Frontend Team**
- Senior Frontend Developer - 3D Customization System
- UI/UX Designer - User Interface

---

## 📞 Contact

- Repository: [vf3-custom-fe](https://github.com/vf3-custom/vf3-custom-fe)
- Issues: [GitHub Issues](https://github.com/vf3-custom/vf3-custom-fe/issues)

---

**Last updated:** December 2, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

## 🎯 Features chính

### 1. 🚗 3D Car Customization Studio (`/studio`)

**Kiến trúc mới:**
- ✅ Xe được **lắp ráp từ 7 bộ phận cơ bản** trong `base_car/`
- ✅ **Không dùng VF3.glb** nữa - xe hoàn toàn modular
- ✅ **Màu sắc độc lập** cho từng bộ phận
- ✅ **Thay thế bộ phận** realtime (vành, ca-lăng, nóc, bệ chân)

**Bộ phận cơ bản (Base Car):**
1. Thân xe - **Có thể đổi màu**
2. Cụm đèn trước/sau
3. Crom trước/sau
4. Gương
5. Bánh gốc (ẩn khi chọn vành tùy chỉnh)

**Bộ phận tùy chỉnh:**
- **Vành xe**: 5 options (Bánh gốc + 4 vành custom)
- **Ca-lăng**: 4 options
- **Nóc xe**: 6 options (không có, giá nóc, tai nóc 1-3, full)
- **Bệ chân**: 2 options (có/không)

**Màu sắc:**
- 8 preset colors
- Custom color picker
- Apply realtime chỉ cho thân xe

### 2. 💬 Forum cộng đồng (`/forum`)
- Đăng bài, comment, reply
- Search với debounce 400ms
- Pagination (size=20)
- Protected route

### 3. 🔐 Authentication
- JWT token lưu trong cookie `auth_token`
- OTP verification
- Role-based access (admin/user)
- Auto token refresh

### 4. 👤 User Profile (`/profile`)
- Xem/sửa thông tin cá nhân
- Đổi mật khẩu
- Lịch sử thiết kế

### 5. 🎨 Landing Page (`/`)
- Hero section
- Features showcase
- Testimonials
- Modern, responsive UI

---

## 🗺️ Routes
