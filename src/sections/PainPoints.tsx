import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconClock, IconAnchor, IconCompass } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: IconClock,
    title: 'Sin tiempo para lo que importa',
    body: 'Pasas 12+ horas al dia en operativas, apagando incendios, sin poder dedicarte a estrategia, familia o descanso. Tu negocio te robo la vida.',
  },
  {
    icon: IconAnchor,
    title: 'Todo depende de ti',
    body: 'Tus empleados preguntan por cada decision. Los clientes exigen verte a ti. Si te ausentas un dia, todo se detiene. Construiste una jaula dorada, no una empresa.',
  },
  {
    icon: IconCompass,
    title: 'Sin rumbo ni proposito',
    body: 'No sabes donde estaras en 3 anos. No tienes un plan. Vas dia a dia reaccionando al mercado sin una vision que inspire a tu equipo y te guie en las decisiones.',
  },
];

const blurFadeStatements = [
  'Trabajas mas horas que tus empleados.',
  'Tu empresa depende enteramente de ti.',
  'No tienes claridad de hacia donde vas.',
];

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const blurWordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blur-fade effect for statements
      blurWordsRef.current.forEach((container) => {
        if (!container) return;
        const words = container.querySelectorAll('.bf-word');

        ScrollTrigger.create({
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          onUpdate: () => {
            const viewportCenter = window.innerHeight / 2;

            words.forEach((word) => {
              const wordEl = word as HTMLElement;
              const wordCenter = wordEl.getBoundingClientRect().top + wordEl.offsetHeight / 2;
              const dist = Math.abs(wordCenter - viewportCenter) / window.innerHeight;
              const opacity = Math.max(0.1, 1 - dist * 2.5);
              const blur = Math.max(0, dist * 8);
              wordEl.style.opacity = String(opacity);
              wordEl.style.filter = `blur(${blur}px)`;
            });
          },
        });
      });

      // Cards entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pain-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pain-points"
      ref={sectionRef}
      className="relative bg-warm-white"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Blur-Fade Statements */}
        <div className="flex flex-col" style={{ gap: '80px' }}>
          {blurFadeStatements.map((statement, idx) => (
            <div
              key={idx}
              ref={(el) => { blurWordsRef.current[idx] = el; }}
              className="min-h-[40vh] flex items-center"
              style={{ perspective: '1000px' }}
            >
              <div className="max-w-[900px]">
                {statement.split(' ').map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="bf-word inline-block mr-[0.3em] font-display font-normal text-navy leading-[1.1]"
                    style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)' }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pain Point Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
        >
          {painPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={idx}
                className="pain-card border-l-[3px] border-gold pl-6"
              >
                <Icon size={48} stroke="#c9a84c" className="mb-4" />
                <h3 className="font-display text-[28px] leading-[1.2] text-text-dark mb-3">
                  {point.title}
                </h3>
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  {point.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
