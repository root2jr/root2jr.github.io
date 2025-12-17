import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/Footer.css';

const Footer = () => {
  const marqueeRef = useRef(null);
  const footerContentRef = useRef(null);
  const date = new Date();

  useEffect(() => {
    // 1. Infinite Marquee Animation
    // We clone the text to create a seamless loop
    const marqueeText = marqueeRef.current.querySelector('.marquee-inner');
    const clone = marqueeText.cloneNode(true);
    marqueeRef.current.appendChild(clone);

    gsap.to(marqueeRef.current.children, {
      xPercent: -100,
      repeat: -1,
      duration: 20, // Adjust speed here
      ease: "linear"
    });

    // 2. Footer Content Reveal on Scroll
    // Simple fade in as it comes into view
    gsap.fromTo(footerContentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerContentRef.current,
          start: "top 95%",
        }
      }
    );
  }, []);

  return (
    <footer className="footer-section">
      {/* Infinite Scrolling Marquee */}
      <div className="marquee-container">
        <div className="track" ref={marqueeRef}>
          <div className="marquee-inner">
             OPEN FOR WORK — MERN STACK — REACT NATIVE — AI INTEGRATION — 
          </div>
        </div>
      </div>

      <div className="footer-container" ref={footerContentRef}>
        <div className="footer-top">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <h2 className="footer-logo">Jayaram</h2>
            <p className="footer-tagline">
              Crafting digital experiences with code and creativity.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <h3 className="footer-heading">Sitemap</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#services">Skills</a></li>
              <li><a href="#selected-works">Works</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-links">
            <h3 className="footer-heading">Socials</h3>
            <ul>
              <li><a href="https://www.linkedin.com/in/jayaraman-pv/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://www.github.com/root2jr" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://instagram.com/itz_jram18" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copyright">© {date.getFullYear()} Jayaram. All Rights Reserved.</span>
          <span className="location">Made with React & GSAP</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;