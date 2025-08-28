import { AlertCircle } from "lucide-react";

// Error State Component
export const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
      <AlertCircle className="w-12 h-12 text-red-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
    <button
      onClick={onRetry}
      className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
    >
      Try Again
    </button>
  </div>
);
