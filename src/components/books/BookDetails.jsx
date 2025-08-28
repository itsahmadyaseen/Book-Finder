import { Calendar, Globe, User, ExternalLink, BookOpen, X } from "lucide-react";

// Book Detail Modal Component
export const BookDetailModal = ({ book, isOpen, onClose }) => {
  if (!isOpen || !book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  const workUrl = `https://openlibrary.org${book.key}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-48 h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <BookOpen className="w-16 h-16" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h3>
                {book.author_name && (
                  <p className="text-gray-600 flex items-center gap-2 text-lg">
                    <User className="w-4 h-4" />
                    {book.author_name.join(", ")}
                  </p>
                )}
              </div>

              {book.first_publish_year && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Published: {book.first_publish_year}</span>
                </div>
              )}

              {book.language && book.language.length > 0 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>Languages: {book.language.join(", ")}</span>
                </div>
              )}

              {book.subject && book.subject.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 10).map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full border border-indigo-100"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={workUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                View on Open Library
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
