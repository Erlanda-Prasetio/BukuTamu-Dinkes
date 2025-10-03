"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { BookOpen, Mail, MapPin, Phone, ChevronRight, Search, Calendar, Users } from "lucide-react"

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [visitStats, setVisitStats] = useState<{
    totalVisits: number
    filteredVisits: number
    earliestDate: string | null
    availableDates: string[]
  }>({ totalVisits: 0, filteredVisits: 0, earliestDate: null, availableDates: [] })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  // Fetch visit statistics
  const fetchVisitStats = async (date?: string) => {
    setIsLoadingStats(true)
    try {
      const url = date 
        ? `/api/visit-recap?date=${date}`
        : '/api/visit-recap'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setVisitStats(data)
        setAvailableDates(data.availableDates || [])
      }
    } catch (error) {
      console.error('Error fetching visit stats:', error)
    } finally {
      setIsLoadingStats(false)
    }
  }

  useEffect(() => {
    fetchVisitStats(new Date().toISOString().split('T')[0])
  }, [])

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    fetchVisitStats(date)
    setShowDatePicker(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      institution: formData.get('institution') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/submit-guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Terjadi kesalahan. Silakan coba lagi.',
        })
        return
      }

      const result = await response.json()
      
      setSubmitStatus({
        type: 'success',
        message: 'Terima kasih! Pesan Anda telah berhasil dikirim.',
      })
      
      // Reset form after successful submission
      form.reset()

      // Refresh stats after successful submission
      fetchVisitStats(selectedDate || undefined)

      // Clear success message after 6 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 6000)
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan koneksi. Silakan coba lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 py-2">
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

          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-md ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
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
                  name="email"
                  required
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
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all"
                  placeholder="08xx xxxx xxxx"
                />
              </div>

              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Instansi *
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all"
                  placeholder="Nama instansi/organisasi"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subjek *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all"
                placeholder="Topik pesan"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Pesan *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tulis pesan atau pertanyaan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-[#08A2D6] text-white font-medium rounded-md hover:bg-[#0792c0] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>

          {/* Recap Kunjungan Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Rekap Kunjungan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Selector Panel */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-[#08A2D6]" />
                  <h3 className="text-lg font-semibold text-gray-800">Filter Tanggal</h3>
                </div>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#08A2D6] rounded-lg focus:ring-2 focus:ring-[#08A2D6] focus:border-transparent outline-none transition-all text-left font-medium text-gray-700 hover:border-[#0792c0] flex items-center justify-between"
                  >
                    <span>
                      {selectedDate 
                        ? new Date(selectedDate).toLocaleDateString('id-ID', { 
                            weekday: 'long',
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })
                        : 'Pilih Tanggal'}
                    </span>
                    <ChevronRight className={`w-5 h-5 text-[#08A2D6] transition-transform ${showDatePicker ? 'rotate-90' : ''}`} />
                  </button>

                  {showDatePicker && (
                    <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl border-2 border-[#08A2D6] max-h-64 overflow-y-auto">
                      {availableDates.length > 0 ? (
                        availableDates.map((date) => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => handleDateChange(date)}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                              selectedDate === date ? 'bg-blue-100 font-bold text-[#08A2D6]' : 'text-gray-700'
                            }`}
                          >
                            {new Date(date).toLocaleDateString('id-ID', { 
                              weekday: 'long',
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">
                          Tidak ada data kunjungan
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {selectedDate && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDate(new Date().toISOString().split('T')[0])
                      fetchVisitStats(new Date().toISOString().split('T')[0])
                      setShowDatePicker(false)
                    }}
                    className="mt-3 text-sm text-[#08A2D6] hover:underline font-medium"
                  >
                    ✕ Reset ke hari ini
                  </button>
                )}
              </div>

              {/* Total Visits Panel */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Total Kunjungan</h3>
                </div>
                {isLoadingStats ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                ) : (
                  <div>
                    <p className="text-5xl font-bold text-green-600 mb-2">
                      {visitStats.filteredVisits}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedDate 
                        ? `Kunjungan pada ${new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`
                        : `Total kunjungan sejak ${visitStats.earliestDate ? new Date(visitStats.earliestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'awal'}`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="py-8"></div>
    </div>
  )
}
