import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Initial Set states (to avoid flash of unstyled content)
    gsap.set([titleRef.current, subtitleRef.current, btnRef.current], { 
      y: 100, 
      opacity: 0 
    });
    
    gsap.set(".particle", { opacity: 0 });

    // 2. Main Content Reveal Animation
    tl.to(titleRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 1.5,
      stagger: 0.2
    })
    .to(subtitleRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 1 
    }, "-=1.2")
    .to(btnRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 1 
    }, "-=1")
    .to(".particle", {
      opacity: 0.4,
      duration: 2
    }, "-=1.5");

    // 3. Background Particle Float Animation (Continuous)
    gsap.utils.toArray(".particle").forEach((particle) => {
      gsap.to(particle, {
        y: "random(-50, 50)",
        x: "random(-30, 30)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 2)"
      });
    });

  }, []);

  // Generate random positioning for background particles
  const renderParticles = () => {
    return Array.from({ length: 25 }).map((_, i) => (
      <div 
        key={i} 
        className="particle" 
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`, // Random size 2px-6px
          height: `${Math.random() * 4 + 2}px`
        }}
      />
    ));
  };

  return (
    <section className="hero-container" ref={heroRef}>
      {/* Background Particles Layer */}
      <div className="particles-wrapper">
        {renderParticles()}
      </div>

      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          Student <br />
          <span className="outline-text">Developer</span>
        </h1>
        
        <p className="hero-subtitle" ref={subtitleRef}>
          Crafting MERN Stack, React Native, and AI/ML solutions.
        </p>
        
        <div ref={btnRef}>
            <a href='#contact' className="hero-cta">
            Let's Work Together <span className="arrow">→</span>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;