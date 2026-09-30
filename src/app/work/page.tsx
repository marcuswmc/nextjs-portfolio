import type { Metadata } from "next";
import Works from "@/sections/Works";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Marcus Vinicius — websites and web apps built with Next.js, React and WordPress.",
};

export default function WorkPage() {
  return <Works />;
}
