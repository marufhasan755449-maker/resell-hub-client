const LoadingSpinner = ({ fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-base-300 border-t-primary rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-transparent border-b-secondary rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
        </div>
        <p className="mt-4 text-base-content/60 font-medium font-display">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
