import { Navbar } from "@/components/Navbar/Navbar"
import { Footer } from "@/components/Footer/Footer"

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
