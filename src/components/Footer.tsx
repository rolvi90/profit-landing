import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './Logo';
import { IconLinkedIn } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = footerRef.current?.querySelectorAll('.footer-col');
      if (cols) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: 'Metodo', href: '#method' },
    { label: 'Recursos', href: '#resources' },
    { label: 'Comunidad', href: '#community' },
    { label: 'Cursos', href: '#courses' },
  ];

  const resourceLinks = [
    { label: 'Newsletter', href: '#' },
    { label: 'Plantillas', href: '#' },
    { label: 'Analisis 360', href: '#' },
    { label: 'Cursos', href: '#courses' },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-deep-blue"
      style={{ padding: 'clamp(60px, 8vh, 100px) 0 30px' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo */}
          <div className="footer-col">
            <Logo className="w-[150px] mb-4" />
            <p className="font-body text-base leading-relaxed text-text-muted-dark">
              Libera tu tiempo. Crece seguro. Da rumbo a tu empresa.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4 className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase mb-4">
              NAVEGACION
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-xs tracking-[0.1em] text-text-muted-dark uppercase hover:text-warm-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase mb-4">
              RECURSOS
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-xs tracking-[0.1em] text-text-muted-dark uppercase hover:text-warm-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="footer-col">
            <h4 className="font-body text-xs font-semibold tracking-[0.12em] text-gold uppercase mb-4">
              CONECTA
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <IconLinkedIn size={20} />
              </a>
              <a
                href="mailto:contacto@profitcoaching.com"
                className="font-body text-sm text-text-muted-dark hover:text-warm-white transition-colors duration-300"
              >
                contacto@profitcoaching.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(201, 168, 76, 0.2)' }}
        >
          <p className="font-body text-xs tracking-[0.1em] text-text-muted-dark">
            © 2025 PROFIT Coaching. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-xs tracking-[0.1em] text-text-muted-dark hover:text-warm-white transition-colors duration-300">
              Privacidad
            </a>
            <a href="#" className="font-body text-xs tracking-[0.1em] text-text-muted-dark hover:text-warm-white transition-colors duration-300">
              Terminos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
