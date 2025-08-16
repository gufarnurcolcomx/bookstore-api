export function AuthorCard({ author, rank }) {
  if (!author) return null

  const { name = "Unknown Author", top_rating_voter_count = 0 } = author

  const isTopThree = rank <= 3
  const rankColors = {
    1: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white",
    2: "bg-gradient-to-br from-gray-300 to-gray-500 text-white",
    3: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
  }

  const rankIcons = {
    1: "👑",
    2: "🥈",
    3: "🥉",
  }

  return (
    <div
      className={`relative group transition-all duration-300 hover:scale-105 ${
        isTopThree ? "transform -translate-y-2" : ""
      }`}
    >
      <div
        className={`rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
          isTopThree
            ? "bg-white border-yellow-200 shadow-xl"
            : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl"
        }`}
      >
        <div
          className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isTopThree ? rankColors[rank] : "bg-gray-100 text-gray-600"
          }`}
        >
          {isTopThree ? rankIcons[rank] : `#${rank}`}
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">{name.charAt(0).toUpperCase()}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600">{top_rating_voter_count} highly rated books</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((top_rating_voter_count / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
