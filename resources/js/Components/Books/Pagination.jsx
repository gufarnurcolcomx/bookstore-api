export function Pagination({ currentPage, lastPage, onPageChange }) {
  const safeLast = lastPage || 1
  const safeCurrent = currentPage || 1

  if (safeLast <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 flex-wrap">
      <button
        onClick={() => onPageChange(safeCurrent - 1)}
        disabled={safeCurrent <= 1}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium
          ring-offset-white transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white
          hover:bg-gray-50 hover:text-gray-900 h-9 px-3"
      >
        <span className="mr-1">←</span>
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="hidden sm:flex items-center space-x-1">
        {Array.from({ length: Math.min(5, safeLast) }, (_, i) => {
          let pageNum
          if (safeLast <= 5) {
            pageNum = i + 1
          } else if (safeCurrent <= 3) {
            pageNum = i + 1
          } else if (safeCurrent >= safeLast - 2) {
            pageNum = safeLast - 4 + i
          } else {
            pageNum = safeCurrent - 2 + i
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium
                ring-offset-white transition-colors focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                disabled:pointer-events-none disabled:opacity-50 h-9 w-10 ${
                  safeCurrent === pageNum
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <span className="sm:hidden text-sm text-gray-700">
        Page {safeCurrent} of {safeLast}
      </span>

      <button
        onClick={() => onPageChange(safeCurrent + 1)}
        disabled={safeCurrent >= safeLast}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium
          ring-offset-white transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white
          hover:bg-gray-50 hover:text-gray-900 h-9 px-3"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="ml-1">→</span>
      </button>
    </div>
  )
}
