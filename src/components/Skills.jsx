import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Skills.css';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const skills = [
    { name: 'Frontend Development', description: 'React, HTML/CSS' },
    { name: 'Backend Development', description: 'Node.js, Express, APIs' },
    { name: 'UI/UX Design', description: 'Figma, Responsive Design' },
    { name: 'Animation', description: 'GSAP, Three.js, WebGL' },
    { name: 'Database Design', description: 'MongoDB, MySQL' },
    { name: 'Version Control', description: 'Git, GitHub, Collaboration' },
    { name: 'Problem Solving', description: 'Algorithms, Data Structures' },
    { name: 'AI Integration', description: 'OpenAI, Gemini API, ML Models' },
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

    const skillItems = gridRef.current.querySelectorAll('.skill-item');
    gsap.fromTo(
      skillItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="skills-container">
        <h2 ref={titleRef} className="section-title">
          Skills
        </h2>

        <div className="skills-grid" ref={gridRef}>
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-number">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
