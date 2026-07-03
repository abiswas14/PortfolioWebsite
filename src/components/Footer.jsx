import React from "react";
import { identity } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-6 font-mono text-xs tracking-[0.08em] text-fg-faint md:px-8">
        <p>© {new Date().getFullYear()} {identity.name}</p>
        <p aria-hidden="true">REACT · VITE · TAILWIND</p>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-2 uppercase text-fg-muted transition-colors duration-200 ease-out hover:text-amber-bright"
        >
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
