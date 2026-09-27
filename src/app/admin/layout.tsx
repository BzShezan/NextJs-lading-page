import { Home, Image as ImageIcon, LogOut, Type, Users } from "lucide-react";
import Link from "next/link";

const menu = [
  { href: "/admin/hero", label: "Hero (main banner)", icon: Type },
  { href: "/admin/services", label: "Services", icon: Type },
  { href: "/admin/gallery", label: "Gallery Projects", icon: ImageIcon },
  { href: "/admin/about", label: "About Section", icon: Type },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: Type },
  { href: "/admin/contact", label: "Contact Section", icon: Type },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-stone-100">
      <aside className="w-64 bg-stone-900 text-stone-300 p-5 flex flex-col">
        <h1 className="text-xl font-bold text-white">Atelier Admin</h1>
        <nav className="mt-8 flex flex-col gap-1 text-sm">
          {menu.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-800 hover:text-white transition"
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1 text-sm">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-800 hover:text-white"
          >
            <Home size={16} /> View Website
          </Link>
          <form action="/admin/logout" method="post">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-800 hover:text-white w-full">
              <LogOut size={16} /> Logout
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
