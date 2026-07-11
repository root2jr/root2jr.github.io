import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/FooterReusable.css';

gsap.registerPlugin(ScrollTrigger);

const FooterReusable = () => {
  const scrollStreamRef = useRef(null);
  const coreIdentityBlockRef = useRef(null);
  const currentCalendarNode = new Date();

  useEffect(() => {
    // 1. Seamless Cyclic Marquee Setup
    const stripTrack = scrollStreamRef.current;
    const marqueeSegment = stripTrack.querySelector('.loop-segment-node');

    // Duplicate segment array node for a clean, infinite looping seam
    const secondaryClone = marqueeSegment.cloneNode(true);
    stripTrack.appendChild(secondaryClone);

    // Continuous dynamic translation
    const horizontalTimeline = gsap.to(stripTrack.children, {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "none"
    });

    // 2. Optimized Viewport Intersector Frame
    ScrollTrigger.create({
      trigger: ".terminal-site-outfit",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => horizontalTimeline.play(),
      onLeave: () => horizontalTimeline.pause(),
      onEnterBack: () => horizontalTimeline.play(),
      onLeaveBack: () => horizontalTimeline.pause()
    });

    // 3. Lightning-Fast Entrance Engine (Designed for 1.5x tight scroll spaces)
    gsap.fromTo(coreIdentityBlockRef.current,
      {
        y: 20,
        opacity: 0,
        scale: 0.99
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".terminal-site-outfit",
          start: "top 96%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer className="terminal-site-outfit" style={{ overflow: 'hidden' }}>
      {/* Infinite Scrolling Ticker */}
      <div className="ticker-viewport-wrapper" style={{ whiteSpace: 'nowrap', display: 'flex' }}>
        <div className="ticker-internal-track" ref={scrollStreamRef} style={{ display: 'flex' }}>
          <div className="loop-segment-node" style={{ paddingRight: '50px' }}>
            SOFTWARE DEVELOPER — MERN STACK — REACT NATIVE — AI INTEGRATION —
          </div>
        </div>
      </div>

      <div className="identity-content-mesh" ref={coreIdentityBlockRef}>
        <div className="identity-upper-row">

          <div className="identity-brand-branding">
            <h2 className="identity-logo-typography">Jayaram</h2>
            <p className="identity-mission-statement">
              Crafting digital experiences with code and creativity.
            </p>
          </div>

          <div className="identity-navigation-links">
            <h3 className="identity-column-heading">Sitemap</h3>
            <ul>
              <li><a href="/#about">About</a></li>
              <li><a href="/#experience">Experience</a></li>
              <li><a href="/#selected-works">Projects</a></li>
            </ul>
          </div>

          <div className="identity-navigation-links">
            <h3 className="identity-column-heading">Socials</h3>
            <ul>
              <li><a href="https://linkedin.com/in/jayaraman-pv/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/root2jr" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://instagram.com/itz_jram18" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="identity-lower-baseline">
          <span className="identity-copyright-tag">© {currentCalendarNode.getFullYear()} Jayaram. All Rights Reserved.</span>
          <span className="identity-geography-tag">Made by Jayaram with React & GSAP</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterReusable;