import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { NavLink } from "@/components/navigation/NavLink";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center pt-16 pb-24 min-h-[80svh]">
      <SectionHeader
        index="404"
        label="No bugs found — just a missing page"
        title="Lost in orbit"
        aside="The page you're looking for doesn't exist or has moved."
        size="lg"
        immediate
      />
      <div className="flex flex-wrap gap-6 px-8 mt-10 text-sm md:px-10">
        <NavLink href="/" className="px-5 py-2 uppercase rounded-full bg-ink text-canvas">
          Back home
        </NavLink>
        <NavLink href="/lab" className="self-center link-underline">
          Explore the Lab →
        </NavLink>
        <NavLink href="/ai" className="self-center link-underline">
          Open the AI Lab →
        </NavLink>
      </div>
    </section>
  );
}
