import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const revealMaskRef = useRef(null);
  const imgRef = useRef(null);
  const year = (new Date()).getFullYear();

  useEffect(() => {
    // Create the scrubbing timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%", // Starts when the section just enters the bottom
        end: "top 20%",   // Finishes when the section is near the top
        scrub: 1,         // Smooth 1-second delay catch-up
      }
    });

    // 1. Text Column Animation (Staggered fade in)
    // We use ease: "none" for scrub timelines to keep movement linear with scroll
    tl.fromTo(leftColRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "none"
      }
    );

    // 2. Image Container entry
    tl.fromTo(rightColRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none"
      },
      0 // Start at the same time as the text (absolute position 0)
    );

    // 3. The Curtain/Mask Reveal
    tl.to(revealMaskRef.current, {
      height: "0%",
      ease: "none"
    }, 0.2); // Start slightly after the image container appears

    // 4. Image Zoom-out (Parallax effect)
    tl.fromTo(imgRef.current,
      { scale: 1.4 },
      {
        scale: 1,
        ease: "none"
      },
      "<" // Starts exactly when the mask starts moving
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">

        <div className="about-left" ref={leftColRef}>
          <h5 className="mini-label">Who I Am</h5>
          <h2 className="about-headline">
            Student by day.<br />
            <span className="highlight-text">Full Stack Dev</span> by night.
          </h2>
          <div className="about-body">
            <p>
              I’m an 18-year-old Computer Science undergraduate based in Chennai with a strong focus on full-stack development.
            </p>
            <p>
              I build production-level web and mobile applications using React, React Native, Node.js, Express, MongoDB, and TypeScript, with experience in real-time systems, authentication, and scalable backend design.
            </p>
            <p>
              I have strong hands-on experience in AI/ML and AI system integration, including building intent-classification models for my personal assistant (Jarvis) using logistic regression for text understanding. I’ve developed and integrated multiple AI chatbots across full-stack products such as Jarvis and LiteraSocial, along with custom AI-driven features for an SIH EdTech platform focused on solving real educational problems at scale. Beyond integrations, I experiment at a lower level by building lightweight interpreters and exploring tokenization, model behavior, and inference, driven by a deep curiosity toward practical AI and machine learning systems.
            </p>

          </div>


          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-label">Location</span>
              <span className="stat-value">Chennai, IN</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Education</span>
              <span className="stat-value">B.Sc CS {year > 2027 ? "(2027)" : `(${2027 - year}${(2027 - year) === 2 ? "nd" : "rd"} yr)`}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Focus</span>
              <span className="stat-value">Software & AI</span>
            </div>
          </div>

          <button className="download-cv-btn">
            Download CV <span className="btn-icon">↓</span>
          </button>
        </div>

        <div className="about-right" ref={rightColRef}>
          <div className="image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
            <div
              className="reveal-mask"
              ref={revealMaskRef}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                background: '#000', // Matches your theme background
                zIndex: 2
              }}
            ></div>
            <img
              ref={imgRef}
              src="https://placehold.co/600x800/1a1a1a/FFF?text=MY+IMAGE"
              alt="Profile"
              className="profile-image"
              style={{ display: 'block', width: '100%', zIndex: 1 }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;