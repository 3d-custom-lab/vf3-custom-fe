# Google OAuth Authentication Flow

## Tổng quan
Tài liệu này mô tả chi tiết luồng xác thực Google OAuth trong ứng dụng VF3.

## Luồng hoạt động

```
┌─────────────┐           ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
│   Browser   │           │  Frontend   │           │   Google    │           │   Backend   │
│   (User)    │           │  (React)    │           │   OAuth     │           │   (API)     │
└──────┬──────┘           └──────┬──────┘           └──────┬──────┘           └──────┬──────┘
       │                         │                         │                         │
       │ 1. Click "Login         │                         │                         │
       │    with Google"         │                         │                         │
       │────────────────────────>│                         │                         │
       │                         │                         │                         │
       │                         │ 2. Build OAuth URL      │                         │
       │                         │    with client_id,      │                         │
       │                         │    redirect_uri, scope  │                         │
       │                         │                         │                         │
       │                         │ 3. Redirect to Google   │                         │
       │                         │────────────────────────>│                         │
       │                         │                         │                         │
       │ 4. Google Login Page    │                         │                         │
       │<─────────────────────────────────────────────────│                         │
       │                         │                         │                         │
       │ 5. User enters          │                         │                         │
       │    credentials &        │                         │                         │
       │    grants permission    │                         │                         │
       │────────────────────────────────────────────────>│                         │
       │                         │                         │                         │
       │ 6. Redirect to callback │                         │                         │
       │    URL with auth code   │                         │                         │
       │<─────────────────────────────────────────────────│                         │
       │                         │                         │                         │
       │ 7. Load callback page   │                         │                         │
       │────────────────────────>│                         │                         │
       │                         │                         │                         │
       │                         │ 8. Extract 'code'       │                         │
       │                         │    from URL params      │                         │
       │                         │                         │                         │
       │                         │ 9. Send code to backend │                         │
       │                         │    POST /auth/google-   │                         │
       │                         │    authenticate?code=XX │                         │
       │                         │─────────────────────────────────────────────────>│
       │                         │                         │                         │
       │                         │                         │ 10. Exchange code       │
       │                         │                         │     with Google for     │
       │                         │                         │<────user info           │
       │                         │                         │                         │
       │                         │                         │                         │
       │                         │ 11. Return JWT token    │                         │
       │                         │<─────────────────────────────────────────────────│
       │                         │                         │                         │
       │                         │ 12. Save token to       │                         │
       │                         │     cookie & update     │                         │
       │                         │     auth state          │                         │
       │                         │                         │                         │
       │ 13. Redirect to home    │                         │                         │
       │     based on user role  │                         │                         │
       │<────────────────────────│                         │                         │
       │                         │                         │                         │
```

## Chi tiết các bước

### Bước 1-3: Khởi tạo OAuth Flow
**File**: `src/components/auth/LoginForm.jsx`
**Function**: `handleGoogleLogin()`

```javascript
const handleGoogleLogin = () => {
  const callbackUrl = 'http://localhost:5173/auth/google/callback';
  const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const url = new URL(authUrl);
  url.searchParams.set('client_id', googleClientId);
  url.searchParams.set('redirect_uri', callbackUrl);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');

  window.location.href = url.toString();
};
```

**Các tham số quan trọng:**
- `client_id`: Google OAuth Client ID (từ Google Console)
- `redirect_uri`: URL callback mà Google sẽ redirect về
- `response_type`: 'code' - yêu cầu authorization code
- `scope`: Các quyền truy cập (openid, email, profile)
- `access_type`: 'offline' - để nhận refresh token
- `prompt`: 'consent' - luôn hiển thị màn hình đồng ý

### Bước 4-6: Google Authentication
Google hiển thị trang đăng nhập và yêu cầu người dùng:
1. Đăng nhập vào tài khoản Google
2. Xem các quyền ứng dụng yêu cầu
3. Cho phép hoặc từ chối

Sau khi người dùng đồng ý, Google redirect về:
```
http://localhost:5173/auth/google/callback?code=AUTHORIZATION_CODE
```

Hoặc nếu có lỗi:
```
http://localhost:5173/auth/google/callback?error=access_denied
```

### Bước 7-8: Xử lý Callback
**File**: `src/pages/auth/GoogleCallbackPage.jsx`

Component này:
1. Extract `code` hoặc `error` từ URL params
2. Kiểm tra error và xử lý
3. Gửi code lên backend

```javascript
const code = searchParams.get('code');
const error = searchParams.get('error');

if (error) {
  // Xử lý lỗi
  alert('Google login thất bại');
  navigate('/auth');
  return;
}
```

