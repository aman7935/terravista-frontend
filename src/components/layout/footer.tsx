import Link from "next/link"
import { Building2 } from "lucide-react"

const footerLinks = [
  {
    title: "Properties",
    links: [
      { label: "All Listings", href: "/properties" },
      { label: "For Sale", href: "/properties?sale" },
      { label: "For Rent", href: "/properties?rent" },
      { label: "New Developments", href: "/properties" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Market Reports", href: "#" },
      { label: "Buying Guide", href: "#" },
      { label: "Selling Guide", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-background to-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent">
                TerraVista
              </span>
            </Link>
            <p className="text-sm text-foreground/50 max-w-xs">
              AI-powered real estate intelligence. Finding your perfect property has never been smarter.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} TerraVista. All rights reserved.
          </p>
          <p className="text-xs text-foreground/30">
            Powered by AI — Designed for you.
          </p>
        </div>
      </div>
    </footer>
  )
}
