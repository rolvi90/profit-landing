import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import Logo from './Logo';
import { IconMenu, IconClose } from './Icons';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  lenisRef: React.RefObject<InstanceType<typeof Lenis> | null>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'METODO', href: '#method' },
    { label: 'RECURSOS', href: '#resources' },
    { label: 'COMUNIDAD', href: '#community' },
    { label: 'CURSOS', href: '#courses' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('.nav-link');
      gsap.fromTo(
        links,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.1, delay: 0.3, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -72 });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full h-[72px] flex items-center z-[100] transition-all duration-400"
        style={{
          backgroundColor: scrolled ? 'rgba(4, 28, 59, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="opacity-0"
            style={{ animation: 'fadeIn 0.6s ease 0.4s forwards' }}
          >
            <Logo className="w-[130px] md:w-[150px]" />
          </a>

          {/* Desktop Nav Links */}
          <div ref={linksRef} className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="nav-link group relative font-body text-xs font-semibold tracking-[0.12em] text-warm-white uppercase opacity-0"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold transform scale-x-0 origin-left transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#cta"
            onClick={(e) => { e.preventDefault(); scrollTo('#cta'); }}
            className="hidden md:inline-flex items-center font-body text-xs font-semibold tracking-[0.08em] uppercase px-6 py-2.5 border border-gold text-gold rounded-full transition-all duration-300 hover:bg-gold hover:text-navy opacity-0"
            style={{ animation: 'fadeIn 0.6s ease 0.5s forwards' }}
          >
            AGENDA UNA LLAMADA
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gold"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <IconMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 bg-navy z-[200] flex flex-col items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden"
        style={{ transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <button
          className="absolute top-6 right-6 text-gold"
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar"
        >
          <IconClose size={28} />
        </button>

        <div className="flex flex-col items-center gap-8 mb-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="font-body text-sm font-semibold tracking-[0.12em] text-warm-white uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#cta"
          onClick={(e) => { e.preventDefault(); scrollTo('#cta'); }}
          className="font-body text-xs font-semibold tracking-[0.08em] uppercase px-8 py-3 border border-gold text-gold rounded-full"
        >
          AGENDA UNA LLAMADA
        </a>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
