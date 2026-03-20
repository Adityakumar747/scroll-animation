"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    {
        id: "stat1",
        value: "58%",
        label: "Increase in pick-up point use",
        color: "stat-lime",
        style: { top: "5%", right: "30%" },
    },
    {
        id: "stat2",
        value: "27%",
        label: "Increase in pick-up point use",
        color: "stat-dark",
        style: { top: "5%", right: "8%" },
    },
    {
        id: "stat3",
        value: "23%",
        label: "Decreased in customer phone calls",
        color: "stat-sky",
        style: { bottom: "5%", right: "30%" },
    },
    {
        id: "stat4",
        value: "40%",
        label: "Decreased in customer phone calls",
        color: "stat-orange",
        style: { bottom: "5%", right: "8%" },
    },
];

const HEADLINE = "WELCOME ITZFIZZ";

export default function HeroSection() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const roadRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const statsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const wrapper = wrapperRef.current;
            const trail = trailRef.current;
            const car = carRef.current;
            if (!wrapper || !trail || !car) return;

            const getEndX = () => {
                const carWidth = car.getBoundingClientRect().width || 345;
                return window.innerWidth - (carWidth / 2);
            };

            gsap.set(car, { x: 0 });

            gsap.from(roadRef.current, {
                scaleX: 0,
                duration: 0.8,
                ease: "power3.out",
                transformOrigin: "left center",
                delay: 0.2,
            });

            const totalLetters = lettersRef.current.length;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: "+=2600",
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        if (car && trail) {
                            const carRect = car.getBoundingClientRect();
                            const wrapperRect = wrapper.getBoundingClientRect();
                            const carFrontX = (carRect.right - wrapperRect.left);
                            const widthPercent = (carFrontX / wrapperRect.width) * 100;
                            gsap.set(trail, { width: `${Math.min(100, widthPercent)}%` });

                            const velocity = self.getVelocity();
                            const tilt = gsap.utils.clamp(-2, 2, velocity / 500);
                            gsap.set(car, { rotate: tilt });
                        }
                    }
                },
            });

            const getFinalX = () => {
                const carWidth = car.getBoundingClientRect().width;
                return window.innerWidth + carWidth;
            };

            tl.to(car, {
                x: getFinalX,
                ease: "none",
                duration: 10,
            });

            lettersRef.current.forEach((el, i) => {
                if (!el) return;

                const triggerPoint = (i / totalLetters) * 10;

                tl.fromTo(
                    el,
                    {
                        opacity: 0,
                        y: 25,
                        scale: 0.5,
                        filter: "blur(8px)"
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.4,
                        ease: "back.out(2)",
                    },
                    triggerPoint
                );
            });

            const statTimings = [2.0, 4.0, 6.5, 8.5];
            statsRef.current.forEach((el, i) => {
                if (!el) return;
                tl.fromTo(
                    el,
                    { opacity: 0, y: 30, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    },
                    statTimings[i]
                );
            });

            const handleResize = () => {
                ScrollTrigger.refresh();
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={wrapperRef} className="hero-wrapper" id="hero">
            <div ref={roadRef} className="road">
                <div ref={trailRef} className="trail" />

                <div className="headline-track">
                    <h1 className="headline-text" aria-label={HEADLINE}>
                        {HEADLINE.split("").map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => { lettersRef.current[i] = el; }}
                                className="headline-letter"
                                aria-hidden="true"
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>

            <div ref={carRef} className="car-container" role="img" aria-label="Orange McLaren sports car">
                <CarSVG />
            </div>


            {STATS.map((stat, i) => (
                <div
                    key={stat.id}
                    ref={(el) => { statsRef.current[i] = el; }}
                    className={`stat-card ${stat.color}`}
                    style={{ ...stat.style, transform: "translateY(16px)" }}
                    aria-label={`${stat.value} - ${stat.label}`}
                >
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                </div>
            ))}
        </section>
    );
}

function CarSVG() {
    return (
        <svg
            viewBox="0 0 400 220"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: "auto",
                height: "190px",
                filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.55))",
                display: "block",
            }}
            aria-hidden="true"
        >
            <ellipse cx="200" cy="110" rx="185" ry="72" fill="#f97316" />

            <path d="M 370 75 Q 400 110 370 145 L 325 138 Q 345 110 325 82 Z" fill="#f97316" />

            <path d="M 60 78 Q 20 110 60 142 L 90 135 Q 70 110 90 85 Z" fill="#ea6c10" />

            <ellipse cx="215" cy="110" rx="72" ry="42" fill="#1a1a2e" />
            <ellipse cx="225" cy="110" rx="52" ry="34" fill="#0d2144" opacity="0.9" />
            <ellipse cx="230" cy="100" rx="20" ry="10" fill="#1e90ff" opacity="0.18" transform="rotate(-15 230 100)" />

            <rect x="90" y="88" width="230" height="8" rx="4" fill="#1a1a1a" opacity="0.55" />
            <rect x="90" y="124" width="230" height="8" rx="4" fill="#1a1a1a" opacity="0.55" />

            <path d="M 328 65 Q 345 110 328 155 L 312 148 Q 326 110 312 72 Z" fill="#1a1a1a" />

            <path d="M 160 38 Q 155 50 162 65 L 210 65 Q 215 50 205 38 Z" fill="#1a1a1a" opacity="0.75" />
            <path d="M 160 182 Q 155 170 162 155 L 210 155 Q 215 170 205 182 Z" fill="#1a1a1a" opacity="0.75" />

            <rect x="15" y="20" width="16" height="180" rx="6" fill="#1a1a1a" />
            <rect x="7" y="68" width="20" height="12" rx="3" fill="#555" />
            <rect x="7" y="140" width="20" height="12" rx="3" fill="#555" />

            <ellipse cx="315" cy="28" rx="28" ry="22" fill="#222" />
            <ellipse cx="315" cy="28" rx="18" ry="14" fill="#3a3a3a" />
            <ellipse cx="315" cy="28" rx="7" ry="6" fill="#888" />
            <ellipse cx="315" cy="192" rx="28" ry="22" fill="#222" />
            <ellipse cx="315" cy="192" rx="18" ry="14" fill="#3a3a3a" />
            <ellipse cx="315" cy="192" rx="7" ry="6" fill="#888" />
            <ellipse cx="85" cy="22" rx="30" ry="26" fill="#222" />
            <ellipse cx="85" cy="22" rx="20" ry="17" fill="#3a3a3a" />
            <ellipse cx="85" cy="22" rx="7" ry="6" fill="#888" />
            <ellipse cx="85" cy="198" rx="30" ry="26" fill="#222" />
            <ellipse cx="85" cy="198" rx="20" ry="17" fill="#3a3a3a" />
            <ellipse cx="85" cy="198" rx="7" ry="6" fill="#888" />

            <path d="M 358 82 Q 368 95 368 110 L 360 110 Q 358 96 350 84 Z" fill="#ffe082" opacity="0.95" />
            <path d="M 358 138 Q 368 125 368 110 L 360 110 Q 358 124 350 136 Z" fill="#ffe082" opacity="0.95" />

            <path d="M 45 80 Q 35 95 35 110 L 42 110 Q 44 96 52 82 Z" fill="#ef4444" opacity="0.9" />
            <path d="M 45 140 Q 35 125 35 110 L 42 110 Q 44 124 52 138 Z" fill="#ef4444" opacity="0.9" />

            <ellipse cx="240" cy="88" rx="40" ry="12" fill="#fff" opacity="0.1" transform="rotate(-8 240 88)" />
        </svg>
    );
}
