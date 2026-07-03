import React, { useEffect, useState } from "react";
import { identity, statusRows, channels, channelLegend } from "../data/content.js";
import { LinkButton } from "./ui.jsx";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "America/New_York"
});

function StatusPanel() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="boot-window pixel-corners scanlines rounded-[10px]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <span className="font-mono text-xs tracking-[0.14em] text-fg-faint">ARCADE://AALIF-BISWAS</span>
        <span className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.1em] text-green">
          <span aria-hidden="true" className="status-dot h-2 w-2 rounded-full bg-green" />
          LIVE SIGNAL
        </span>
      </div>

      <dl className="divide-y divide-line">
        {statusRows.map((row) => (
          <div key={row.term} className="grid grid-cols-[104px_1fr] gap-3 px-4 py-3">
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-faint">{row.term}</dt>
            <dd className="m-0 text-sm leading-6 text-fg">{row.detail}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 font-mono text-xs tracking-[0.1em] text-fg-faint">
        <span>ATLANTA, GA</span>
        <span>
          {timeFormatter.format(now)} ET<span aria-hidden="true" className="caret text-amber">_</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative min-h-[calc(100svh-1px)] overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink-950 to-transparent" />
      <div className="mx-auto grid min-h-[calc(100svh-1px)] max-w-6xl gap-10 px-5 pb-12 pt-20 md:px-8 md:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
        <div className="boot-window pixel-corners rise-soft rounded-[10px] p-5 pb-6 md:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            <span>compiler-arcade.exe</span>
            <span className="text-green">save loaded</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-fg-muted [text-shadow:0_1px_12px_rgba(0,0,0,0.75)]">
            Georgia Tech CS <span aria-hidden="true" className="text-amber">//</span> Visa SWE Intern{" "}
            <span aria-hidden="true" className="text-blue">//</span> compiler arcade
          </p>
          <h1 className="mt-6 text-[clamp(3.7rem,12vw,8.6rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-fg [text-shadow:0_4px_28px_rgba(0,0,0,0.58)]">
            Aalif
            <br />
            Biswas<span aria-hidden="true" className="caret text-amber">_</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-fg-muted md:text-xl md:leading-9">
            I build backend systems, ML infrastructure, quant engineering tools, and low-level
            systems software — tested, observable, and repeatable under real constraints.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href={`mailto:${identity.email}`} variant="primary">
              Start contact
            </LinkButton>
            <LinkButton href={identity.github}>GitHub</LinkButton>
            <LinkButton href={identity.linkedin}>LinkedIn</LinkButton>
          </div>
        </div>

        <div className="rise-soft grid gap-4 pb-8 lg:pb-14" style={{ animationDelay: "120ms" }}>
          <div className="scene-panel pixel-corners rounded-[10px] p-4">
            <div className="flex items-start gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-[8px] border border-line bg-ink-950/70">
                <img
                  src="/assets/sprite-avatar.png"
                  alt=""
                  width="28"
                  height="18"
                  className="h-14 w-11 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">Player profile</p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-fg">Aalif Biswas</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-fg-muted">
                  Backend / ML infra / quant / systems
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["PAY", "orchestration", "text-amber"],
                ["ML", "research runs", "text-violet"],
                ["QNT", "portfolio engine", "text-green"],
                ["SYS", "C / Linux", "text-blue"]
              ].map(([code, label, color]) => (
                <div key={code} className="inventory-slot rounded-[6px] p-3">
                  <p className={`font-mono text-lg font-semibold ${color}`}>{code}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <StatusPanel />
        </div>
      </div>

      <div className="relative border-t border-line bg-ink-950/70 backdrop-blur-md">
        <ul
          aria-label="Focus areas"
          className="mx-auto flex max-w-6xl flex-wrap gap-x-10 gap-y-3 px-5 py-4 md:px-8"
        >
          {channelLegend.map((key, index) => {
            const ch = channels[key];
            return (
              <li key={key} className="flex items-center gap-3">
                <span aria-hidden="true" className={`h-2 w-2 shrink-0 ${ch.dotClass}`} />
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-fg-muted">
                  <span aria-hidden="true" className="mr-2 text-fg-faint">0{index + 1}</span>
                  {ch.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
