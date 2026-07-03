import React from "react";
import { skillGroups } from "../data/content.js";
import { SectionHeader, Tag } from "./ui.jsx";

const groupAssets = {
  Languages: "/assets/module-cpu.png",
  "Backend & Infra": "/assets/module-sys.png",
  "Data & ML": "/assets/module-ml.png",
  Systems: "/assets/module-pay.png"
};

export default function Skills() {
  return (
    <section id="skills" className="lit-section scroll-mt-20 border-y border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <SectionHeader index="04" eyebrow="Skills / Loadout" title="Tools I use to build reliable software." />
        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.label} className="scene-panel pixel-corners rounded-[10px] p-5">
              <div className="flex items-center gap-4 border-b border-line pb-4">
                <div className="grid h-14 w-14 place-items-center rounded-[7px] border border-line bg-ink-950/65">
                  <img
                    src={groupAssets[group.label]}
                    alt=""
                    width="56"
                    height="52"
                    loading="lazy"
                    className="max-h-10 w-auto [image-rendering:pixelated]"
                  />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">Loadout module</p>
                  <h3 className="mt-1 font-semibold tracking-tight text-fg">{group.label}</h3>
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
