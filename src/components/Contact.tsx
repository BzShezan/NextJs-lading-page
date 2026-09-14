import type { ContactData } from "@/lib/types";

export default function Contact({ data }: { data: ContactData }) {
  return (
    <section id="contact" className="py-24 bg-stone-900 text-white px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold">{data.heading}</h2>
        <p className="text-stone-400 mt-3">{data.subtext}</p>
        <form
          action={`https://formspree.io/f/${data.formspreeId}`}
          method="POST"
          className="mt-10 grid gap-4 text-left"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              name="name"
              placeholder="Your name"
              className="bg-stone-800 rounded-lg px-4 py-3 placeholder-stone-500 outline-none focus:ring-2 ring-amber-700"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="bg-stone-800 rounded-lg px-4 py-3 placeholder-stone-500 outline-none focus:ring-2 ring-amber-700"
            />
          </div>
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Tell us about your project..."
            className="bg-stone-800 rounded-lg px-4 py-3 placeholder-stone-500 outline-none focus:ring-2 ring-amber-700"
          />
          <button className="bg-amber-700 hover:bg-amber-600 rounded-full py-3 font-medium transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
