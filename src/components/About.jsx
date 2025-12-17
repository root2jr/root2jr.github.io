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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%", // Starts when section hits 70% of viewport height
        toggleActions: "play none none reverse",
      }
    });

    // 1. Text Column Animation (Slide Up + Fade)
    tl.fromTo(leftColRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    // 2. Image Reveal Animation (Curtain Effect)
    // First, resize the container to visible
    tl.fromTo(rightColRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    // Slide the mask away to reveal image
    tl.to(revealMaskRef.current, {
      height: "0%",
      duration: 1.5,
      ease: "power4.inOut"
    }, "-=0.5");

    // Slightly scale image down to normal size
    tl.fromTo(imgRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 1.5, ease: "power4.out" },
      "<"
    );

  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        
        {/* Left Column: Text Content */}
        <div className="about-left" ref={leftColRef}>
          <h5 className="mini-label">Who I Am</h5>
          
          <h2 className="about-headline">
            Student by day.<br />
            <span className="highlight-text">Full Stack Dev</span> by night.
          </h2>

          <div className="about-body">
            <p>
              I'm an 18-year-old Computer Science student based in Chennai, obsessed with 
              building scalable web apps and exploring the frontiers of AI. 
            </p>
            <p>
              I’m deep-diving into the MERN stack and React Native, building pixel-clean interfaces and reliable backends. My goal isn’t just to write code, but to engineer systems that feel simple to use and solid underneath. Alongside this, I actively work with machine learning and AI to add intelligent behavior where it actually makes sense.
            </p>
          </div>

          {/* Quick Stats / Info Grid */}
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-label">Location</span>
              <span className="stat-value">Chennai, IN</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Education</span>
              <span className="stat-value">B.Sc CS {year > 2027?"(2027)":`(${2027-year}${ (2027-year) == 2?"nd":"rd"} yr)`}</span>
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

        {/* Right Column: Image Placeholder */}
        <div className="about-right" ref={rightColRef}>
          <div className="image-wrapper">
            {/* The Mask Overlay */}
            <div className="reveal-mask" ref={revealMaskRef}></div>
            
            {/* REPLACE THE SRC BELOW WITH YOUR OWN IMAGE URL */}
            <img 
              ref={imgRef}
              src="https://placehold.co/600x800/1a1a1a/FFF?text=MY+IMAGE" 
              alt="Profile" 
              className="profile-image" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;