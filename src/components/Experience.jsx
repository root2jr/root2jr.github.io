import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Experience.css';
import '../css/Projects.css';
import generic from '../assets/generic.png';
import cmco from '../assets/images.png';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
    {
        id: 2,
        img: generic,
        role: "Freelance Web developer",
        company: "Self-Employed",
        period: "Nov 2025 – Jan 2026",
        description: `<p>Designing and engineering full-stack web platforms using React, Node.js, and MongoDB. Focused on delivering production-ready applications with an emphasis on clean architecture, scalable backends, and high-fidelity user experiences.</p>`,
        skills: ["MongoDB", "React", "Express.js", "Node.js", "HTML", "CSS", "Artificial Intelligence", "Python", "FastAPI"]
    },
    {
        id: 1,
        img: cmco,
        role: "Digital Marketing and AI Research Intern",
        company: "Columbus Mckinnon Corporation EMEA",
        period: "Jan 2026 – Present",
        description: `<ul><li><strong>Systems Management:</strong> Orchestrating global digital workflows across CMS, PIM, and DAM ecosystems to maintain data integrity and asset distribution.<br/></li><li><strong>AI Research</strong>: Architecting a self-hosted LLM framework to optimize internal marketing operations through local inference and private RAG systems. <br/> </li><li><strong>Strategic Optimization:</strong> Analyzing enterprise infrastructure to propose secure, cost-effective AI solutions that ensure complete data sovereignty.</li></ul>`,
        skills: ["MS-Excel", "CMS", "PIM", "DAM", "HTML", "CSS", "Artificial Intelligence", "LLM"]
    },
];

const Experience = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const lineRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        // 1. Header Scrub (Matching Projects.jsx)
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

        // 2. Timeline Line Progress Animation
        gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".experience-list",
                    start: "top 70%",
                    end: "bottom 70%",
                    scrub: 1,
                }
            }
        );

        // 3. Experience Items Staggered Reveal
        itemRefs.current.forEach((el) => {
            gsap.fromTo(el,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1,
                        // Revert: true behavior via toggleActions
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !itemRefs.current.includes(el)) {
            itemRefs.current.push(el);
        }
    };

    return (
        <section className="experience-section" id="experience" ref={sectionRef}>
            <div className="experience-container">
                <div className="experience-header" ref={headerRef}>
                    <h2 className="section-title-2 outline-text">Experience</h2>
                </div>

                <div className="experience-list-wrapper">
                    {/* Vertical Progress Line */}
                    <div className="timeline-line-bg">
                        <div className="timeline-line-progress" ref={lineRef}></div>
                    </div>

                    <div className="experience-list">
                        {experienceData.map((exp) => (
                            <div className="experience-item" key={exp.id} ref={addToRefs}>
                                <div className="exp-dot"></div>

                                <div className="exp-time">
                                    <span className="period-tag">{exp.period}</span>
                                </div>

                                <div className="exp-content">
                                    <div className="exp-main">
                                        <h3 className="exp-role">{exp.role}</h3>
                                        <div className="company-wrapper">
                                            <img src={exp.img} />
                                            <h4 className="exp-company">{exp.company}</h4>
                                        </div>
                                    </div>

                                    <p className="exp-description" dangerouslySetInnerHTML={{ __html: exp.description }} />

                                    <div className="tech-stack">
                                        {exp.skills.map((skill, index) => (
                                            <span key={index} className="tech-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;