export function BookCard({ book, rank }) {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-900 transition-colors duration-200">
              {book.title}
            </h3>

            <div className="space-y-3 mt-3">
              <p className="text-sm text-gray-600">
                by{" "}
                <span className="font-semibold text-gray-800 group-hover:text-blue-800 transition-colors">
                  {book.author?.name || "Unknown Author"}
                </span>
              </p>

              {book.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all duration-200">
                  📚 {book.category.name}
                </span>
              )}
            </div>
          </div>

          {rank && (
            <div className="flex-shrink-0 ml-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-200">
                #{rank}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <span className="text-yellow-500 text-base">⭐</span>
              <span className="text-sm font-bold text-gray-900">
                {book.average_rating ? Number(book.average_rating).toFixed(1) : "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
            <span className="text-blue-500 text-sm">👥</span>
            <span className="text-xs font-medium">{book.voter_count || 0} reviews</span>
          </div>
        </div>
      </div>
    </div>
  )
}
