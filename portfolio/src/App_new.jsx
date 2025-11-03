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
  const API_KEY = import.meta.env.VITE_API_KEY;

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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Header with Logo */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex gap-2">
            {home.linkedin && (
              <a href={home.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <FaLinkedin className="text-white text-sm" />
              </a>
            )}
            {home.github && (
              <a href={home.github} target="_blank" rel="noreferrer" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                <FaGithub className="text-white text-sm" />
              </a>
            )}
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <FaEnvelope className="text-white text-sm" />
            </div>
          </div>
          
          {/* IIT Madras Logo and Text */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-gray-800 font-bold text-lg">भारतीय प्रौद्योगिकी संस्थान मद्रास</div>
              <div className="text-gray-700 text-base">Indian Institute of Technology Madras</div>
            </div>
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
              <div className="text-white font-bold text-xs">IIT-M</div>
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
                src="/Hariom-Photo.png" 
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
                  {contact.email || "hariom@iitm.ac.in"}
                </a>
              </div>
              <div>
                <strong>Office Phone:</strong> 
                <span className="ml-1">{contact.phone || "+91-44-2257-XXXX"}</span>
              </div>
            </div>
          </div>

          {/* Sidebar Sections */}
          <div className="bg-white border border-gray-300 rounded">
            <div className="bg-red-800 text-white px-4 py-2 font-bold">Education</div>
            <div className="p-4">
              <p className="text-sm text-gray-700">{about.education || "B.Tech Electronics Engineering, M.Tech details"}</p>
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
              {home.resume ? (
                <a href={home.resume} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">
                  Download CV
                </a>
              ) : (
                <span className="text-gray-500 text-sm">CV Available on Request</span>
              )}
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
                <span className="font-medium text-gray-900">+ Technical Skills</span>
                {showSkills ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showSkills && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((s, i) => (
                      <div key={i} className="space-y-2">
                        <h4 className="font-bold text-gray-900">{s.category}</h4>
                        {s.items &&
                          s.items.split(",").map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                              <span>{item.trim()}</span>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
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