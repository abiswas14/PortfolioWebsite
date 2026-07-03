import React from "react";
import { experiences } from "../data/content.js";
import { SectionHeader, ChannelTag, Tag } from "./ui.jsx";

function ExperienceEntry({ entry, index }) {
  return (
    <article className="group relative grid gap-6 rounded-[10px] border border-line bg-ink-950/55 p-5 transition duration-200 ease-out hover:-translate-y-1 hover:border-line-strong md:grid-cols-[216px_1fr] md:gap-10 md:p-6">
      <span className="absolute -left-[7px] top-8 hidden h-3.5 w-3.5 rounded-[3px] border border-amber bg-ink-950 shadow-[0_0_0_4px_rgba(240,168,90,0.12)] md:block" />
      <div className="font-mono text-xs leading-relaxed">
        <p className="text-[11px] tracking-[0.2em] text-amber">QUEST 0{index + 1}</p>
        <p className="mt-2 tracking-[0.08em] text-fg">{entry.date}</p>
        <p className="mt-1 tracking-[0.08em] text-fg-faint">{entry.location}</p>
        <p className="mt-4 flex items-center gap-4">
          <ChannelTag channel={entry.channel} />
          {entry.current ? (
            <span className="inline-flex items-center gap-2 text-green">
              <span aria-hidden="true" className="status-dot h-2 w-2 rounded-full bg-green" />
              RUNNING
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-fg-faint">
              <span aria-hidden="true" className="h-2 w-2 rounded-sm bg-fg-faint/60" />
              COMPLETE
            </span>
          )}
        </p>
        {entry.stat ? (
          <p className="inventory-slot mt-5 rounded-[6px] p-3">
            <span className="block text-2xl font-semibold tracking-tight text-fg">{entry.stat}</span>
            <span className="mt-1 block text-xs leading-5 text-fg-faint">{entry.statLabel}</span>
          </p>
        ) : null}
      </div>

      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-fg">{entry.role}</h3>
            <p className="mt-1 text-sm text-fg-muted">{entry.company}</p>
          </div>
          <span className="rounded-[5px] border border-line bg-ink-900/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
            XP earned
          </span>
        </div>
        <ul className="mt-5 space-y-2.5">
          {entry.points.map((point) => (
            <li key={point} className="flex gap-3 text-base leading-7 text-fg-muted">
              <span aria-hidden="true" className="mt-[13px] h-px w-4 shrink-0 bg-amber/70 transition-all duration-200 group-hover:w-7" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {entry.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="lit-section scroll-mt-20 border-y border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <SectionHeader
          index="02"
          eyebrow="Experience / Quest log"
          title="Engineering roles with measurable systems impact."
          subtitle="Payment orchestration, quantum benchmarking, live portfolio automation, ML data pipelines, and large-scale transaction processing."
        />
        <div className="scene-panel-strong pixel-corners relative rounded-[10px] p-4 md:p-6">
          <div className="quest-rail absolute bottom-8 left-6 top-8 hidden w-px md:block" />
          <div className="grid gap-5 md:pl-6">
          {experiences.map((entry, index) => (
            <ExperienceEntry key={`${entry.company}-${entry.role}`} entry={entry} index={index} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
