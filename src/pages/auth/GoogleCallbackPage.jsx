import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { googleAuthenticate } from '../../services/authService';
import { getUserFromToken } from '../../utils/jwtUtils';
import { setCookie } from '../../utils/cookieUtils';

/**
 * GoogleCallbackPage - Xử lý callback từ Google OAuth
 * 
 * Luồng hoạt động:
 * 1. Google redirect về trang này với 'code' hoặc 'error' trong URL params
 * 2. Kiểm tra error -> nếu có thì quay về trang login
 * 3. Lấy authorization code từ URL
 * 4. Gửi code lên backend qua API /auth/google-authenticate
 * 5. Backend trao đổi code với Google để lấy thông tin user và trả về JWT token
 * 6. Lưu token vào cookie và cập nhật auth state
 * 7. Redirect user đến trang phù hợp với role
 */
export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuth, getHomeRoute } = useAuth();
  const isProcessing = useRef(false);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      // Ngăn chặn xử lý nhiều lần cùng lúc
      if (isProcessing.current) {
        return;
      }

      try {
        isProcessing.current = true;

        // Lấy code hoặc error từ URL params
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        // Xử lý trường hợp có error từ Google
        if (error) {
          alert('Google login thất bại. Vui lòng thử lại.');
          navigate('/auth');
          return;
        }

        // Kiểm tra có authorization code hay không
        if (!code) {
          alert('Không nhận được mã xác thực. Vui lòng thử lại.');
          navigate('/auth');
          return;
        }

        // Gửi code lên backend để trao đổi lấy JWT token
        const result = await googleAuthenticate(code);

        // Kiểm tra response từ backend
        if (result && result.result && result.result.token) {
          const jwtToken = result.result.token;

          // Lưu JWT token vào cookie (expires sau 7 ngày)
          setCookie('auth_token', jwtToken, 7);

          // Decode token để lấy thông tin user
          const userInfo = getUserFromToken(jwtToken);

          // Reload auth state từ cookie
          await checkAuth();

          // Xóa code khỏi URL để tránh xử lý lại
          window.history.replaceState({}, document.title, '/auth/google/callback');

          // Redirect về trang home phù hợp với role
          const homeRoute = getHomeRoute();
          navigate(homeRoute, { replace: true });
        } else {
          throw new Error('Không nhận được token từ server');
        }
      } catch (error) {
        // Xử lý lỗi invalid_grant (code đã được sử dụng)
        if (error.response?.data?.message?.includes('invalid_grant') || 
            error.message?.includes('invalid_grant')) {
          // Không hiển thị lỗi, im lặng redirect về home
          navigate('/', { replace: true });
          return;
        }

        // Hiển thị lỗi cho các trường hợp khác
        const errorMessage = error.response?.data?.message || error.message || 'Google login thất bại. Vui lòng thử lại.';
        alert(errorMessage);
        navigate('/auth');
      } finally {
        isProcessing.current = false;
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, checkAuth, getHomeRoute]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        {/* Loading spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
        <p className="text-gray-300 text-lg">Đang xử lý đăng nhập với Google...</p>
        <p className="text-gray-500 text-sm mt-2">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  );
}
