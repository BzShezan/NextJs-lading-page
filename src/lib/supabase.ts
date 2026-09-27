import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

console.log("URL loaded?", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "KEY loaded?",
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Public read (used by your landing pages — no login needed)
export const supabasePublic = createClient(url, key);

// Admin read/write (used inside /admin — carries the login session)
export const supabaseBrowser = () => createBrowserClient(url, key);
