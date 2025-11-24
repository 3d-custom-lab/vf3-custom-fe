import api from "../utils/api";

// Đăng ký người dùng mới
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// Gửi email xác thực
export const sendVerificationEmail = async (email) => {
  const res = await api.post(`/auth/email-verification/send?email=${email}`);
  return res.data;
};

// Xác thực mã OTP
export const verifyEmail = async (email, code) => {
  const res = await api.post(
    `/auth/email-verification/verify?email=${email}&code=${code}`
  );
  return res.data;
};

// Đăng nhập người dùng
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// Kiểm tra token hợp lệ
export const introspect = async (token) => {
  const res = await api.post("/auth/introspect", { token });
  return res.data;
};

// Gửi mã reset mật khẩu về email
export const forgetPassword = async (email) => {
  const res = await api.post(`/auth/password/forget?email=${email}`);
  return res.data;
};

// Reset mật khẩu với mã OTP
export const resetPassword = async (email, code, newPassword) => {
  const res = await api.post(
    `/auth/password/reset?email=${email}&code=${code}&newPassword=${newPassword}`
  );
  return res.data;
};

// Đổi mật khẩu (khi đã đăng nhập)
export const changePassword = async (userId, oldPassword, newPassword) => {
  const res = await api.post(
    `/auth/password/change?userId=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`
  );
  return res.data;
};

// Xác thực Google OAuth
export const googleAuthenticate = async (code) => {
  const res = await api.post(`/auth/google-authenticate?code=${code}`);
  return res.data;
};
