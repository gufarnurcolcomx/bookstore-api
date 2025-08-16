export function PerPage({ perPage, onPerPageChange, pagination = {} }) {
  const shouldShow = !pagination?.total || pagination.total > 0

  return (
    <div className="mb-6 flex justify-end text-sm text-gray-600">
      <div className="mt-2 sm:mt-0 flex items-center gap-2">
        <span className="text-gray-700">Show:</span>
        <div className="relative">
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 cursor-pointer shadow-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <span className="text-gray-700">per page</span>
      </div>
    </div>
  )
}
