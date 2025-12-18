import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillItemsRef = useRef([]);

  const skillCategories = [
    { id: "01", title: "Full Stack Web", description: "Building scalable, high-performance web applications using the MERN architecture.", tags: ["React.js", "Node.js", "Express", "MongoDB", "Redux", "Python", "FastAPI", "Django"] },
    { id: "02", title: "Mobile App Dev", description: "Crafting cross-platform native experiences with modern React Native workflows.", tags: ["React Native", "Expo", "NativeWind", "Mobile UI/UX"] },
    { id: "03", title: "AI & Machine Learning", description: "Integrating intelligent models to automate workflows and enhance user interaction.", tags: ["Python", "TensorFlow", "NLP", "OpenAI API","Gemini API", "Data Analysis"] },
    { id: "04", title: "Creative Interactions", description: "Adding life to interfaces with advanced animation libraries and 3D web technologies.", tags: ["GSAP", "Three.js", "Framer Motion", "CSS3 Animations"] }
  ];

  useEffect(() => {
    // 1. Title Animation with Scrub
    gsap.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none", // Best for scrub to keep movement linear with scroll
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%", // Starts earlier
          end: "top 70%",   // Finishes when title reaches 70% of viewport
          scrub: 1,         // Smoothly follows scroll with 1-second catch-up
        }
      }
    );

    // 2. Individual Cards Animation with Scrub
    skillItemsRef.current.forEach((item) => {
      gsap.fromTo(item,
        { y: 150, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top 90%", // Trigger when card enters bottom
            end: "top 60%",   // Fully visible by the time it reaches middle-ish
            scrub: 1,
          }
        }
      );
    });

    // Cleanup for React strict mode / component unmounting
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Ref management logic
  const addToRefs = (el) => {
    if (el && !skillItemsRef.current.includes(el)) {
      skillItemsRef.current.push(el);
    }
  };

  return (
    <section className="skills-section" ref={sectionRef} id="services">
      <div className="skills-container">
        <div className="skills-header" ref={titleRef}>
          <h2 className="section-title outline-text-2">Capabilities</h2>
          <p className="section-desc">A comprehensive toolkit for building modern digital products.</p>
        </div>

        <div className="skills-list">
          {skillCategories.map((category) => (
            <div key={category.id} className="skill-item" ref={addToRefs}>
              <div className="skill-top">
                <span className="skill-number">{category.id}</span>
                <h3 className="skill-title">{category.title}</h3>
              </div>
              <p className="skill-description">{category.description}</p>
              <div className="skill-tags">
                {category.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;