import React, { useEffect } from "react";
import SystemsBackdrop from "./components/SystemsBackdrop.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    const sections = ["top", "about", "experience", "projects", "skills", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.dispatchEvent(new CustomEvent("scene:zone", { detail: entry.target.id }));
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SystemsBackdrop />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
