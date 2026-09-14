"use client";
import { supabaseBrowser } from "@/lib/supabase";
import type { ContactData } from "@/lib/types";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import Field from "../_components/Field";
import SaveButton from "../_components/SaveButton";
import TextArea from "../_components/TextArea";

export default function ContactAdmin() {
  const [data, setData] = useState<ContactData | null>(null);

  useEffect(() => {
    supabaseBrowser()
      .from("site_content")
      .select("data")
      .eq("section", "contact")
      .single()
      .then(({ data }) => setData((data?.data as ContactData | null) ?? {}));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold">Contact Section</h2>
      <p className="text-stone-500 mt-1">
        The form at the bottom of the homepage.
      </p>

      <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm space-y-5">
        <Field
          label="Heading"
          value={data.heading ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, heading: e.target.value })
          }
        />
        <TextArea
          label="Text under the heading"
          rows={2}
          value={data.subtext ?? ""}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, subtext: e.target.value })
          }
        />
        <Field
          label="Formspree Form ID (from formspree.io — the part after /f/)"
          value={data.formspreeId ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, formspreeId: e.target.value })
          }
        />
      </div>

      <div className="mt-6">
        <SaveButton section="contact" data={data} />
      </div>
    </div>
  );
}
