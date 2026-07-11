import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/ContactReusable.css';
import axios from 'axios';
import Notification from './Notification';

gsap.registerPlugin(ScrollTrigger);

const ContactReusable = () => {
  const portalWrapperRef = useRef(null);
  const narrativeHeaderRef = useRef(null);
  const coreSplitGridRef = useRef(null);
  
  const [showNotif, setShowNotif] = useState(false);
  const [NotifiContent, setNotifiContent] = useState("Thanks for your valuable feedback!");
  const [Notifihead, setNotifihead] = useState("Feedback Sent!");

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '', 
    TermsandPrivacyPolicyAgreed: "yes" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://metriq-oq49.onrender.com/contact", formData);
      setNotifihead("Feedback Sent!");
      setNotifiContent("Thanks for your valuable feedback!");
      setShowNotif(true);
    } catch (error) {
      setNotifihead("Error");
      setNotifiContent("Error sending your message. Please try again.");
      setShowNotif(true);
    }
    setFormData({ name: '', email: '', message: '', TermsandPrivacyPolicyAgreed: "yes" });
  };

  return (
    <section className="feedback-portal-section" id="contact" ref={portalWrapperRef}>
      <div className="feedback-portal-container">

        <div className="feedback-portal-header" ref={narrativeHeaderRef}>
          <h1 className="feedback-portal-title">
            DROP <br />
            YOUR <span className="feedback-title-accent">FEEDBACK</span>
          </h1>
        </div>

        <div className="feedback-portal-split-grid" ref={coreSplitGridRef}>
          {/* Input Block Column */}
          <div className="feedback-portal-pane input-form-pane">
            <form className="feedback-submission-form" onSubmit={handleSubmit}>
              <div className="feedback-form-row">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="feedback-text-field" 
                />
              </div>
              <div className="feedback-form-row">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="feedback-text-field" 
                />
              </div>
              <div className="feedback-form-row">
                <textarea 
                  name="message" 
                  placeholder="Your Feedback..." 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="feedback-text-field feedback-textarea-field"
                ></textarea>
              </div>
              <button type="submit" className="feedback-action-trigger">
                Send Feedback <span className="kinetic-arrow-icon">↗</span>
              </button>
            </form>
          </div>

          {/* Directory Metadata Column */}
          <div className="feedback-portal-pane directory-metadata-pane">
            <div className="directory-meta-cluster">
              <span className="directory-meta-tag">Email</span>
              <a href="mailto:dev.jram18@gmail.com" className="directory-meta-anchor continuous-underline-effect">
                dev.jram18@gmail.com
              </a>
            </div>
            <div className="directory-meta-cluster">
              <span className="directory-meta-tag">Mobile</span>
              <a href="tel:9342772002" className="directory-meta-anchor continuous-underline-effect">
                +91 9342772002
              </a>
            </div>
            <div className="directory-meta-cluster">
              <span className="directory-meta-tag">Location</span>
              <span className="directory-meta-plain-text">Chennai, India</span>
            </div>
            <div className="directory-meta-cluster">
              <span className="directory-meta-tag">Socials</span>
              <div className="directory-social-links-row">
                <a href="https://linkedin.com/in/jayaraman-pv/" className="directory-social-anchor">LinkedIn ↗</a>
                <a href="https://github.com/root2jr" className="directory-social-anchor">GitHub ↗</a>
                <a href="https://instagram.com/itz_jram18" className="directory-social-anchor">Instagram ↗</a>
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

export default ContactReusable;