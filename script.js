/* ══════════════════════════════════════════════════════
   THWABA PERFUMES — thwaba_script.js
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Scroll Progress Bar ──────────────────────────── */
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop  = document.documentElement.scrollTop;
    const height     = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = ((scrollTop / height) * 100) + '%';
  }, { passive: true });


  /* ── 2. Hamburger Menu ───────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });


  /* ── 3. Dark / Light Mode Toggle ─────────────────────── */
  const darkToggles = [
    document.getElementById('darkModeToggle'),
    document.getElementById('darkModeToggleMobile')
  ];

  // Default is dark; 'light' saved pref flips to light-mode class
  if (localStorage.getItem('thwabaDark') === 'light') {
    document.body.classList.add('light-mode');
  }

  darkToggles.forEach(toggle => {
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem(
        'thwabaDark',
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
      );
    });
  });


  /* ── 4. Custom Cursor ────────────────────────────────── */
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');

  if (cursor && cursorTrail && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, tx = 0, ty = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function trailLoop() {
      tx += (mx - tx) * 0.13;
      ty += (my - ty) * 0.13;
      cursorTrail.style.left = tx + 'px';
      cursorTrail.style.top  = ty + 'px';
      requestAnimationFrame(trailLoop);
    })();

    // Grow cursor on interactive elements
    document.querySelectorAll('a, button, .prod-card, .bs-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width       = '20px';
        cursor.style.height      = '20px';
        cursorTrail.style.width  = '52px';
        cursorTrail.style.height = '52px';
        cursorTrail.style.borderColor = 'rgba(192,57,43,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width       = '10px';
        cursor.style.height      = '10px';
        cursorTrail.style.width  = '36px';
        cursorTrail.style.height = '36px';
        cursorTrail.style.borderColor = 'rgba(192,57,43,0.4)';
      });
    });
  }


  /* ── 5. Navbar: Scroll Shadow & Active Link ──────────── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shadow on scroll
    navbar.style.boxShadow = window.scrollY > 60
      ? '0 16px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset'
      : '0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03) inset';

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });


  /* ── 6. Scroll Reveal (IntersectionObserver) ─────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children of grids
        setTimeout(() => {
          entry.target.classList.add('active');
        }, entry.target.dataset.delay || 0);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Auto-stagger grid children
    const parent = el.closest('.prod-grid, .test-grid, .contact-grid');
    if (parent) {
      const siblings = [...parent.querySelectorAll('.reveal')];
      el.dataset.delay = siblings.indexOf(el) * 60;
    }
    revealObserver.observe(el);
  });


  /* ── 7. GSAP Animations ──────────────────────────────── */
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance — staggered cinematic reveal
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    heroTl
      .from('.hero-eyebrow',  { y: 24, opacity: 0, duration: 0.9 }, 0.15)
      .from('.hero-h1',       { y: 90, opacity: 0, duration: 1.3 }, 0.35)
      .from('.hero-p',        { y: 40, opacity: 0, duration: 1.0 }, 0.65)
      .from('.hero-btns',     { y: 30, opacity: 0, duration: 0.9 }, 0.85)
      .from('.hero-meta',     { y: 20, opacity: 0, duration: 0.8 }, 1.0)
      .from('.hero-visual',   { scale: 0.88, opacity: 0, duration: 1.4, ease: 'power3.out' }, 0.2)
      .from('.float-tag.t1',  { x: -30, opacity: 0, duration: 0.9 }, 1.2)
      .from('.float-tag.t2',  { x:  30, opacity: 0, duration: 0.9 }, 1.35)
      .from('.scroll-hint',   { y: 10, opacity: 0, duration: 0.8 }, 1.5);

    // Floating tag continuous animation
    gsap.to('.float-tag.t1', { y: -14, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.4 });
    gsap.to('.float-tag.t2', { y:  14, duration: 5.0, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 });

    // Hero image gentle float
    gsap.to('.hero-img-wrap', { y: -14, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.0 });

    // Ticker — pause on hover
    const ticker = document.querySelector('.ticker-track');
    if (ticker) {
      ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
      ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
    }

    // Section dividers scroll-triggered fade in
    gsap.utils.toArray('.cat-header').forEach(el => {
      gsap.from(el, {
        x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Footer brand entrance
    if (document.querySelector('.footer-brand-col')) {
      gsap.from('.footer-brand-col', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer', start: 'top 90%' }
      });
      gsap.from('.footer-col', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.footer', start: 'top 90%' }
      });
    }
  }


  /* ── 8. Scroll-to-top button ─────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ── 9. Product Card — Tilt on Hover (desktop only) ──── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.prod-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
        card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, border-color 0.4s';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow 0.4s, border-color 0.4s';
      });
    });
  }

});