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

// Lấy thông tin user hiện tại
export const getCurrentUser = async () => {
  const res = await api.get("/users/my-info");
  return res.data;
};

// Đăng xuất người dùng
export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
