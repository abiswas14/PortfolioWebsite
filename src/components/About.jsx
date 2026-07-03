import React from "react";
import { about } from "../data/content.js";
import { SectionHeader } from "./ui.jsx";

export default function About() {
  return (
    <section id="about" className="lit-section scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-8 md:py-24">
        <SectionHeader
          index="01"
          eyebrow="About / Profile"
          title="Production-minded engineering across systems, data, and infrastructure."
        />
        <div className="boot-window pixel-corners rounded-[10px] p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            <span>save-file.profile</span>
            <span className="text-blue">read-only</span>
          </div>
          <div className="space-y-6 text-lg leading-8 text-fg-muted">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
