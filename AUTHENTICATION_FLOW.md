# 🔐 VF3 Authentication Flow Documentation

## 📋 Tổng quan

Hệ thống authentication đã được hoàn thiện với các tính năng:
- ✅ Đăng ký tài khoản (Register)
- ✅ Xác thực OTP qua email
- ✅ Đăng nhập (Login)
- ✅ Quản lý phiên đăng nhập với JWT token
- ✅ Protected routes theo roles (ADMIN, CUSTOMER)
- ✅ Logout (xử lý ở Frontend)
- ✅ Header với avatar và dropdown menu
- ✅ Trang 404 Not Found

## 🏗️ Kiến trúc

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx          # Form đăng nhập
│   │   ├── RegisterForm.jsx       # Form đăng ký
│   │   ├── OTPModal.jsx           # Modal xác thực OTP
│   │   └── ProtectedRoute.jsx     # HOC bảo vệ routes
│   ├── layout/
│   │   ├── Header.jsx             # Header mới với avatar & logout
│   │   ├── Footer.jsx             # Footer
│   │   └── Navbar.jsx             # (CŨ - có thể xóa)
│   └── landing/
│       ├── HeroSection.jsx        # Hero section với auth integration
│       ├── FeaturesSection.jsx
│       ├── ShowcaseSection.jsx
│       ├── TestimonialsSection.jsx
│       └── CTASection.jsx
├── pages/
│   ├── auth/
│   │   └── AuthPage.jsx           # Trang auth (login/register)
│   ├── customer/
│   │   └── HomePage.jsx           # Trang chủ customer
│   ├── admin/
│   │   └── DashboardPage.jsx      # Dashboard admin
│   └── NotFoundPage.jsx           # Trang 404
├── services/
│   └── authService.js             # API service cho auth
├── store/
│   └── authStore.js               # Zustand store quản lý state
└── utils/
    ├── api.js                     # Axios instance
    └── constants.js               # Constants (ROLES, STORAGE_KEYS)
```

## 🔄 Flow Đăng ký & Xác thực

### 1. Đăng ký (Register)
```javascript
User nhập thông tin → RegisterForm
  ↓
Gọi API POST /auth/register
  ↓
Backend tạo tài khoản + GỬI OTP qua email
  ↓
Frontend hiển thị OTPModal
```

### 2. Xác thực OTP
```javascript
User nhập mã OTP (6 số) → OTPModal
  ↓
Gọi API POST /auth/email-verification/verify?email=xxx&code=xxx
  ↓
Backend xác thực OTP
  ↓
Nếu thành công → Chuyển về LoginForm
Nếu thất bại → Hiển thị lỗi
```

### 3. Gửi lại OTP (Resend)
```javascript
User click "Resend" → OTPModal
  ↓
Gọi API POST /auth/email-verification/send?email=xxx
  ↓
Backend gửi OTP mới qua email
  ↓
User nhập OTP mới
```

## 🔑 Flow Đăng nhập

```javascript
User nhập email & password → LoginForm
  ↓
Gọi authStore.loginUser(email, password)
  ↓
API POST /auth/login
  ↓
Backend trả về {token, authenticated: true}
  ↓
Frontend:
  - Lưu token vào localStorage
  - Gọi API GET /users/my-info để lấy thông tin user
  - Lưu user vào state & localStorage
  - Set isAuthenticated = true
  ↓
Redirect đến:
  - /admin/dashboard (nếu role = ADMIN)
  - / (nếu role = CUSTOMER)
```

## 🚪 Flow Đăng xuất

```javascript
User click "Đăng xuất" → Header/Dropdown menu
  ↓
Gọi authStore.logout()
  ↓
(Optional) Gọi API POST /auth/logout - không quan trọng nếu fail
  ↓
Frontend:
  - Xóa token khỏi localStorage
  - Xóa user khỏi localStorage
  - Reset state: user=null, token=null, isAuthenticated=false
  ↓
Redirect về /auth
```

## 🛡️ Protected Routes

### ProtectedRoute Component
```javascript
<ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
  <DashboardPage />
