import React from "react";
import { identity } from "../data/content.js";
import { LinkButton } from "./ui.jsx";

const contactRows = [
  { term: "EMAIL", href: `mailto:${identity.email}`, label: identity.email },
  { term: "GITHUB", href: identity.github, label: identity.githubLabel },
  { term: "LINKEDIN", href: identity.linkedin, label: identity.linkedinLabel }
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="boot-window pixel-corners scanlines rounded-[10px] p-6 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-fg-faint">
            <span className="text-amber">05</span>
            <span aria-hidden="true"> / </span>
            Contact / Final gate
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-fg md:text-5xl">
            Interested in backend systems, ML infrastructure, and quant engineering roles.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-fg-muted">
            Open to software engineering internships and research-heavy systems projects. Email is
            the fastest way to reach me.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={`mailto:${identity.email}`} variant="primary">
              Open channel
            </LinkButton>
            <LinkButton href={identity.github}>GitHub</LinkButton>
            <LinkButton href={identity.linkedin}>LinkedIn</LinkButton>
          </div>
            </div>

          <ul className="divide-y divide-line border-y border-line bg-ink-950/45">
            {contactRows.map((row) => {
              const external = row.href.startsWith("http");
              return (
                <li key={row.term}>
                  <a
                    href={row.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group flex min-h-11 flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-[6px] py-4 transition duration-200 ease-out hover:text-amber-bright"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
                      {row.term}
                    </span>
                    <span className="font-mono text-sm text-fg transition-colors duration-200 ease-out group-hover:text-amber-bright">
                      {row.label} <span aria-hidden="true">↗</span>
                      {external ? <span className="sr-only">(opens in new tab)</span> : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
