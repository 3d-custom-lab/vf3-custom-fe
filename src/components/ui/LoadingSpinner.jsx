export default function LoadingSpinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="w-full h-full border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
 