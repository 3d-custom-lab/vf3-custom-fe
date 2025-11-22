import api from "../utils/api";

// Get user information
export const getUserInfo = async () => {
  const response = await api.get("/users/my-info");
  return response.data;
};

// Update user profile by ID
export const updateUserProfile = async (userId, userData) => {
  const response = await api.put(`/users/update/${userId}`, userData);
  return response.data;
};
 