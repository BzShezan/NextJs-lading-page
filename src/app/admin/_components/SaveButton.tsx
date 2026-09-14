"use client";
import { supabaseBrowser } from "@/lib/supabase";
import { useState } from "react";

// <T> makes this component reusable for ANY section's data shape
export default function SaveButton<T>({
  section,
  data,
}: {
  section: string;
  data: T;
}) {
  const [status, setStatus] = useState("");

  const save = async () => {
    setStatus("Saving...");
    const { error } = await supabaseBrowser()
      .from("site_content")
      .upsert({ section, data, updated_at: new Date().toISOString() });
    setStatus(error ? "❌ Error: " + error.message : "✅ Saved!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={save}
        className="bg-amber-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-amber-600 transition"
      >
        Save Changes
      </button>
      {status && <span className="text-sm text-stone-600">{status}</span>}
    </div>
  );
}
