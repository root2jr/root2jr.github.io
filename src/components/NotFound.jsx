import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/NotFound.css';
import Navigation from './Navigation';

const NotFound = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Fade container in
    tl.to(containerRef.current, { autoAlpha: 1, duration: 0.5 })
      // 2. Slide huge 404 up
      .fromTo(titleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      // 3. Reveal subtext
      .fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      )
      // 4. Pop button in
      .fromTo(btnRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        "-=0.6"
      );

    // Optional: Subtle floating animation for the 404
    gsap.to(titleRef.current, {
      y: 0,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <div className="nf-container" ref={containerRef}>
      <div className="nav-header" style={{position:"fixed", top:0, left: 0, width:"100%"}}>
        <a href='/' style={{textDecoration:"none"}} className="nav-logo">JAYARAM</a>

       
      </div>        <div className="nf-content">
        <h1 className="nf-title" ref={titleRef}>404</h1>
        <p className="nf-subtext" ref={textRef}>
          The page you are looking for is lost in the void.
        </p>

        <a href="/" className="nf-btn" ref={btnRef}>
          <span className="nf-btn-text">Return Home</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nf-arrow">
            <path d="M17 7L7 17M7 17H17M7 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Decorative Background Elements */}
      <div className="nf-grain"></div>
    </div>
  );
};

export default NotFound;