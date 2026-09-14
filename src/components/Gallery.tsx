import type { GalleryData, GalleryItem } from "@/lib/types";
import Image from "next/image";

export default function Gallery({
  data,
  items,
}: {
  data: GalleryData;
  items: GalleryItem[];
}) {
  return (
    <section id="projects" className="py-24 bg-stone-100 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center">
          {data.heading ?? "Recent Projects"}
        </h2>
        <p className="text-center text-stone-500 mt-3">
          {data.subheading ?? ""}
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-14">
          {items.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={p.url}
                alt={p.title ?? "Project photo"}
                width={800}
                height={600}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                <div>
                  <p className="text-amber-400 text-xs uppercase tracking-widest">
                    {p.tag}
                  </p>
                  <h3 className="text-white text-xl font-semibold">
                    {p.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
