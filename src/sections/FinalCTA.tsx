import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children[0],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          children[1],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          children[2],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          children[3],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative bg-navy overflow-hidden"
      style={{
        padding: 'clamp(120px, 18vh, 200px) 0',
        background: 'radial-gradient(ellipse at center, rgba(201, 168, 76, 0.05) 0%, transparent 70%), #041c3b',
      }}
    >
      <div
        ref={contentRef}
        className="max-w-[800px] mx-auto px-6 text-center flex flex-col items-center"
      >
        <h2
          className="font-display font-normal text-warm-white leading-[1.1]"
          style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}
        >
          Tu empresa puede funcionar sin ti. Y tu puedes vivir sin trabajar 70 horas
          <span className="text-gold">.</span>
        </h2>

        <p className="mt-8 max-w-[600px] font-body text-[22px] leading-relaxed text-text-muted-dark">
          Agenda una llamada estrategica gratuita de 30 minutos. Analizaremos tu situacion actual y te daremos un plan claro para liberar tu tiempo y hacer crecer tu empresa.
        </p>

        <a
          href="#"
          className="mt-10 inline-flex items-center font-body text-base font-semibold tracking-[0.08em] uppercase px-12 py-4 bg-gold text-navy rounded-full transition-all duration-300 hover:bg-gold-light hover:shadow-[0_6px_30px_rgba(201,168,76,0.4)] hover:-translate-y-0.5"
        >
          AGENDAR MI LLAMADA GRATUITA
        </a>

        <p className="mt-5 font-body text-xs font-semibold tracking-[0.12em] text-text-muted-dark uppercase">
          Sin compromiso. 100% confidencial.
        </p>
      </div>
    </section>
  );
}
