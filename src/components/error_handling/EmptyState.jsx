import { Book } from "lucide-react";

// Empty State Component
export const EmptyState = ({ query }) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
      <Book className="w-12 h-12 text-indigo-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {query ? `No books found for "${query}"` : "Start your search"}
    </h3>
    <p className="text-gray-600 max-w-md mx-auto">
      {query
        ? "Try different keywords, check spelling, or adjust your filters"
        : "Search millions of books from the Open Library collection"}
    </p>
  </div>
);
