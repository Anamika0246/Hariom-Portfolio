import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaDownload, FaCog, FaCode, FaLightbulb, FaTools, FaRocket, FaStar,
  FaChevronDown, FaChevronUp
} from "react-icons/fa";
import { ReactTyped as Typed } from "react-typed";

export default function Portfolio() {
  const SHEET_ID = import.meta.env.VITE_SHEET_ID;
  // API_KEY no longer needed for CSV endpoint
  
  const [home, setHome] = useState({});
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});
  const [theme, setTheme] = useState({});
  
  // Dropdown states
  const [showSkills, setShowSkills] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);

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
    try {
      if (!SHEET_ID) {
        console.warn("SHEET_ID not set. Check .env file.");
        return [];
      }

      // Try multiple endpoints for better compatibility
      const endpoints = [
        // Primary: CSV query endpoint
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`,
        // Fallback: Direct CSV export (requires sheet to be published)
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0&sheet=${encodeURIComponent(tabName)}`
      ];

      for (let i = 0; i < endpoints.length; i++) {
        const csvUrl = endpoints[i];
        console.debug(`Attempt ${i + 1}: Fetching from:`, csvUrl);
        
        try {
          const res = await fetch(csvUrl, {
            method: 'GET',
            headers: {
              'Accept': 'text/csv,text/plain,*/*'
            }
          });
          
          if (!res.ok) {
            console.warn(`Endpoint ${i + 1} failed with status ${res.status}`);
            continue; // Try next endpoint
          }
          
          const csvText = await res.text();
          console.debug(`CSV response for ${tabName} (${csvText.length} chars):`, csvText.substring(0, 200) + "...");
          
          // Check if we got actual CSV data
          if (!csvText || csvText.includes('<html') || csvText.includes('<!DOCTYPE')) {
            console.warn(`Endpoint ${i + 1} returned HTML instead of CSV - sheet may not be published`);
            continue;
          }
          
          // Parse CSV manually
          const lines = csvText.split('\n').filter(line => line.trim());
          if (lines.length === 0) {
            console.warn(`No data lines found for ${tabName}`);
            continue;
          }
          
          // Parse header row (remove quotes and handle commas)
          const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
          
          // Parse data rows
          const rows = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
            const obj = {};
            headers.forEach((h, i) => {
              if (h) obj[h] = values[i] || "";
            });
            return obj;
          });
          
          console.debug(`Successfully parsed ${rows.length} rows for ${tabName}:`, rows);
          return rows;
          
        } catch (fetchError) {
          console.warn(`Endpoint ${i + 1} threw error:`, fetchError);
          continue;
        }
      }
      
      // If all endpoints failed
      console.error(`All endpoints failed for ${tabName}. Make sure the Google Sheet is published to web.`);
      return [];
      
    } catch (err) {
      console.error("fetchTab error for", tabName, err);
      return [];
    }
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

        console.log("📊 Fetched data summary:");
        console.log("Home:", homeRes.length, "rows");
        console.log("About:", aboutRes.length, "rows");
        console.log("Skills:", skillsRes.length, "rows", skillsRes);
        console.log("Projects:", projectsRes.length, "rows");
        console.log("Contact:", contactRes.length, "rows");
        console.log("Theme:", themeRes.length, "rows");

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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Header with Logo */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Social / Contact Icons */}
          <div className="flex gap-2 items-center">
            {/* Email */}
            <a
              href="mailto:hariom8885sharma@gmail.com"
              aria-label="Email"
              className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <FaEnvelope className="text-white text-sm" />
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/hari-om63/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn" 
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <FaLinkedin className="text-white text-sm" />
            </a>
            
            {/* GitHub */}
            <a 
              href="https://github.com/jack-hariom" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub" 
              className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-900 transition-colors"
            >
              <FaGithub className="text-white text-sm" />
            </a>
          </div>
          
          {/* IIT Madras Logo and Text + Resume download */}
          <div className="flex items-center gap-4">
            {/* <div className="text-right hidden sm:block">
              <div className="text-gray-800 font-bold text-lg">भारतीय प्रौद्योगिकी संस्थान मद्रास</div>
              <div className="text-gray-700 text-base">Indian Institute of Technology Madras</div>
            </div> */}
            <div className="flex items-center gap-3">
              {/* <img src="/iitm-logo.png" alt="IIT Madras" className="w-16 h-16 object-contain" /> */}
              <a href="/HariomCV.pdf" download className="ml-2 inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <FaDownload /> Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex">
            <button className="px-6 py-3 hover:bg-red-700 transition-colors border-r border-red-700">Institute</button>
            <button className="px-6 py-3 hover:bg-red-700 transition-colors border-r border-red-700">Research</button>
            <button className="px-6 py-3 hover:bg-red-700 transition-colors border-r border-red-700">Faculty</button>
            <button 
              onClick={() => setShowSkills(!showSkills)}
              className="px-6 py-3 hover:bg-red-700 transition-colors border-r border-red-700"
            >
              Skills
            </button>
            <button 
              onClick={() => setShowProjects(!showProjects)}
              className="px-6 py-3 hover:bg-red-700 transition-colors border-r border-red-700"
            >
              Projects
            </button>
            <button className="px-6 py-3 hover:bg-red-700 transition-colors border-r border-red-700">Innovation</button>
            <button 
              onClick={() => setShowContact(!showContact)}
              className="px-6 py-3 hover:bg-red-700 transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <span className="text-gray-500 text-sm">You are here: Home &gt; {home.name || "Hariom Sharma"}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Left Sidebar */}
        <div className="w-80 space-y-6">
          {/* Profile Card */}
          <div className="bg-white border border-gray-300 rounded p-6">
            <div className="w-48 h-48 mx-auto mb-4 border-2 border-gray-300 rounded overflow-hidden">
              <img 
                src="/Hariom-Photo.jpg" 
                alt={home.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{home.name || "Hariom Sharma"}</h1>
            <p className="text-gray-700 mb-4">{home.tagline || "Electronics Engineer, Department of Electrical Engineering"}</p>
            
            <div className="space-y-2 text-sm">
              <div>
                <strong>Email:</strong> 
                <a href={`mailto:${contact.email}`} className="text-blue-600 ml-1">
                  {contact.email || "hariom8885sharma@gmail.com"}
                </a>
              </div>
              <div>
                <strong>Office Phone:</strong> 
                <span className="ml-1">{contact.phone || "+91-6388857763"}</span>
              </div>
            </div>
          </div>

          {/* Sidebar Sections */}
          <div className="bg-white border border-gray-300 rounded">
            <div className="bg-red-800 text-white px-4 py-2 font-bold">Education</div>
            <div className="p-4">
              <p className="text-sm text-gray-700">{about.education || "Bachelor of Science - Electronics Systems"}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded">
            <div className="bg-red-800 text-white px-4 py-2 font-bold">Website(s)</div>
            <div className="p-4">
              {home.linkedin && (
                <a href={home.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 text-sm block mb-1">
                  LinkedIn Profile
                </a>
              )}
              {home.github && (
                <a href={home.github} target="_blank" rel="noreferrer" className="text-blue-600 text-sm block">
                  GitHub Profile
                </a>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded">
            <div className="bg-red-800 text-white px-4 py-2 font-bold">CV</div>
            <div className="p-4">
              {/* Use public resume file for direct download */}
              <a href="/HariomCV.pdf" download className="text-blue-600 text-sm inline-flex items-center gap-2">
                <FaDownload /> Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Research Interest */}
          <div className="bg-white border border-gray-300 rounded mb-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Research Interest</h2>
              <div className="space-y-2">
                <p className="text-gray-700">• {about.research1 || "Electronics and Communication Systems"}</p>
                <p className="text-gray-700">• {about.research2 || "IoT and Embedded Systems Development"}</p>
                <p className="text-gray-700">• {about.research3 || "Robotics and Automation"}</p>
              </div>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="bg-white border border-gray-300 rounded">
            {/* Skills Section */}
            <div className="border-b border-gray-200">
              <button 
                onClick={() => setShowSkills(!showSkills)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">+ Technical Skills ({skills.length} categories)</span>
                {showSkills ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showSkills && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-6"
                >
                  {skills.length === 0 ? (
                    <div className="text-gray-500 text-center py-4">
                      No skills data loaded. Check console for errors.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {skills.map((s, i) => {
                        console.debug('Skills row:', s); // Debug log
                        return (
                          <div key={i} className="space-y-2">
                            <h4 className="font-bold text-gray-900">{s.category || 'Unknown Category'}</h4>
                            {s.items && s.items.trim() ? (
                              s.items.split(",").map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                  <span>{item.trim()}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-400 text-sm">No items listed</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Projects Section */}
            <div className="border-b border-gray-200">
              <button 
                onClick={() => setShowProjects(!showProjects)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">+ Projects & Publications</span>
                {showProjects ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showProjects && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-6"
                >
                  <div className="space-y-4">
                    {projects.map((p, i) => (
                      <div key={i} className="border-l-4 border-red-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-2">{p.title}</h4>
                        <p className="text-gray-700 mb-2">{p.desc}</p>
                        {p.tech && (
                          <p className="text-sm text-blue-600 mb-2"><strong>Technologies:</strong> {p.tech}</p>
                        )}
                        {p.link && (
                          <a 
                            href={p.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Professional Experience */}
            <div className="border-b border-gray-200">
              <button className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <span className="font-medium text-gray-900">+ Professional Experience</span>
                <FaChevronDown />
              </button>
            </div>

            {/* Awards and Fellowships */}
            <div className="border-b border-gray-200">
              <button className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <span className="font-medium text-gray-900">+ Awards and Fellowships</span>
                <FaChevronDown />
              </button>
            </div>

            {/* Key words */}
            <div className="border-b border-gray-200">
              <button className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <span className="font-medium text-gray-900">+ Key words</span>
                <FaChevronDown />
              </button>
            </div>

            {/* Contact Information */}
            <div className="">
              <button 
                onClick={() => setShowContact(!showContact)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">+ Contact Information</span>
                {showContact ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-6"
                >
                  <div className="space-y-3">
                    {contact.email && (
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-red-600" />
                        <span className="text-gray-700">{contact.email}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-red-600" />
                        <span className="text-gray-700">{contact.phone}</span>
                      </div>
                    )}
                    {contact.location && (
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-red-600" />
                        <span className="text-gray-700">{contact.location}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}