"use client";
import { supabaseBrowser } from "@/lib/supabase";
import type { ServiceItem, ServicesData } from "@/lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import Field from "../_components/Field";
import SaveButton from "../_components/SaveButton";

export default function ServicesAdmin() {
  const [data, setData] = useState<ServicesData | null>(null);

  useEffect(() => {
    supabaseBrowser()
      .from("site_content")
      .select("data")
      .eq("section", "services")
      .single()
      .then(({ data }) =>
        setData((data?.data as ServicesData | null) ?? { items: [] }),
      );
  }, []);

  if (!data) return <p>Loading...</p>;

  const items = data.items ?? [];

  const updateItem = (i: number, field: keyof ServiceItem, value: string) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setData({ ...data, items: next });
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold">Services</h2>
      <p className="text-stone-500 mt-1">
        The 4 boxes that explain what you do.
      </p>

      <div className="mt-8 space-y-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Service #{i + 1}</h3>
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
            <Field
              label="Title"
              value={item.title ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateItem(i, "title", e.target.value)
              }
            />
            <Field
              label="Description"
              value={item.desc ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateItem(i, "desc", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setData({ ...data, items: [...items, { title: "", desc: "" }] })
        }
        className="mt-6 border border-stone-400 px-5 py-2 rounded-full text-sm hover:bg-stone-200 transition"
      >
        + Add Service
      </button>

      <div className="mt-6">
        <SaveButton section="services" data={data} />
      </div>
    </div>
  );
}
