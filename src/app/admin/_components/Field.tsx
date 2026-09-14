"use client";
export default function Field({ label, ...props }: any) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-600">{label}</span>
      <input
        {...props}
        className="mt-1 w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:ring-2 ring-amber-700 outline-none"
      />
    </label>
  );
}
