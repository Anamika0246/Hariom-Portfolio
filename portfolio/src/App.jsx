import React, { useState } from "react";
import { motion } from "framer-motion";

// Single-file React component for a responsive portfolio using TailwindCSS + Framer Motion
// Instructions (see chat after canvas):
// 1) Put a profile image at public/profile.jpg (or change the src below).
// 2) Ensure framer-motion is installed: `npm install framer-motion`.
// 3) Tailwind is already set up (as you said).

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } }),
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
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

          {/* Responsive nav */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              className="ml-3 px-4 py-2 rounded-lg font-medium"
              style={{
                background: `linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))`,
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Resume
            </motion.button>
          </div>

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setNavOpen((s) => !s)}
              className="p-2 rounded-md"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile nav drawer */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={navOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className={`md:hidden overflow-hidden mt-3`}
        >
          <div className="flex flex-col gap-3">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* HERO */}
        <section id="home" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-6">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-3 text-sm opacity-90 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Hello, I'm
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
              Hariom Sharma
            </h2>
            <div className="mt-2 text-lg md:text-xl font-semibold text-blue-200">
              <span>Electronics Engineer • Robotics Enthusiast</span>
            </div>
            <p className="mt-4 max-w-xl text-white/90 leading-relaxed text-base">
              <span className="font-semibold text-white">Electronics Engineering student</span> at 
              <span className="font-bold text-blue-200"> IIT Madras</span> — focused on 
              <span className="font-semibold text-green-200"> embedded systems</span>, 
              <span className="font-semibold text-blue-200"> robotics</span>, and 
              <span className="font-semibold text-purple-200"> AIoT</span>.
              I build UAVs, IoT systems, and custom embedded prototypes using 
              <span className="font-medium text-yellow-200"> Arduino, ESP32, STM32</span> and 
              <span className="font-medium text-pink-200"> Raspberry Pi</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ scale: 1.04 }}
                className="px-5 py-2 rounded-full font-semibold shadow-lg"
                href="https://www.linkedin.com/in/hari-om63"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: `linear-gradient(90deg, ${colors.c2}, ${colors.c3})`,
                  color: "#073642",
                }}
              >
                LinkedIn
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                className="px-5 py-2 rounded-full font-semibold shadow-lg"
                href="https://github.com/jack-hariom"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: `linear-gradient(90deg, ${colors.c3}, ${colors.c4})`,
                  color: "#073642",
                }}
              >
                GitHub
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                className="px-5 py-2 rounded-full font-semibold shadow-lg"
                style={{
                  background: `linear-gradient(90deg, ${colors.c4}, ${colors.c5})`,
                  color: "#073642",
                }}
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              >
                Contact
              </motion.button>
            </div>
          </motion.div>

          {/* Profile image with glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full md:col-span-1 flex justify-center"
          >
            <div
              className="w-56 h-56 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Put profile.jpg in public/ folder */}
              <img src="/Hariom-Photo.png" alt="Hariom" className="object-cover w-full h-full" />
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-12">
          <motion.h3
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">About Me</span>
          </motion.h3>

          <motion.div
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(6px)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={1}
          >
            <div>
              <p className="leading-relaxed text-white/90 text-lg">
                <span className="font-bold text-white">Electronics Engineering student (BSc)</span> at 
                <span className="font-bold text-blue-200"> IIT Madras</span> with hands-on 
                <span className="font-semibold text-green-200"> R&D experience</span> in embedded
                systems, UAVs, and IoT. I've designed and prototyped 
                <span className="font-bold text-yellow-200"> 30+ embedded projects</span>, conducted workshops,
                and led student R&D teams.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full font-medium">
                  Arduino
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full font-medium">
                  ESP32
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full font-medium">
                  STM32
                </span>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-200 rounded-full font-medium">
                  Raspberry Pi
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-10">
          <h3 className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">Technical Skills</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Programming & Software",
                items: ["C/C++", "Embedded C", "Python", "Arduino IDE"]
              },
              {
                title: "Hardware & MCUs",
                items: ["Arduino", "ESP32", "STM32", "Raspberry Pi", "Sensors (IMU, GPS, LiDAR)"]
              },
              {
                title: "IoT & Communication",
                items: ["I2C, SPI, UART", "CAN Protocol", "Adafruit IO", "ThingSpeak"]
              },
            ].map((col, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(6px)",
                }}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-white">{col.title}</h4>
                </div>
                <div className="space-y-2">
                  {col.items.map((item, idx) => (
                    <div key={idx} className="text-sm text-white/90">
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-10">
          <h3 className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Featured Projects</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "GPS IoT Lamp",
                desc: "Solar-powered lamp with GPS tracking and IoT status monitoring.",
                tech: ["IoT", "GPS", "Solar"]
              },
              {
                title: "Smart School Bag",
                desc: "GPS, heart rate & temp sensors; RFID locking + cloud logging.",
                tech: ["RFID", "Sensors", "Cloud"]
              },
              {
                title: "FPV RC Car",
                desc: "ESP32-CAM live streaming with remote control and tilt/pan.",
                tech: ["ESP32-CAM", "FPV", "Streaming"]
              },
              {
                title: "Custom FPV Drone",
                desc: "Arduino flight controller + ESP32-CAM for live streaming.",
                tech: ["Flight Control", "FPV", "Arduino"]
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(6px)",
                }}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2">
                      <h4 className="font-bold text-xl text-white">{p.title}</h4>
                    </div>
                    <p className="text-sm mt-2 text-white/90 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.tech.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    className="px-4 py-2 rounded-lg font-semibold self-start"
                    style={{
                      background: `linear-gradient(90deg, ${colors.c3}, ${colors.c4})`,
                      color: "#073642",
                    }}
                  >
                    View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-10">
          <h3 className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">Get In Touch</span>
          </h3>

          <motion.div
            className="p-8 rounded-2xl max-w-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(6px)",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  📧
                </div>
                <div>
                  <p className="text-sm text-white/70 font-medium">Email</p>
                  <p className="font-bold text-lg text-white">hariom8885sharma@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <div>
                  <p className="text-sm text-white/70 font-medium">Phone</p>
                  <p className="font-bold text-lg text-white">+91 6388857763</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  📍
                </div>
                <div>
                  <p className="text-sm text-white/70 font-medium">Location</p>
                  <p className="font-bold text-lg text-white">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-white/70 mb-4 font-medium">Connect with me:</p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  href="https://www.linkedin.com/in/hari-om63"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${colors.c2}, ${colors.c3})`,
                    color: "#073642",
                  }}
                >
                  LinkedIn
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.04 }}
                  href="https://github.com/jack-hariom"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${colors.c3}, ${colors.c4})`,
                    color: "#073642",
                  }}
                >
                  GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-sm opacity-80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Hariom Sharma</div>
            <div className="text-xs">Built with React + Tailwind + Framer Motion</div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .nav-link {
          color: rgba(255,255,255,0.95);
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.18s ease;
        }

        .nav-link:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.04);
        }

        /* Small helper to make text darker on light gradients */
        .dark-text {
          color: #073642;
        }
      `}</style>
    </div>
  );
}
