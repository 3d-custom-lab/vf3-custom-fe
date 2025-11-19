import api from '../utils/api';

/**
 * Get current user information
 */
export const getUserInfo = async () => {
  const response = await api.get('/users/my-info');
  return response.data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/my-info', userData);
  return response.data;
};
