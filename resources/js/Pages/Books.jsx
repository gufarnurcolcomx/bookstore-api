"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BookCard } from "@/Components/Books/BookCard"
import { Search } from "@/Components/Books/Search"
import { Pagination } from "@/Components/Books/Pagination"
import { PerPage } from "@/Components/Books/PerPage"
import AppLayout from "@/Layouts/AppLayout"

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [voterCountFilter, setVoterCountFilter] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const [pagination, setPagination] = useState({})
  const [lastPage, setLastPage] = useState(1)

  const fetchBooks = async (page = currentPage, search = searchTerm, voterCount = voterCountFilter, itemsPerPage = perPage) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(itemsPerPage),
      })

      if (String(search).trim()) params.append("search", String(search).trim())
      if (String(voterCount).trim()) params.append("voter_count", String(voterCount).trim())

      const response = await axios.get(`/api/books?${params.toString()}`)

      setBooks(response.data?.data ?? [])

      if (response.data?.meta) {
        setPagination(response.data.meta)
        setLastPage(response.data.meta?.last_page ?? 1)
      } else {
        setPagination(response.data)
        setLastPage(response.data?.last_page ?? 1)
      }

      const serverCurrent = response.data?.meta?.current_page ?? response.data?.current_page
      if (serverCurrent && serverCurrent !== page) {
        setCurrentPage(Number(serverCurrent))
      }
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to load books. Please try again.")
      setBooks([])
      setPagination({})
      setLastPage(1)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks(currentPage, searchTerm, voterCountFilter, perPage)
  }, [currentPage, perPage])

  const handleSearch = () => {
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setVoterCountFilter("")
    setCurrentPage(1)
  }

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    if (page < 1) return
    if (lastPage && page > lastPage) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const safeBooks = books || []

  if (loading && safeBooks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="mt-4 text-lg font-medium text-red-800">Error Loading Books</h3>
              <p className="mt-2 text-red-600">{error}</p>
              <button
                onClick={() => fetchBooks(currentPage, searchTerm, voterCountFilter, perPage)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="relative overflow-hidden bg-gradient-to-r from-white to-gray-50 border-b border-gray-200">
          <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">Book Library</h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
                Discover amazing books with ratings and reviews from our community
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-6">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            voterCountFilter={voterCountFilter}
            setVoterCountFilter={setVoterCountFilter}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
            loading={loading}
          />

          <PerPage perPage={perPage} onPerPageChange={handlePerPageChange} pagination={pagination} />

          {safeBooks.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                <h3 className="mt-4 text-lg font-medium text-gray-900">No books found</h3>
                <p className="mt-2 text-gray-500">
                  {searchTerm || voterCountFilter ? "Try adjusting your search criteria or filters." : "There are no books to display at the moment."}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {safeBooks.map((book, index) => (
                <BookCard key={book.id} book={book} rank={(currentPage - 1) * perPage + index + 1} />
              ))}
            </div>
          )}

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              lastPage={pagination?.last_page ?? lastPage ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