</ProtectedRoute>
```

**Cách hoạt động:**
1. Kiểm tra `isAuthenticated`
   - ❌ Chưa đăng nhập → Redirect `/auth`
   
2. Kiểm tra `allowedRoles` (nếu có)
   - ❌ Không có quyền → Redirect `/404`
   - ✅ Có quyền → Render component

3. Hiển thị loading spinner khi đang check auth

## 🗺️ Routes Configuration

```javascript
/                       → HomePage (Public)
/auth                   → AuthPage (Public, redirect nếu đã login)
/customer/dashboard     → HomePage (Protected - CUSTOMER only)
/admin/dashboard        → DashboardPage (Protected - ADMIN only)
/404                    → NotFoundPage
/*                      → Redirect to /404
```

## 💾 State Management (Zustand)

### authStore State
```javascript
{
  user: {
    id, name, email, type, gender
  },
  token: "jwt-token",
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null
}
```

### authStore Actions
- `loginUser(email, password)` - Đăng nhập
- `fetchUserInfo()` - Lấy thông tin user
- `checkAuth()` - Kiểm tra token hợp lệ
- `logout()` - Đăng xuất
- `clearError()` - Xóa lỗi
- `hasRole(role)` - Kiểm tra role
- `hasAnyRole(roles)` - Kiểm tra nhiều roles

## 🔐 Token Management

### Lưu trữ
- Token được lưu trong `localStorage` với key `"token"`
- User info được lưu với key `"user"`

### Auto-attach token
```javascript
// api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Token validation
- Khi app khởi động: `checkAuth()` được gọi trong `useEffect` của App.jsx
- Gọi API `/auth/introspect` để verify token
- Nếu invalid → Clear token & redirect to login

## 🎨 UI Components

### Header Component
**Features:**
- Logo + Navigation menu
- User avatar với dropdown menu
- Responsive mobile menu
- Smooth animations với Framer Motion

**User Menu (Desktop):**
- Avatar với initials
- Tên user
- Dropdown với:
  - Thông tin email & role
  - Link đến profile
  - Link đến settings
  - Logout button

### OTP Modal
**Features:**
- 6 ô nhập số riêng biệt
- Auto-focus sang ô tiếp theo
- Support paste từ clipboard
- Backspace để quay lại ô trước
- Error handling
- Resend OTP với cooldown

## 🔔 Best Practices Implemented

### Security
✅ Token stored in localStorage (có thể nâng cấp lên httpOnly cookie)
✅ Token auto-attached to all API requests
✅ Token validation on app startup
✅ Protected routes with role-based access control

### UX
✅ Loading states during authentication
✅ Clear error messages
✅ Success notifications
✅ Smooth transitions và animations
✅ Responsive design (mobile-friendly)
✅ Auto-redirect after login/logout

### Code Quality
✅ Clean code structure
✅ Reusable components
✅ Centralized state management (Zustand)
✅ Separation of concerns (services, store, components)
✅ JSDoc comments
✅ Error handling

## 🚀 Cách sử dụng

### 1. Đăng ký tài khoản mới
```
1. Vào /auth
2. Click "Sign up"
3. Nhập: Name, Email, Password, Gender
4. Submit → Nhận OTP qua email
5. Nhập OTP (6 số)
6. Verify → Chuyển về Login
```

### 2. Đăng nhập
```
1. Vào /auth
2. Nhập Email & Password
3. Submit → Redirect về homepage
```

### 3. Đăng xuất
```
1. Click avatar ở Header
2. Click "Đăng xuất"
3. Confirm → Redirect về /auth
```

## 📝 TODO / Future Enhancements

- [ ] Implement "Forgot Password" functionality
- [ ] Add social login (Google, Facebook)
- [ ] Implement refresh token mechanism
- [ ] Add profile page
- [ ] Add settings page
- [ ] Implement remember me feature
- [ ] Add password strength indicator
- [ ] Add email verification status badge
- [ ] Implement 2FA (Two-Factor Authentication)
- [ ] Add session timeout warning
- [ ] Implement rate limiting for login attempts
- [ ] Add OAuth2 support

## 🐛 Troubleshooting

### Token không được gửi trong request
**Giải pháp:** Kiểm tra axios interceptor trong `api.js`

### Redirect loop sau khi login
**Giải pháp:** Kiểm tra logic redirect trong `App.jsx` và `ProtectedRoute.jsx`

### OTP modal không hiển thị
**Giải pháp:** Kiểm tra state `showOTPModal` trong `RegisterForm.jsx`

### Logout không xóa token
**Giải pháp:** Kiểm tra `authStore.logout()` method

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Console log để xem errors
2. Network tab để xem API requests
3. Redux DevTools để xem state changes (nếu có)
4. localStorage để verify token được lưu đúng

---

**Ngày cập nhật:** November 8, 2025
**Version:** 1.0.0
