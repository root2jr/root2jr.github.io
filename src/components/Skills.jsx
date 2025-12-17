import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Skills.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillItemsRef = useRef([]);

  // Data based on your profile
  const skillCategories = [
    {
      id: "01",
      title: "Full Stack Web",
      description: "Building scalable, high-performance web applications using the MERN architecture.",
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Redux", "Python", "FastAPI", "Django"]
    },
    {
      id: "02",
      title: "Mobile App Dev",
      description: "Crafting cross-platform native experiences with modern React Native workflows.",
      tags: ["React Native", "Expo", "NativeWind", "Mobile UI/UX"]
    },
    {
      id: "03",
      title: "AI & Machine Learning",
      description: "Integrating intelligent models to automate workflows and enhance user interaction.",
      tags: ["Python", "TensorFlow", "NLP", "OpenAI API","Gemini API", "Data Analysis"]
    },
    {
      id: "04",
      title: "Creative Interactions",
      description: "Adding life to interfaces with advanced animation libraries and 3D web technologies.",
      tags: ["GSAP", "Three.js", "Framer Motion", "CSS3 Animations"]
    }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%", 
        }
      }
    );


    skillItemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%", 
          }
        }
      );
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !skillItemsRef.current.includes(el)) {
      skillItemsRef.current.push(el);
    }
  };

  return (
    <section className="skills-section" ref={sectionRef} id="services">
      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header" ref={titleRef}>
          <h2 className="section-title outline-text-2">Capabilities</h2>
          <p className="section-desc">
            A comprehensive toolkit for building modern digital products.
          </p>
        </div>

        {/* Skills Grid/List */}
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