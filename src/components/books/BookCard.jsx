import { BookOpen, Calendar, Heart } from "lucide-react";

export const BookCard = ({
  book,
  onShowDetails,
  onToggleFavorite,
  isFavorite,
}) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <BookOpen className="w-12 h-12" />
          </div>
        )}
        <button
          onClick={() => onToggleFavorite(book.key)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>

        {book.author_name && (
          <p className="text-gray-600 text-xs line-clamp-1">
            by {book.author_name.join(", ")}
          </p>
        )}

        <div className="flex items-center justify-between">
          {book.first_publish_year && (
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {book.first_publish_year}
            </span>
          )}

          <button
            onClick={() => onShowDetails(book)}
            className="text-indigo-600 hover:text-indigo-700 text-xs font-medium hover:underline transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
