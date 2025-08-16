export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-8">
          {/* Footer Logo */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-sm shadow-sm">
              B
            </div>
            <span className="font-semibold text-sm">BookStore</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