### Bước 9-11: Backend Exchange
**File**: `src/services/authService.js`
**Function**: `googleAuthenticate(code)`

```javascript
export const googleAuthenticate = async (code) => {
  const res = await api.post(`/auth/google-authenticate?code=${code}`);
  return res.data;
};
```

Backend sẽ:
1. Nhận authorization code từ frontend
2. Gửi code đến Google để trao đổi lấy access token
3. Sử dụng access token để lấy thông tin người dùng
4. Tạo hoặc cập nhật user trong database
5. Generate JWT token
6. Trả về JWT token cho frontend

**Response format:**
```json
{
  "code": 0,
  "message": "string",
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "authenticated": true
  }
}
```

### Bước 12-13: Lưu Token và Redirect
**File**: `src/pages/auth/GoogleCallbackPage.jsx`

```javascript
// Lưu JWT token vào cookie
setCookie('auth_token', jwtToken, 7);

// Reload auth state
await checkAuth();

// Redirect về trang phù hợp
const homeRoute = getHomeRoute();
navigate(homeRoute, { replace: true });
```

## Cấu hình cần thiết

### 1. Environment Variables (.env.local)
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URL=http://localhost:5173/auth/google/callback
VITE_GOOGLE_AUTH_URL=https://accounts.google.com/o/oauth2/v2/auth
```

### 2. Google Cloud Console Configuration
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo OAuth 2.0 Client ID
3. Thêm Authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)

### 3. Router Configuration (App.jsx)
```jsx
<Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
```

## Xử lý lỗi

### Lỗi phổ biến và cách xử lý:

1. **Missing Client ID**
   ```javascript
   if (!googleClientId) {
     alert('Missing Google Client ID configuration.');
     return;
   }
   ```

2. **Google OAuth Error**
   ```javascript
   const error = searchParams.get('error');
   if (error) {
     console.error('Google OAuth error:', error);
     navigate('/auth');
   }
   ```

3. **Invalid Grant (code đã sử dụng)**
   ```javascript
   if (error.message?.includes('invalid_grant')) {
     // Code đã được sử dụng, im lặng redirect
     navigate('/', { replace: true });
     return;
   }
   ```

4. **No Token Received**
   ```javascript
   if (!result?.result?.token) {
     throw new Error('Không nhận được token từ server');
   }
   ```

## Security Best Practices

1. **HTTPS Only (Production)**
   - Luôn sử dụng HTTPS trong production
   - Google yêu cầu HTTPS cho redirect URIs

2. **State Parameter (Optional Enhancement)**
   - Thêm `state` parameter để prevent CSRF attacks
   ```javascript
   const state = generateRandomString();
   sessionStorage.setItem('oauth_state', state);
   url.searchParams.set('state', state);
   ```

3. **Token Storage**
   - JWT token được lưu trong HTTP-only cookie
   - Expires sau 7 ngày

4. **Prevent Multiple Processing**
   - Sử dụng `useRef` để ngăn xử lý callback nhiều lần
   ```javascript
   const isProcessing = useRef(false);
   if (isProcessing.current) return;
   ```

## Testing

### Test Flow thủ công:
1. Click "Login with Google" button
2. Đăng nhập Google account
3. Cho phép quyền truy cập
4. Verify redirect về callback page
5. Verify loading state hiển thị
6. Verify redirect về home page thành công
7. Verify user đã đăng nhập (check cookie, auth state)

### Test Error Cases:
1. User từ chối quyền truy cập
2. Network error khi gọi backend
3. Backend trả về lỗi
4. Token không hợp lệ

## Troubleshooting

### Lỗi "redirect_uri_mismatch"
- Kiểm tra redirect URI trong Google Console khớp với VITE_GOOGLE_REDIRECT_URL
- Đảm bảo không có trailing slash

### Lỗi "invalid_grant"
- Authorization code chỉ dùng được 1 lần
- Code hết hạn sau vài phút
- Clear URL params sau khi xử lý xong

### Lỗi "Access blocked"
- App chưa được verify bởi Google
- Cần thêm test users trong Google Console (development)
- Hoặc submit app để review (production)

## Files liên quan

- `src/components/auth/LoginForm.jsx` - Nút login và khởi tạo OAuth flow
- `src/pages/auth/GoogleCallbackPage.jsx` - Xử lý callback từ Google
- `src/services/authService.js` - API call để exchange code
- `src/contexts/AuthContext.jsx` - Quản lý auth state
- `src/App.jsx` - Router configuration
- `.env.local` - Environment variables
