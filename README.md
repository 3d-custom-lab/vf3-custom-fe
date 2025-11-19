# VF3 Custom Lab - Frontend

React SPA cho phép tùy chỉnh xe 3D (Three.js), chia sẻ thiết kế và tham gia forum với authentication JWT + OTP.

## Quick Start

**Yêu cầu:** Node.js >= 18, npm >= 9

```powershell
git clone <repo>
cd vf3-fe
npm install
cp .env.example .env    # Đặt VITE_API_BASE_URL
npm run dev             # http://localhost:5173
```

**Scripts:**
- `npm run dev` - Dev server
- `npm run build` - Build production
- `npm run lint` - Chạy ESLint

## Tech Stack

React 19 • Vite 7 • Tailwind 4 • React Router 7 • Zustand • Axios • Three.js • Framer Motion

## Routes

- `/` - Landing
- `/auth` - Login/Register
- `/studio` - 3D Studio (protected)
- `/forum` - Forum (protected)
- `/profile` - Profile (protected)
- `/admin/*` - Admin (ADMIN role)

## Authentication

- JWT token lưu trong cookie `auth_token`
- `/auth/introspect` chỉ gọi 1 lần khi login
- App init: đọc token từ cookie và parse JWT nếu còn hạn
- Axios interceptor tự attach Bearer token

## API

**Base URL:** `import.meta.env.VITE_API_BASE_URL`

**Endpoints:**
- Auth: `/auth/login`, `/auth/register`, `/auth/introspect`
- User: `/users/my-info`
- Posts: `/posts` (query: keyword, page, size)
- Comments: `/comments/post/{postId}`, `/comments/replies/{parentId}`

**Forum:** GET `/posts` hỗ trợ query params. Front-end dùng size=20, debounce search 400ms.

## Cấu trúc code
```
src/
├── components/    # 3d, auth, forum, landing, layout, ui
├── pages/         # HomePage, ForumPage, StudioPage, ProfilePage, admin
├── services/      # authService, postService, commentService, userService
├── store/         # authStore, customizationStore (Zustand)
├── utils/         # api (axios), constants, jwt/cookie helpers
├── hooks/         # useToast
├── contexts/      # AuthContext
├── App.jsx        # Routes
└── main.jsx       # Entry
```

**Key files:**
- `contexts/AuthContext.jsx` - Auth logic (cookie, introspect-on-login)
- `pages/customer/ForumPage.jsx` - Forum controller (debounce search)
- `services/postService.js` - Posts API

## Troubleshooting

**Không thấy posts:** Kiểm tra token (cookie `auth_token`), response shape  
**React DevTools semver error:** Đã suppress trong `main.jsx` (React 19 compatibility)  
**ESLint errors:** Chạy `npm run lint` và fix

## Contributing

Branch feature → Lint & build → PR  
Commit format: `feat:`, `fix:`, `docs:`, `refactor:`

---

**Last updated:** 2025-11-19