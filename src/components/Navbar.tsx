"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = ["Services", "Projects", "About", "Team", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-stone-50/80 backdrop-blur z-50 border-b border-stone-200">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="text-2xl font-bold tracking-tight">
          Atelier<span className="text-amber-700">.</span>
        </a>
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="hover:text-amber-700 transition"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-block bg-stone-900 text-white px-5 py-2 rounded-full text-sm hover:bg-amber-700 transition"
        >
          Book Consultation
        </a>
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
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
