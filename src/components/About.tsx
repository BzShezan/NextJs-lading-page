"use client";
import type { AboutData } from "@/lib/types";
import { motion } from "framer-motion";
import { Award, Clock, Home, Users } from "lucide-react";
import Image from "next/image";

// Decorative stats stay hardcoded; story text and photo are editable.
const stats = [
  { icon: Home, value: "120+", label: "Projects Completed" },
  { icon: Users, value: "98%", label: "Happy Clients" },
  { icon: Clock, value: "10+", label: "Years of Experience" },
  { icon: Award, value: "15", label: "Design Awards" },
];

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Photo + story */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden"
        >
          <Image
            src={data.image || "/images/about.jpg"}
            alt="Our design studio at work"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-amber-700 text-sm uppercase tracking-widest font-medium">
            About Us
          </p>
          <h2 className="text-4xl font-bold mt-3 leading-snug">
            {data.heading}
          </h2>
          <p className="mt-6 text-stone-600 leading-relaxed">{data.body}</p>
          <a
            href="#contact"
            className="inline-block mt-8 bg-stone-900 text-white px-7 py-3 rounded-full font-medium hover:bg-amber-700 transition"
          >
            {data.cta ?? "Work With Us"}
          </a>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-lg transition"
          >
            <Icon className="mx-auto text-amber-700" size={32} />
            <p className="mt-4 text-3xl font-bold">{value}</p>
            <p className="mt-1 text-sm text-stone-500">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
