import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../css/Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for animation targets
  const containerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  // Initialize GSAP timeline
  const tl = useRef(gsap.timeline({ paused: true }));

  useEffect(() => {
    // Define the Open/Close animation timeline
    tl.current
      .to(menuOverlayRef.current, {
        duration: 0.8,
        height: "100vh",
        ease: "power3.inOut"
      })
      .from(menuLinksRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.3"); // Overlap slightly with overlay animation

  }, []);

  // Handle Menu Toggle
  const toggleMenu = () => {
    if (isMenuOpen) {
      tl.current.reverse();
      // Animate Hamburger back to lines
      gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { rotation: 0, y: 0, duration: 0.3 });
    } else {
      tl.current.play();
      // Animate Hamburger to 'X'
      gsap.to(line1Ref.current, { rotation: 45, y: 6, duration: 0.3 });
      gsap.to(line2Ref.current, { rotation: -45, y: -6, duration: 0.3 });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  // Links Data
  const links = [
    { label: "Home", path: "#" },
    { label: "Work", path: "#selected-works" },
    { label: "Services", path: "#services" },
    { label: "About", path: "#about" },
    { label: "Contact", path: "#contact" },
  ];

  const addToRefs = (el) => {
    if (el && !menuLinksRef.current.includes(el)) {
      menuLinksRef.current.push(el);
    }
  };

  return (
    <div className="nav-container" ref={containerRef}>
      {/* Top Bar */}
      <div className="nav-header">
        <div className="nav-logo">JAYARAM</div>
        
        {/* Hamburger Button */}
        <div className="menu-btn" onClick={toggleMenu}>
          <div ref={line1Ref} className="menu-line"></div>
          <div ref={line2Ref} className="menu-line"></div>
        </div>
      </div>

      {/* Full Screen Overlay Menu */}
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-content">
          <ul className="menu-list">
            {links.map((link, index) => (
              <li key={index} className="menu-item-wrapper">
                <a 
                  href={link.path} 
                  className="menu-link" 
                  ref={addToRefs}
                  onClick={toggleMenu} // Close menu on click
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="menu-footer">
            <span>Chennai, India</span>
            <span>opentowork@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;