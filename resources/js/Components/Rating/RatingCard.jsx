import { useState } from "react"
import axios from "axios"

export function RatingCard({ book, onRatingSubmit }) {
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasRated, setHasRated] = useState(false)

  const handleRatingSubmit = async () => {
    if (selectedRating === 0) return

    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/ratings", {
        book_id: book.id,
        score: selectedRating,
      })

      if (response.status === 200) {
        setHasRated(true)
        onRatingSubmit && onRatingSubmit(book.id, selectedRating)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 10 }, (_, index) => {
      const starValue = index + 1
      const isActive = starValue <= (hoveredRating || selectedRating)

      return (
        <button
          key={starValue}
          type="button"
          className={`text-2xl transition-all duration-200 ${
            isActive ? "text-yellow-400 scale-110" : "text-gray-300 hover:text-yellow-300"
          } ${hasRated ? "cursor-not-allowed" : "cursor-pointer hover:scale-105"}`}
          onClick={() => !hasRated && setSelectedRating(starValue)}
          onMouseEnter={() => !hasRated && setHoveredRating(starValue)}
          onMouseLeave={() => !hasRated && setHoveredRating(0)}
          disabled={hasRated || isSubmitting}
        >
          ★
        </button>
      )
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 flex items-center gap-2">
          <span className="text-blue-600">✍️</span>
          <span className="font-medium">{book.author?.name || "Unknown Author"}</span>
        </p>
      </div>

      <div className="border-t pt-4">
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {hasRated ? "Your Rating:" : "Rate this book (1-10):"}
          </p>
          <div className="flex gap-1 mb-3">{renderStars()}</div>
          {selectedRating > 0 && !hasRated && <p className="text-sm text-gray-600">Selected: {selectedRating}/10</p>}
        </div>

        {!hasRated && (
          <button
            onClick={handleRatingSubmit}
            disabled={selectedRating === 0 || isSubmitting}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              selectedRating === 0 || isSubmitting
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </button>
        )}

        {hasRated && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-green-700 font-medium">✅ Rating submitted successfully!</p>
            <p className="text-green-600 text-sm">You rated this book {selectedRating}/10</p>
          </div>
        )}
      </div>
    </div>
  )
}
