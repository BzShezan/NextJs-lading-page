"use client";
import { supabaseBrowser } from "@/lib/supabase";
import type { HeroData } from "@/lib/types";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import Field from "../_components/Field";
import SaveButton from "../_components/SaveButton";

export default function HeroAdmin() {
  const [data, setData] = useState<HeroData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabaseBrowser()
      .from("site_content")
      .select("data")
      .eq("section", "hero")
      .single()
      .then(({ data }) => setData((data?.data as HeroData | null) ?? {}));
  }, []);

  if (!data) return <p>Loading...</p>;

  const uploadImage = async () => {
    if (!file) return setMsg("⚠️ Choose an image first");
    setMsg("Uploading...");
    const path = `hero-${Date.now()}-${file.name}`;
    const { error } = await supabaseBrowser()
      .storage.from("images")
      .upload(path, file);
    if (error) return setMsg("❌ " + error.message);
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;
    setData({ ...data, image: url });
    setMsg("✅ Image uploaded — now click Save Changes!");
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold">Hero Section</h2>
      <p className="text-stone-500 mt-1">
        The big banner at the top of your homepage.
      </p>

      <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm space-y-5">
        <Field
          label="Main headline"
          value={data.title ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, title: e.target.value })
          }
        />
        <Field
          label="Subtitle (the smaller line below)"
          value={data.subtitle ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, subtitle: e.target.value })
          }
        />
        <Field
          label="First button text"
          value={data.cta1 ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, cta1: e.target.value })
          }
        />
        <Field
          label="Second button text"
          value={data.cta2 ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, cta2: e.target.value })
          }
        />

        {/* Background image */}
        <div className="pt-4 border-t border-stone-200">
          <p className="text-sm font-medium text-stone-600">Background image</p>
          {data.image && (
            <img
              src={data.image}
              alt="Hero background"
              className="mt-2 w-full h-40 object-cover rounded-lg"
            />
          )}
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-sm text-stone-500"
            />
            <button
              onClick={uploadImage}
              className="border border-stone-400 px-4 py-2 rounded-full text-sm hover:bg-stone-200 transition"
            >
              Upload New Image
            </button>
          </div>
          {msg && <p className="mt-2 text-sm text-stone-600">{msg}</p>}
        </div>
      </div>

      <div className="mt-6">
        <SaveButton section="hero" data={data} />
      </div>
    </div>
  );
}
