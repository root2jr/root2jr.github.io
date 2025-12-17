import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Projects.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Dummy Project Data (Replace with your real project info & images)
const projectsData = [
  {
    id: 1,
    title: "JARVIS – Personal AI Assistant",
    description:
      "A full-stack personal AI assistant with secure authentication, persistent memory, reminders, automated notifications, and role-based access. Built for actual daily use.",
    tech: [
      "React",
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "FastAPI",
      "Python",
      "Gemini API",
      "Machine Learning",
      "git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=JARVIS+AI+Assistant",
    liveLink: "https://j-a-r-v-i-s-ai.netlify.app",
    codeLink: "https://github.com/root2jr/jarvis-ai"
  },
  {
    id: 2,
    title: "Real-Time Chat & Collaboration Platform",
    description:
      "A scalable real-time chat system with group management, assignments, join requests, WebSocket-based messaging, and WebRTC-powered audio calls.",
    tech: [
      "React",
      "React Native",
      "TypeScript",
      "WebSockets",
      "WebRTC",
      "FastAPI",
      "MongoDB",
      "git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=Real-Time+Chat+App",
    liveLink: "https://thumbsup07.netlify.app",
    codeLink: "https://github.com/DEVLABS07/devchat"
  },
  {
    id: 3,
    title: "Aptitude Test & Student Analytics System",
    description:
      "A role-based platform for conducting online aptitude tests with automatic evaluation, real-time student analytics, and isolated interfaces for students, staff, and admins.",
    tech: [
      "React",
      "Node.js",
      "Python",
      "FastAPI",
      "MongoDB",
      "JWT",
      "git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=Aptitude+Test+System",
    liveLink: "https://aptitude-test-biher.netlify.app",
    codeLink: "https://github.com/root2jr/Aptitude-Test-BIHER"
  },
  {
    id: 4,
    title: "LiteraSocial – Social Media Platform with AI Chat",
    description:
      "A social media application for sharing free-form literature and social thoughts, featuring engagement-based feed ranking and an integrated AI chatbot.",
    tech: [
      "React Native",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "JWT",
      "AI Integration",
      "git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=LiteraSocial",
    liveLink: "#",
    codeLink: "https://github.com/DEVLABS07/LiteraSocial"
  },
  {
    id: 5,
    title: "Jr-v1 Interpreter",
    description:
      "A minimal custom language interpreter implementing lexical analysis, parsing, and execution for a small instruction set. Built to understand how interpreters work end-to-end.",
    tech: [
      "C++",
      "Python",
      "Lexing",
      "Parsing",
      "git"
    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=Jr-v1+Interpreter",
    liveLink: "#",
    codeLink: "https://github.com/root2jr/Jr-v1-Interpreter"
  }
];


const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    // 1. Animate Section Header
    gsap.fromTo(headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      }
    );

    // 2. Staggered Project Items Reveal
    projectRefs.current.forEach((el, index) => {
      gsap.fromTo(el,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Triggers as the item enters the view
            toggleActions: "play none none reverse" // Optional: reverses on scroll up
          }
        }
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  return (
    <section className="projects-section" id="selected-works" ref={sectionRef}>
      <div className="projects-container">
        {/* Header */}
        <div className="projects-header" ref={headerRef}>
          <h2 className="section-title-2 outline-text">Selected Works</h2>
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div className="project-card" key={project.id} ref={addToRefs}>

              {/* Image Container with Hover Effect */}
              <a href={project.liveLink} className="project-image-container">
                <div className="img-overlay"></div>
                <img src={project.image} alt={project.title} className="project-img" />
                <span className="view-project-btn">View Project</span>
              </a>

              {/* Project Content */}
              <div className="project-content">
                <div className="project-top-row">
                  <h3 className="project-title">{project.title}</h3>
                  {/* Links available on hover/desktop usually, kept simple here */}
                  <div className="project-links">
                    <a href={project.codeLink} target="_blank" rel="noreferrer" className="icon-link">Code <span className="arrow-diag">↗</span></a>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                {/* Tech Tags */}
                <div className="tech-stack">
                  {project.tech.map((techItem, index) => (
                    <span key={index} className="tech-tag">{techItem}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;