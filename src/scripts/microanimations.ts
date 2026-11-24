import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function initMicroanimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cleanup previous Lenis instance on Astro View Transitions
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  // 1. Lenis Smooth Scrolling (skip on admin panel for native form scrolling)
  const isAdmin = window.location.pathname.startsWith('/admin');
  if (!prefersReducedMotion && !isAdmin && window.innerWidth >= 768) {
    lenisInstance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenisInstance?.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
  }

  // 2. Reading Progress Bar & Smart Header Morph & Subtle Parallax
  const progressBar = document.querySelector<HTMLElement>('.scroll-progress-bar');
  const header = document.querySelector<HTMLElement>('.site-header');
  const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${ratio})`;
    }

    if (header) {
      const isTransparentHero = header.dataset.heroTransparent === 'true';
      if (scrollTop > 32) {
        header.classList.add('is-scrolled');
        if (isTransparentHero) {
          header.classList.remove('is-over-dark');
        }
      } else {
        header.classList.remove('is-scrolled');
        if (isTransparentHero) {
          header.classList.add('is-over-dark');
        }
      }
    }

    if (!prefersReducedMotion && parallaxNodes.length > 0 && scrollTop < window.innerHeight * 1.4) {
      parallaxNodes.forEach((node) => {
        const speed = Number(node.dataset.parallax || '0.18');
        node.style.transform = `translate3d(0, ${scrollTop * speed}px, 0)`;
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Staggered Scroll Reveals via IntersectionObserver
  const revealNodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (prefersReducedMotion) {
    revealNodes.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );

    revealNodes.forEach((el) => observer.observe(el));
  }

  // 4. Animated Institutional Stat Counters
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = Number(el.dataset.counter || '0');
          const suffix = el.dataset.suffix || '';
          if (prefersReducedMotion) {
            el.textContent = `${target}${suffix}`;
            counterObserver.unobserve(el);
            return;
          }

          const duration = 1250;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            el.textContent = `${current}${suffix}`;
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  // 5. Cursor-Following Spotlight Cards
  const spotlightCards = document.querySelectorAll<HTMLElement>('[data-spotlight]');
  spotlightCards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });

  // 6. Subtle Magnetic Cursor Pull on CTA Buttons
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const magneticItems = document.querySelectorAll<HTMLElement>('[data-magnetic]');
    magneticItems.forEach((item) => {
      const strength = Number(item.dataset.magnetic || '0.18');
      item.addEventListener('pointermove', (e) => {
        const rect = item.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        item.style.transform = `translate3d(${relX * strength}px, ${relY * strength}px, 0)`;
      });
      item.addEventListener('pointerleave', () => {
        item.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }
}
