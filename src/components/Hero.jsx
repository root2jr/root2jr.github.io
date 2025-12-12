import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import '../css/Hero.css';

function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);

 

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
    );

    gsap.fromTo(
      taglineRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Jayaram
        </h1>
        <h2 ref={subtitleRef} className="hero-subtitle">
          Student · Builder · Developer
        </h2>
        <p ref={taglineRef} className="hero-tagline">
          Crafting digital experiences through code
        </p>
        <button><a href='#about'>About Me</a></button>
      </div>
    </section>
  );
}

export default Hero;
