import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Contact.css';
import axios from 'axios';
import Notification from './Notification';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  const [showNotif, setShowNotif] = useState(false);
  const [NotifiContent, setNotifiContent] = useState("Thanks for reaching out! I'll get back to you shortly.");
  const [Notifihead, setNotifihead] = useState("Message Sent!");

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://root2jr-github-io.onrender.com/contact", formData);
      setNotifihead("Message Sent!");
      setNotifiContent("Thanks for reaching out! I'll get back to you shortly.");
      setShowNotif(true);
    } catch (error) {
      setNotifihead("Error");
      setNotifiContent("Error sending your message. Please try again.");
      setShowNotif(true);
    }
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    // 1. Giant Headline Scrub
    gsap.fromTo(titleRef.current,
      { 
        y: 150, 
        opacity: 0,
        skewY: 7 // Adds a slight tilt for a more dynamic reveal
      },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%", // Start early
          end: "top 40%",   // Finish before it reaches the middle
          scrub: 1,
        }
      }
    );

    // 2. Content Columns Scrub (Form & Details)
    const contentElements = contentRef.current.children;
    gsap.fromTo(contentElements,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1, // Staggers the form vs details column
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">

        <div className="contact-header">
          <h1 className="contact-title" ref={titleRef}>
            LET'S BUILD <br />
            SOMETHING <span className="highlight">AMAZING</span>
          </h1>
        </div>

        <div className="contact-content" ref={contentRef}>
          {/* Form Column */}
          <div className="contact-column form-column">
            <p className="form-intro">Have a project in mind? Drop your details below.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="form-input" />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Tell me about your project..." rows="4" value={formData.message} onChange={handleChange} required className="form-input form-textarea"></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message <span className="arrow-diag">↗</span>
              </button>
            </form>
          </div>

          {/* Details Column */}
          <div className="contact-column details-column">
            <div className="detail-group">
              <span className="detail-label">Email</span>
              <a href="mailto:dev.jram18@gmail.com" className="detail-link email-link">dev.jram18@gmail.com</a>
            </div>
            <div className="detail-group">
              <span className="detail-label">Mobile</span>
              <a href="tel:9342772002" className="detail-link email-link">+91 9342772002</a>
            </div>
            <div className="detail-group">
              <span className="detail-label">Location</span>
              <span className="detail-text">Chennai, India (Remote Available)</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Socials</span>
              <div className="social-links">
                <a href="https://linkedin.com/in/jayaraman-pv/" className="social-link">LinkedIn ↗</a>
                <a href="https://github.com/root2jr" className="social-link">GitHub ↗</a>
                <a href="https://instagram.com/itz_jram18" className="social-link">Instagram ↗</a>
              </div>
            </div>
          </div>
        </div>

        <Notification
          isOpen={showNotif}
          onClose={() => setShowNotif(false)}
          title={Notifihead}
          message={NotifiContent}
        />
      </div>
    </section>
  );
};

export default Contact;