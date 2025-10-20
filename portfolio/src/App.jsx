// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload, FaCog, FaCode, FaLightbulb, FaTools, FaRocket, FaStar } from "react-icons/fa";
// import { ReactTyped as Typed } from "react-typed";

// export default function Portfolio() {
//   const BASE_URL = "https://api.sheetbest.com/sheets/5e0089ad-e11e-4314-9608-716ff2025350";

//   const [navOpen, setNavOpen] = useState(false);
//   const [home, setHome] = useState({});
//   const [about, setAbout] = useState({});
//   const [skills, setSkills] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [contact, setContact] = useState({});
//   const [theme, setTheme] = useState({});

//   // Function to get a generic icon for skill items
//   const getGenericIcon = (index) => {
//     const icons = [
//       <FaCog className="text-blue-400" />,
//       <FaCode className="text-green-400" />,
//       <FaLightbulb className="text-yellow-400" />,
//       <FaTools className="text-orange-400" />,
//       <FaRocket className="text-purple-400" />,
//       <FaStar className="text-cyan-400" />
//     ];
//     return icons[index % icons.length];
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [homeRes, aboutRes, skillsRes, projectsRes, contactRes, themeRes] = await Promise.all([
//           fetch(`${BASE_URL}/tabs/Homepage`).then((r) => r.json()),
//           fetch(`${BASE_URL}/tabs/About`).then((r) => r.json()),
//           fetch(`${BASE_URL}/tabs/Skills`).then((r) => r.json()),
//           fetch(`${BASE_URL}/tabs/Projects`).then((r) => r.json()),
//           fetch(`${BASE_URL}/tabs/Contact`).then((r) => r.json()),
//           fetch(`${BASE_URL}/tabs/Theme`).then((r) => r.json()),
//         ]);

//         setHome(homeRes[0] || {});
//         setAbout(aboutRes[0] || {});
//         setSkills(skillsRes || []);
//         setProjects(projectsRes || []);
//         setContact(contactRes[0] || {});
//         setTheme(themeRes[0] || {});
//       } catch (err) {
//         console.error("❌ Error fetching sheet data:", err);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const colors = theme.c1
//     ? theme
//     : { c1: "#22577a", c2: "#38a3a5", c3: "#57cc99", c4: "#80ed99", c5: "#c7f9cc" };

//   const gradientBackground = {
//     background:
//       theme.background ||
//       `linear-gradient(135deg, ${colors.c1} 0%, ${colors.c2} 25%, ${colors.c3} 55%, ${colors.c4} 80%, ${colors.c5} 100%)`,
//     minHeight: "100vh",
//   };

//   const sectionHeading = {
//     textAlign: "center",
//     fontSize: "2rem",
//     fontWeight: "bold",
//     marginBottom: "1.5rem",
//     background: "linear-gradient(90deg, #fff, #cce7ff)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     animation: "glow 2s ease-in-out infinite alternate",
//   };

//   return (
//     <div style={gradientBackground} className="text-white antialiased">
//       {/* Header */}
//       <header className="max-w-6xl mx-auto px-6 py-6">
//         <nav className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div
//               className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-2xl"
//               style={{
//                 background: "rgba(255,255,255,0.15)",
//                 backdropFilter: "blur(10px)",
//                 border: "1px solid rgba(255,255,255,0.2)",
//               }}
//             >
//               {home.name ? home.name[0] : "H"}
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold">{home.name || "Hariom"}</h1>
//               <p className="text-xs opacity-80">{home.subtitle || "Electronics • Robotics"}</p>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center gap-4">
//             {["Home", "About", "Skills", "Projects", "Contact"].map((link) => (
//               <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
//                 {link}
//               </a>
//             ))}
//             {home.resume && (
//               <motion.a
//                 whileHover={{ scale: 1.05 }}
//                 href={home.resume}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="ml-3 flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-xl"
//                 style={{
//                   background: `linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))`,
//                   border: "1px solid rgba(255,255,255,0.15)",
//                 }}
//               >
//                 <FaDownload /> Resume
//               </motion.a>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* MAIN */}
//       <main className="max-w-6xl mx-auto px-6 pb-16">
//         {/* HOME */}
//         <section id="home" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-6">
//           <motion.div className="md:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="text-sm opacity-90 flex items-center gap-2 font-medium mb-2">
//               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Hello, I'm
//             </div>

//             <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
//               <Typed
//                 strings={[home.name || "Hariom Sharma"]}
//                 typeSpeed={70}
//                 backSpeed={40}
//                 loop
//                 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200"
//               />
//             </h2>

//             <p className="text-xl text-blue-100 font-semibold mb-4">
//               {home.tagline || "Electronics Engineer • Robotics Enthusiast"}
//             </p>

//             <div className="mt-6 flex flex-wrap gap-4">
//               {home.linkedin && (
//                 <a href={home.linkedin} target="_blank" rel="noreferrer" className="btn-social">
//                   <FaLinkedin /> LinkedIn
//                 </a>
//               )}
//               {home.github && (
//                 <a href={home.github} target="_blank" rel="noreferrer" className="btn-social">
//                   <FaGithub /> GitHub
//                 </a>
//               )}
//             </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             <div className="w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
//               <img
//                 src={home.profileImage || "/default-profile.png"}
//                 alt={home.name}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </motion.div>
//         </section>

//         {/* ABOUT */}
//         <section id="about" className="mt-20">
//           <h3 style={sectionHeading}>About Me</h3>
//           <motion.div
//             className="p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/10"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//           >
//             <p className="text-lg text-white/90">{about.aboutText || "Electronics Engineer passionate about IoT."}</p>
//           </motion.div>
//         </section>

//         {/* SKILLS */}
//         <section id="skills" className="mt-20">
//           <h3 style={sectionHeading}>Technical Skills</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {skills.map((s, i) => (
//               <motion.div
//                 key={i}
//                 className="p-6 rounded-2xl shadow-xl bg-white/10 border border-white/10 backdrop-blur-md"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <h4 className="font-bold text-lg mb-4">{s.category}</h4>
//                 {s.items &&
//                   s.items.split(",").map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-3 mb-2 text-sm text-white/90">
//                       <span className="flex-shrink-0">
//                         {getGenericIcon(idx)}
//                       </span>
//                       <span>{item.trim()}</span>
//                     </div>
//                   ))}
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* PROJECTS */}
//         <section id="projects" className="mt-20">
//           <h3 style={sectionHeading}>Projects</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {projects.map((p, i) => (
//               <motion.div
//                 key={i}
//                 className="p-6 rounded-2xl shadow-2xl bg-white/10 border border-white/10 backdrop-blur-md"
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <h4 className="font-bold text-xl mb-2">{p.title}</h4>
//                 <p className="text-sm mb-3 text-white/90">{p.desc}</p>
//                 <p className="text-sm mb-3 text-black/35">{p.tech}</p>
//                 {p.link && (
//                   <a href={p.link} target="_blank" rel="noreferrer" className="underline text-blue-200">
//                     View Project
//                   </a>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* CONTACT */}
//         <section id="contact" className="mt-20">
//           <h3 style={sectionHeading}>Get In Touch</h3>
//           <div className="p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/10">
//             <div className="space-y-4 text-lg">
//               {contact.email && (
//                 <p className="flex items-center gap-3">
//                   <FaEnvelope /> {contact.email}
//                 </p>
//               )}
//               {contact.phone && (
//                 <p className="flex items-center gap-3">
//                   <FaPhone /> {contact.phone}
//                 </p>
//               )}
//               {contact.location && (
//                 <p className="flex items-center gap-3">
//                   <FaMapMarkerAlt /> {contact.location}
//                 </p>
//               )}
//             </div>
//           </div>
//         </section>
//       </main>

//       <style jsx>{`
//         .btn-social {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: rgba(255, 255, 255, 0.15);
//           padding: 0.6rem 1.2rem;
//           border-radius: 1rem;
//           font-weight: 600;
//           transition: 0.3s;
//         }
//         .btn-social:hover {
//           background: rgba(255, 255, 255, 0.25);
//           transform: translateY(-2px);
//         }
//         @keyframes glow {
//           from {
//             text-shadow: 0 0 5px #fff, 0 0 10px #00eaff;
//           }
//           to {
//             text-shadow: 0 0 20px #fff, 0 0 40px #00eaff;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaDownload, FaCog, FaCode, FaLightbulb, FaTools, FaRocket, FaStar
} from "react-icons/fa";
import { ReactTyped as Typed } from "react-typed";

