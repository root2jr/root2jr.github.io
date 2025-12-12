import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/About.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

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

    gsap.fromTo(
      leftColRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );

    gsap.fromTo(
      rightColRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <h2 ref={titleRef} className="section-title">
          About
        </h2>

        <div className="about-grid">
          <div className="about-left" ref={leftColRef}>
            <h3 className="about-subtitle">My Story</h3>
            <p className="about-text">
              I'm a student, builder, and developer passionate about creating
              meaningful digital experiences. From building Jarvis-inspired AI
              assistants to crafting chat applications, I thrive on turning
              ideas into reality through code.
            </p>
            <p className="about-text">
              Every project is an opportunity to learn, experiment, and push
              the boundaries of what's possible. I approach development with
              curiosity and precision, always aiming for clean, efficient
              solutions.
            </p>
          </div>

          <div className="about-right" ref={rightColRef}>
            <h3 className="about-subtitle">Core Tech Stack</h3>
            <div className="tech-list">
              <div className="tech-item">JavaScript / React</div>
              <div className="tech-item">Node.js / Express</div>
              <div className="tech-item">Python / Flask</div>
              <div className="tech-item">MongoDB / SQL</div>
              <div className="tech-item">GSAP / Three.js</div>
              <div className="tech-item">Git / GitHub</div>
              <div className="tech-item">REST APIs</div>
              <div className="tech-item">Responsive Design</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
