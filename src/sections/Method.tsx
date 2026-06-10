import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dimensions = [
  {
    index: '01',
    title: 'Planeacion Estrategica',
    description: 'Define a donde vas y como llegar. Un plan estrategico claro es el GPS de tu empresa.',
    questions: [
      'Tienes una vision clara a 3 anos?',
      'Sabes que decisiones tomar este trimestre para acercarte a esa vision?',
      'Tu equipo conoce y se alinea con esa direccion?',
    ],
  },
  {
    index: '02',
    title: 'Ventas y Marketing',
    description: 'Atrae clientes ideales y cierra mas ventas sin depender de tu presencia constante.',
    questions: [
      'Tienes un sistema de ventas predecible?',
      'Sabes exactamente quien es tu cliente ideal?',
      'Tu marketing genera leads cualificados automaticamente?',
    ],
  },
  {
    index: '03',
    title: 'Finanzas y Administracion',
    description: 'Entiende tus numeros y toma decisiones basadas en datos, no en intuicion.',
    questions: [
      'Conoces tu margen real de utilidad?',
      'Tienes proyecciones financieras claras?',
      'Sabes exactamente donde se va el dinero de tu empresa?',
    ],
  },
  {
    index: '04',
    title: 'Operaciones y Procesos',
    description: 'Sistematiza tus operaciones para que funcionen sin tu supervision constante.',
    questions: [
      'Tus procesos estan documentados?',
      'Podrias ausentarte 2 semanas sin que todo colapse?',
      'Tienes indicadores de desempeno para cada area?',
    ],
  },
  {
    index: '05',
    title: 'Talento Humano',
    description: 'Construye un equipo que piense y actue como dueno, que no necesite supervision constante.',
    questions: [
      'Tienes un equipo A que toma decisiones sin ti?',
      'Tus empleados conocen su rol y responsabilidades claras?',
      'Tienes un sistema de reclutamiento y retencion efectivo?',
    ],
  },
  {
    index: '06',
    title: 'Productividad y Tecnologia',
    description: 'Usa la tecnologia para multiplicar tu productividad y la de tu equipo.',
    questions: [
      'Tus herramientas tecnologicas ahorran tiempo o lo consumen?',
      'Tienes automatizaciones que eliminan tareas repetitivas?',
      'Tu equipo usa la tecnologia de forma eficiente?',
    ],
  },
  {
    index: '07',
    title: 'Liderazgo y Cultura',
    description: 'Lidera con proposito y construye una cultura que atraiga talento y retenga a los mejores.',
    questions: [
      'Tienes valores claros que guian las decisiones?',
      'Tu equipo se siente alineado con el proposito de la empresa?',
      'Eres el lider que tu organizacion necesita?',
    ],
  },
];

export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [closestIndex, setClosestIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.method-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Accordion items staggered entrance
      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll('.accordion-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: accordionRef.current, start: 'top 70%' },
          }
        );
      }

      // Progress bar
      if (progressRef.current && accordionRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: accordionRef.current,
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: true,
            },
          }
        );
      }

      // Track closest item for sticky label
      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll('.accordion-item');
        items.forEach((item, idx) => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setClosestIndex(idx),
            onEnterBack: () => setClosestIndex(idx),
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative bg-deep-blue"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      {/* Gradient fade top */}
      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-warm-white to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="method-header mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase">
              EL METODO
            </span>
            <span className="flex-1 h-[1px] bg-gold/40" />
          </div>
          <h2
            className="font-display font-normal text-warm-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 4vw, 72px)' }}
          >
            Siete dimensiones. Un solo sistema.
          </h2>
          <p className="mt-6 max-w-[600px] font-body text-[22px] leading-relaxed text-text-muted-dark">
            El metodo PROFIT + LIBRE aborda cada area critica de tu empresa para liberarte y hacerla crecer.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-[2px] bg-navy-light mb-8">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-gold origin-left"
            style={{ width: '100%', transform: 'scaleX(0)' }}
          />
        </div>

        {/* Sticky Label (Desktop) */}
        <div className="hidden lg:block absolute left-8 xl:left-12"
          style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <span className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase whitespace-nowrap">
            Area activa: {dimensions[closestIndex]?.title}
          </span>
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="relative">
          {dimensions.map((dim, idx) => (
            <div
              key={idx}
              className="accordion-item border-b border-gold/20"
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="py-6 cursor-pointer flex items-start gap-6 transition-transform duration-400"
                style={{
                  transform: activeIndex === idx ? 'rotate(-2.5deg)' : 'rotate(0deg)',
                }}
              >
                <span className="font-body text-xs font-semibold tracking-[0.12em] text-gold w-10 shrink-0 pt-1">
                  {dim.index}
                </span>
                <h3 className="font-display text-[28px] leading-[1.2] text-warm-white flex-1">
                  {dim.title}
                </h3>
              </div>

              {/* Expandable Content */}
              <div
                className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  maxHeight: activeIndex === idx ? '400px' : '0px',
                  opacity: activeIndex === idx ? 1 : 0,
                }}
              >
                <div className="pb-8 pl-16">
                  <p className="font-body text-lg leading-relaxed text-text-muted-dark mb-6 max-w-[700px]">
                    {dim.description}
                  </p>
                  <ul className="space-y-3">
                    {dim.questions.map((q, qIdx) => (
                      <li key={qIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                        <span className="font-body text-base text-text-muted-dark">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
