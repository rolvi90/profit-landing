import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

const stats = [
  { number: 15, suffix: '+', label: 'horas liberadas por semana' },
  { number: 3, suffix: 'x', label: 'crecimiento en ingresos' },
  { number: 12, suffix: '', label: 'empresas transformadas este ano' },
];

const testimonials = [
  {
    avatar: '/images/testimonial-avatar-1.jpg',
    quote: 'En 6 meses pasé de trabajar 70 horas semanales a tener un equipo que opera sin mi. Mi empresa crecio 40% y por primera vez en 5 anos tome vacaciones.',
    name: 'Carlos M.',
    role: 'Director General, Manufactura',
  },
  {
    avatar: '/images/testimonial-avatar-2.jpg',
    quote: 'El metodo PROFIT me dio claridad total. Por primera vez tengo un plan a 3 anos que mi equipo entiende y ejecuta. Las finanzas dejaron de ser un misterio.',
    name: 'Ana L.',
    role: 'Fundadora, Consultoria de IT',
  },
  {
    avatar: '/images/testimonial-avatar-3.jpg',
    quote: 'Pense que contratar un coach era un gasto. Fue la mejor inversion de mi vida. Mi empresa vale el doble y yo valgo mi tiempo de nuevo.',
    name: 'Roberto S.',
    role: 'Propietario, Cadena de Restaurantes',
  },
  {
    avatar: '/images/testimonial-avatar-4.jpg',
    quote: 'Pasamos de ser 5 personas haciendo todo a 15 con procesos claros. Mis empleados toman decisiones sin preguntarme cada detalle. Es libertad real.',
    name: 'Diana R.',
    role: 'CEO, Empresa de Logistica',
  },
  {
    avatar: '/images/testimonial-avatar-5.jpg',
    quote: 'El analisis 360 que ofrece como recurso gratuito me abrio los ojos. Contrate el programa completo y en 4 meses duplique mi margen de utilidad.',
    name: 'Fernando H.',
    role: 'Fundador, Agencia Digital',
  },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number');
        const separators = statsRef.current.querySelectorAll('.stat-separator');
        const labels = statsRef.current.querySelectorAll('.stat-label');

        statNumbers.forEach((el) => {
          const target = parseInt((el as HTMLElement).dataset.target || '0');
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 75%' },
            onUpdate: () => {
              (el as HTMLElement).textContent = Math.round(obj.val).toString();
            },
          });
        });

        gsap.fromTo(
          separators,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 75%' },
          }
        );

        gsap.fromTo(
          labels,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            delay: 0.8,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 75%' },
          }
        );
      }

      // Draggable slider
      if (sliderWrapperRef.current && sliderContainerRef.current) {
        const wrapper = sliderWrapperRef.current;
        const container = sliderContainerRef.current;
        const slides = container.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;
        const slideWidth = slides[0]?.getBoundingClientRect().width || 350;
        const gap = 32;

        const maxDrag = -(container.scrollWidth - wrapper.clientWidth);

        const draggable = Draggable.create(container, {
          type: 'x',
          bounds: { minX: maxDrag, maxX: 0 },
          edgeResistance: 0.8,
          inertia: true,
          onDrag: updateActiveSlide,
          onThrowUpdate: updateActiveSlide,
        })[0];

        function updateActiveSlide() {
          const x = gsap.getProperty(container, 'x') as number;
          const slideFullWidth = slideWidth + gap;
          const idx = Math.round(Math.abs(x) / slideFullWidth);
          setActiveSlide(Math.max(0, Math.min(idx, totalSlides - 1)));
        }

        return () => {
          draggable.kill();
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative bg-navy overflow-hidden"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase">
              RESULTADOS
            </span>
            <span className="flex-1 h-[1px] bg-gold/40 max-w-[120px]" />
          </div>
          <h2
            className="font-display font-normal text-warm-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 4vw, 72px)' }}
          >
            Transformaciones reales
          </h2>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div
                className="font-display font-light text-gold leading-none tracking-[-0.02em]"
                style={{ fontSize: 'clamp(40px, 6vw, 96px)' }}
              >
                <span className="stat-number" data-target={stat.number}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <div
                className="stat-separator w-[60px] h-[1px] mx-auto my-4 origin-center"
                style={{ backgroundColor: 'rgba(201, 168, 76, 0.3)', transform: 'scaleX(0)' }}
              />
              <p className="stat-label font-body text-lg text-text-muted-dark">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Slider */}
        <div ref={sliderWrapperRef} className="relative overflow-hidden pb-12">
          <div
            ref={sliderContainerRef}
            className="flex gap-8 cursor-grab active:cursor-grabbing"
            style={{ willChange: 'transform' }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="testimonial-card shrink-0 bg-cream rounded-2xl p-10 select-none"
                style={{ width: 'clamp(300px, 25vw, 400px)' }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gold mb-6"
                  draggable={false}
                />
                <p className="font-display text-[24px] md:text-[32px] font-light italic leading-[1.4] text-text-dark mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-body text-xs font-semibold tracking-[0.12em] text-text-muted uppercase">
                  — {t.name}, {t.role}
                </p>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className="w-8 h-[2px] rounded-full transition-opacity duration-300"
                style={{
                  backgroundColor: '#c9a84c',
                  opacity: activeSlide === idx ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
