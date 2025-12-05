import api from "../utils/api";

// Get all posts
// Fetch posts with optional query params: { keyword, page, size }
export const getAllPosts = async (params = {}) => {
  const res = await api.get("/posts", { params });
  return res.data;
};

// Get a single post by ID
export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// Create a new post
// Create a new post
// API nhận title và content qua query params, images qua body (multipart/form-data)
export const createPost = async (title, content, imageFiles = []) => {
  const formData = new FormData();
  if (imageFiles && imageFiles.length > 0) {
    Array.from(imageFiles).forEach((file) => {
      formData.append("images", file);
    });
  }

  const res = await api.post("/posts/create", formData, {
    params: {
      title,
      content,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update a post
export const updatePost = async (id, data) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};

// Delete a post
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

// Like a post
export const likePost = async (id) => {
  const res = await api.post(`/posts/${id}/like`);
  return res.data;
};



// Get user's own posts
export const getMyPosts = async () => {
  const res = await api.get("/posts/my-posts");
  return res.data;
};

// Delete all of user's own posts
export const deleteMyPosts = async () => {
  const res = await api.delete("/posts/my-posts");
  return res.data;
};

// Add image to post
export const addPostImage = async (postId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await api.post(`/posts/${postId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete image from post
export const deletePostImage = async (postId, imageId) => {
  const res = await api.delete(`/posts/${postId}/images/${imageId}`);
  return res.data;
};
