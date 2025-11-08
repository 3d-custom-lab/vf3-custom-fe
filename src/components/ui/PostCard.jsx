import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { formatTimeAgo, generateUserId } from "../../utils/helpers";
import { Card } from "./Card";

export const PostCard = ({
  post,
  onLike,
  onComment,
  onDelete,
  userHasLiked,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentUserId = generateUserId();
  const isOwner = post.user_id === currentUserId;

  return (
    <Card hover={true}>
      {/* Image / Placeholder */}
      <div
        className="relative overflow-hidden bg-slate-200 dark:bg-slate-700"
        style={{ paddingBottom: "75%" }}
      >
        {post.image_url && post.image_url !== "placeholder" ? (
          <img
            src={post.image_url}
            alt={post.title}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-2xl shadow-lg"
              style={{
                backgroundColor:
                  post.customization_data?.bodyColor || "#1E40AF",
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium">{post.username}</span>
              <span>•</span>
              <span>{formatTimeAgo(post.created_at)}</span>
            </div>
          </div>

          {/* Delete button for owner */}
          {isOwner && onDelete && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(post.id)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              userHasLiked
                ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${userHasLiked ? "fill-red-500" : ""}`}
            />
            <span className="font-medium">{post.likes_count}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onComment(post.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{post.comments_count}</span>
          </motion.button>
        </div>
      </div>
    </Card>
  );
};
