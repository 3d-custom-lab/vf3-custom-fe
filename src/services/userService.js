import api from "../utils/api";

/**
 * Fetch all users with pagination and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by status (ACTIVE, INACTIVE, PENDING, BANNED)
 * @param {number} params.page - Page number (0-indexed)
 * @param {number} params.size - Page size
 * @returns {Promise} - Response data
 */
export const getAllUsers = async (params = {}) => {
  const { status, page = 0, size = 15 } = params;
  
  const queryParams = new URLSearchParams();
  if (status && status !== 'ALL') {
    queryParams.append('status', status);
  }
  queryParams.append('page', page);
  queryParams.append('size', size);
  
  const response = await api.get(`/users/all?${queryParams.toString()}`);
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