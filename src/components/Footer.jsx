import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const marqueeRef = useRef(null);
  const footerContentRef = useRef(null);
  const date = new Date();

  useEffect(() => {
    // 1. Infinite Marquee Setup
    const track = marqueeRef.current;
    const marqueeInner = track.querySelector('.marquee-inner');

    // Clone for seamless loop
    const clone = marqueeInner.cloneNode(true);
    track.appendChild(clone);

    // Constant infinite movement
    const marqueeAnim = gsap.to(track.children, {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "none"
    });

    gsap.to(marqueeAnim, { timeScale: 1, duration: 0.5 });


    // 3. Footer Content Scrub Reveal
    gsap.fromTo(footerContentRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: footerContentRef.current,
          start: "top 100%", // Starts exactly when the footer enters
          end: "bottom 100%", // Finished when footer is fully shown
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer className="footer-section" style={{ overflow: 'hidden' }}>
      {/* Infinite Scrolling Marquee */}
      <div className="marquee-container" style={{ whiteSpace: 'nowrap', display: 'flex' }}>
        <div className="track" ref={marqueeRef} style={{ display: 'flex' }}>
          <div className="marquee-inner" style={{ paddingRight: '50px' }}>
            OPEN FOR WORK — MERN STACK — REACT NATIVE — AI INTEGRATION —
          </div>
        </div>
      </div>

      <div className="footer-container" ref={footerContentRef}>
        <div className="footer-top">

          <div className="footer-brand">
            <h2 className="footer-logo">Jayaram</h2>
            <p className="footer-tagline">
              Crafting digital experiences with code and creativity.
            </p>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Sitemap</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#services">Skills</a></li>
              <li><a href="#selected-works">Works</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Socials</h3>
            <ul>
              <li><a href="https://linkedin.com/in/jayaraman-pv/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/root2jr" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://instagram.com/itz_jram18" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copyright">© {date.getFullYear()} Jayaram. All Rights Reserved.</span>
          <span className="location">Made by Jayaram with React & GSAP</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;