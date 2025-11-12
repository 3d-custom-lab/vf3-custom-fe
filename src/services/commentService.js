import api from "../utils/api";

// Get all comments for a specific post
export const getCommentsByPostId = async (postId) => {
  const res = await api.get(`/comments/post/${postId}`);
  return res.data;
};

// Get all replies for a specific comment
export const getRepliesByParentId = async (parentId) => {
  const res = await api.get(`/comments/replies/${parentId}`);
  return res.data;
};

// Create a new comment or reply
export const createComment = async (data) => {
  const res = await api.post("/comments", data);
  return res.data;
};
