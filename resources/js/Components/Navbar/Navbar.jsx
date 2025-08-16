import { useState, useEffect, useRef } from "react"
import { Link } from "@inertiajs/react"
import { usePage } from "@inertiajs/react"

const navItems = [
  { name: "Author", href: "/page-authors" },
  { name: "Books", href: "/page-books" },
  { name: "Rating", href: "/page-ratings" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { url } = usePage()
  const drawerRef = useRef(null)
  const buttonRef = useRef(null)

  const isActive = (href) => url === href

  const handleNavigation = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    } else if (!isOpen && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu()
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        closeMenu()
      }
    }

    const handleClickOutside = (event) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("click", handleClickOutside)
      window.addEventListener("resize", handleResize)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen, isMounted])

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/page-authors"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-sm shadow-sm">
                B
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">BookStore</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-sm font-medium transition-all duration-200 hover:text-blue-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50 after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-600 after:rounded-full"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="http://localhost:8000/api/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  API Docs
                </a>
              </div>
            </div>

            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="md:hidden relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span
                  className={`block absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isMounted && (
        <div
          className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            ref={drawerRef}
            id="mobile-menu"
            className={`fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-xs shadow-sm">
                  B
                </div>
                <span id="mobile-menu-title" className="font-semibold text-gray-900">
                  BookStore
                </span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Close navigation menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col p-4 space-y-2 bg-white overflow-y-auto h-full">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">Navigation</div>
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`group relative text-base font-medium transition-all duration-200 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive(item.href) && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
                  Documentation
                </div>
                <a
                  href="http://localhost:8000/api/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavigation}
                  className="group relative text-base font-medium transition-all duration-200 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white bg-blue-600 hover:bg-blue-700 flex items-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="relative z-10">API Documentation</span>
                  <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
