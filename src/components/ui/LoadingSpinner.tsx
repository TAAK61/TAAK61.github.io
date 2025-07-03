export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/20 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        </div>
        <div className="mt-4 text-white/80 text-sm font-medium">Chargement...</div>
      </div>
    </div>
  );
}