export default function Portfolio() {
  const SHEET_ID = import.meta.env.VITE_SHEET_ID;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [home, setHome] = useState({});
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});
  const [theme, setTheme] = useState({});

  const getGenericIcon = (index) => {
    const icons = [
      <FaCog className="text-blue-400" />,
      <FaCode className="text-green-400" />,
      <FaLightbulb className="text-yellow-400" />,
      <FaTools className="text-orange-400" />,
      <FaRocket className="text-purple-400" />,
      <FaStar className="text-cyan-400" />,
    ];
    return icons[index % icons.length];
  };

  const fetchTab = async (tabName) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tabName}?alt=json&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.values) return [];
    const [headers, ...rows] = data.values;
    return rows.map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, aboutRes, skillsRes, projectsRes, contactRes, themeRes] = await Promise.all([
          fetchTab("Homepage"),
          fetchTab("About"),
          fetchTab("Skills"),
          fetchTab("Projects"),
          fetchTab("Contact"),
          fetchTab("Theme"),
        ]);

        setHome(homeRes[0] || {});
        setAbout(aboutRes[0] || {});
        setSkills(skillsRes || []);
        setProjects(projectsRes || []);
        setContact(contactRes[0] || {});
        setTheme(themeRes[0] || {});
      } catch (err) {
        console.error("❌ Error fetching Google Sheet data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const colors = theme.c1
    ? theme
    : { c1: "#22577a", c2: "#38a3a5", c3: "#57cc99", c4: "#80ed99", c5: "#c7f9cc" };

  const gradientBackground = {
    background:
      theme.background ||
      `linear-gradient(135deg, ${colors.c1} 0%, ${colors.c2} 25%, ${colors.c3} 55%, ${colors.c4} 80%, ${colors.c5} 100%)`,
    minHeight: "100vh",
  };

  const sectionHeading = {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    background: "linear-gradient(90deg, #fff, #cce7ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "glow 2s ease-in-out infinite alternate",
  };

  return (
    <div style={gradientBackground} className="text-white antialiased">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-2xl bg-white/20">
              {home.name ? home.name[0] : "H"}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{home.name || "Hariom"}</h1>
              <p className="text-xs opacity-80">{home.subtitle || "Electronics • Robotics"}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {["Home", "About", "Skills", "Projects", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
                {link}
              </a>
            ))}
            {home.resume && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={home.resume}
                target="_blank"
                rel="noreferrer"
                className="ml-3 flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-xl bg-white/20"
              >
                <FaDownload /> Resume
              </motion.a>
            )}
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* HOME */}
        <section id="home" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-6">
          <motion.div className="md:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-sm opacity-90 flex items-center gap-2 font-medium mb-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Hello, I'm
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
              <Typed
                strings={[home.name || "Hariom Sharma"]}
                typeSpeed={70}
                backSpeed={40}
                loop
                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200"
              />
            </h2>
            <p className="text-xl text-blue-100 font-semibold mb-4">
              {home.tagline || "Electronics Engineer • Robotics Enthusiast"}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {home.linkedin && (
                <a href={home.linkedin} target="_blank" rel="noreferrer" className="btn-social">
                  <FaLinkedin /> LinkedIn
                </a>
              )}
              {home.github && (
                <a href={home.github} target="_blank" rel="noreferrer" className="btn-social">
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img src={home.profileImage || "/default-profile.png"} alt={home.name} className="object-cover w-full h-full" />
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-20">
          <h3 style={sectionHeading}>About Me</h3>
          <motion.div className="p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-lg text-white/90">{about.aboutText || "Electronics Engineer passionate about IoT."}</p>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-20">
          <h3 style={sectionHeading}>Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((s, i) => (
              <motion.div key={i} className="p-6 rounded-2xl shadow-xl bg-white/10 border border-white/10 backdrop-blur-md">
                <h4 className="font-bold text-lg mb-4">{s.category}</h4>
                {s.items &&
                  s.items.split(",").map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-2 text-sm text-white/90">
                      {getGenericIcon(idx)}
                      <span>{item.trim()}</span>
                    </div>
                  ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-20">
          <h3 style={sectionHeading}>Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.div key={i} className="p-6 rounded-2xl shadow-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                <h4 className="font-bold text-xl mb-2">{p.title}</h4>
                <p className="text-sm mb-3 text-white/90">{p.desc}</p>
                <p className="text-sm mb-3 text-black/35">{p.tech}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="underline text-blue-200">
                    View Project
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-20">
          <h3 style={sectionHeading}>Get In Touch</h3>
          <div className="p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <div className="space-y-4 text-lg">
              {contact.email && <p className="flex items-center gap-3"><FaEnvelope /> {contact.email}</p>}
              {contact.phone && <p className="flex items-center gap-3"><FaPhone /> {contact.phone}</p>}
              {contact.location && <p className="flex items-center gap-3"><FaMapMarkerAlt /> {contact.location}</p>}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .btn-social {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.6rem 1.2rem;
          border-radius: 1rem;
          font-weight: 600;
          transition: 0.3s;
        }
        .btn-social:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
        @keyframes glow {
          from {
            text-shadow: 0 0 5px #fff, 0 0 10px #00eaff;
          }
          to {
            text-shadow: 0 0 20px #fff, 0 0 40px #00eaff;
          }
        }
      `}</style>
    </div>
  );
}
