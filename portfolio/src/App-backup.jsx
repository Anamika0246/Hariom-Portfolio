import React, { useState } from "react";
import { motion } from "framer-motion";

// Backup of the original working version
export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);

  const colors = {
    c1: "#22577a",
    c2: "#38a3a5",
    c3: "#57cc99",
    c4: "#80ed99",
    c5: "#c7f9cc",
  };

  const gradientBackground = {
    background: `linear-gradient(135deg, ${colors.c1} 0%, ${colors.c2} 25%, ${colors.c3} 55%, ${colors.c4} 80%, ${colors.c5} 100%)`,
    minHeight: "100vh",
  };

  return (
    <div style={gradientBackground} className="text-white antialiased">
      <header className="max-w-6xl mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(6px)" }}
            >
              H
            </div>
            <div>
              <h1 className="text-xl font-semibold">Hariom</h1>
              <p className="text-xs opacity-80">Electronics · Embedded · Robotics</p>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        <section id="home" className="mt-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Hariom Sharma</h2>
          <p className="mt-4 max-w-xl text-white/90 leading-relaxed">
            Electronics Engineering student at IIT Madras — focused on embedded systems, robotics, and AIoT.
          </p>
        </section>
      </main>
    </div>
  );
}