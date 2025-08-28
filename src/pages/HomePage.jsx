import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Header } from "../components/layout/Header";
import { SearchBar } from "../components/layout/SearchBar";
import { BookCardSkeleton } from "../components/books/BookCardSkeleton";
import { ErrorState } from "../components/error_handling/ErrorState";
import { EmptyState } from "../components/error_handling/EmptyState";
import { BookCard } from "../components/books/BookCard";
import { Pagination } from "../components/utilities/Pagination";
import { BookDetailModal } from "../components/books/BookDetails";
import { Footer } from "../components/layout/Footer";
import { useOpenLibrarySearch } from "../hooks/useOpenLibrarySearch";

// Main App Component
export const BookSearchApp = () => {
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
