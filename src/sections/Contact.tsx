"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { CopyButton } from "@/components/motion/CopyButton";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { contact, socials } from "@/constants";

export default function Contact() {
  return (
    <section id="contact" className="relative pb-24">
      <SectionHeader
        index="07"
        label="You dream it, I code it"
        title="Contact"
        aside="Got a question, a brief or a wild idea? I'd love to hear from you and discuss it further."
      />

      <div className="grid gap-12 px-8 mt-12 md:px-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <p className="text-xs tracking-[0.2em] uppercase opacity-50">Write me</p>
          <a
            href={`mailto:${contact.email}`}
            className="self-start text-[clamp(1.6rem,4.6vw,4.5rem)] leading-none tracking-tight link-underline break-all"
          >
            {contact.email}
          </a>
          <CopyButton
            value={contact.email}
            label="Copy e-mail"
            copiedLabel="E-mail copied"
            className="self-start px-5 py-2 text-sm uppercase transition-colors duration-300 border rounded-full border-ink/30 hover:bg-ink hover:text-canvas"
          />
        </div>

        <div className="flex items-center lg:col-span-4 lg:justify-end">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${contact.email}?subject=New%20project`}
              className="flex items-center justify-center text-sm tracking-wider text-center uppercase transition-transform duration-500 rounded-full size-40 bg-gold text-contrast hover:scale-105"
            >
              Start a
              <br />
              project
            </a>
          </Magnetic>
        </div>
      </div>

      <dl className="grid gap-8 px-8 mt-20 text-sm md:px-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="pt-4 border-t border-ink/20">
          <dt className="opacity-50">Phone</dt>
          <dd className="mt-2">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline">
              {contact.phone}
            </a>
          </dd>
        </div>
        <div className="pt-4 border-t border-ink/20">
          <dt className="opacity-50">Location</dt>
          <dd className="mt-2">
            {contact.location} · Remote worldwide
          </dd>
        </div>
        <div className="pt-4 border-t border-ink/20 lg:col-span-2">
          <dt className="opacity-50">Social</dt>
          <dd className="flex flex-wrap mt-2 gap-x-6 gap-y-1">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                <ScrambleText text={social.name} hoverTarget="a" />
              </a>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  );
}
