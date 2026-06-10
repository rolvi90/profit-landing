import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconLinkedIn } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

export default function LinkedInCommunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative bg-cream"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      <div
        ref={contentRef}
        className="max-w-[700px] mx-auto px-6 text-center flex flex-col items-center"
      >
        <IconLinkedIn size={80} className="text-navy mb-8" />

        <h2
          className="font-display font-normal text-text-dark leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(36px, 4vw, 72px)' }}
        >
          Conecta en LinkedIn
        </h2>

        <p className="mt-6 font-body text-[22px] leading-relaxed text-text-muted">
          Comparto contenido diario sobre liderazgo, estrategia, finanzas y crecimiento empresarial. Mas de 15,000 dueños de PyMEs ya forman parte de la comunidad. Unete a la conversacion.
        </p>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center font-body text-sm font-semibold tracking-[0.08em] uppercase px-9 py-3.5 border border-navy text-navy bg-transparent rounded-full transition-all duration-300 hover:bg-navy hover:text-warm-white"
        >
          SEGUIR EN LINKEDIN
        </a>
      </div>
    </section>
  );
}
