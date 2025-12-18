import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "JARVIS – Personal AI Assistant",
    description:"A full-stack personal AI assistant designed to manage tasks, reminders, and contextual memory through a secure, scalable architecture. Users can authenticate, store long-term memories, schedule reminders, and receive automated notifications, while the system handles intent processing, memory retrieval, and real-time interactions via a robust backend and responsive cross-platform client.",
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
      "Git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=JARVIS+AI",
    liveLink: "https://j-a-r-v-i-s-ai.netlify.app",
    codeLink: "https://github.com/root2jr/jarvis-ai"
  }, {
    id: 2,
    title: "AI-Powered EdTech Learning Platform",
    description:
      "A full-stack EdTech platform that transforms video-based learning into structured, interactive lessons using AI. Teachers can create classes, assign lessons via YouTube videos, and track student performance, while students receive AI-generated summaries, quizzes, and progress analytics. The system automates transcription, content understanding, assessment generation, and performance analysis through a scalable backend architecture.",
    tech: [
      "React",
      "FastAPI",
      "Machine Learning",
      "Python",
      "MongoDB",
      "JWT Authentication",
      "AI (LLMs)",
      "Speech-to-Text",
      "REST APIs",
      "Async Backend"
    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=EdTech+AI",
    liveLink: "https://edtechx-ai.netlify.app",
    codeLink: "https://github.com/root2jr/EdTech_AI"
  }
  ,
  {
    id: 3,
    title: "Real-Time Chat & Collaboration Platform",
    description:"A scalable real-time chat and collaboration platform built for team communication and academic coordination, supporting group management, join requests, and assignment workflows. Users can exchange messages instantly via WebSockets, manage groups and tasks, and initiate peer-to-peer audio calls using WebRTC, all backed by a secure, event-driven architecture and a responsive cross-platform interface.",
    tech: [
      "React",
      "TypeScript",
      "WebSockets",
      "WebRTC",
      "FastAPI",
      "MongoDB",
      "Git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=Real-Time+Chat+App",
    liveLink: "https://thumbsup07.netlify.app",
    codeLink: "https://github.com/DEVLABS07/devchat"
  },
  {
    id: 4,
    title: "Aptitude Test & Student Analytics System",
    description:"A full-stack aptitude testing platform built for academic evaluation, enabling administrators to create and manage timed tests while students attempt structured question sets with real-time validation. The system supports authentication, automated scoring, result storage, and performance analysis, ensuring fair assessment, scalable test delivery, and streamlined evaluation through a secure backend and intuitive user interface.",
    tech: [
      "React",
      "Node.js",
      "Python",
      "FastAPI",
      "MongoDB",
      "JWT",
      "Git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=Aptitude+Test+System",
    liveLink: "https://aptitude-test-biher.netlify.app",
    codeLink: "https://github.com/root2jr/Aptitude-Test-BIHER"
  },
  {
    id: 5,
    title: "LiteraSocial – Social Media Platform with AI Chat",
    description:"A full-stack social media platform focused on expressive writing and thoughtful interaction, enabling users to publish literature, social reflections, and long-form posts in a structured feed. The system supports secure authentication, engagement-based ranking, and an integrated AI chatbot, delivering personalized content discovery and interactive experiences through a scalable backend and modern cross-platform client.",
    tech: [
      "React Native",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Machine Learning",
      "JWT",
      "AI Integration",
      "Git"

    ],
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=LiteraSocial",
    liveLink: "#",
    codeLink: "https://github.com/DEVLABS07/LiteraSocial"
  },
  {
    id: 6,
    title: "Jr-v1 Interpreter",
    description:"A lightweight custom interpreter implemented in C that processes and executes a minimal, structured programming language from source input. The system handles lexical analysis, parsing, and runtime execution through a compact execution pipeline, demonstrating low-level control, efficient memory handling, and core compiler design principles.",
    tech: [
      "C++",
      "Python",
      "Lexing",
      "Parsing",
      "Git"
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
    // 1. Header Scrub Animation
    gsap.fromTo(headerRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 95%", // Starts near the bottom of viewport
          end: "top 75%",   // Finishes quickly for impact
          scrub: 1,
        }
      }
    );

    // 2. Project Card Scrub Animations
    projectRefs.current.forEach((el) => {
      // Logic for the whole card
      gsap.fromTo(el,
        { y: 120, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 98%", // Starts right as it enters
            end: "top 65%",   // Settles into place before reaching the middle
            scrub: 1,
          }
        }
      );

      // Logic for the Image inside the card (Internal Parallax)
      const image = el.querySelector('.project-img');
      if (image) {
        gsap.fromTo(image,
          { scale: 1.2, y: -20 },
          {
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }
    });

    // Cleanup: Remove all triggers on unmount to prevent memory leaks/glitches
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  return (
    <section className="projects-section" id="selected-works" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-header" ref={headerRef}>
          <h2 className="section-title-2 outline-text">Selected Works</h2>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <div className="project-card" key={project.id} ref={addToRefs}>
              <a href={project.liveLink} className="project-image-wrapper" target="_blank" rel="noreferrer">
                <div className="img-overlay"></div>
                {/* Make sure overflow is hidden on project-image-wrapper in CSS */}
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="view-project-btn">Live App</div>
              </a>

              <div className="project-content">
                <div className="project-top">
                  <h3 className="project-title">{project.title}</h3>
                  <a href={project.codeLink} target="_blank" rel="noreferrer" className="code-btn">
                    <span>Code</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <p className="project-description">{project.description}</p>
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