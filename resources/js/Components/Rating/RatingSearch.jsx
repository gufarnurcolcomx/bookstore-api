import { useEffect, useRef } from "react"

export function RatingSearch({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClearFilters,
  loading = false,
}) {
  const debounceRef = useRef(null)

  const handleChange = (e) => {
    const val = e.target.value
    setSearchTerm(val)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onSearch && onSearch(val)
    }, 700)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    onSearch && onSearch(searchTerm)
  }

  const handleClear = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    setSearchTerm("")
    onClearFilters ? onClearFilters() : onSearch && onSearch("")
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🔍</span>
        <h2 className="text-xl font-bold text-gray-800">Search Books to Rate</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm ?? ""}
              onChange={handleChange}
              placeholder="Search by book title or author name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10"
              aria-label="Search books"
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`font-medium px-5 rounded-lg transition-all duration-200 ${
              loading
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            onClick={onClearFilters}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}
