export function RatingPerPage({ perPage, onPerPageChange, pagination }) {
  const options = [10, 25, 50, 100]

  return (
    <div className="mb-6 flex justify-end text-sm text-gray-600">
      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="perPage" className="text-sm font-medium text-gray-700">
          Show:
        </label>
        <div className="relative">
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="text-sm text-gray-600">per page</span>
      </div>
    </div>
  )
}