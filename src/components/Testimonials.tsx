import type { TestimonialsData } from "@/lib/types";

export default function Testimonials({ data }: { data: TestimonialsData }) {
  const items = data.items ?? [];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center">
        {data.heading ?? "Client Love"}
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mt-14">
        {items.map((q, i) => (
          <blockquote
            key={i}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100"
          >
            <p className="text-stone-600 leading-relaxed">
              &ldquo;{q.text}&rdquo;
            </p>
            <footer className="mt-5 font-semibold">
              {q.name}
              <span className="block text-sm font-normal text-stone-400">
                {q.role}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
