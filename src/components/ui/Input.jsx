export const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
          focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
          transition-colors duration-200 ${className} ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
