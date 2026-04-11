import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Education.css';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "Bharath Institute of Science and Technology",
    location: "Chennai, India",
    duration: "2024 — 2027",
    details: "Focusing on Full-Stack Development, Advanced AI, and Data Structures. Currently maintaining a strong academic record while participating in senior college cricket.",
    highlights: ["Core DSA", "Operating Systems", "Database Management"]
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    institution: "Prince Matriculation Higher Secondary School",
    location: "Chennai, India",
    duration: "Completed 2024",
    details: "Specialized in Computer Science and Mathematics. Developed a foundation in C++ and low-level logic during these formative years.",
    highlights: ["Physics", "Mathematics", "Computer Science"]
  }
];

const Education = () => {
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Header Animation (Matches Projects.jsx)
    gsap.fromTo(headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        }
      }
    );

    // Education Cards Animation
    cardRefs.current.forEach((el) => {
      gsap.fromTo(el,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 65%",
            scrub: 1,
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section className="edu-section" id="education">
      <div className="edu-container">
        <div className="edu-header" ref={headerRef}>
          <h2 className="edu-title outline-text-dark">Education</h2>
        </div>

        <div className="edu-grid">
          {educationData.map((edu) => (
            <div className="edu-card" key={edu.id} ref={addToRefs}>
              <div className="edu-top">
                <span className="edu-duration">{edu.duration}</span>
                <h3 className="edu-degree">{edu.degree}</h3>
                <h4 className="edu-institution">{edu.institution} • {edu.location}</h4>
              </div>
              
              <p className="edu-description">{edu.details}</p>
              
              <div className="edu-highlights">
                {edu.highlights.map((item, idx) => (
                  <span key={idx} className="edu-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;