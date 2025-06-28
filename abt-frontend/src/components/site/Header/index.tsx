"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, MapPin } from "lucide-react"
import ContentWrapper from "@/components/ContentWrapper"
import MainOrderContainer from "@/components/site/Orders/MainOrderContainer"
import ServiceButton from "@/components/ui/ServiceButton"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigationLinks = [
    { href: "/", label: "Главная" },
    { href: "/catalog", label: "Каталог" },
    { href: "/contacts", label: "Контакты" },
    { href: "/about", label: "О компании" },
    { href: "/howto", label: "Как совершить заказ" },
  ]

  return (
    <ContentWrapper>
      <div className="mt-4 md:mt-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex flex-row w-full items-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="АБТ - мебель для кухни"
              width={350}
              height={100}
              className="w-auto h-16 xl:h-20"
            />
          </Link>

          <div className="flex-1 flex flex-col justify-between my-3 ml-6">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Балашиха, Железнодорожный, Керамическая, 2Б</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>+7 (926) 723-28-80</span>
              </div>
            </div>

            <nav className="flex flex-row gap-6 xl:gap-8 items-center">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-semibold text-sm xl:text-base hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
              <ServiceButton />
            </nav>
          </div>

          <div className="flex items-center justify-center ml-4">
            <MainOrderContainer />
          </div>
        </div>

        {/* Mobile/Tablet Header */}
        <div className="lg:hidden">
          {/* Top row with logo and menu button */}
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="АБТ - мебель для кухни"
                width={250}
                height={70}
                className="w-auto h-12 md:h-14"
              />
            </Link>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <MainOrderContainer />
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden" aria-label="Toggle menu">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Contact info row */}
          <div className="hidden md:flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs sm:text-sm text-gray-600 pb-4 border-b">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Балашиха, Железнодорожный, Керамическая, 2Б</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>+7 (926) 723-28-80</span>
            </div>
          </div>

          {/* Desktop-style navigation for tablets */}
          <nav className="hidden md:flex lg:hidden flex-wrap gap-4 py-4 border-b">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold hover:text-black"
              >
                {link.label}
              </Link>
            ))}
            <ServiceButton />
          </nav>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-4 py-2">
                {/* Contact info in mobile menu */}
                <div className="flex flex-col gap-2 text-xs text-gray-600 py-3 border-b">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>Балашиха, Железнодорожный, Керамическая, 2Б</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    <span>+7 (926) 723-28-80</span>
                  </div>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col py-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-semibold py-3 border-b border-gray-100 last:border-b-0 hover:text-black"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="py-3 border-b border-gray-100">
                    <ServiceButton />
                  </div>
                </nav>

                {/* Order button in mobile menu */}
                <div className="py-4">
                  <MainOrderContainer />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ContentWrapper>
  )
}
