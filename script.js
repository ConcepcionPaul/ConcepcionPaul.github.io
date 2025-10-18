document.addEventListener('DOMContentLoaded', function () {
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const aboutClose = document.getElementById('about-close');
    const litters = document.querySelector('.litters');
    const back = document.querySelector('.back');

    const openAbout = () => {
        if (!aboutSection) return;
        aboutSection.style.display = 'block';
        requestAnimationFrame(() => {
            aboutSection.classList.add('active');
            if (litters) litters.classList.add('active');
            if (back) back.style.transform = 'translateY(-100%)';
            aboutSection.setAttribute('aria-hidden', 'false');
            if (aboutClose) aboutClose.focus();
        });
    };

    const closeAbout = () => {
        if (!aboutSection) return;
        aboutSection.classList.remove('active');
        if (litters) litters.classList.remove('active');
        if (back) back.style.transform = 'translateY(0)';
        aboutSection.setAttribute('aria-hidden', 'true');
        // wait for transition then hide
        setTimeout(() => {
            if (!aboutSection.classList.contains('active')) {
                aboutSection.style.display = 'none';
            }
        }, 300);
    };

    if (aboutLink) {
        aboutLink.addEventListener('click', function (e) {
            e.preventDefault();
            openAbout();
        });
    }

    if (aboutClose) {
        aboutClose.addEventListener('click', function () {
            closeAbout();
        });
    }

    // Close when clicking on backdrop area
    if (aboutSection) {
        aboutSection.addEventListener('click', function (e) {
            if (e.target === aboutSection) {
                closeAbout();
            }
        });
    }

    // Close on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && aboutSection && aboutSection.classList.contains('active')) {
            closeAbout();
        }
    });

    // For other in-page links, ensure About is closed
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .contact-button[href^="#"]');
    navLinks.forEach(link => {
        if (link === aboutLink) return; // handled above
        link.addEventListener('click', () => {
            closeAbout();
        });
    });
});


