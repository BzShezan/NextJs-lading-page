export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 text-sm py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          © {new Date().getFullYear()} Atelier Interiors. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-amber-400">
            Instagram
          </a>
          <a href="#" className="hover:text-amber-400">
            Pinterest
          </a>
          <a href="#" className="hover:text-amber-400">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
