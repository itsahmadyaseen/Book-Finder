import { useCallback, useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

// Custom hook for Open Library search
export const useOpenLibrarySearch = (query, scope, filters, page, sort) => {
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
