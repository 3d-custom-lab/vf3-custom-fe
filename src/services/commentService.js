import api from "../utils/api";

/**
 * Get all comments for a specific post
 * @param {number} postId - The ID of the post
 * @returns {Promise} Response with comments array
 */
export const getCommentsByPostId = async (postId) => {
  const res = await api.get(`/comments/post/${postId}`);
  return res.data;
};

/**
 * Get all replies for a specific comment
 * @param {number} parentId - The ID of the parent comment
 * @returns {Promise} Response with replies array
 */
export const getRepliesByParentId = async (parentId) => {
  const res = await api.get(`/comments/replies/${parentId}`);
  return res.data;
};

/**
 * Create a new comment or reply
 * @param {Object} data - Comment data
 * @param {number} data.postId - The ID of the post
 * @param {string} data.content - Comment content
 * @param {number} [data.parentId] - Optional parent comment ID for replies
 * @returns {Promise} Response with created comment
 */
export const createComment = async (data) => {
  const res = await api.post("/comments", data);
  return res.data;
};
