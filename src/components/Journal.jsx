import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import '../css/Journal.css';

import defaultJournalCover from "../assets/journal.png";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Contact from './Contact';
import FooterReusable from './FooterReusable';
import ContactReusable from './ContactReusable';

gsap.registerPlugin(ScrollTrigger);

const API_BASE = 'https://core-irdo.onrender.com';
const categories = ["All", "Tech", "Design", "Reflections"];

const Journal = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const entryRefs = useRef([]);

  const [journals, setJournals] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // High-Fidelity Overlay Activation States
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const navigate = useNavigate();


  const handleRouteExitSequence = () => {
    navigate(-1);
  };

  // ─── PIPELINE SYNC: CLOUD PRODUCTION TELEMETRY ───
  useEffect(() => {
    const fetchPublishedEntries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE}/journal/published`);
        if (Array.isArray(response.data)) {
          setJournals(response.data);
        }
      } catch (error) {
        console.error("Failed to compile public journal streams:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublishedEntries();
  }, []);

  // ─── RUNTIME GSAP SCROLL ANCHOR STAGING ENGINE ───
  useEffect(() => {
    if (isLoading || journals.length === 0 || isReaderOpen) return;

    gsap.fromTo(headerRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 95%",
          end: "top 75%",
          scrub: 1,
        }
      }
    );

    entryRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(el,
        { y: 120, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 98%",
            end: "top 65%",
            scrub: 1,
          }
        }
      );

      const image = el.querySelector('.journal-img');
      if (image) {
        gsap.fromTo(image,
          { scale: 1.2, y: -20 },
          {
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, activeFilter, journals, isReaderOpen]);

  const handleOpenReader = (journalNode) => {
    setSelectedJournal(journalNode);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
    // Let the slide close animation exit entirely before wiping state references
    setTimeout(() => {
      setSelectedJournal(null);
    }, 500);
  };

  const addToRefs = (el) => {
    if (el && !entryRefs.current.includes(el)) {
      entryRefs.current.push(el);
    }
  };

  const generateSnippet = (entry) => {
    if (entry.description) return entry.description;
    if (!entry.body) return "No text context parsed inside timeline node.";
    return entry.body.length > 160 ? `${entry.body.substring(0, 160)}...` : entry.body;
  };

  const filteredEntries = useMemo(() => {
    return journals.filter(entry => {
      const entryCategory = entry.category || "Tech";
      if (activeFilter === "All") return true;
      return entryCategory.toUpperCase() === activeFilter.toUpperCase();
    });
  }, [journals, activeFilter]);

  return (
    <>
      <section className="journal-section" id="thoughts" ref={sectionRef}>
        <div className="journal-container">

          <div className="journal-header" ref={headerRef}>
            <button className="premium-back-btn" onClick={handleRouteExitSequence}>
              <span className="arrow-mask">
                <span className="arrow arrow-out">&larr;</span>
                <span className="arrow arrow-in">&larr;</span>
              </span>
              <span className="back-text">Back</span>
            </button>
            <h2 className="section-title-2 outline-text">Journal</h2>
          </div>

          {/* Dynamic Category Filter Pill Navigation */}


          {isLoading ? (
            <div className="journal-loader-canvas">
              <div className="custom-spinner"></div>
            </div>
          ) : (
            <div className="journal-grid">
              {filteredEntries.map((entry) => (
                <div className="journal-card" key={entry.id} ref={addToRefs}>

                  <Link
                    className="journal-image-wrapper"
                    to={`/journals/${entry.id}`}
                  >
                    <div className="img-overlay"></div>
                    <img
                      src={entry.image || defaultJournalCover}
                      loading="lazy"
                      alt={entry.title}
                      className="journal-img"
                    />
                    <div className="view-journal-btn">Read Journal</div>
                  </Link>

                  <div className="journal-content">
                    <div className="journal-top">
                      <div className="journal-meta">
                        <span className="journal-date">{entry.date || "UPDATED LOG"}</span>
                        <span className="meta-divider">•</span>
                      </div>
                    </div>

                    <h3 className="journal-title" onClick={() => handleOpenReader(entry)}>
                      {entry.title}
                    </h3>
                    <p className="journal-description">{generateSnippet(entry)}</p>

                    <div className="tech-stack">
                      {entry.tags && entry.tags.length > 0 ? (
                        entry.tags.map((tag, idx) => (
                          <span key={idx} className="tech-tag">{tag}</span>
                        ))
                      ) : (
                        <span className="tech-tag">#{entry.mood || "CLARITY"}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredEntries.length === 0 && (
            <div className="journal-empty-canvas">
              <p className="empty-context-msg">No published vectors recorded inside the {activeFilter} matrix snapshot.</p>
            </div>
          )}


        </div>
      </section>
      <FooterReusable />
    </>
  );
};

export default Journal;