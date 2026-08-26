'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Menu, Phone, X } from 'lucide-react'
import ServiceButton from '@/components/ui/ServiceButton'
import { Button } from '@/components/ui/button'
import {ROUTES} from "@/config/navigation"
import SiteContainer from "@/components/SiteContainer"
import MainOrderForm from '@/components/shared/Forms/MainOrderForm'

type TrackedPhoneLinkProps = {
  href: string
  children: React.ReactNode
}

function TrackedPhoneLink({href, children}: TrackedPhoneLinkProps) {
  const handleClick = () => {
    if (window.ym) {
      window.ym(106436886, 'reachGoal', 'phone_click')
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="font-notosans transition-colors hover:text-mainPurple focus-visible:outline-none focus-visible:underline"
    >
      {children}
    </a>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Define nav className to ensure consistency
  const navClassName = 'flex flex-wrap gap-4 py-4 border-y'

  return (
    <header className="relative z-50 bg-white">
      <SiteContainer>
        <div>
          {/* Desktop Header (lg: ≥1024px) */}
          <div
            className="hidden lg:flex flex-row items-center justify-between max-w-[1400px] mx-auto gap-4">
            <Link href="/" className="flex-shrink-0 w-[250px] p-5">
              <Image
                src="/logo.png"
                alt="АБТ - мебель для кухни"
                width={300}
                height={80}
                className="w-auto"
              />
            </Link>

            <div className="flex-1 flex flex-col gap-1 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0"/>
                  <span className="font-notosans">Балашиха, Железнодорожный, Керамическая, 2Б</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0"/>
                  <TrackedPhoneLink href="tel:+79267232880">+7 (926) 723-28-80</TrackedPhoneLink>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0"/>
                  <span className="font-notosans">Москва, Каширское шоссе, д.5, корп.1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0"/>
                  <TrackedPhoneLink href="tel:+79197626655">+7 (919) 762-66-55</TrackedPhoneLink>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <MainOrderForm/>
            </div>
          </div>

          {/* Desktop Navigation (lg: ≥1024px) */}
          <nav className="hidden lg:flex flex-row gap-4 py-4 border-y max-w-[1400px] mx-auto">
            {Object.values(ROUTES).map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="font-notosans"
              >
                {link.name}
              </Link>
            ))}
            <ServiceButton/>
          </nav>

          {/* Tablet Header (md: 768px–1023px) */}
          <div className="hidden md:flex lg:hidden flex-col">
            {/* Top row: Logo and Button */}
            <div className="flex items-center justify-between py-3 gap-2">
              <Link href="/" className="flex-shrink-0 w-[250px] p-2">
                <Image
                  src="/logo.png"
                  alt="АБТ - мебель для кухни"
                  width={300}
                  height={80}
                  priority
                  className="w-auto"
                />
              </Link>
              <div className="flex items-center gap-3 min-w-0">
                <MainOrderForm/>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-1 text-sm text-gray-600 pb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0"/>
                  <span className="font-notosans">Балашиха, Железнодорожный, Керамическая, 2Б</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0"/>
                  <TrackedPhoneLink href="tel:+79267232880">+7 (926) 723-28-80</TrackedPhoneLink>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0"/>
                  <span className="font-notosans">Москва, Каширское шоссе, д.5, корп.1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0"/>
                  <TrackedPhoneLink href="tel:+79197626655">+7 (919) 762-66-55</TrackedPhoneLink>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className={navClassName}>
              {Object.values(ROUTES).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="font-notosans"
                >
                  {link.name}
                </Link>
              ))}
              <ServiceButton/>
            </nav>
          </div>

          {/* Mobile Header (sm: <768px) */}
          <div className="md:hidden">
            {/* Top row with logo and menu button */}
            <div className="flex items-center justify-between py-3 gap-2">
              <Link href="/" className="flex-shrink-0 w-[200px] p-2">
                <Image
                  src="/logo.png"
                  alt="АБТ - мебель для кухни"
                  width={250}
                  height={70}
                  className="w-auto"
                />
              </Link>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                  {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </Button>
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-4 py-2">
                  {/* Contact info in mobile menu */}
                  <div className="flex flex-col gap-1 text-xs text-gray-600 py-3 border-b">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 flex-shrink-0"/>
                      <span className="font-notosans">Балашиха, Железнодорожный, Керамическая, 2Б</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 flex-shrink-0"/>
                      <TrackedPhoneLink href="tel:+79267232880">+7 (926) 723-28-80</TrackedPhoneLink>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 flex-shrink-0"/>
                      <span className="font-notosans">Москва, Каширское шоссе, д.5, корп.1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 flex-shrink-0"/>
                      <TrackedPhoneLink href="tel:+79197626655">+7 (919) 762-66-55</TrackedPhoneLink>
                    </div>
                  </div>

                  {/* Navigation links */}
                  <nav className="flex flex-col py-2">
                    {Object.values(ROUTES).map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className="py-2 border-b border-gray-100 last:border-b-0 font-notosans"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="py-3 border-b border-gray-100">
                      <ServiceButton onNavigate={() => setIsMenuOpen(false)}/>
                    </div>
                  </nav>

                  {/* Order button in mobile menu */}
                  <div className="py-4">
                    <MainOrderForm/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SiteContainer>
    </header>
  )
}
