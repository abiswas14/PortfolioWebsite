import React from "react";
import { channels } from "../data/content.js";

const BUTTON_BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] px-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-px";

const BUTTON_VARIANTS = {
  primary: "bg-amber text-ink-950 shadow-[0_14px_34px_rgba(240,168,90,0.22)] hover:bg-amber-bright",
  secondary:
    "border border-line-strong bg-ink-950/45 text-fg backdrop-blur hover:border-amber-bright hover:bg-ink-900/80 hover:text-amber-bright"
};

export function LinkButton({ href, variant = "secondary", className = "", children }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
    >
      {children}
      {external ? (
        <>
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in new tab)</span>
        </>
      ) : null}
    </a>
  );
}

export function ChannelTag({ channel }) {
  const ch = channels[channel];
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] ${ch.textClass}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-sm ${ch.dotClass}`} />
      {ch.code}
    </span>
  );
}

export function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-line bg-ink-950/35 px-2.5 py-1.5 font-mono text-xs text-fg-muted">
      {children}
    </span>
  );
}

export function SectionHeader({ index, eyebrow, title, subtitle }) {
  return (
    <header className="mb-12 md:mb-14">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-fg-faint">
        <span className="text-amber">{index}</span>
        <span aria-hidden="true"> / </span>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl leading-7 text-fg-muted">{subtitle}</p> : null}
    </header>
  );
}
