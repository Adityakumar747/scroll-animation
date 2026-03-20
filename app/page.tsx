import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section className="below-fold" id="about">
        <h2>BUILT WITH PRECISION</h2>
        <p>
          This scroll-driven hero section demonstrates the power of GSAP
          ScrollTrigger combined with Next.js and Tailwind CSS. Every frame is
          tied directly to scroll position — no timers, no autoplay. Just pure,
          performant motion.
        </p>
        <p>
          The green trail, letter-by-letter headline reveal, and staggered
          statistics all synchronise perfectly with the McLaren&apos;s journey across
          the viewport — creating a premium, interactive experience that
          showcases modern frontend animation techniques.
        </p>
        <div className="tech-grid">
          {[
            "Next.js 14",
            "React 18",
            "TypeScript",
            "Tailwind CSS",
            "GSAP 3",
            "ScrollTrigger",
            "App Router",
            "Google Fonts",
          ].map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
