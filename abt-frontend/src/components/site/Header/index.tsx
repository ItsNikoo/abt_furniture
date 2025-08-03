'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, MapPin } from "lucide-react"
import ContentWrapper from "@/components/ContentWrapper"
import MainOrderContainer from "@/components/site/Orders/MainOrderContainer"
import ServiceButton from "@/components/ui/ServiceButton"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Add state to ensure consistent rendering
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side rendering consistency
  useEffect(() => {
    setIsClient(true)
  }, [])

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

  // Define nav className to ensure consistency
  const navClassName = "flex flex-wrap gap-4 py-4 border-y"

  return (
    <ContentWrapper>
      <div>
        {/* Desktop Header (lg: ≥1024px) */}
        <div className="hidden lg:flex flex-row items-center justify-between max-w-[1400px] mx-auto py-3 gap-4">
          <Link href="/" className="flex-shrink-0 w-[300px] p-2">
            <Image
              src="/logo.png"
              alt="АБТ - мебель для кухни"
              width={300}
              height={80}
              className="w-auto h-14"
            />
          </Link>

          <div className="flex-1 flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="font-notosans">Балашиха, Железнодорожный, Керамическая, 2Б</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="font-notosans">+7 (926) 723-28-80</span>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <MainOrderContainer />
          </div>
        </div>

        {/* Desktop Navigation (lg: ≥1024px) */}
        {isClient && (
          <nav className="hidden lg:flex flex-row gap-4 py-4 border-y max-w-[1400px] mx-auto">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-notosans"
              >
                {link.label}
              </Link>
            ))}
            <ServiceButton />
          </nav>
        )}

        {/* Tablet Header (md: 768px–1023px) */}
        <div className="hidden md:flex lg:hidden flex-col">
          {/* Top row: Logo and Button */}
          <div className="flex items-center justify-between py-3 gap-2">
            <Link href="/" className="flex-shrink-0 w-[300px] p-2">
              <Image
                src="/logo.png"
                alt="АБТ - мебель для кухни"
                width={300}
                height={80}
                className="w-auto h-14"
              />
            </Link>
            <div className="flex items-center gap-3 min-w-0">
              <MainOrderContainer />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-row gap-6 text-sm text-gray-600 pb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="font-notosans">Балашиха, Железнодорожный, Керамическая, 2Б</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="font-notosans">+7 (926) 723-28-80</span>
            </div>
          </div>

          {/* Navigation */}
          {isClient && (
            <nav className={navClassName}>
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-notosans"
                >
                  {link.label}
                </Link>
              ))}
              <ServiceButton />
            </nav>
          )}
        </div>

        {/* Mobile Header (sm: <768px) */}
        <div className="md:hidden">
          {/* Top row with logo and menu button */}
          <div className="flex items-center justify-between py-3 gap-2">
            <Link href="/" className="flex-shrink-0 w-[250px] p-2">
              <Image
                src="/logo.png"
                alt="АБТ - мебель для кухни"
                width={250}
                height={70}
                className="w-auto h-12"
              />
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-4 py-2">
                {/* Contact info in mobile menu */}
                <div className="flex flex-col gap-2 text-xs text-gray-600 py-3 border-b">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="font-notosans">Балашиха, Железнодорожный, Керамическая, 2Б</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    <span className="font-notosans">+7 (926) 723-28-80</span>
                  </div>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col py-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-2 border-b border-gray-100 last:border-b-0 font-notosans"
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