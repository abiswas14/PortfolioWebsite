import React, { useEffect, useState } from "react";
import { navItems } from "../data/content.js";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ["top", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            // the backdrop HUD statusline tracks the section being read
            window.dispatchEvent(new CustomEvent("scene:zone", { detail: entry.target.id }));
          }
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = (id) =>
    `inline-flex min-h-11 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 ease-out ${
      active === id
        ? "text-amber underline decoration-amber decoration-2 underline-offset-8"
        : "text-fg-muted hover:text-fg"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/72 backdrop-blur-xl">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-2 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-fg transition-colors duration-200 ease-out hover:text-amber-bright"
        >
          <span aria-hidden="true" className="text-amber">
            AB
          </span>
          <span aria-hidden="true" className="text-fg-faint">
            /
          </span>
          Aalif Biswas
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-7">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)}>
                <span aria-hidden="true" className="text-fg-faint">
                  0{index + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-[6px] border border-line-strong bg-ink-950/40 px-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-fg transition duration-200 ease-out hover:border-amber-bright hover:text-amber-bright active:translate-y-px md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <ul id="mobile-nav" className="border-t border-line bg-ink-950/95 px-5 pb-4 pt-2 backdrop-blur-xl md:hidden">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-3 border-b border-line font-mono text-sm uppercase tracking-[0.14em] text-fg-muted transition-colors duration-200 ease-out hover:text-amber-bright"
              >
                <span aria-hidden="true" className="text-fg-faint">
                  0{index + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
