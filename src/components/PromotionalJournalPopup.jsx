import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';
import '../css/PromotionalJournalPopup.css';


const PromotionalJournalPopup = () => {
    const navigate = useNavigate();
    const [latestEntry, setLatestEntry] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const popupRef = useRef(null);

    useEffect(() => {
        const fetchLatestBroadcastNode = async () => {


            setTimeout(() => {
                setIsVisible(true);
            }, 2000);


        };

        fetchLatestBroadcastNode();
    }, []);

    useEffect(() => {
        if (isVisible && popupRef.current) {
            gsap.fromTo(popupRef.current,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.98
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.65,
                    ease: "power3.out"
                }
            );
        }
    }, [isVisible]);

    const handleDismissSequence = (e) => {
        e.stopPropagation();
        if (popupRef.current) {
            gsap.to(popupRef.current, {
                y: 60,
                opacity: 0,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => setIsVisible(false)
            });
        } else {
            setIsVisible(false);
        }
    };

    const handleNavigateToEntry = () => {
        setIsVisible(false);
        navigate(`/journals/jnl_1782872088211`);
    };

    if (!isVisible) return null;

    return (
        <div className="promo-popup-anchor" ref={popupRef} onClick={handleNavigateToEntry}>
            <div className="promo-popup-layout">

                <button className="promo-popup-close-btn" onClick={handleDismissSequence}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="promo-eyebrow-row">
                    <span className="promo-pulse-dot"></span>
                    <span className="promo-eyebrow-text">
                        NEW JOURNAL
                    </span>
                </div>

                <h3 className="promo-title">One Day Trip To Ooty</h3>

                <p className="promo-description">
                    I'm writing this journal on July 1, 2026. Two days after a memorable one day tri..
                </p>

                <div className="promo-action-footer">
                    <div className="promo-link-bracket">
                        <span className="promo-action-text">Read Journal</span>
                        <span className="promo-kinetic-arrow">&rarr;</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PromotionalJournalPopup;