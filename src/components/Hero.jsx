import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // --- 1. ENTRY ANIMATION (Plays once on load) ---
    const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set([titleRef.current, subtitleRef.current, btnRef.current], {
      y: 100,
      opacity: 0
    });

    entryTl
      .to(titleRef.current, { y: 0, opacity: 1, duration: 1.5 })
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1 }, "-=1.2")
      .to(btnRef.current, { y: 0, opacity: 1, duration: 1 }, "-=1")
      .to(".particle", { opacity: 0.4, duration: 2, stagger: 0.02 }, "-=1.5");

    // --- 2. EXIT SCRUB (Animates as you scroll down) ---
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",      // Start scrubbing from the very top
        end: "bottom top",    // Finish when the hero section is completely scrolled past
        scrub: 1,             // Smooth follow
      }
    });

    exitTl.to(titleRef.current, { y: -150, opacity: 0, scale: 0.9, ease: "none" }, 0)
      .to(subtitleRef.current, { y: -100, opacity: 0, ease: "none" }, 0.1)
      .to(btnRef.current, { y: -50, opacity: 0, ease: "none" }, 0.2)
      .to(".particles-wrapper", { opacity: 0, scale: 1.2, ease: "none" }, 0);

    // --- 3. BACKGROUND FLOATING (Continuous) ---
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const renderParticles = () => {
    return Array.from({ length: 25 }).map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          position: 'absolute',
          background: 'white', // Ensure they are visible
          borderRadius: '50%'
        }}
      />
    ));
  };

  return (
    <section className="hero-container" ref={heroRef} style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="particles-wrapper" style={{ position: 'absolute', width: '100%', height: '100%' }}>
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