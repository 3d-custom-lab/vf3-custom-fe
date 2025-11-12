# 🚗 VF3 Custom Lab - Frontend

> Ứng dụng web tùy chỉnh xe VF3 với công nghệ 3D tương tác, hệ thống forum cộng đồng hoàn chỉnh, authentication system mạnh mẽ và UI/UX hiện đại.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

---

## 📖 Mục lục

- [Tổng quan dự án](#-tổng-quan-dự-án)
- [Tính năng chính](#-tính-năng-chính)
- [Tech Stack](#-tech-stack)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Routing](#-routing)
- [Authentication](#-authentication-system)
- [API Integration](#-api-integration)
- [State Management](#-state-management)
- [UI Components](#-ui-components)
- [3D Customization](#-3d-customization-studio)
- [Forum System](#-forum--comment-system)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Tổng quan dự án

**VF3 Custom Lab** là một ứng dụng web Single Page Application (SPA) hiện đại cho phép người dùng:

1. **Tùy chỉnh xe VF3 3D** - Thiết kế chiếc xe độc đáo với công nghệ Three.js
2. **Chia sẻ thiết kế** - Đăng bài, tương tác và bình luận trong cộng đồng
3. **Quản lý tài khoản** - Đăng ký/đăng nhập với xác thực OTP qua email
4. **Trải nghiệm mượt mà** - UI/UX hiện đại với animations và responsive design

### 🎥 Demo Features

- 🎨 **3D Customization Studio** - Tùy chỉnh màu sắc, bánh xe, gương, đèn và phụ kiện
- 💬 **Forum System** - Tạo post, like, comment và reply (nested comments)
- 🔐 **Secure Authentication** - JWT token với OTP verification
- 📱 **Fully Responsive** - Hoạt động mượt mà trên desktop, tablet và mobile

---

## ✨ Tính năng chính

### 🔐 Authentication System

#### Đăng ký (Register)
- ✅ Form validation với email, password, confirm password
- ✅ Gửi OTP qua email tự động
- ✅ Modal nhập OTP với 6 input riêng biệt
- ✅ Auto-focus và paste support
- ✅ Resend OTP functionality
- ✅ Real-time error handling

#### Đăng nhập (Login)
- ✅ JWT token authentication
- ✅ Remember me functionality
- ✅ Auto redirect dựa trên user role
- ✅ Token persistence với Zustand
- ✅ Auto token validation on app start

#### Bảo mật
- ✅ Protected routes với `ProtectedRoute` component
- ✅ Role-based access control (ADMIN, CUSTOMER)
- ✅ Axios interceptor auto-attach Bearer token
- ✅ 401 handling và auto logout
- ✅ Token introspection

### 🎨 3D Customization Studio

#### Tùy chỉnh xe
- ✅ **Màu sắc thân xe** - 8 màu preset + custom color picker
- ✅ **Bánh xe** - 3 options (Standard, Sport, Premium)
- ✅ **Gương** - 3 options (Standard, Chrome, Carbon Fiber)
- ✅ **Đèn pha** - 3 options (Halogen, LED, Matrix LED)
- ✅ **Phụ kiện** - 4 options (Spoiler, Body Kit, Roof Rack, Window Tint)

#### 3D Rendering
- ✅ Real-time 3D preview với Three.js
- ✅ Orbit controls - xoay, zoom, pan
- ✅ Realistic lighting và shadows
- ✅ Environment mapping (city preset)
- ✅ Smooth transitions và animations

#### Lưu thiết kế
- ✅ Capture canvas screenshot
- ✅ Save customization data
- ✅ Modal với title và description
- ✅ Reset functionality

### 💬 Forum & Comment System

#### Posts
- ✅ **Create Post** - Tạo bài viết với title, content và optional image
- ✅ **Edit Post** - Chỉnh sửa bài viết của bản thân
- ✅ **Delete Post** - Xóa bài viết của bản thân
- ✅ **Like Post** - Like/Unlike với real-time counter
- ✅ **Image Upload** - Upload ảnh (max 5MB) với preview
- ✅ **Pagination** - Paginated API response handling

#### Comments
- ✅ **Create Comment** - Bình luận dưới mỗi post
- ✅ **Reply to Comment** - Reply lên comment (nested comments)
- ✅ **View Replies** - Lazy load replies khi cần
- ✅ **Comment Count** - Hiển thị tổng số comments + replies
- ✅ **Real-time Updates** - Auto reload sau khi comment/reply
- ✅ **Beautiful UI** - Bubble chat design với avatar

#### UI/UX Highlights
- ✅ **Bubble Chat Style** - Comment dạng bubble như Messenger
- ✅ **Nested Replies** - Indent và border-left cho replies
- ✅ **Avatar System** - Hiển thị avatar hoặc initial letter
- ✅ **Relative Time** - "2m ago", "3h ago" formatting
- ✅ **Loading States** - Spinner cho mọi async operations
- ✅ **Empty States** - Friendly messages khi chưa có data
- ✅ **Toast Notifications** - Success/Error feedback

### 🏠 Landing Page

#### Sections
- ✅ **Hero Section** - Eye-catching header với CTA
- ✅ **Features Section** - Showcase các tính năng chính
- ✅ **Showcase Section** - Gallery thiết kế xe
- ✅ **Testimonials Section** - Review từ users
- ✅ **CTA Section** - Call to action
- ✅ **Footer** - Links và social media

### 🎭 UI/UX Excellence

#### Design System
- ✅ **Tailwind CSS 4** - Utility-first CSS framework
- ✅ **Gradient Backgrounds** - Beautiful linear gradients
- ✅ **Glassmorphism** - Frosted glass effect
- ✅ **Smooth Animations** - Framer Motion transitions
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode Support** - Toggle dark/light theme

#### Components
- ✅ **Reusable UI Components** - Button, Input, Modal, Card, etc.
- ✅ **Toast Notifications** - Custom toast system
- ✅ **Loading Spinners** - Multiple loading states
- ✅ **Error Handling** - User-friendly error messages

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI Library |
| **Vite** | 7.1.7 | Build Tool & Dev Server |
| **Tailwind CSS** | 4.1.16 | Styling Framework |
| **React Router DOM** | 7.9.5 | Client-side Routing |
| **Zustand** | 5.0.8 | State Management |
| **Axios** | 1.13.1 | HTTP Client |

### 3D & Animation

| Technology | Version | Purpose |
|------------|---------|---------|
| **Three.js** | 0.181.0 | 3D Graphics Library |
| **@react-three/fiber** | 9.4.0 | React Renderer for Three.js |
| **@react-three/drei** | 10.7.6 | Three.js Helpers |
| **Framer Motion** | 12.23.24 | Animation Library |

### UI Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Icons** | 5.5.0 | Icon Library |
| **Lucide React** | 0.553.0 | Icon Set |
| **Mantine Core** | 8.3.6 | UI Components |
| **Mantine Hooks** | 8.3.6 | Utility Hooks |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.36.0 | Code Linting |
| **@vitejs/plugin-react** | 5.0.4 | Vite React Plugin |
| **@tailwindcss/vite** | 4.1.16 | Tailwind Vite Plugin |

---

## 📦 Cài đặt

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 hoặc **yarn** >= 1.22.0

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/vf3-custom/vf3-custom-fe.git
cd vf3-fe

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Configure environment variables
# Edit .env file and set your API URL
VITE_API_BASE_URL=http://localhost:8080

# 5. Start development server
npm run dev

# App will run on http://localhost:5173
```

### Verification

```bash
# Check if app is running
curl http://localhost:5173

# Run linter
npm run lint

# Build for production
npm run build
```

---

## 🚀 Scripts

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📁 Cấu trúc dự án

```
vf3-fe/
├── public/                      # Static assets
│   ├── img/                     # Images
│   └── _redirects              # Netlify redirects
│
├── src/
│   ├── assets/                  # Dynamic assets
│   │
│   ├── components/              # React components
│   │   ├── 3d/                 # 3D components
│   │   │   ├── CarModel.jsx   # 3D car model
│   │   │   └── Scene.jsx      # Three.js scene setup
│   │   │
│   │   ├── auth/               # Authentication components
│   │   │   ├── LoginForm.jsx  # Login form
│   │   │   ├── RegisterForm.jsx # Register form
│   │   │   ├── OTPModal.jsx   # OTP verification modal
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   │
│   │   ├── forum/              # Forum components
│   │   │   ├── CreatePost.jsx # Create post form
│   │   │   ├── PostList.jsx   # List of posts
│   │   │   ├── PostItem.jsx   # Single post display
│   │   │   ├── CommentList.jsx # Comments container
│   │   │   ├── CommentItem.jsx # Single comment
│   │   │   └── ForumHeader.jsx # Forum header
│   │   │
│   │   ├── landing/            # Landing page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── ShowcaseSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   └── CTASection.jsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.jsx     # App header with nav
│   │   │   └── Footer.jsx     # App footer
│   │   │
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.jsx     # Custom button
│   │       ├── Input.jsx      # Custom input
│   │       ├── Textarea.jsx   # Custom textarea
│   │       ├── Modal.jsx      # Custom modal
│   │       ├── Card.jsx       # Custom card
│   │       ├── Toast.jsx      # Toast notification
│   │       ├── ColorPicker.jsx # Color picker
│   │       ├── PostCard.jsx   # Post card
│   │       └── LoadingSpinner.jsx # Loading indicator
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useToast.js        # Toast notification hook
│   │
│   ├── pages/                   # Page components
│   │   ├── auth/
│   │   │   └── AuthPage.jsx   # Login/Register page
│   │   │
│   │   ├── customer/
│   │   │   ├── HomePage.jsx   # Landing page
│   │   │   ├── StudioPage.jsx # 3D customization studio
│   │   │   ├── ForumPage.jsx  # Forum page
│   │   │   └── CustomPage.jsx # Custom page
│   │   │
│   │   ├── admin/
│   │   │   └── DashboardPage.jsx # Admin dashboard
│   │   │
│   │   └── NotFoundPage.jsx    # 404 page
│   │
│   ├── services/                # API services
│   │   ├── authService.js     # Auth API calls
│   │   ├── postService.js     # Post API calls
│   │   ├── commentService.js  # Comment API calls
│   │   └── garaService.js     # Gara API calls (placeholder)
│   │
│   ├── store/                   # Zustand stores
│   │   ├── authStore.js       # Authentication state
│   │   └── customizationStore.js # 3D customization state
│   │
│   ├── utils/                   # Utility functions
│   │   ├── api.js             # Axios instance & interceptors
│   │   ├── constants.js       # App constants
│   │   └── debugAuth.js       # Debug helper
│   │
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── .env                         # Environment variables
├── .env.example                 # Environment variables template
├── eslint.config.js             # ESLint configuration
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
├── README.md                    # This file
├── COMMENTS_FEATURE.md          # Comments feature docs
├── AUTHENTICATION_FLOW.md       # Auth flow docs (legacy)
└── IMPLEMENTATION_CHECKLIST.md  # Implementation checklist
```

---

## 🗺️ Routing

### Route Table

| Path | Access | Component | Description |
|------|--------|-----------|-------------|
| `/` | Public | `HomePage` | Landing page với hero, features, showcase |
| `/auth` | Public | `AuthPage` | Login & Register page |
| `/studio` | Protected | `StudioPage` | 3D customization studio |
| `/forum` | Protected | `ForumPage` | Forum page với posts và comments |
| `/admin/dashboard` | Admin Only | `DashboardPage` | Admin dashboard |
| `/404` | Public | `NotFoundPage` | Not found page |
| `/*` | - | `Navigate` | Catch all → Redirect to `/404` |

### Protected Routes

```jsx
// Customer routes - yêu cầu login
<Route path="/studio" element={
  <ProtectedRoute>
    <StudioPage />
  </ProtectedRoute>
} />

// Admin routes - yêu cầu ADMIN role
<Route path="/admin/dashboard" element={
  <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DashboardPage />
  </ProtectedRoute>
} />
```

### Navigation Flow

```
┌─────────────┐
│   Landing   │ (Public)
│   /         │
└──────┬──────┘
       │
       ├─→ Login/Register (/auth)
       │   │
       │   └─→ Login Success
       │       │
       │       ├─→ CUSTOMER → / (Home)
       │       │               ├─→ /studio
       │       │               └─→ /forum
       │       │
       │       └─→ ADMIN → /admin/dashboard
       │
       └─→ 404 (*)
```

---

## 🔐 Authentication System

### Storage Keys

```javascript
const STORAGE_KEYS = {
  TOKEN: "auth_token",     // JWT token
  USER: "user_info",       // User information
};
```

### Authentication Flow

#### 1. Register Flow

```
User Input (Email, Password, Confirm Password)
│
├─→ Validation
│   ├─✓ Email format valid
│   ├─✓ Password >= 8 chars
│   └─✓ Passwords match
│
├─→ POST /auth/register
│   │
│   ├─✓ Success
│   │   ├─→ Backend sends OTP via email
│   │   └─→ Show OTP Modal
│   │       │
│   │       ├─→ User enters 6-digit OTP
│   │       │
│   │       ├─→ POST /auth/email-verification/send
│   │       │
│   │       ├─→ POST /auth/email-verification/verify
│   │       │   │
│   │       │   ├─✓ Success → Redirect to Login
│   │       │   └─✗ Error → Show error message
│   │       │
│   │       └─→ Resend OTP option available
│   │
│   └─✗ Error (Email exists, etc.)
│       └─→ Show error toast
```

#### 2. Login Flow

```
User Input (Email, Password)
│
├─→ POST /auth/login
│   │
│   ├─✓ Success
│   │   │
│   │   ├─→ Receive JWT token + user type
│   │   │
│   │   ├─→ Save to localStorage
│   │   │   ├─ auth_token: "JWT..."
│   │   │   └─ user_info: {email, type}
│   │   │
│   │   ├─→ Update Zustand store
│   │   │   ├─ token: "JWT..."
│   │   │   ├─ user: {email, type}
│   │   │   └─ isAuthenticated: true
│   │   │
│   │   └─→ Redirect based on role
│   │       ├─ ADMIN → /admin/dashboard
│   │       └─ CUSTOMER → /
│   │
│   └─✗ Error (Wrong credentials)
│       └─→ Show error toast
```

#### 3. Token Validation (On App Start)

```
App Starts
│
├─→ checkAuth() called
│   │
│   ├─→ Read token from localStorage
│   │   │
│   │   ├─✓ Token exists
│   │   │   │
│   │   │   ├─→ POST /auth/introspect
│   │   │   │   │
│   │   │   │   ├─✓ Token valid
│   │   │   │   │   └─→ Restore auth state
│   │   │   │   │       ├─ isAuthenticated: true
│   │   │   │   │       └─ Load user from localStorage
│   │   │   │   │
│   │   │   │   └─✗ Token invalid
│   │   │   │       └─→ Clear storage & logout
│   │   │   │
│   │   │   └─→ Allow access to protected routes
│   │   │
│   │   └─✗ No token
│   │       └─→ Redirect to /auth (if accessing protected route)
│   │
│   └─→ Axios interceptor adds token to all requests
│       Authorization: Bearer <token>
```

#### 4. Logout Flow

```
User clicks Logout
│
├─→ authStore.logout()
│   │
│   ├─→ Remove from localStorage
│   │   ├─ auth_token
│   │   └─ user_info
│   │
│   ├─→ Reset Zustand store
│   │   ├─ token: null
│   │   ├─ user: null
│   │   ├─ isAuthenticated: false
│   │   └─ error: null
│   │
│   └─→ Redirect to /auth
```

### Auth Store (Zustand)

```javascript
// src/store/authStore.js

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      loginUser: async (email, password) => {...},
      checkAuth: async () => {...},
      logout: () => {...},
      clearError: () => {...},
      hasRole: (role) => {...},
      hasAnyRole: (roles) => {...},
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### Protected Route Component

```jsx
// src/components/auth/ProtectedRoute.jsx

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, checkAuth } = useAuthStore();

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Check role authorization
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.type)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}
```

---

## 📡 API Integration

### API Base URL

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Axios Configuration

```javascript
// src/utils/api.js

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - Auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirecting to login");
      // Auto logout nếu token invalid
    }
    return Promise.reject(error);
  }
);
```

### API Endpoints

#### Authentication API

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | `{email, password, name, gender}` | Đăng ký tài khoản mới |
| POST | `/auth/login` | `{email, password}` | Đăng nhập |
| POST | `/auth/introspect` | `{token}` | Validate JWT token |
| POST | `/auth/email-verification/send` | Query: `?email=...` | Gửi OTP |
| POST | `/auth/email-verification/verify` | Query: `?email=...&code=...` | Xác thực OTP |

#### Post API

| Method | Endpoint | Body/Params | Description |
|--------|----------|-------------|-------------|
| GET | `/posts` | - | Lấy tất cả posts (paginated) |
| GET | `/posts/{id}` | - | Lấy post theo ID |
| POST | `/posts` | `{title, content}` | Tạo post mới |
| PUT | `/posts/{id}` | `{title, content}` | Cập nhật post |
| DELETE | `/posts/{id}` | - | Xóa post |
| POST | `/posts/{id}/like` | - | Like/Unlike post |
| POST | `/posts/{id}/images` | FormData (image file) | Upload ảnh cho post |
| GET | `/posts/my-posts` | - | Lấy posts của user |
| DELETE | `/posts/my-posts` | - | Xóa tất cả posts của user |

#### Comment API

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/comments/post/{postId}` | - | Lấy comments của post |
| GET | `/comments/replies/{parentId}` | - | Lấy replies của comment |
| POST | `/comments` | `{postId, content, parentId?}` | Tạo comment/reply |

### API Response Format

```javascript
// Success response
{
  code: 1000,
  message: "Success",
  result: {
    // Data here
  }
}

// Paginated response (Posts)
{
  code: 1000,
  result: {
    content: [...],        // Array of items
    pageable: {...},       // Pagination info
    totalElements: 100,    // Total items
    totalPages: 10,        // Total pages
    size: 10,              // Page size
    number: 0              // Current page (0-indexed)
  }
}

// Error response
{
  code: 4001,
  message: "Error description"
}
```

### Service Files

#### authService.js

```javascript
export const register = async (data) => {...}
export const sendVerificationEmail = async (email) => {...}
export const verifyEmail = async (email, code) => {...}
export const login = async (data) => {...}
export const introspect = async (token) => {...}
```

#### postService.js

```javascript
export const getAllPosts = async () => {...}
export const getPostById = async (id) => {...}
export const createPost = async (data) => {...}
export const updatePost = async (id, data) => {...}
export const deletePost = async (id) => {...}
export const likePost = async (id) => {...}
export const uploadPostImage = async (id, formData) => {...}
export const getMyPosts = async () => {...}
export const deleteMyPosts = async () => {...}
```

#### commentService.js

```javascript
export const getCommentsByPostId = async (postId) => {...}
export const getRepliesByParentId = async (parentId) => {...}
export const createComment = async (data) => {...}
```

---

## 💾 State Management

### Zustand Stores

#### 1. Auth Store (`authStore.js`)

```javascript
// State
{
  user: null,              // Current user info
  token: null,             // JWT token
  isAuthenticated: false,  // Auth status
  loading: false,          // Loading state
  error: null              // Error message
}

// Actions
- loginUser(email, password)  // Login user
- checkAuth()                 // Validate token
- logout()                    // Logout user
- clearError()                // Clear error
- hasRole(role)               // Check role
- hasAnyRole(roles)           // Check multiple roles
```

**Persistence:** Token và isAuthenticated được persist vào localStorage

#### 2. Customization Store (`customizationStore.js`)

```javascript
// State
{
  bodyColor: "#1E40AF",    // Car body color
  wheels: "sport",         // Wheel type
  mirrors: "standard",     // Mirror type
  headlights: "led",       // Headlight type
  accessories: []          // Array of accessories
}

// Actions
- setBodyColor(color)           // Set body color
- setWheels(wheels)             // Set wheels
- setMirrors(mirrors)           // Set mirrors
- setHeadlights(headlights)     // Set headlights
- toggleAccessory(accessory)    // Toggle accessory
- resetCustomization()          // Reset to default
- getAllCustomization()         // Get all current settings
```

**No persistence:** State is reset on page refresh

---

## 🎨 UI Components

### Component Library

#### Button

```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "outline" | "ghost"
- `size`: "sm" | "md" | "lg"
- `disabled`: boolean
- `loading`: boolean

#### Input

```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

**Props:**
- `label`: string
- `type`: "text" | "email" | "password" | "number"
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string

#### Modal

```jsx
<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">
  <p>Modal content here</p>
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: function
- `title`: string
- `children`: ReactNode

#### Toast

```jsx
// Using useToast hook
const { showSuccess, showError, showInfo } = useToast();

showSuccess("Operation successful!");
showError("Something went wrong!");
showInfo("FYI: This is an info message");
```

**Types:**
- Success (green)
- Error (red)
- Info (blue)

**Features:**
- Auto-dismiss (3 seconds)
- Manual close button
- Smooth animations

#### Card

```jsx
<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content</p>
  </Card.Body>
</Card>
```

#### ColorPicker

```jsx
<ColorPicker
  value={bodyColor}
  onChange={setBodyColor}
  presets={PRESET_COLORS}
/>
```

**Features:**
- 8 preset colors
- Custom color picker
- Live preview
- Hex color input

---

## 🎮 3D Customization Studio

### Architecture

```
StudioPage
  │
  ├─→ Scene (Three.js Canvas)
  │   │
  │   ├─→ PerspectiveCamera
  │   ├─→ Lighting (Ambient, Directional, Spot)
  │   ├─→ CarModel (3D Model)
  │   ├─→ ContactShadows
  │   ├─→ Environment (City preset)
  │   └─→ OrbitControls
  │
  └─→ Sidebar (Customization Options)
      │
      ├─→ Tabs (Color, Wheels, Mirrors, Lights, Accessories)
      │
      └─→ Options for each tab
```

### Customization Options

#### 1. Body Color

**Preset Colors:**
- Electric Blue (#1E40AF)
- Pearl White (#F8FAFC)
- Midnight Black (#0F172A)
- Racing Red (#DC2626)
- Silver Metallic (#94A3B8)
- Forest Green (#059669)
- Sunset Orange (#EA580C)
- Royal Purple (#7C3AED)

**Custom Color:** Full RGB color picker

#### 2. Wheels

| Option | Description |
|--------|-------------|
| Standard | Classic alloy wheels |
| Sport | Performance sport wheels |
| Premium | Luxury premium wheels |

#### 3. Mirrors

| Option | Description |
|--------|-------------|
| Standard | Standard side mirrors |
| Chrome | Chrome finish mirrors |
| Carbon Fiber | Carbon fiber mirrors |

#### 4. Headlights

| Option | Description |
|--------|-------------|
| Halogen | Standard halogen lights |
| LED | Modern LED headlights |
| Matrix LED | Advanced matrix LED |

#### 5. Accessories

| Option | Description |
|--------|-------------|
| Rear Spoiler | Aerodynamic spoiler |
| Body Kit | Custom body kit |
| Roof Rack | Utility roof rack |
| Window Tint | Privacy window tint |

### 3D Scene Configuration

```javascript
// Camera
<PerspectiveCamera
  makeDefault
  position={[5, 3, 5]}
  fov={50}
/>

// Lighting
<ambientLight intensity={0.5} />
<directionalLight
  position={[10, 10, 5]}
  intensity={1}
  castShadow
/>
<spotLight position={[-10, 10, -5]} intensity={0.3} />

// Controls
<OrbitControls
  enablePan={false}
  minDistance={4}
  maxDistance={12}
  minPolarAngle={Math.PI / 4}
  maxPolarAngle={Math.PI / 2}
/>

// Shadows
<ContactShadows
  position={[0, -1.2, 0]}
  opacity={0.5}
  scale={10}
  blur={2}
  far={4}
/>

// Environment
<Environment preset="city" />
```

### Save Design Flow

```
User clicks "Save Design"
  │
  ├─→ Modal opens
  │   │
  │   ├─→ User enters title & description
  │   │
  │   └─→ User clicks "Save and Share"
  │       │
  │       ├─→ Capture canvas screenshot
  │       │   canvas.toDataURL("image/png")
  │       │
  │       ├─→ Get customization data
  │       │   getAllCustomization()
  │       │
  │       ├─→ POST to backend (future)
  │       │   {title, description, imageUrl, customizationData}
  │       │
  │       └─→ Success toast → Close modal
  │
  └─→ Reset Customization (optional)
```

---

## 💬 Forum & Comment System

### Architecture

```
ForumPage
  │
  ├─→ Authentication Check
  │   │
  │   ├─✓ Authenticated
  │   │   │
  │   │   ├─→ CreatePost
  │   │   │   └─→ Form (Title, Content, Image)
  │   │   │
  │   │   └─→ PostList
  │   │       │
  │   │       └─→ PostItem (for each post)
  │   │           │
  │   │           ├─→ Post Header (Author, Date, Edit/Delete)
  │   │           ├─→ Post Content (Title, Content, Image)
  │   │           ├─→ Actions (Like, Comments)
  │   │           │
  │   │           └─→ CommentList (when expanded)
  │   │               │
  │   │               ├─→ Create Comment Form
  │   │               │
  │   │               └─→ CommentItem (for each comment)
  │   │                   │
  │   │                   ├─→ Comment Content
  │   │                   ├─→ Actions (Reply)
  │   │                   │
  │   │                   └─→ Replies (nested)
  │   │                       └─→ CommentItem (recursive)
  │   │
  │   └─✗ Not Authenticated
  │       └─→ Show login prompt
  │
  └─→ Refresh mechanism
```

### Features Detail

#### Create Post

**Form Fields:**
- Title (required)
- Content (required)
- Image (optional, max 5MB)

**Validation:**
- Title: Not empty
- Content: Not empty
- Image: Type (image/*), Size (<= 5MB)

**Flow:**
```
1. Fill form
2. (Optional) Select image → Preview
3. Click "Post"
4. POST /posts {title, content}
5. If image exists: POST /posts/{id}/images (FormData)
6. Success → Clear form, reload posts
7. Toast notification
```

#### Post Item

**Display:**
- Author avatar (or initial letter)
- Author name
- Created date (relative time)
- Title (bold, large)
- Content
- Image (if exists)
- Like button + count
- Comments button + total count (including replies)

**Actions:**
- **Like/Unlike**: Toggle like status
- **Edit**: Only for post owner
- **Delete**: Only for post owner
- **Toggle Comments**: Show/Hide comments section

**Edit Mode:**
- Input for title
- Textarea for content
- Image upload (replace existing)
- Save/Cancel buttons

#### Comment System

**Nested Structure:**
```
Comment (Parent)
  ├─ Reply 1 (Child)
  ├─ Reply 2 (Child)
  └─ Reply 3 (Child)
```

**Comment Display:**
- Avatar (shrink-0, w-8 h-8)
- Content bubble (rounded-2xl, bg-slate-700)
- Author name (bold)
- Timestamp (relative)
- Reply button
- View replies button (if has replies)

**Reply Display:**
- Smaller avatar (w-7 h-7)
- Indented with border-left
- Same structure as parent comment

**Comment Count:**
- Badge on Comments button
- Shows total: parents + all replies
- Blue pill shape (rounded-full)
- Auto-updates on create/reply

**Lazy Loading:**
- Comments load when "Comments" clicked
- Replies load when "View replies" clicked
- Improves performance

**UI Design:**
```
┌─────────────────────────────────────────┐
│ 💬 Comments (12)                        │
├─────────────────────────────────────────┤
│                                         │
│ [Avatar] [Write a comment...    ] [▶]  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ 👤 John Doe                  2h ago     │
│    ┌──────────────────────────────┐    │
│    │ This is a great post!        │    │
│    └──────────────────────────────┘    │
│    Reply | View 2 replies               │
│                                         │
│    ├─ 👤 Jane Smith          1h ago    │
│    │  ┌────────────────────────┐       │
│    │  │ Thanks!                 │       │
│    │  └────────────────────────┘       │
│    │                                    │
│    └─ 👤 Bob Johnson         30m ago   │
│       ┌────────────────────────┐       │
│       │ Agree!                  │       │
│       └────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### API Integration

**Create Comment:**
```javascript
POST /comments
{
  postId: 25,
  content: "Great post!",
  parentId: null  // null for parent, ID for reply
}
```

**Get Comments:**
```javascript
GET /comments/post/{postId}
Response: {
  code: 1000,
  result: [
    {
      id: 1,
      content: "...",
      author: {...},
      replies: [...]  // Array of reply IDs
    }
  ]
}
```

**Get Replies:**
```javascript
GET /comments/replies/{parentId}
Response: {
  code: 1000,
  result: [
    {
      id: 2,
      content: "...",
      author: {...},
      parentId: 1
    }
  ]
}
```

---

## 🚀 Deployment

### Build for Production

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output in /dist folder
```

### Environment Variables

**Production `.env`:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Netlify Deployment

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Steps:**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL`
5. Deploy!

### Vercel Deployment

**vercel.json:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Steps:**
1. Import project from Git
2. Framework Preset: Vite
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add environment variables
6. Deploy!

### GitHub Pages

```bash
# Add to package.json
{
  "homepage": "https://username.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Token không được gửi trong request

**Symptoms:** API returns 401 Unauthorized

**Solution:**
```javascript
// Check api.js interceptor
const token = localStorage.getItem("auth_token");
console.log("Token:", token);

// Verify key matches authStore.js
// authStore.js: localStorage.setItem("auth_token", token)
// api.js: localStorage.getItem("auth_token")
```

#### 2. Redirect loop after login

**Symptoms:** App keeps redirecting between pages

**Solution:**
- Check `App.jsx` redirect logic
- Verify `ProtectedRoute.jsx` authentication check
- Ensure `isAuthenticated` state is correct
- Clear localStorage and try again

#### 3. Posts không hiển thị

**Symptoms:** PostList shows loading forever

**Solution:**
```javascript
// Check API response structure
console.log("Posts response:", response);

// Verify pagination handling
const posts = response.result?.content || response.result || [];

// Check authentication
const token = localStorage.getItem("auth_token");
if (!token) {
  // User not logged in
}
```

#### 4. Comments không load

**Symptoms:** CommentList shows empty state

**Solution:**
```javascript
// Check postId is passed correctly
<CommentList postId={post.id} />

// Verify API response
console.log("Comments response:", response);

// Check API endpoint
GET /comments/post/{postId}  // Correct
GET /comments/{postId}       // Wrong
```

#### 5. Image upload fails

**Symptoms:** Image doesn't appear after upload

**Solution:**
```javascript
// Check file size
if (file.size > 5 * 1024 * 1024) {
  showError("Image size should not exceed 5MB");
}

// Check FormData
const formData = new FormData();
formData.append("image", imageFile);

// Check headers
headers: {
  "Content-Type": "multipart/form-data"
}
```

#### 6. 3D model không hiển thị

**Symptoms:** Black screen or error in 3D canvas

**Solution:**
- Check WebGL support: https://get.webgl.org/
- Clear browser cache
- Try different browser
- Check console for Three.js errors

#### 7. OTP modal không hiển thị

**Symptoms:** Modal doesn't appear after registration

**Solution:**
```javascript
// Check state
const [showOTPModal, setShowOTPModal] = useState(false);

// Verify backend sends success response
if (response.code === 1000) {
  setEmail(data.email);
  setShowOTPModal(true);  // Must be set
}
```

#### 8. CORS errors

**Symptoms:** Network request blocked by CORS policy

**Solution:**
- Backend must allow frontend origin
- Check `Access-Control-Allow-Origin` header
- In development: Use proxy or backend CORS config

```javascript
// Backend (Spring Boot example)
@CrossOrigin(origins = "http://localhost:5173")
```

---

## 📚 Additional Documentation

### Documentation Files

- **README.md** (This file) - Complete project documentation
- **COMMENTS_FEATURE.md** - Detailed comment system documentation
- **IMPLEMENTATION_CHECKLIST.md** - Implementation checklist

### API Documentation

Refer to backend API documentation for:
- Complete endpoint list
- Request/Response schemas
- Error codes
- Authentication flow

### Design System

**Colors:**
- Primary: Blue (#1E40AF)
- Success: Green (#059669)
- Error: Red (#DC2626)
- Warning: Orange (#EA580C)
- Background: Slate (50-950)

**Typography:**
- Font: System font stack
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

**Spacing:**
- Base unit: 4px (0.25rem)
- Scale: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with clear message
5. Push and create Pull Request

### Commit Message Format

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Code Style

- Use ESLint configuration
- Follow React best practices
- Use functional components + hooks
- Add comments for complex logic
- Keep components small and focused

---

## 📄 License

This project is **private and proprietary**.

---

## 👥 Team

- **Frontend Developer** - Architecture, Implementation, UI/UX
- **Backend Developer** - API Development
- **Designer** - UI/UX Design

---

## 📞 Support

For issues or questions:
- Create GitHub issue
- Contact team lead
- Check documentation

---

**Last Updated:** November 12, 2025  
**Version:** 2.0.0  
**Status:** ✅ Production Ready

---

## 🎉 Quick Start

```bash
# 1. Clone & Install
git clone <repo-url> && cd vf3-fe && npm install

# 2. Configure
cp .env.example .env
# Edit .env with your API URL

# 3. Run
npm run dev

# 4. Open browser
http://localhost:5173

# 5. Login with test account
# Or create new account
```

**Enjoy! 🚗✨**
