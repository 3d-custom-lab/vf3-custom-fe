# 🚗 VF3 Custom Lab - Frontend

> Ứng dụng web tùy chỉnh xe VF3 với công nghệ 3D, authentication system hoàn chỉnh và UI/UX hiện đại.

## 🎯 Tính năng chính

### ✨ Authentication System
- 🔐 **Đăng ký tài khoản** với xác thực OTP qua email
- 🔑 **Đăng nhập** với JWT token
- 👤 **Quản lý profile** với avatar và user menu
- 🚪 **Đăng xuất** an toàn
- 🛡️ **Protected routes** với role-based access control (ADMIN, CUSTOMER)
- ⏱️ **Auto token validation** khi khởi động app

### 🎨 UI/UX Features
- 📱 **Responsive design** - hoạt động mượt trên mọi thiết bị
- 🌊 **Smooth animations** với Framer Motion
- 🎭 **Modern design** với Tailwind CSS
- 🌈 **Gradient effects** và glassmorphism
- ⚡ **Fast & smooth** transitions

### 🏗️ Architecture
- 📦 **State management** với Zustand
- 🔄 **API integration** với Axios
- 🎯 **Component-based** architecture
- 📂 **Clean code structure** và separation of concerns

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4.1
- **State Management:** Zustand 5.0
- **Animations:** Framer Motion 12
- **HTTP Client:** Axios 1.13
- **Routing:** React Router DOM 7.9
- **Icons:** React Icons 5.5
- **UI Components:** Mantine 8.3

## 📦 Installation

```bash
# Clone repository
git clone <repository-url>
cd vf3-fe

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your API URL
VITE_API_BASE_URL=http://localhost:8080

# Start development server
npm run dev
```

## 🚀 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
vf3-fe/
├── src/
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── landing/        # Landing page sections
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   │   ├── auth/          # Auth pages (Login, Register)
│   │   ├── admin/         # Admin pages
│   │   ├── customer/      # Customer pages
│   │   └── NotFoundPage.jsx
│   ├── services/           # API services
│   │   ├── authService.js
│   │   ├── garaService.js
│   │   └── ...
│   ├── store/              # Zustand stores
│   │   └── authStore.js
│   ├── utils/              # Utility functions
│   │   ├── api.js         # Axios instance
│   │   └── constants.js   # App constants
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Public assets
├── .env                    # Environment variables
├── .env.example           # Environment variables example
├── AUTHENTICATION_FLOW.md # Auth flow documentation
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 Authentication Flow

### Register Flow
```
1. User fills registration form
2. Submit → POST /auth/register
3. Backend creates account & sends OTP via email
4. OTP Modal appears
5. User enters 6-digit OTP
6. Submit → POST /auth/email-verification/verify
7. Success → Redirect to login
```

### Login Flow
```
1. User enters email & password
2. Submit → POST /auth/login
3. Backend returns JWT token
4. Frontend saves token to localStorage
5. Fetch user info → GET /users/my-info
6. Redirect based on role:
   - ADMIN → /admin/dashboard
   - CUSTOMER → /
```

### Logout Flow
```
1. User clicks logout
2. (Optional) Call POST /auth/logout
3. Clear token & user from localStorage
4. Reset auth state
5. Redirect to /auth
```

## 🗺️ Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page / Homepage |
| `/auth` | Public | Login & Register page |
| `/customer/dashboard` | Protected (CUSTOMER) | Customer dashboard |
| `/admin/dashboard` | Protected (ADMIN) | Admin dashboard |
| `/404` | Public | Not found page |
| `/*` | - | Catch all → Redirect to 404 |

## 🔑 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080
```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register new account
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/introspect` - Validate token
- `POST /auth/email-verification/send` - Send OTP
- `POST /auth/email-verification/verify` - Verify OTP

### User
- `GET /users/my-info` - Get current user info

## 🎨 UI Components

### Header Component
- Logo & navigation
- User avatar with dropdown
- Responsive mobile menu
- Logout functionality

### Protected Route Component
- Authentication check
- Role-based authorization
- Auto redirect to login
- Loading state

### OTP Modal
- 6 separate input fields
- Auto-focus next field
- Paste support
- Resend OTP feature
- Error handling

## 🔧 Configuration

### Axios Interceptor
```javascript
// Auto-attach JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Zustand Store Persistence
```javascript
// Persist token & isAuthenticated to localStorage
persist(
  (set, get) => ({...}),
  {
    name: "auth-storage",
    partialize: (state) => ({
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    }),
  }
)
```

## 🎯 User Roles

- `ADMIN` - Administrator role with full access
- `CUSTOMER` - Regular customer role

## 🐛 Troubleshooting

### Issue: Token không được gửi trong request
**Solution:** Check axios interceptor in `api.js`

### Issue: Redirect loop after login
**Solution:** Check redirect logic in `App.jsx` and `ProtectedRoute.jsx`

### Issue: OTP modal không hiển thị
**Solution:** Check `showOTPModal` state in `RegisterForm.jsx`

### Issue: CORS errors
**Solution:** Ensure backend allows your frontend origin

## 📝 Code Quality

- ✅ Clean code với comments rõ ràng
- ✅ Component reusability
- ✅ Proper error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ SEO friendly
- ✅ Performance optimized

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy!

## 📄 License

This project is private and proprietary.

## 👥 Contributors

- Senior Frontend Developer - Architecture & Implementation

## 🔗 Links

- [Authentication Flow Documentation](./AUTHENTICATION_FLOW.md)
- [API Documentation](#) (Coming soon)
- [Design System](#) (Coming soon)

---

**Last Updated:** November 8, 2025  
**Version:** 1.0.0
