"use client";
import { supabaseBrowser } from "@/lib/supabase";
import type { TestimonialItem, TestimonialsData } from "@/lib/types";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import Field from "../_components/Field";
import SaveButton from "../_components/SaveButton";
import TextArea from "../_components/TextArea";

export default function TestimonialsAdmin() {
  const [data, setData] = useState<TestimonialsData | null>(null);

  useEffect(() => {
    supabaseBrowser()
      .from("site_content")
      .select("data")
      .eq("section", "testimonials")
      .single()
      .then(({ data }) =>
        setData((data?.data as TestimonialsData | null) ?? { items: [] }),
      );
  }, []);

  if (!data) return <p>Loading...</p>;

  const items = data.items ?? [];

  const updateItem = (
    i: number,
    field: keyof TestimonialItem,
    value: string,
  ) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setData({ ...data, items: next });
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold">Testimonials</h2>
      <p className="text-stone-500 mt-1">What your clients say about you.</p>

      <div className="mt-8 space-y-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Testimonial #{i + 1}</h3>
              <button
                onClick={() => {
                  const next = [...items];
                  next.splice(i, 1);
                  setData({ ...data, items: next });
                }}
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
            <TextArea
              label="Quote"
              rows={3}
              value={item.text ?? ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                updateItem(i, "text", e.target.value)
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Client name"
                value={item.name ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateItem(i, "name", e.target.value)
                }
              />
              <Field
                label="Role (e.g. Homeowner)"
                value={item.role ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateItem(i, "role", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setData({
            ...data,
            items: [...items, { text: "", name: "", role: "" }],
          })
        }
        className="mt-6 border border-stone-400 px-5 py-2 rounded-full text-sm hover:bg-stone-200 transition"
      >
        + Add Testimonial
      </button>

      <div className="mt-6">
        <SaveButton section="testimonials" data={data} />
      </div>
    </div>
  );
}
