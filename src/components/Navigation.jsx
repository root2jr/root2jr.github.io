import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../css/Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuOverlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const tl = useRef(null);

  // Links
  const links = [
    { label: 'Home', path: '#' },
    { label: 'Work', path: '#selected-works' },
    { label: 'Services', path: '#services' },
    { label: 'About', path: '#about' },
    { label: 'Contact', path: '#contact' },
  ];

  // GSAP setup
  useEffect(() => {
    menuLinksRef.current = [];

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .to(menuOverlayRef.current, {
          height: '100vh',
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .from(menuLinksRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.3');
    });

    return () => ctx.revert();
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      tl.current.reverse();
      gsap.to([line1Ref.current, line2Ref.current], {
        rotation: 0,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      });
    } else {
      tl.current.play();
      gsap.to(line1Ref.current, {
        rotation: 45,
        y: 6,
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(line2Ref.current, {
        rotation: -45,
        y: -6,
        duration: 0.25,
        ease: 'power2.out',
      });
    }

    setIsMenuOpen(prev => !prev);
  };

  const addToRefs = el => {
    if (el) menuLinksRef.current.push(el);
  };

  return (
    <div className="nav-container">
      <div className="nav-header">
        <a href='#' style={{textDecoration:"none"}} className="nav-logo">JAYARAM</a>

        <div className="menu-btn" onClick={toggleMenu}>
          <div ref={line1Ref} className="menu-line" />
          <div ref={line2Ref} className="menu-line" />
        </div>
      </div>

      {/* Overlay */}
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-content">
          <ul className="menu-list">
            {links.map(({ label, path }) => (
              <li key={label}>
                <a
                  href={path}
                  className="menu-link"
                  ref={addToRefs}
                  onClick={toggleMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="menu-footer">
            <span>Chennai, India</span>
            <span>dev.jram18@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
