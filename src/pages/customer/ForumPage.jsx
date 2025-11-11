import { useState } from "react";
import ForumHeader from "../../components/forum/ForumHeader";
import CreatePost from "../../components/forum/CreatePost";
import PostList from "../../components/forum/PostList";
import Header from "../../components/layout/Header";

function ForumPage() {
  const [currentUserId, setCurrentUserId] = useState(crypto.randomUUID());
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <ForumHeader />
        <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          <CreatePost onPostCreated={handlePostCreated} />
          <PostList
            currentUserId={currentUserId}
            refreshTrigger={refreshTrigger}
          />
        </main>
      </div>
    </>
  );
}

export default ForumPage;
