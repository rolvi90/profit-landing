import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconMail, IconDocument, IconRadar, IconStar, IconVideo, IconUsers } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const freeResources = [
  {
    icon: IconMail,
    title: 'Newsletter Semanal',
    description: 'Estrategias practicas, herramientas y reflexiones directo a tu inbox cada semana.',
    link: 'Suscribirme',
  },
  {
    icon: IconDocument,
    title: 'Plantillas y Frameworks',
    description: 'Plantillas de planeacion estrategica, organigramas, scorecards y mas. Listas para usar.',
    link: 'Descargar',
  },
  {
    icon: IconRadar,
    title: 'Analisis 360° Rapido',
    description: 'Evalua en 10 minutos las 7 dimensiones de tu empresa y descubre tus puntos criticos.',
    link: 'Hacer analisis',
  },
];

const paidOfferings = [
  {
    icon: IconStar,
    title: 'Programa PROFIT + LIBRE',
    description: 'Acompañamiento integral de 6 meses. Las 7 dimensiones, sesiones 1 a 1, grupo mastermind y herramientas exclusivas.',
    link: 'Conocer programa',
  },
  {
    icon: IconVideo,
    title: 'Cursos en Linea',
    description: 'Cursos grabados sobre planeacion estrategica, finanzas para no financieros, liderazgo y mas. Acceso de por vida.',
    link: 'Ver cursos',
  },
  {
    icon: IconUsers,
    title: 'Comunidad de Dueños',
    description: 'Membresia con acceso a grupo privado, sesiones mensuales de Q&A, plantillas exclusivas y red de apoyo.',
    link: 'Unirme',
  },
];

export default function Resources() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel slide in
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Right panel slide in
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Stagger items within panels
      if (leftRef.current) {
        const items = leftRef.current.querySelectorAll('.resource-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            delay: 0.3,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }

      if (rightRef.current) {
        const items = rightRef.current.querySelectorAll('.resource-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            delay: 0.3,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="resources"
      ref={sectionRef}
      className="relative"
    >
      <div className="flex flex-col md:flex-row min-h-[500px]">
        {/* Left Panel - Free Resources */}
        <div
          ref={leftRef}
          className="flex-1 bg-warm-white"
          style={{ padding: 'clamp(80px, 12vh, 160px) clamp(24px, 4vw, 80px)' }}
        >
          <div className="max-w-[520px] ml-auto mr-auto md:mr-10">
            <span className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase">
              CONTENIDO GRATUITO
            </span>
            <h2
              className="font-display font-normal text-text-dark leading-[1.05] tracking-[-0.02em] mt-4"
              style={{ fontSize: 'clamp(30px, 3.5vw, 56px)' }}
            >
              Empieza a transformar tu empresa hoy
            </h2>
            <p className="mt-4 font-body text-lg text-text-muted max-w-[480px]">
              Recursos practicos, sin costo, para dueños de PyMEs que quieren resultados inmediatos.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {freeResources.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="resource-item">
                    <Icon size={32} stroke="#c9a84c" />
                    <h3 className="font-display text-[22px] leading-[1.2] text-text-dark mt-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-text-muted mt-1">
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 mt-2 font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase group"
                    >
                      {item.link}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                );
              })}
            </div>

            <a
              href="#"
              className="mt-10 inline-flex items-center font-body text-sm font-semibold tracking-[0.08em] uppercase px-9 py-3.5 bg-gold text-navy rounded-full transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
            >
              QUIERO MIS RECURSOS GRATIS
            </a>
          </div>
        </div>

        {/* Right Panel - Paid Offerings */}
        <div
          ref={rightRef}
          className="flex-1 bg-navy"
          style={{ padding: 'clamp(80px, 12vh, 160px) clamp(24px, 4vw, 80px)' }}
        >
          <div className="max-w-[520px] mr-auto ml-auto md:ml-10">
            <span className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase">
              PROGRAMAS Y CURSOS
            </span>
            <h2
              className="font-display font-normal text-warm-white leading-[1.05] tracking-[-0.02em] mt-4"
              style={{ fontSize: 'clamp(30px, 3.5vw, 56px)' }}
            >
              Acelera tu transformacion
            </h2>
            <p className="mt-4 font-body text-lg text-text-muted-dark max-w-[480px]">
              Programas estructurados con acompañamiento directo para resultados medibles y permanentes.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {paidOfferings.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="resource-item">
                    <Icon size={32} stroke="#c9a84c" />
                    <h3 className="font-display text-[22px] leading-[1.2] text-warm-white mt-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-text-muted-dark mt-1">
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 mt-2 font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase group"
                    >
                      {item.link}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                );
              })}
            </div>

            <a
              href="#"
              className="mt-10 inline-flex items-center font-body text-sm font-semibold tracking-[0.08em] uppercase px-9 py-3.5 border border-gold text-gold bg-transparent rounded-full transition-all duration-300 hover:bg-gold hover:text-navy"
            >
              QUIERO ACELERAR MI CRECIMIENTO
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
