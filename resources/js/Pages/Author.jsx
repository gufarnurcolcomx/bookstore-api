import { useState, useEffect } from "react"
import axios from "axios" 
import { AuthorCard } from "@/Components/Author/AuthorCard"
import { AuthorStats } from "@/Components/Author/AuthorStats"
import AppLayout from "@/Layouts/AppLayout"

export default function Author() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/authors")
        setAuthors(response.data || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching authors:", err)
        setError("Failed to load authors. Please try again.")
        setAuthors([])
      } finally {
        setLoading(false)
      }
    }

    fetchAuthors()
  }, [])

  const safeAuthors = authors || []
  const totalAuthors = safeAuthors.length
  const totalRatings = safeAuthors.reduce((sum, author) => sum + (author.top_rating_voter_count || 0), 0)
  const topAuthor = safeAuthors[0] || null

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-red-800">Error Loading Authors</h3>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (safeAuthors.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="relative overflow-hidden bg-gradient-to-r from-white to-gray-50 border-b border-gray-200">
          <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">Top Authors</h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
                Discover the most celebrated authors based on highly-rated books and reader engagement
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No authors found</h3>
            <p className="mt-2 text-gray-500">There are no authors to display at the moment.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="relative overflow-hidden bg-gradient-to-r from-white to-gray-50 border-b border-gray-200">
            <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">Top Authors</h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
                Discover the most celebrated authors based on highly-rated books and reader engagement
                </p>
            </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AuthorStats totalAuthors={totalAuthors} totalRatings={totalRatings} topAuthor={topAuthor} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {safeAuthors.map((author, index) => (
                <AuthorCard key={author.id} author={author} rank={index + 1} />
            ))}
            </div>
        </div>
        </div>
    </AppLayout>
  )
}
