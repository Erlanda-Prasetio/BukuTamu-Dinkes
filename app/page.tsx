import Navbar from "@/components/navbar"
import { BookOpen, Mail, MapPin, Phone, ChevronRight, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col items-center gap-4 mb-8">
          <button className="text-gray-500 hover:text-black transition-colors duration-300">
            <Search className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-2 text-sm">
            <a href="#" className="text-[#08A2D6] hover:underline">
              HOME
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">BUKU TAMU</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">BUKU TAMU</h1>

        <div className="bg-white">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-[#08A2D6]" />
            <h1 className="text-3xl font-bold text-gray-800">Buku Tamu</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Silakan isi formulir di bawah ini untuk meninggalkan pesan atau pertanyaan Anda.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all"
                  placeholder="08xx xxxx xxxx"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subjek *
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all"
                  placeholder="Topik pesan"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Pesan *
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tulis pesan atau pertanyaan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-[#08A2D6] text-white font-medium rounded-md hover:bg-[#0792c0] transition-colors duration-300"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
