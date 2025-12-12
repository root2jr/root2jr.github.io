import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Projects.css';

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);

  const projects = [
    {
      title: 'Jarvis AI Assistant',
      category: 'AI / Voice Recognition / Full-Stack',
      description:
        'An AI-powered voice assistant inspired by Iron Man\'s Jarvis. Features natural language processing, voice commands, and smart automation.',
      tech: ['Python', 'Gemini API', 'Speech Recognition', 'Text-To-Speech', 'React.js', 'Express.js', 'MongoDB', 'Machine Learning', 'Node.js', 'JWT Authentication','Git'],
    },
    {
      title: 'Real-Time Chat Application',
      category: 'Full-Stack Web App',
      description:
        'A modern chat platform with real-time messaging, user authentication, and responsive design for seamless communication.',
      tech: ['React', 'Node.js', 'Web Socket', 'MongoDB', 'Python', 'FastAPI', 'JWT Authentication','Git'],
    },
    {
      title: 'Aptitute Test - BIHER',
      category: 'Full-Stack Exam Management System',
      description:
        'A streamlined aptitude-test platform built for my college, featuring timed quizzes, automatic scoring, question randomization, and real-time result visibility. It also includes a dedicated staff dashboard for managing questions, monitoring tests, and reviewing results making it a complete end-to-end assessment system',
      tech: ['React', 'Node.Js', 'Python', 'FastAPI', 'Git'],
    },
    {
      title: 'Jr-V1 Interpreter',
      category: 'Programming Language',
      description: 'A lightweight interpreter that processes a custom mini-language using manual tokenization and a direct evaluation flow. It parses expressions, handles operators, maintains variables, and executes commands. Built to understand the low-level mechanics of how languages read, process, and run instructions focusing on clean parsing logic, error handling, and execution accuracy.',
      tech: ['C', 'Systems Programming', 'Git'],
    },
    {
      title: 'Jarvis AI Assistant (Android)',
      category: 'AI / Full-Stack / Mobile',
      description:
        'A personal AI assistant built as a dedicated Android app with real-time memory, authentication, reminders, automated notifications, and lightweight conversational intelligence. Focused on fast local performance, clean UI, and a fully custom backend.',
      tech: [
        'React Native',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Python',
        'Machine Learning',
        'Gemini API',
        'Notifications API',
        'Secure Auth (JWT)',
        'Git'
      ],
    }, {
      title: 'Social Media App',
      category: 'Full-Stack / Mobile / Social Platform',
      description:
        'A cross-platform social media app built with React Native, featuring post creation, literature sharing, a ranked feed system, secure JWT authentication, real-time interactions, and an integrated AI chatbot. Designed with a clean architecture, optimized FlatList rendering, and a custom Node.js + MongoDB backend.',
      tech: [
        'React Native',
        'Node.js',
        'Express.js',
        'MongoDB',
        'JWT Auth',
        'AI Chatbot Engine',
        'React Query',
        'Git'
      ],
    }


  ];

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    const projectItems = projectsRef.current.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <h2 ref={titleRef} className="section-title">
          Selected Works
        </h2>

        <div className="projects-list" ref={projectsRef}>
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="project-header">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="project-category">{project.category}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
