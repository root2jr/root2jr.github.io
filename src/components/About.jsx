import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/About.css';
import myimg from '../assets/myimg.jpeg'
import myresume from '../assets/Jayaraman-P.V-Resume.pdf'

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
            <span className="highlight-text">Software Dev</span> by night.
          </h2>
          <div className="about-body">
            <p>
              I’m a Computer Science undergraduate based in Chennai with a deep focus on Full-Stack Software Development and AI Infrastructure.
            </p>
            <p>
              I architect production-level web and mobile applications using <strong>React, React Native, Node.js, Express, MongoDB, and TypeScript</strong>, with a specialization in real-time systems, secure authentication, and scalable backend design.
            </p>
            <p>
              My expertise extends into AI/ML integration, ranging from building intent-classification models using <strong>Logistic Regression</strong> to deploying custom AI-driven features for <strong>EdTech</strong> platforms at scale. I’ve engineered and integrated intelligent systems into products like <strong>Jarvis</strong> and <strong>LiteraSocial</strong>, focusing on practical machine learning applications. Beyond high-level integrations, I explore the lower levels of the stack by building <strong>lightweight interpreters</strong> and researching <strong>LLM tokenization, model behavior, and self-hosted inference</strong>—driven by a philosophy of continuous technical optimization.
            </p>
          </div>


          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-label">Location</span>
              <span className="stat-value">Chennai, IN</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Education</span>
              <span className="stat-value">B.Sc CS {year > 2028 ? "" : `(${(2028 - year) === 2 ? "2nd" : "3rd"} yr)`}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Focus</span>
              <span className="stat-value">Software & AI</span>
            </div>
          </div>

          <a className="download-cv-btn" href={myresume} download="Jayaraman-P.V-Resume.pdf" style={{ textDecoration: "none" }}>
            Download CV <span className="btn-icon">↓</span>
          </a>
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
              src={myimg}
              alt="Profile"
              className="profile-image"
              style={{ display: 'block', width: '100%', zIndex: 1, objectFit: "cover", height: "fit-content" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;