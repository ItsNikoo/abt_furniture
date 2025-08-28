import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/contacts", label: "Контакты" },
  { href: "/about", label: "О компании" },
  { href: "/howto", label: "Как совершить заказ" },
  { href: "/privacy-policy", label: "Политика конфиденциальности" },
];

export default function Footer() {
  return (
    <footer className="bg-mainPurple text-white mt-12">
      <div className="w-full mx-auto flex flex-col md:items-start justify-between px-4 py-6">
        {/* Навигация */}
        <nav className="flex flex-col md:flex-row gap-2 items-start md:items-start mb-4">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-notosans text-sm hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Контакты */}
        <div className="flex flex-col gap-2 items-start md:items-start text-sm font-notosans">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Балашиха, Железнодорожный, Керамическая, 2Б</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a
              href="tel:+79267232880"
              className="hover:underline"
            >
              +7 (926) 723-28-80
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a
              href="mailto:info@abt-mebel.ru"
              className="hover:underline"
            >
              info@kuhni-abt.ru
            </a>
          </div>
        </div>
      </div>
      <div className="text-xs text-white/70 font-notosans text-center py-2 border-t border-white/10">
        © {new Date().getFullYear()} АБТ Мебель
      </div>
    </footer>
  );
}