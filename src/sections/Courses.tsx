import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    image: '/images/course-thumb-1.jpg',
    title: 'Planeacion Estrategica para PyMEs',
    description: 'Define tu vision, mission, objetivos y KPIs. Deja de improvisar y empieza a construir con proposito.',
    price: '$1,497 MXN',
  },
  {
    image: '/images/course-thumb-2.jpg',
    title: 'Finanzas para No Financieros',
    description: 'Entiende tus estados financieros, calcula tu punto de equilibrio y toma decisiones basadas en numeros reales.',
    price: '$1,497 MXN',
  },
  {
    image: '/images/course-thumb-3.jpg',
    title: 'Liderazgo que Transforma',
    description: 'Desarrolla las habilidades de liderazgo que tu equipo necesita. Delega, motiva y construye una cultura de alto desempeno.',
    price: '$1,997 MXN',
  },
];

export default function Courses() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.courses-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Cards staggered entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.course-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative bg-deep-blue"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="courses-header mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase">
              APRENDE A TU RITMO
            </span>
            <span className="flex-1 h-[1px] bg-gold/40 max-w-[120px]" />
          </div>
          <h2
            className="font-display font-normal text-warm-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 4vw, 72px)' }}
          >
            Cursos en linea
          </h2>
          <p className="mt-4 font-body text-lg text-text-muted-dark">
            Formacion practica, disponible cuando tu quieras.
          </p>
        </div>

        {/* Course Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="course-card group cursor-pointer transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full aspect-video object-cover transition-transform duration-400 group-hover:scale-105"
                />
              </div>
              <div className="bg-navy-light rounded-b-xl p-8">
                <h3 className="font-display text-[22px] leading-[1.2] text-warm-white mb-3">
                  {course.title}
                </h3>
                <p className="font-body text-base text-text-muted-dark mb-4 line-clamp-3">
                  {course.description}
                </p>
                <p className="font-display text-xl text-gold mb-3">
                  {course.price}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase group/link"
                >
                  Ver curso
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
