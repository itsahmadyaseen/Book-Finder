import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Heart,
  X,
  Book,
  Calendar,
  Globe,
  User,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  BookOpen,
} from "lucide-react";

// Custom hook for debounced search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for Open Library search
const useOpenLibrarySearch = (query, scope, filters, page, sort) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [abortController, setAbortController] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  const buildSearchUrl = useCallback(
    (searchQuery, searchScope, searchFilters, searchPage, searchSort) => {
      const baseUrl = "https://openlibrary.org/search.json";
      const params = new URLSearchParams();

      if (!searchQuery.trim()) return null;

      // Handle search scope
      switch (searchScope) {
        case "title":
          params.append("title", searchQuery);
          break;
        case "author":
          params.append("author", searchQuery);
          break;
        case "subject":
          params.append("subject", searchQuery);
          break;
        case "isbn":
          params.append("isbn", searchQuery);
          break;
        default:
          params.append("q", searchQuery);
      }

      // Add filters
      if (searchFilters.language && searchFilters.language !== "all") {
        params.append("language", searchFilters.language);
      }

      if (searchFilters.yearFrom) {
        params.append("first_publish_year", `[${searchFilters.yearFrom} TO *]`);
      }

      if (searchFilters.yearTo) {
        params.append("first_publish_year", `[* TO ${searchFilters.yearTo}]`);
      }

      if (searchFilters.freeToRead) {
        params.append("has_fulltext", "true");
      }

      // Pagination
      params.append("page", searchPage.toString());
      params.append("limit", "20");

      // Fields to return
      params.append(
        "fields",
        "key,title,author_name,first_publish_year,cover_i,subject,language,isbn,number_of_pages_median"
      );

      return `${baseUrl}?${params.toString()}`;
    },
    []
  );

  useEffect(() => {
    const searchUrl = buildSearchUrl(
      debouncedQuery,
      scope,
      filters,
      page,
      sort
    );

    if (!searchUrl) {
      setData(null);
      setTotal(0);
      setLoading(false);
      setError(null);
      return;
    }

    // Cancel previous request
    if (abortController) {
      abortController.abort();
    }

    const controller = new AbortController();
    setAbortController(controller);
    setLoading(true);
    setError(null);

    fetch(searchUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        setData(result.docs || []);
        setTotal(result.numFound || 0);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, scope, filters, page, sort, buildSearchUrl]);

  return { data, total, loading, error };
};

// Loading skeleton component
const BookCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="aspect-[3/4] bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

// Book Card Component
const BookCard = ({ book, onShowDetails, onToggleFavorite, isFavorite }) => {
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

// Book Detail Modal Component
const BookDetailModal = ({ book, isOpen, onClose }) => {
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

// Search Bar Component
const SearchBar = ({
  query,
  onQueryChange,
  scope,
  onScopeChange,
  filters,
  onFiltersChange,
  showFilters,
  onToggleFilters,
}) => {
  const scopes = [
    { value: "all", label: "All Fields" },
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
    { value: "subject", label: "Subject" },
    { value: "isbn", label: "ISBN" },
  ];

  const languages = [
    { value: "all", label: "All Languages" },
    { value: "eng", label: "English" },
    { value: "fre", label: "French" },
    { value: "ger", label: "German" },
    { value: "spa", label: "Spanish" },
    { value: "ita", label: "Italian" },
  ];

  return (
    <div className="space-y-4">
      {/* Main Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
        </div>

        <select
          value={scope}
          onChange={(e) => onScopeChange(e.target.value)}
          className="px-4 py-4 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white text-gray-900 min-w-[140px]"
        >
          {scopes.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-200 font-medium ${
            showFilters
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-lg">
            Advanced Filters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) =>
                  onFiltersChange({ ...filters, language: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year From
              </label>
              <input
                type="number"
                value={filters.yearFrom}
                onChange={(e) =>
                  onFiltersChange({ ...filters, yearFrom: e.target.value })
                }
                placeholder="e.g., 2000"
                min="1000"
                max="2024"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year To
              </label>
              <input
                type="number"
                value={filters.yearTo}
                onChange={(e) =>
                  onFiltersChange({ ...filters, yearTo: e.target.value })
                }
                placeholder="e.g., 2024"
                min="1000"
                max="2024"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.freeToRead}
              onChange={(e) =>
                onFiltersChange({ ...filters, freeToRead: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2"
            />
            <span className="text-gray-700 font-medium">
              Free to read online
            </span>
          </label>

          <p className="text-xs text-gray-500 mt-4">
            💡 Tip: Press Enter to search, or use filters to narrow your results
          </p>
        </div>
      )}
    </div>
  );
};

// Empty State Component
const EmptyState = ({ query }) => (
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

// Error State Component
const ErrorState = ({ error, onRetry }) => (
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

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, total }) => {
  const showPages = Math.min(5, totalPages);
  const startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  const endPage = Math.min(totalPages, startPage + showPages - 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
      <div className="text-sm text-gray-600">
        Showing page {currentPage} of {totalPages} ({total.toLocaleString()}{" "}
        total results)
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                  page === currentPage
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header = () => (
  <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BookFinder
          </h1>
        </div>

        <div className="text-sm text-gray-600 hidden sm:block">
          Powered by Open Library
        </div>
      </div>
    </div>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-100 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">BookFinder</span>
        </div>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Search millions of books from the Open Library collection. Find your
          next great read with advanced search and filtering options.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <a
            href="https://openlibrary.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            Data from Open Library
          </a>
          <span>•</span>
          <span>Built with React & Tailwind CSS</span>
          <span>•</span>
          <span>© 2024 BookFinder</span>
        </div>
      </div>
    </div>
  </footer>
);

// Main App Component
const BookSearchApp = () => {
  // Search state
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("all");
  const [filters, setFilters] = useState({
    language: "all",
    yearFrom: "",
    yearTo: "",
    freeToRead: false,
  });
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Modal state
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState(new Set());

  // Search hook
  const {
    data: books,
    total,
    loading,
    error,
  } = useOpenLibrarySearch(query, scope, filters, page, "relevance");

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [query, scope, filters]);

  // Pagination calculations
  const totalPages = Math.ceil(total / 20);

  // Handlers
  const handleShowDetails = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleToggleFavorite = (bookKey) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookKey)) {
      newFavorites.delete(bookKey);
    } else {
      newFavorites.add(bookKey);
    }
    setFavorites(newFavorites);
  };

  const handleRetry = () => {
    // Trigger a re-search by updating the query
    setQuery(query + " ");
    setTimeout(() => setQuery(query), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            scope={scope}
            onScopeChange={setScope}
            filters={filters}
            onFiltersChange={setFilters}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && !loading && (
            <ErrorState error={error} onRetry={handleRetry} />
          )}

          {!loading && !error && (!books || books.length === 0) && (
            <EmptyState query={query} />
          )}

          {!loading && !error && books && books.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {total.toLocaleString()} Results
                </h2>
                {loading && (
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Searching...</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    onShowDetails={handleShowDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.has(book.key)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  total={total}
                />
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default BookSearchApp;
