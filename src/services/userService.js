import api from "../utils/api";


// Fetch all users
export const getAllUsers = async () => {
  const response = await api.get("/users/all");
  return response.data;
};

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

// Delete user by ID
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};