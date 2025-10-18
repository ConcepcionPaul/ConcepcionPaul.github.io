document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const topbar = document.querySelector('.topbar');
    const sections = document.querySelectorAll('section.section');
    const navLinksMap = new Map();
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
        const id = a.getAttribute('href');
        if (id) navLinksMap.set(id, a);
    });

    // For in-page links, just close mobile nav if open
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .contact-button[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (primaryNav && primaryNav.classList.contains('open')) {
                primaryNav.classList.remove('open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Mobile nav toggle
    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const open = primaryNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!primaryNav.classList.contains('open')) return;
            const withinToggle = navToggle.contains(e.target);
            const withinNav = primaryNav.contains(e.target);
            if (!withinToggle && !withinNav) {
                primaryNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        // Close on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && primaryNav.classList.contains('open')) {
                primaryNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Scroll reveal animations
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => io.observe(el));
    } else {
        // Fallback: make all visible
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // Header shadow on scroll
    const onScroll = () => {
        if (topbar) {
            if (window.scrollY > 0) topbar.classList.add('scrolled');
            else topbar.classList.remove('scrolled');
        }
    };
    onScroll();
    window.addEventListener('scroll', onScroll);

    // Scrollspy for active nav link
    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = `#${entry.target.id}`;
                const link = navLinksMap.get(id);
                if (!link) return;
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, { rootMargin: '-50% 0px -45% 0px', threshold: 0 });
        sections.forEach(sec => spy.observe(sec));
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // (Theme toggle removed)

    // Contact form basic validation and feedback (no backend)
    const form = document.getElementById('contact-form');
    if (form) {
        const status = document.getElementById('form-status');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            if (!name || !email || !message) {
                if (status) status.textContent = 'Please complete all fields.';
                return;
            }
            // rudimentary email check
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (status) status.textContent = 'Please enter a valid email address.';
                return;
            }
            if (status) status.textContent = 'Thanks! Your message has been prepared. Please email me at: ' + email;
            form.reset();
        });
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    const toggleBackToTop = () => {
        if (!backToTop) return;
        if (window.scrollY > 400) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    };
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);
    if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Ensure skip link target is focusable after jump
    const homeSection = document.getElementById('home');
    const skip = document.querySelector('.skip-link');
    if (skip && homeSection) {
        skip.addEventListener('click', () => {
            homeSection.setAttribute('tabindex', '-1');
            homeSection.focus({ preventScroll: true });
            setTimeout(() => homeSection.removeAttribute('tabindex'), 1000);
        });
    }
});


