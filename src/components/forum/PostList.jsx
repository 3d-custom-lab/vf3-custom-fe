import { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { getAllPosts } from "../../services/postService";
import { useAuthStore } from "../../store/authStore";
import { FaSpinner } from "react-icons/fa";

function PostList({ refreshTrigger }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only load posts if user is authenticated
    if (isAuthenticated) {
      loadPosts();
    } else {
      setLoading(false);
      setPosts([]);
      setError(null);
    }
  }, [refreshTrigger, isAuthenticated]);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllPosts();
      
      console.log("Posts API response:", response); // Debug log
      
      if (response.code === 1000 && response.result) {
        // Response has pagination structure: result.content contains the posts array
        const postsData = Array.isArray(response.result.content) 
          ? response.result.content 
          : Array.isArray(response.result)
          ? response.result
          : [];
        
        console.log("Posts data:", postsData); // Debug log
        setPosts(postsData);
      } else {
        console.warn("Unexpected response format:", response);
        setPosts([]);
        setError("Failed to load posts");
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]); // Reset to empty array on error
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        setError("Authentication required. Please login to view posts.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to load posts. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => {
      // Ensure prevPosts is an array
      if (!Array.isArray(prevPosts)) return [];
      return prevPosts.filter((p) => p.id !== postId);
    });
  };

  const handlePostUpdated = () => {
    loadPosts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-2" />
          <p className="text-slate-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-xl border border-red-700 p-12 text-center">
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <button
          onClick={loadPosts}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-12 text-center">
        <p className="text-slate-400 text-lg">
          No posts yet. Be the first to share something!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
        />
      ))}
    </div>
  );
}

export default PostList;
