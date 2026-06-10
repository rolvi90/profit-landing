import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const word3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Video fade in
      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0.2
      );

      // Word 1: "Libera" - character stagger
      if (word1Ref.current) {
        const chars1 = word1Ref.current.querySelectorAll('.hero-char');
        tl.fromTo(
          chars1,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: 'power3.out' },
          0.6
        );
      }

      // Word 2: "tu tiempo," - character stagger
      if (word2Ref.current) {
        const chars2 = word2Ref.current.querySelectorAll('.hero-char');
        tl.fromTo(
          chars2,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: 'power3.out' },
          1.1
        );
      }

      // Word 3: "crece seguro." - character stagger
      if (word3Ref.current) {
        const chars3 = word3Ref.current.querySelectorAll('.hero-char');
        tl.fromTo(
          chars3,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: 'power3.out' },
          1.6
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.9, y: 0, duration: 0.6 },
        2.0
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        2.3
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        2.6
      );

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(4, 28, 59, 0.5) 0%, rgba(0, 13, 33, 0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center flex flex-col items-center">
        {/* Overlapping Headlines */}
        <h1 className="font-display font-light leading-[0.9] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}>
          <div ref={word1Ref} className="text-warm-white whitespace-nowrap"
            style={{ textShadow: '0 2px 30px rgba(0, 13, 33, 0.4)' }}>
            {splitText('Libera')}
          </div>
          <div ref={word2Ref} className="text-warm-white whitespace-nowrap ml-[15%]"
            style={{ textShadow: '0 2px 30px rgba(0, 13, 33, 0.4)' }}>
            {splitText('tu tiempo,')}
          </div>
          <div ref={word3Ref} className="text-gold-light whitespace-nowrap -mt-[0.15em] -ml-[10%]"
            style={{ textShadow: '0 2px 30px rgba(0, 13, 33, 0.4)' }}>
            {splitText('crece seguro.')}
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-10 max-w-[560px] font-body text-lg md:text-[22px] leading-relaxed text-warm-white"
        >
          Metodo PROFIT + LIBRE para duenos de PyMEs que quieren liberar su tiempo, crecer con confianza y dar rumbo a su organizacion.
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#method"
          className="mt-10 inline-flex items-center font-body text-sm font-semibold tracking-[0.08em] uppercase px-9 py-3.5 bg-gold text-navy rounded-full transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:-translate-y-0.5"
        >
          CONOCE EL METODO
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => {
          const el = document.getElementById('pain-points');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(250, 249, 247, 0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
