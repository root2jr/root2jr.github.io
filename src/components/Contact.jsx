import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Contact.css';
import axios from 'axios';
import Notification from './Notification'; // Adjust path if needed
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [showNotif, setShowNotif] = useState(false);
  const [NotifiContent, setNotifiContent] = useState("Thanks for reaching out! I'll get back to you shortly.");
  const [Notifihead, setNotifihead] = useState("Message Sent!");

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://root2jr-github-io.onrender.com/contact", {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      setShowNotif(true);
    } catch (error) {
      setNotifiContent("Error sending your message. Please try again.");
      setNotifihead("Error");
      setShowNotif(true);
    }
    setFormData({ name: '', email: '', message: '' });

  };

  useEffect(() => {
    // 1. Reveal Title
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );

    // 2. Reveal Content Columns (Staggered)
    // This will now animate the form column and details column
    const contentElements = contentRef.current.children;
    gsap.fromTo(contentElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 60%", // Trigger a bit earlier for the form
        }
      }
    );
  }, []);

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">

        {/* Giant Headline */}
        <div className="contact-header">
          <h1 className="contact-title" ref={titleRef}>
            LET'S BUILD <br />
            SOMETHING <span className="highlight">AMAZING</span>
          </h1>
        </div>

        {/* Main Contact Grid */}
        <div className="contact-content" ref={contentRef}>

          {/* Left Column: The Contact Form */}
          <div className="contact-column form-column">
            <p className="form-intro">
              Have a project in mind? Drop your details below.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-input form-textarea"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message <span className="arrow-diag">↗</span>
              </button>
            </form>
          </div>

          {/* Right Column: Details (Kept existing) */}
          <div className="contact-column details-column">

            <div className="detail-group">
              <span className="detail-label">Email</span>
              <a href="mailto:dev.jram18@gmail.com" className="detail-link email-link">
                dev.jram18@gmail.com
              </a>
            </div>
            <div className="detail-group">
              <span className="detail-label">Mobile</span>
              <a href="tel:9342772002" className="detail-link email-link">
                +91 9342772002
              </a>
            </div>

            <div className="detail-group">
              <span className="detail-label">Location</span>
              <span className="detail-text">Chennai, India (Remote Available)</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">Socials</span>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/jayaraman-pv/" className="social-link">LinkedIn ↗</a>
                <a href="https://www.github.com/root2jr" className="social-link">GitHub ↗</a>
                <a href="https://instagram.com/itz_jram18" className="social-link">Instagram ↗</a>
              </div>
            </div>

          </div>
        </div>
        <Notification
          isOpen={showNotif}
          onClose={() => setShowNotif(false)}
          title="Message Sent"
          message={NotifiContent}
        />
      </div>
    </section>
  );
};

export default Contact;