"use client";
import { supabaseBrowser } from "@/lib/supabase";
import type { GalleryData, GalleryItem } from "@/lib/types";
import { ImagePlus, Trash2 } from "lucide-react";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Field from "../_components/Field";
import SaveButton from "../_components/SaveButton";

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [head, setHead] = useState<GalleryData | null>(null);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    supabaseBrowser()
      .from("gallery")
      .select("*")
      .order("id")
      .then(({ data }) => setItems((data as GalleryItem[] | null) ?? []));

  useEffect(() => {
    load();
    supabaseBrowser()
      .from("site_content")
      .select("data")
      .eq("section", "gallery")
      .single()
      .then(({ data }) => setHead((data?.data as GalleryData | null) ?? {}));
  }, []);

  // Step 1: open the file picker when the button is clicked
  const pickFile = () => fileRef.current?.click();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setMsg("");
    // show a local preview before anything is uploaded
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  // Step 2: upload + save only when the Save button is pressed
  const save = async () => {
    if (!file)
      return setMsg("⚠️ Click Upload Project to choose an image first");
    setMsg("Saving...");
    const path = `${Date.now()}-${file.name}`;
    const { error: upErr } = await supabaseBrowser()
      .storage.from("images")
      .upload(path, file);
    if (upErr) return setMsg("❌ " + upErr.message);

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;
    const { error: dbErr } = await supabaseBrowser()
      .from("gallery")
      .insert({ url, title, tag });
    if (dbErr) return setMsg("❌ " + dbErr.message);

    setMsg("✅ Saved!");
    setTitle("");
    setTag("");
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    load();
    setTimeout(() => setMsg(""), 3000);
  };

  const remove = async (item: GalleryItem) => {
    const fileName = item.url.split("/images/")[1];
    await supabaseBrowser().storage.from("images").remove([fileName]);
    await supabaseBrowser().from("gallery").delete().eq("id", item.id);
    load();
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold">Gallery Projects</h2>
      <p className="text-stone-500 mt-1">
        Upload new work or remove old projects.
      </p>

      {/* Section headings */}
      {head && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-semibold">Section headings</h3>
          <Field
            label="Heading"
            value={head.heading ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHead({ ...head, heading: e.target.value })
            }
          />
          <Field
            label="Subheading"
            value={head.subheading ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHead({ ...head, subheading: e.target.value })
            }
          />
          <SaveButton section="gallery" data={head} />
        </div>
      )}

      {/* Upload box: choose -> preview -> save */}
      <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm space-y-4">
        <h3 className="font-semibold">Add a new project</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Project title"
            placeholder="e.g. Modern Living Room"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Field
            label="Category"
            placeholder="e.g. Residential"
            value={tag}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTag(e.target.value)
            }
          />
        </div>

        {/* hidden real input; the button opens it */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />

        {preview && (
          <img
            src={preview}
            alt="Selected preview"
            className="w-full h-56 object-cover rounded-xl"
          />
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={pickFile}
            className="flex items-center gap-2 border border-stone-400 px-5 py-2.5 rounded-full text-sm hover:bg-stone-200 transition"
          >
            <ImagePlus size={16} />
            {file ? "Change Image" : "Upload Project"}
          </button>
          <button
            onClick={save}
            className="flex items-center gap-2 bg-amber-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-amber-600 transition"
          >
            Save Project
          </button>
        </div>
        {msg && <p className="text-sm text-stone-600">{msg}</p>}
      </div>

      {/* Existing projects */}
      <div className="mt-8 grid sm:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt={item.title ?? "Gallery image"}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-stone-400">{item.tag}</p>
              <button
                onClick={() => remove(item)}
                className="mt-3 flex items-center gap-1.5 text-red-600 text-sm hover:underline"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
