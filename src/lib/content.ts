import { supabasePublic } from "./supabase";
import type { GalleryItem } from "./types";

// Generic: caller decides the shape, e.g. getContent<HeroData>("hero")
export async function getContent<T>(section: string): Promise<T> {
  const { data } = await supabasePublic
    .from("site_content")
    .select("data")
    .eq("section", section)
    .single();
  return (data?.data ?? {}) as T;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const { data } = await supabasePublic.from("gallery").select("*").order("id");
  return (data as GalleryItem[] | null) ?? [];
}
