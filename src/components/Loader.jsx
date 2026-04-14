import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/Loader.css';

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const coreRef = useRef(null);
    const terminalRef = useRef(null);
    const progressRef = useRef(null);

    const totalBlocks = 10;
    const totalDashes = 20;
    const gearBlocksRef = useRef(new Array(totalBlocks).fill(null));
    const dashesRef = useRef(new Array(totalDashes).fill(null));

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // 1. Initial State: Pitch Black
            gsap.set([ coreRef.current, ...dashesRef.current], { opacity: 0 });
            gsap.set(gearBlocksRef.current, { boxShadow: "none", borderColor: "transparent" });

            tl.addLabel("start", 0.2);

            // 2. Techy Progress Bar
            tl.to(progressRef.current, {
                width: "100%",
                duration: 3.6,
                ease: "none"
            }, "start");

            // 3. Developer Portfolio Terminal Readouts
            tl.set(terminalRef.current, { innerText: "MOUNTING COMPONENTS..." }, "start")
                .set(terminalRef.current, { innerText: "RESOLVING DEPENDENCIES..." }, "start+=1.0")
                .set(terminalRef.current, { innerText: "FETCHING SELECTED WORKS..." }, "start+=1.8")
                .set(terminalRef.current, { innerText: "OPTIMIZING USER EXPERIENCE..." }, "start+=2.8")
                .set(terminalRef.current, { innerText: "DEPLOYMENT SUCCESSFUL" }, "start+=3.5");

            // 4. CHARGE SEQUENCE A: Outer Gear Blocks (Outside-In)
           // 4. CHARGE SEQUENCE A: Outer Gear Blocks (Solid Full Glow)
            tl.to(gearBlocksRef.current, {
                backgroundColor: "#ffffff",
                boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff",
                borderColor: "#ffffff",
                duration: 0.05,
                stagger: 0.1,
                ease: "none"
            }, "start");

            // 5. CHARGE SEQUENCE B: The Hexagonal Mesh
      
            // 6. CHARGE SEQUENCE C: Inner Dashed Ring
            tl.to(dashesRef.current, {
                opacity: 1,
                boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff",
                backgroundColor: "#ffffff",
                duration: 0.05,
                stagger: 0.05,
                ease: "none"
            }, "start+=1.8");

            // 7. CHARGE SEQUENCE D: Core Ignition
            tl.to(coreRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out"
            }, "start+=3.0");

            // 8. THE MILD FADE-OFF TRANSITION
            // Fade out the terminal text
            tl.to(".techy-loader-module", {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "start+=3.8");

            // Softly expand and dissolve the reactor itself
            tl.to(".reactor-container", {
                scale: 1.15,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out"
            }, "start+=4.0");

            // Smoothly fade away the black background to reveal the main site
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut"
            }, "start+=4.2");

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div className="arc-loader-wrapper" ref={containerRef}>
            <div className="reactor-container">

                <div className="reactor-base"></div>

                <div className="gear-blocks-frame">
                    {[...Array(totalBlocks)].map((_, i) => (
                        <div
                            key={i}
                            className="gear-block"
                            ref={el => gearBlocksRef.current[i] = el}
                            style={{ transform: `rotate(${i * (360 / totalBlocks)}deg) translateY(-105px)` }}
                        >
                            <div className="block-slits"></div>
                        </div>
                    ))}
                </div>

                <div className="inner-dashed-ring">
                    {[...Array(totalDashes)].map((_, i) => (
                        <div
                            key={i}
                            className="inner-dash"
                            ref={el => dashesRef.current[i] = el}
                            style={{ transform: `rotate(${i * (360 / totalDashes)}deg) translateY(-50px)` }}
                        ></div>
                    ))}
                </div>

                <div className="central-core" ref={coreRef}>
                    <div className="core-hotspot"></div>
                </div>
            </div>

            <div className="techy-loader-module">
                <div className="terminal-text" ref={terminalRef}>[SYS] STANDBY...</div>
                <div className="progress-bar-container">
                    <div className="progress-fill" ref={progressRef}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;