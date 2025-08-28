import { Search, Filter } from "lucide-react";

// Search Bar Component
export const SearchBar = ({
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
