import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';
import '../css/FullScreenJournal.css';
import Footer from './Footer';
import ContactReusable from './ContactReusable';
import FooterReusable from './FooterReusable';

const API_BASE = 'https://core-irdo.onrender.com';

const FullscreenJournal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [journal, setJournal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const bodyRef = useRef(null);

    // ─── STAGE DATA TELEMETRY FROM BACKEND INDICES ───
    useEffect(() => {
        const fetchTargetJournalNode = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_BASE}/journal/published/${id}`);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setJournal(response.data[0]);
                } else if (response.data && !Array.isArray(response.data)) {
                    setJournal(response.data);
                }
            } catch (error) {
                console.error("Critical error syncing standalone journal segment down the wire:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchTargetJournalNode();
    }, [id]);

    // ─── GRAPHICS ACCELERATION TRANSITIONS (GSAP) ───
    useEffect(() => {
        if (isLoading || !journal || !containerRef.current) return;

        window.scrollTo(0, 0);

        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        gsap.fromTo([headerRef.current, bodyRef.current],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.1, stagger: 0.1, ease: "power3.out" }
        );
    }, [isLoading, journal]);

    const handleRouteExitSequence = () => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => navigate(-1)
            });
        } else {
            navigate(-1);
        }
    };

    // ─── COMPREHENSIVE EDITORIAL PARSING ENGINE ───
    const parseInlineElements = (textText) => {
        // FIXED: tokenRegex now captures double quotes ("..."), parentheses (...), and backticks (`...`)
        const tokenRegex = /("(?:[^"\\]|\\.)*")|(\([^)]+\))|(`(?:[^`\\]|\\.)*`)/g;
        const segments = textText.split(tokenRegex);

        return segments.map((segment, index) => {
            if (!segment) return null;

            // Match 1: Double Quotes Block
            if (segment.startsWith('"') && segment.endsWith('"')) {
                return (
                    <span key={index} className="highlight-quote">
                        {segment}
                    </span>
                );
            }

            // Match 2: Parentheses Internal Mind Voice Block
            if (segment.startsWith('(') && segment.endsWith(')')) {
                return (
                    <span key={index} className="mind-voice">
                        {segment}
                    </span>
                );
            }

            // Match 3: Backtick Date Frame Highlight (Strips out ` characters entirely)
            if (segment.startsWith("`") && segment.endsWith("`")) {
                const cleanDateText = segment.slice(1, -1);
                return (
                    <span key={index} className="highlight-date-token">
                        {cleanDateText}
                    </span>
                );
            }

            // Default: Standard clean prose
            return segment;
        });
    };

    const renderEditorialBody = (rawBody) => {
        if (!rawBody) return null;

        const paragraphs = rawBody.split('\n').filter(p => p.trim() !== '');
        let dropCapApplied = false;

        return paragraphs.map((paragraph, pIndex) => {
            if (!dropCapApplied && paragraph.length > 0) {
                dropCapApplied = true;

                const firstLetter = paragraph.charAt(0);
                const remainingText = paragraph.slice(1);

                return (
                    <p key={pIndex} className="editorial-paragraph-node first-paragraph">
                        <span className="drop-cap">{firstLetter}</span>
                        {parseInlineElements(remainingText)}
                    </p>
                );
            }

            return (
                <p key={pIndex} className="editorial-paragraph-node">
                    {parseInlineElements(paragraph)}
                </p>
            );
        });
    };

    if (isLoading) {
        return (
            <div className="editorial-wrapper fullscreen-loading-frame">
                <div className="custom-spinner"></div>
            </div>
        );
    }

    if (!journal) {
        return (
            <div className="editorial-wrapper fullscreen-loading-frame">
                <p className="empty-context-msg">The requested journal is either unpublished or not published yet.</p>
                <button className="premium-back-btn" style={{ marginTop: 24 }} onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="editorial-wrapper standalone-journal-page" ref={containerRef}>

            {/* KINETIC ARROW BACK BUTTON HEADER */}
            <div className="editorial-footer reader-top-nav">
                <button className="premium-back-btn" onClick={handleRouteExitSequence}>
                    <span className="arrow-mask">
                        <span className="arrow arrow-out">&larr;</span>
                        <span className="arrow arrow-in">&larr;</span>
                    </span>
                    <span className="back-text">Back</span>
                </button>
            </div>

            <div className="scrollable-reader-body">

                {/* EDITORIAL HEADER HERO MATRIX */}
                <header className="editorial-header" ref={headerRef}>
                    <h1 className="editorial-title">{journal.title}</h1>
                    <div className="eyebrow">
                        <span>{journal.date ? journal.date.toUpperCase() : "LOG SNAPSHOT"}</span>
                        <span className="meta-dot-divider"> &bull; </span>
                    </div>

                    <div className="editorial-meta">
                        <div className="tech-stack-container">
                            {journal.tags && journal.tags.length > 0 ? (
                                journal.tags.map((tag, idx) => (
                                    <span key={idx} className="tech-pill">{tag}</span>
                                ))
                            ) : (
                                <span className="tech-pill">#{journal.mood || "CLARITY"}</span>
                            )}
                        </div>
                    </div>
                </header>

                {/* CONTENT ROW ARCHITECTURE */}
                <div className="editorial-body" ref={bodyRef}>

                    <div className="content-row">
                        <div className="side-heading">BODY</div>
                        <div className="body-text raw-journal-stream">
                            {renderEditorialBody(journal.body)}
                        </div>
                    </div>

                    {/* DYNAMIC ACTION BRACKETS FOOTER MATRIX */}
                    


                </div>
            </div>
            <ContactReusable />
            <FooterReusable />

        </div>
    );
};

export default FullscreenJournal;