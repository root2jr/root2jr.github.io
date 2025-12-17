import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/Notification.css';

const Notification = ({ isOpen, onClose, title, message }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // 1. Animate In
      const tl = gsap.timeline();
      
      // Overlay fades in
      tl.fromTo(overlayRef.current, 
        { opacity: 0, visibility: 'hidden' },
        { opacity: 1, visibility: 'visible', duration: 0.3 }
      );

      // Modal scales up and fades in
      tl.fromTo(modalRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, // Bouncy effect
        "-=0.1"
      );

      // 2. Auto Dismiss Timer (4 seconds)
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    // Animate Out
    const tl = gsap.timeline({
      onComplete: onClose // Actually unmount/hide after animation triggers
    });

    tl.to(modalRef.current, { y: 20, opacity: 0, duration: 0.3 });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  if (!isOpen) return null;

  return (
    <div className="notification-overlay" ref={overlayRef} onClick={handleClose}>
      <div 
        className="notification-modal" 
        ref={modalRef} 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside box
      >
        <div className="icon-circle">
          {/* Simple SVG Checkmark */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <div className="text-content">
          <h3 className="notif-title">{title || "Success!"}</h3>
          <p className="notif-message">{message || "Your message has been sent."}</p>
        </div>

        <button className="close-icon-btn" onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;