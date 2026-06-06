import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import "../css/ProjectDetail.css";
import img1 from '../assets/jarvis-cover.webp'
import img2 from '../assets/thumbsup.webp'
import img3 from '../assets/literasocial.webp'
import img4 from '../assets/jrv1.webp'
import img5 from '../assets/02.webp';
import img6 from '../assets/voltFinance.webp';
import img7 from '../assets/core.webp';
import volt1 from '../assets/volt-finance/1.jpeg';
import volt2 from '../assets/volt-finance/2.jpeg';
import volt4 from '../assets/volt-finance/4.jpeg';
import volt5 from '../assets/volt-finance/5.jpeg';
import volt6 from '../assets/volt-finance/6.jpeg';
import core1 from '../assets/core/1.jpeg';
import core2 from '../assets/core/2.jpeg';
import core3 from '../assets/core/3.jpeg';
import core4 from '../assets/core/4.jpeg';
import core5 from '../assets/core/5.jpeg';
import core6 from '../assets/core/6.jpeg';
import core7 from '../assets/core/7.jpeg';
import { Link, useParams } from 'react-router-dom';

// High-Performance Reusable Editorial Carousel
const ProjectCarousel = ({ images, title }) => {
    const imageList = Array.isArray(images) ? images : [images];
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!imageList || imageList.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
    };

    return (
        <div className="main-visual carousel-container">
            <div 
                className="carousel-track" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {imageList.map((img, idx) => (
                    <div className="carousel-slide" key={idx}>
                        <img src={img} alt={`${title} Asset ${idx + 1}`} loading="lazy" />
                    </div>
                ))}
            </div>

            {/* Render Navigation Layout Only for Multi-Image Arrays */}
            {imageList.length > 1 && (
                <>
                    <button onClick={prevSlide} className="carousel-btn prev-btn" aria-label="Previous Slide">
                        ←
                    </button>
                    <button onClick={nextSlide} className="carousel-btn next-btn" aria-label="Next Slide">
                        →
                    </button>
                    <div className="carousel-dots">
                        {imageList.map((_, idx) => (
                            <button
                                key={idx}
                                className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Maps to asset slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const projectDatas = [{
    title: "Jarvis AI Assistant",
    category: "Systems & Automation",
    duration: "4 Months | 2025",
    techList: ["FastAPI", "Node.js", "React Native", "MongoDB", "TensorFlow"],
    image: [img1],

    challengeText:
        "Most personal AI assistants rely heavily on cloud-based APIs, resulting in high latency, poor privacy guarantees, and weak contextual memory. The goal was to engineer a low-latency assistant capable of deterministic task execution while maintaining persistent, evolving conversational context across platforms.",

    architectureText:
        "The system follows a distributed microservices architecture optimized for responsiveness. A FastAPI service handles ML-based intent inference, while a Node.js gateway manages authentication, task orchestration, and real-time communication. This separation ensures compute-heavy inference does not block user-facing interactions on mobile clients.",

    detailedSteps: [
        {
            title: "Custom Intent Classification",
            description:
                "Designed and trained a localized intent classification model to route user prompts into deterministic system tasks or conversational flows. This reduced reliance on external APIs and improved average response latency by approximately 40%."
        },
        {
            title: "Sliding-Window Context Memory",
            description:
                "Implemented a sliding-window memory mechanism using MongoDB to persist recent conversational states. The system recalls the last N interactions to maintain continuity while avoiding unbounded memory growth."
        }
    ],

    features: [
        {
            name: "Cross-Platform Command Execution",
            detail:
                "Integrated JWT-secured REST APIs with WebSockets to enable real-time command execution and Android-native notification triggers from a web-based control interface.",
        },
        {
            name: "Hybrid Deterministic + ML Logic",
            detail:
                "Combined rule-based execution for critical actions (reminders, automation) with ML-driven interpretation for conversational prompts to ensure correctness without sacrificing flexibility.",
        }
    ],

    resultsText:
        "The deployed system achieved approximately 92% accuracy in intent routing across core task categories and manages thousands of contextual memory nodes per user, enabling a personalized experience that improves with continued use.",

    github: "https://github.com/root2jr",
    liveLink: "https://j-a-r-v-i-s-ai.netlify.app"
},
{
    title: "Real-Time Chat & Collaboration Platform",
    category: "Real-Time Systems",
    duration: "3 Months | 2025",
    techList: ["React", "FastAPI", "MongoDB", "WebSockets", "WebRTC"],
    image: [img2],

    challengeText:
        "Most student collaboration tools struggle with real-time consistency, role enforcement, and scalable communication. The objective was to design a low-latency, role-aware messaging platform capable of handling concurrent users with real-time updates and peer-to-peer communication.",

    architectureText:
        "The platform is built around a WebSocket-driven event architecture for real-time messaging and state synchronization. A FastAPI backend handles authentication, authorization, and data persistence, while WebRTC is used for peer-to-peer audio communication with WebSocket-based signaling.",

    detailedSteps: [
        {
            title: "WebSocket Messaging Engine",
            description:
                "Implemented a bidirectional WebSocket layer to support real-time messaging, presence updates, and live UI synchronization across clients with minimal overhead."
        },
        {
            title: "Role-Based Group Control",
            description:
                "Designed role-based access control to manage group leadership, join requests, and assignment creation, ensuring consistent permissions across all connected clients."
        }
    ],

    features: [
        {
            name: "Peer-to-Peer Audio Calling",
            detail:
                "Integrated WebRTC audio calling with WebSocket signaling to enable low-latency, direct communication between users without routing media through the backend."
        },
        {
            name: "Live Assignment Boards",
            detail:
                "Implemented real-time assignment creation and status updates, ensuring instant propagation of changes to all group members."
        }
    ],

    resultsText:
        "The system maintained stable real-time synchronization under concurrent usage and achieved sub-100ms message propagation latency during local and controlled network testing.",

    github: "https://github.com/root2jr",
    liveLink: "https://thumbsup07.netlify.app"
},
{
    title: "LiteraSocial",
    category: "Social Platforms & AI Integration",
    duration: "2.5 Months | 2025",
    techList: ["React Native", "Node.js", "MongoDB", "JWT", "AI Chat Systems"],
    image: [img3],

    challengeText:
        "Traditional social platforms prioritize engagement metrics over meaningful content discovery. The goal was to build a literature-focused social platform where content ranking is driven by interaction quality rather than raw popularity, while embedding AI-driven interaction within the ecosystem.",

    architectureText:
        "The backend follows a REST-driven architecture with MongoDB aggregation pipelines used to generate weighted content feeds. The mobile client is optimized for high-throughput rendering, while authentication and personalization are handled through JWT-secured APIs.",

    detailedSteps: [
        {
            title: "Weighted Content Ranking",
            description:
                "Designed MongoDB aggregation pipelines to rank posts dynamically based on likes, shares, and engagement velocity rather than static timestamps."
        },
        {
            title: "Efficient Mobile Rendering",
            description:
                "Optimized React Native FlatList rendering and state updates to ensure smooth performance for content-heavy feeds."
        }
    ],

    features: [
        {
            name: "Integrated AI Chat",
            detail:
                "Embedded an AI chatbot within the platform to enable contextual interaction, content assistance, and user engagement."
        },
        {
            name: "Secure Authentication",
            detail:
                "Implemented JWT-based authentication with hashed credentials to ensure secure access and session management."
        }
    ],

    resultsText:
        "The platform successfully delivered personalized content feeds with consistent performance under growing datasets and demonstrated stable interaction-driven ranking behavior.",

    github: "https://github.com/root2jr",
},
{
    title: "EdTech AI Learning Platform",
    category: "AI Systems & Education Technology",
    duration: "3 Months | 2025",
    techList: ["FastAPI", "Node.js", "React", "MongoDB", "Python", "NLP"],
    image: [img5],

    challengeText:
        "Most EdTech platforms rely on static content delivery and fail to adapt to individual learning patterns. The goal was to design an AI-driven system capable of understanding student intent, tracking learning context, and delivering adaptive responses without excessive cloud dependency or latency.",

    architectureText:
        "The platform follows a modular service-oriented architecture. A FastAPI-based AI service handles NLP-driven intent analysis and content recommendation logic, while a Node.js backend manages authentication, user progress tracking, and API orchestration. The frontend consumes these services via REST APIs to ensure scalability and maintainability.",

    detailedSteps: [
        {
            title: "Intent-Aware Learning Assistant",
            description:
                "Developed an intent classification pipeline to distinguish between conceptual doubts, revision requests, and assessment-related queries, enabling the system to route users to appropriate learning modules or AI-generated explanations."
        },
        {
            title: "Contextual Learning Memory",
            description:
                "Implemented a MongoDB-backed contextual memory layer to track user progress, recent topics, and weak areas, allowing the AI to generate responses aligned with the learner’s current state."
        }
    ],

    features: [
        {
            name: "Adaptive Content Delivery",
            detail:
                "The system dynamically adjusts explanations and recommendations based on user intent, past interactions, and topic difficulty, creating a personalized learning experience."
        },
        {
            name: "Secure Student Progress Tracking",
            detail:
                "Integrated JWT-secured APIs to safely manage user sessions, learning history, and performance metrics across devices."
        }
    ],

    resultsText:
        "The platform demonstrated consistent intent classification accuracy across core learning scenarios and successfully maintained contextual continuity across sessions, enabling personalized AI-assisted learning flows for students.",

    github: "https://github.com/root2jr",
    liveLink: "https://edtech-ai.netlify.app"
},
{
    title: "Jr-V1 Custom Language Interpreter",
    category: "Systems Programming",
    duration: "1.5 Months | 2024",
    techList: ["C", "Compiler Design", "Systems Programming"],
    image: [img4],

    challengeText:
        "High-level languages abstract away execution details, limiting understanding of how programs are actually parsed and executed. The objective was to build a custom interpreter from scratch to gain full control over lexical analysis, parsing, and runtime execution.",

    architectureText:
        "The interpreter follows a linear execution pipeline consisting of lexical scanning, recursive-descent parsing, and runtime evaluation. Each stage is isolated to ensure predictable behavior and simplified debugging.",

    detailedSteps: [
        {
            title: "Lexical Analysis",
            description:
                "Implemented a custom tokenizer to convert raw source code into structured tokens, handling identifiers, literals, and operators."
        },
        {
            title: "Parsing & Evaluation",
            description:
                "Built a recursive-descent parser to generate executable structures and a runtime evaluator to execute expressions with deterministic control flow."
        }
    ],

    features: [
        {
            name: "Deterministic Execution",
            detail:
                "Ensured predictable runtime behavior through strict execution rules and controlled memory access."
        },
        {
            name: "Robust Error Handling",
            detail:
                "Designed custom error-handling routines to catch syntax and runtime errors without crashing the interpreter."
        }
    ],

    resultsText:
        "The interpreter reliably executes custom scripts with consistent output, providing a clear understanding of language execution mechanics and low-level program control.",

    github: "https://github.com/root2jr",
},
{
    title: "Aptitude Test & Assessment Platform",
    category: "Assessment Systems & Educational Platforms",
    duration: "2 Months | 2025",
    techList: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    image: ["https://placehold.co/800x600/1a1a1a/FFFFFF/png?text=Aptitude+Test+System"],

    challengeText:
        "Most internal college assessment systems are rigid, insecure, and fail to scale beyond basic quizzes. The objective was to design a secure, role-based aptitude testing platform capable of handling timed assessments, automated evaluation, and real-time performance analytics for large student cohorts.",

    architectureText:
        "The platform follows a client–server architecture with a REST-driven backend. A Node.js and Express.js service manages authentication, exam orchestration, and evaluation logic, while MongoDB handles question banks, attempt records, and scoring data. The frontend consumes APIs to deliver a responsive, time-bound test-taking experience.",

    detailedSteps: [
        {
            title: "Timed Assessment Engine",
            description:
                "Implemented a deterministic test engine with server-enforced timers to prevent manipulation, ensuring consistent exam durations and fair evaluation across all users."
        },
        {
            title: "Automated Scoring & Result Processing",
            description:
                "Designed backend evaluation pipelines to auto-grade objective questions and persist attempt data for result generation and analysis."
        }
    ],

    features: [
        {
            name: "Role-Based Access Control",
            detail:
                "Integrated JWT-based authentication to differentiate student and administrator roles, enabling secure test creation, scheduling, and participation."
        },
        {
            name: "Performance Analytics",
            detail:
                "Generated per-user and aggregate performance summaries to help faculty analyze aptitude trends and student readiness."
        }
    ],

    resultsText:
        "The platform was successfully deployed within the college environment, supporting multiple concurrent assessments with consistent timing guarantees and reliable result generation for large student batches.",

    github: "https://github.com/root2jr",
},
{
    title: "Volt Finance AI",
    category: "FinTech & AI Ecosystem",
    duration: "Ongoing | 2026",
    techList: ["React Native", "FastAPI", "MongoDB", "Gemini 2.5 Flash"],
    image: [volt1, volt2, volt4, volt5, volt6],
    challengeText:
        "Standard finance trackers rely on retrospective logging and fail to account for 'Shadow Debt'—future planned commitments. The objective was to build a proactive, luxury-feel financial engine that calculates safe effective liquidity while utilizing AI to enforce budget discipline in real-time.",

    architectureText:
        "The ecosystem operates on a decoupled client-server architecture. A highly tactile, monochromatic React Native frontend communicates with an asynchronous Python FastAPI backend, which handles MongoDB state management and orchestrates low-latency background tasks with the Gemini AI API.",

    detailedSteps: [
        {
            title: "Shadow Debt Engine",
            description:
                "Engineered a dynamic ledger system that subtracts active capital pledges from the raw wallet balance, providing users with a highly conservative 'Effective Liquidity' metric."
        },
        {
            title: "Asynchronous AI Push Protocol",
            description:
                "Developed non-blocking background workers that analyze recent transaction clusters and trigger contextual, one-sentence AI-generated financial insights to the user's lock screen."
        }
    ],

    features: [
        {
            name: "Commitment Vault (Toggle Protocol)",
            detail:
                "Allows users to log, pause, and activate financial pledges, dynamically altering their effective balance without deleting data."
        },
        {
            name: "Hyper-Tactile Interface",
            detail:
                "Custom-built floating widgets, glassmorphic bottom sheets, and integrated haptic feedback systems designed to mimic a high-end operating system."
        }
    ],

    resultsText:
        "Volt Finance successfully merges rigorous mathematical state management with proactive AI interventions, resulting in a premium tool that actively prevents overspending and enforces financial discipline.",

    github: "https://github.com/root2jr/volt-finance",
},
{
    title: "CORE",
    category: "Intelligent Personal Assisting System",
    duration: "Ongoing | 2026",
    techList: ["React Native", "FastAPI", "MongoDB", "AsyncStorage", "Gemini API"],
    image: [core1, core2, core3, core4, core5, core6, core7],
    challengeText:
        "Productivity frameworks fragment personal optimization by isolating academic schedules, physical logs, and software development pipelines into distinct, disconnected silos. The objective was to construct a unified command center that reduces cognitive load, dynamically tracks multi-workspace metrics, and calculates true system efficiency.",

    architectureText:
        "The application employs a decoupled client-server architecture. A high-fidelity, monochromatic React Native mobile client interfaces with an asynchronous Python FastAPI backend handling user projections, while local persistence matrices are managed directly on the device using optimized AsyncStorage architectures.",

    detailedSteps: [
        {
            title: "Peak Performance Streak Engine",
            description:
                "Engineered a chronological date-loop validation mechanism that scans biometrics logs and attendance tables to calculate a user's true historical high-score streaks instead of basic retrospective logs."
        },
        {
            title: "Dynamic Workspace Hydration Layer",
            description:
                "Developed atomic data sync path protocols that seamlessly interface with MongoDB to handle active syllabus structures, credit weight distributions, and cloud-backed study notation environments."
        }
    ],

    features: [
        {
            name: "Segmented Metrics Grid Panel",
            detail:
                "A premium bento grid asset that isolates current academic track modules, totals semester credit workloads, and tracks real-time progress values inside a highly scannable grid interface."
        },
        {
            name: "Inline Academic Checklist System",
            detail:
                "Integrated highly responsive inline inputs and status toggle matrices directly into subject detail views, allowing local assignment and assessment deliverables to be updated instantly."
        }
    ],

    resultsText:
        "CORE successfully synthesizes rigorous mathematical workflow variables and real-time physical telemetry into a singular dashboard interface, delivering a premium tool that visually tracks overall personal execution.",

    github: "https://github.com/root2jr/Core",
}
];

const ProjectDetail = () => {
    const params = useParams();
    const [project, setProject] = useState(projectDatas[0]);
    const containerRef = useRef(null);
    const loaderRef = useRef(null);
    const date = new Date();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (params.id === "jarvis") {
            setProject(projectDatas[0]);
        } else if (params.id === "edtech-ai") {
            setProject(projectDatas[3]);
        } else if (params.id === "thumbsup") {
            setProject(projectDatas[1]);
        } else if (params.id === "aptitudetest") {
            setProject(projectDatas[5]);
        } else if (params.id === "literasocial") {
            setProject(projectDatas[2]);
        } else if (params.id === "jrv1-interpreter") {
            setProject(projectDatas[4]);
        } else if (params.id === "volt-finance") {
            setProject(projectDatas[6]);
        } else if (params.id === "core") {
            setProject(projectDatas[7]);
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.to(loaderRef.current, {
                duration: 1,
                height: 0,
                ease: "expo.inOut"
            })
                .from(".editorial-header, .main-visual, .editorial-body", {
                    opacity: 0,
                    y: 30,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out"
                });
        }, containerRef);

        return () => ctx.revert();
    }, [params.id]);

    return (
        <div ref={containerRef} className="editorial-wrapper">
            <div ref={loaderRef} className="gsap-loader" />
            <div className="editorial-footer">
                <Link to="/" className="premium-back-btn email-link">
                    <span className="arrow-mask">
                        <span className="arrow arrow-out">←</span>
                        <span className="arrow arrow-in">←</span>
                    </span>
                    <span className="back-text">Return Home</span>
                </Link>
            </div>

            {/* Header Area */}
            <header className="editorial-header">
                <h1 className="editorial-title">{project.title}</h1>
                <p className="eyebrow">{project.category} | {project.duration}</p>
                <div className="editorial-meta">
                    <div className="tech-stack-container">
                        {project.techList.map((tech, i) => (
                            <span key={i} className="tech-pill">{tech}</span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Injected the Dynamic Image Slider Component */}
            <ProjectCarousel images={project.image} title={project.title} />

            {/* Editorial Body */}
            <article className="editorial-body">

                <div className="content-row">
                    <aside className="side-heading">The Genesis</aside>
                    <div className="body-text">
                        <p>{project.challengeText}</p>
                    </div>
                </div>

                <div className="content-row">
                    <aside className="side-heading">Engineering</aside>
                    <div className="body-text">
                        <p>{project.architectureText}</p>
                        {project.detailedSteps.map((step, i) => (
                            <div key={i} className="inner-block">
                                <h4>{step.title}</h4>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-row">
                    <aside className="side-heading" style={{ padding: 0 }}>Capabilities</aside>
                    <div className="body-text">
                        {project.features.map((feature, i) => (
                            <div key={i} className="inner-block">
                                <h4>{feature.name}</h4>
                                <p>{feature.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-row">
                    <aside className="side-heading">Outcome</aside>
                    <div className="body-text">
                        <p className="highlight-text">{project.resultsText}</p>
                    </div>
                </div>

                {project.title === "Aptitude Test & Assessment Platform" ? null : (
                    <div className="meta-buttons">
                        <a href={project.github} target="_blank" rel="noreferrer" className="action-btn outline-btn">Source Code ↗</a>
                        {project.liveLink ? <a href={project.liveLink} target="_blank" rel="noreferrer" className="action-btn solid-btn">Live Site ↗</a> : null}
                    </div>
                )}

            </article>

            <div className="footer-bottom-2">
                <span className="copyright">© {date.getFullYear()} Jayaram. All Rights Reserved.</span>
                <span className="location">Made by Jayaram with React & GSAP</span>
            </div>
        </div>
    );
};

export default ProjectDetail;