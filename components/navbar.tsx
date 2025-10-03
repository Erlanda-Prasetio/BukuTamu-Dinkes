"use client"

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { cn } from "@/lib/utils"

const navItems = [
  { name: "HOME", hasDropdown: false },
  {
    name: "PROFIL",
    hasDropdown: true,
    dropdownItems: [
      "Sambutan",
      "Struktur Organisasi",
      "Visi dan Misi",
      "Motto",
      "Maklumat Pelayanan",
      "Dashboard Sehat",
      "Dashboard Profil Kesehatan",
      "Penghargaan",
    ],
  },
  {
    name: "PELAYANAN",
    hasDropdown: true,
    dropdownItems: [
      "Pelayanan Verifikasi Perizinan Berusaha Fasilitas Kesehatan Melalui Sistem OSS-RBA",
      "Pelayanan Penerbitan Rekomendasi Surat Izin Apotek dan Surat Izin Toko Obat (SIA & SITO)",
      "Pelayanan Penerbitan Rekomendasi SIPA & SIPTTK",
      "Pelayanan Konsultasi, Pengawasan, Verifikasi Perizinan PIRT",
      "Pelayanan Perizinan Nakes Terpadu",
      "Pelayanan Permohonan Sertifikat Laik Sehat",
      "Pelayanan Call Center PSC 119",
    ],
  },
  { name: "BERITA & INFORMASI", hasDropdown: false },
  { name: "VIDEO", hasDropdown: false },
  {
    name: "DOWNLOAD",
    hasDropdown: true,
    dropdownItems: [
      "Formulir",
      "Profil Kesehatan",
      "Renstra",
      "Rencana Kerja",
      "Laporan Kinerja",
      "Perjanjian Kinerja",
      "Survei Kepuasan Masyarakat",
      "Media",
    ],
  },
  {
    name: "PPID",
    hasDropdown: true,
    dropdownItems: ["Struktur PPID", "Link PPID"],
  },
  { name: "KONTAK", hasDropdown: false },
  { name: "BUKU TAMU", hasDropdown: false },
]

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const shadowOpacity = Math.min(scrollY / 100, 1)
  const shadowStyle = {
    boxShadow: `0 2px 8px rgba(0, 0, 0, ${shadowOpacity * 0.1})`,
  }

  return (
    <nav className="sticky top-0 bg-white pt-6 pb-4 z-50 transition-shadow duration-300" style={shadowStyle}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <button className="w-52 h-52 relative zalando-sans cursor-pointer">
              <Image
                src="/logo.png"
                alt="Logo Dinas Kesehatan Kabupaten Tegal"
                fill
                className="object-contain"
              />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="hidden xl:flex items-center gap-5 ml-auto font-sans">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => setActiveItem(item.name)}
                  className="relative flex items-center gap-0.5 text-sm tracking-normal uppercase group pb-1"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  <span
                    className={cn(
                      "transition-colors duration-300 font-medium",
                      activeItem === item.name ? "text-black" : "text-gray-600 group-hover:text-black",
                    )}
                  >
                    {item.name}
                  </span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-colors duration-300",
                        activeItem === item.name ? "text-black" : "text-[#818181] group-hover:text-black",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-[2px] bg-[#08A2D6] transition-all duration-300 ease-out -translate-x-1/2",
                      activeItem === item.name
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                    )}
                  />
                </button>

                {item.hasDropdown && item.dropdownItems && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 bg-black text-white min-w-[320px] shadow-lg z-50 py-2">
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-6 py-4 text-sm transition-colors duration-200 border-b border-gray-800 last:border-b-0 group/item"
                        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                      >
                        <span className="group-hover/item:text-[#08A2D6] transition-colors duration-200">
                          {dropdownItem}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tablet View - Last 4 items in dropdown */}
          <div className="hidden lg:flex xl:hidden items-center gap-5 ml-auto font-sans">
            {navItems.slice(0, 5).map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => setActiveItem(item.name)}
                  className="relative flex items-center gap-0.5 text-sm tracking-normal uppercase group pb-1"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  <span
                    className={cn(
                      "transition-colors duration-300 font-medium",
                      activeItem === item.name ? "text-black" : "text-gray-600 group-hover:text-black",
                    )}
                  >
                    {item.name}
                  </span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-colors duration-300",
                        activeItem === item.name ? "text-black" : "text-[#818181] group-hover:text-black",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-[2px] bg-[#08A2D6] transition-all duration-300 ease-out -translate-x-1/2",
                      activeItem === item.name
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                    )}
                  />
                </button>

                {item.hasDropdown && item.dropdownItems && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 bg-black text-white min-w-[320px] shadow-lg z-50 py-2">
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-6 py-4 text-sm transition-colors duration-200 border-b border-gray-800 last:border-b-0 group/item"
                        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                      >
                        <span className="group-hover/item:text-[#08A2D6] transition-colors duration-200">
                          {dropdownItem}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* More dropdown for last 4 items */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('MORE')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="relative flex items-center gap-0.5 text-sm tracking-normal uppercase group pb-1"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span className="transition-colors duration-300 font-medium text-gray-600 group-hover:text-black">
                  MORE
                </span>
                <ChevronDown className="w-3 h-3 transition-colors duration-300 text-[#818181] group-hover:text-black" />
              </button>

              {openDropdown === 'MORE' && (
                <div className="absolute top-full right-0 mt-2 bg-black text-white min-w-[200px] shadow-lg z-50 py-2">
                  {navItems.slice(5).map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveItem(item.name)}
                      className="w-full text-left px-6 py-4 text-sm transition-colors duration-200 border-b border-gray-800 last:border-b-0 group/item"
                      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                    >
                      <span className="group-hover/item:text-[#08A2D6] transition-colors duration-200">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-auto p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => {
                      setActiveItem(item.name)
                      if (!item.hasDropdown) setMobileMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-sm tracking-normal uppercase font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {item.name}
                  </button>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="pl-8 bg-gray-50">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:text-[#08A2D6] transition-colors"
                          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                        >
                          {dropdownItem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
