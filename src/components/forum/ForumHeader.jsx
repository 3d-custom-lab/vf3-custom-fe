import { FaComments } from "react-icons/fa";

function ForumHeader() {
  return (
    <header className="bg-linear-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <FaComments className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">MiniConnect</h1>
            <p className="text-slate-400 text-sm">
              Share your thoughts with the community
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ForumHeader;
