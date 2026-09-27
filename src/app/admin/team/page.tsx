"use client";
import { supabaseBrowser } from "@/lib/supabase";
import type { TeamData, TeamMember } from "@/lib/types";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import Field from "../_components/Field";
import SaveButton from "../_components/SaveButton";
import TextArea from "../_components/TextArea";

export default function TeamAdmin() {
  const [data, setData] = useState<TeamData | null>(null);

  useEffect(() => {
    supabaseBrowser()
      .from("site_content")
      .select("data")
      .eq("section", "team")
      .maybeSingle()
      .then(({ data }) =>
        setData(
          (data?.data as TeamData | null) ?? {
            heading: "Meet the Team",
            subheading: "Meet the people who lead our design and project delivery.",
            items: [],
          },
        ),
      );
  }, []);

  if (!data) return <p>Loading...</p>;
  const items = data.items ?? [];

  const updateItem = (i: number, field: keyof TeamMember, value: string) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setData({ ...data, items: next });
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold">Team Section</h2>
      <p className="text-stone-500 mt-1">
        Edit the team heading, members, photos, roles, and descriptions.
      </p>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <Field
          label="Heading"
          value={data.heading ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, heading: e.target.value })
          }
        />
        <TextArea
          label="Intro"
          rows={3}
          value={data.subheading ?? ""}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, subheading: e.target.value })
          }
        />
      </div>

      <div className="mt-6 space-y-6">
        {items.map((member, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Member #{i + 1}</h3>
              <button
                onClick={() =>
                  setData({ ...data, items: items.filter((_, x) => x !== i) })
                }
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name" value={member.name ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => updateItem(i, "name", e.target.value)} />
              <Field label="Role" value={member.role ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => updateItem(i, "role", e.target.value)} />
            </div>
            <Field label="Photo URL" value={member.image ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => updateItem(i, "image", e.target.value)} />
            <TextArea label="Description" rows={3} value={member.bio ?? ""} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateItem(i, "bio", e.target.value)} />
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setData({
            ...data,
            items: [...items, { name: "", role: "", bio: "", image: "" }],
          })
        }
        className="mt-6 border border-stone-400 px-5 py-2 rounded-full text-sm hover:bg-stone-200 transition"
      >
        + Add Team Member
      </button>

      <div className="mt-6">
        <SaveButton section="team" data={data} />
      </div>
      <p className="mt-2 text-xs text-stone-400">
        Demo members on the public site remain visible until you save your own team members here.
      </p>
    </div>
  );
}
