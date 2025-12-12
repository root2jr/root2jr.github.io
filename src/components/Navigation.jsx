import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../css/Navigation.css';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <button onClick={() => scrollToSection('hero')} className="nav-logo">
            Jayaram
          </button>

          <div className="nav-links desktop-only">
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('skills')}>Skills</button>
            <button onClick={() => scrollToSection('projects')}>Projects</button>
            <button onClick={() => scrollToSection('services')}>Services</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={`burger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMobileMenu}>×</button>
        <div className="mobile-nav-links">
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('skills')}>Skills</button>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
          <button onClick={() => scrollToSection('services')}>Services</button>
          <button onClick={() => scrollToSection('contact')}>Contact</button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
