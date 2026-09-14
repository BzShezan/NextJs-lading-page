import { supabaseBrowser } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function POST() {
  await supabaseBrowser().auth.signOut();
  redirect("/admin/login");
}
