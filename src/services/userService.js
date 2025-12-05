import api from "../utils/api";

/**
 * Fetch all users with pagination and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by status (ACTIVE, INACTIVE, PENDING, BANNED)
 * @param {number} params.page - Page number (0-indexed)
 * @param {number} params.size - Page size
 * @returns {Promise<Object>} Response data
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

/**
 * Get current user information
 * @returns {Promise<Object>} User data
 */
export const getUserInfo = async () => {
  const response = await api.get("/users/my-info");
  return response.data;
};

/**
 * Update user profile by ID
 * @param {number} userId - The user ID
 * @param {Object} userData - User data to update
 * @param {string} userData.name - User's full name
 * @param {string} userData.gender - User's gender (MALE, FEMALE, OTHER)
 * @param {string} userData.avatar - Avatar URL
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserProfile = async (userId, userData) => {
  const response = await api.put(`/users/update/${userId}`, userData);
  return response.data;
};

/**
 * Delete user by ID
 * @param {number} userId - The user ID to delete
 * @returns {Promise<Object>} Response data
 */
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

/**
 * Create new user
 * @param {Object} userData - New user data
 * @returns {Promise<Object>} Created user data
 */
export const createUser = async (userData) => {
  const response = await api.post("/users/create", userData);
  return response.data;
};