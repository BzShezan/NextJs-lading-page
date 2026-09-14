import type { ServicesData } from "@/lib/types";
import { Building2, Lightbulb, Ruler, Sofa } from "lucide-react";

// Icons stay hardcoded; they cycle in order as services are added/edited.
const icons = [Sofa, Building2, Ruler, Lightbulb];

export default function Services({ data }: { data: ServicesData }) {
  const items = data.items ?? [];

  return (
    <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center">
        {data.heading ?? "What We Do"}
      </h2>
      <p className="text-center text-stone-500 mt-3">{data.subheading ?? ""}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <Icon className="text-amber-700" size={36} />
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
