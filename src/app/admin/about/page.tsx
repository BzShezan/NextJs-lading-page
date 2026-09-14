"use client";
import { supabaseBrowser } from "@/lib/supabase";
import type { AboutData } from "@/lib/types";
import { ImagePlus } from "lucide-react";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Field from "../_components/Field";
import SaveButton from "../_components/SaveButton";
import TextArea from "../_components/TextArea";

export default function AboutAdmin() {
  const [data, setData] = useState<AboutData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabaseBrowser()
      .from("site_content")
      .select("data")
      .eq("section", "about")
      .single()
      .then(({ data }) => setData((data?.data as AboutData | null) ?? {}));
  }, []);

  if (!data) return <p>Loading...</p>;

  const pickFile = () => fileRef.current?.click();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setMsg("");
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  // Uploads the chosen image and saves it into the about section data
  const saveImage = async () => {
    if (!file) return setMsg("⚠️ Click Choose Image first");
    setMsg("Saving image...");
    const path = `about-${Date.now()}-${file.name}`;
    const { error: upErr } = await supabaseBrowser()
      .storage.from("images")
      .upload(path, file);
    if (upErr) return setMsg("❌ " + upErr.message);

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;
    const { error: dbErr } = await supabaseBrowser()
      .from("site_content")
      .upsert({
        section: "about",
        data: { ...data, image: url },
        updated_at: new Date().toISOString(),
      });
    if (dbErr) return setMsg("❌ " + dbErr.message);

    setData({ ...data, image: url });
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setMsg("✅ Image saved!");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold">About Section</h2>
      <p className="text-stone-500 mt-1">
        Your company story, photo, and stats.
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
          label="Main paragraph"
          rows={5}
          value={data.body ?? ""}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, body: e.target.value })
          }
        />
        <Field
          label="Button text"
          value={data.cta ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, cta: e.target.value })
          }
        />

        {/* Section image: choose -> preview -> save */}
        <div className="pt-4 border-t border-stone-200 space-y-3">
          <p className="text-sm font-medium text-stone-600">
            Section image (shows on the left side of the About section)
          </p>
          {(preview || data.image) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview ?? data.image ?? ""}
              alt="About section"
              className="w-full h-48 object-cover rounded-xl"
            />
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={pickFile}
              className="flex items-center gap-2 border border-stone-400 px-5 py-2.5 rounded-full text-sm hover:bg-stone-200 transition"
            >
              <ImagePlus size={16} />
              {file ? "Change Image" : "Choose Image"}
            </button>
            <button
              onClick={saveImage}
              className="bg-amber-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-amber-600 transition"
            >
              Save Image
            </button>
          </div>
          {msg && <p className="text-sm text-stone-600">{msg}</p>}
        </div>
      </div>

      <div className="mt-6">
        <SaveButton section="about" data={data} />
      </div>
      <p className="mt-2 text-xs text-stone-400">
        Tip: text fields use the orange Save Changes button; the image has its
        own Save Image button.
      </p>
    </div>
  );
}
