import React from "react";
import { projects } from "../data/content.js";
import { SectionHeader, ChannelTag } from "./ui.jsx";

function ProjectCard({ project }) {
  return (
    <article className="cartridge-card group flex min-h-full flex-col overflow-hidden transition duration-200 ease-out hover:-translate-y-1 hover:border-amber/70">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <ChannelTag channel={project.channel} />
        <span className="rounded-[5px] bg-ink-950/70 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-fg-muted">{project.metric}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-7 md:p-6 md:pt-8">
        <div className="mb-5 grid place-items-center rounded-[8px] border border-line bg-ink-950/60 p-4">
          <img
            src={`/assets/cartridge-${project.channel}.png`}
            alt=""
            width="80"
            height="64"
            loading="lazy"
            className="h-24 w-auto transition-transform duration-200 ease-out [image-rendering:pixelated] group-hover:-translate-y-1 group-hover:scale-105"
          />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">Insert cartridge</p>
          <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-fg">{project.title}</h3>
          <p className="mt-2 font-mono text-xs leading-5 tracking-[0.04em] text-fg-faint">{project.stack}</p>
        </div>
        <p className="mt-4 text-sm leading-6 text-fg-muted">{project.description}</p>
        <ul className="mt-4 space-y-2">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-6 text-fg-muted">
              <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-line-strong" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center justify-between rounded-[6px] border border-line-strong bg-ink-950/65 px-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-fg transition duration-200 ease-out hover:-translate-y-0.5 hover:border-amber-bright hover:text-amber-bright active:translate-y-px"
          >
            View repository
            <span aria-hidden="true">↗</span>
            <span className="sr-only">
              {project.title} on GitHub (opens in new tab)
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <SectionHeader
          index="03"
          eyebrow="Projects / Cartridges"
          title="Selected builds with code behind them."
          subtitle="Quantitative research infrastructure, low-level systems work, and full-stack financial tooling."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
