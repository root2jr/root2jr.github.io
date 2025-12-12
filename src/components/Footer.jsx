import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Footer.css';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-name">Jayaram</h3>
            <p className="footer-tagline">
              Building digital experiences, one project at a time.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4 className="footer-section-title">Connect</h4>
              <div className="social-links">
                <a
                  href="http://github.com/root2jr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jayaraman-pv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/itz_jram18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  Instagram
                </a>
                <a
                  href="mailto:hello@dev.jram18@gmail.com"
                  className="social-link"
                >
                  Email
                </a>
              </div>
            </div>

            <button onClick={scrollToTop} className="back-to-top">
              Back to Top ↑
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-credit">
            Designed & Built by Jayaram © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
