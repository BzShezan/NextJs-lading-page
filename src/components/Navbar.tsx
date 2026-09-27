"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = ["Services", "Projects", "About", "Team", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const goToSection = (id: string) => {
    setOpen(false);
    const section = document.getElementById(id);
    if (!section) return;

    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height ?? 72;
    const sectionHeight = section.getBoundingClientRect().height;
    const viewportHeight = window.innerHeight;

    // Center short sections in the visible area. For long sections, show the
    // section from the top so users get the most useful full-section view.
    const visibleHeight = viewportHeight - headerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const target =
      sectionHeight <= visibleHeight
        ? sectionTop - headerHeight - (visibleHeight - sectionHeight) / 2
        : sectionTop - headerHeight;

    window.scrollTo({
      top: Math.max(0, target),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <header className="fixed top-0 w-full bg-stone-50/80 backdrop-blur z-50 border-b border-stone-200">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold tracking-tight"
        >
          Atelier<span className="text-amber-700">.</span>
        </button>

        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((label) => {
            const id = label.toLowerCase();
            return (
              <li key={label}>
                <button
                  onClick={() => goToSection(id)}
                  className="hover:text-amber-700 transition"
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => goToSection("contact")}
          className="hidden md:inline-block bg-stone-900 text-white px-5 py-2 rounded-full text-sm hover:bg-amber-700 transition"
        >
          Book Consultation
        </button>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm">
          {links.map((label) => {
            const id = label.toLowerCase();
            return (
              <li key={label}>
                <button
                  onClick={() => goToSection(id)}
                  className="w-full text-left"
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
