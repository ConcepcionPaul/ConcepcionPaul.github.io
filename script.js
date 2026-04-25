document.addEventListener("DOMContentLoaded", () => {
    const topbar = document.querySelector(".topbar");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll("main section[id]");
    const navLinksMap = new Map();

    document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
            navLinksMap.set(href, link);
        }
    });

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }

    const backToTop = document.getElementById("back-to-top");
    const onScroll = () => {
        if (topbar) {
            topbar.classList.toggle("scrolled", window.scrollY > 64);
        }
        if (backToTop) {
            backToTop.classList.toggle("show", window.scrollY > 420);
        }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if ("IntersectionObserver" in window && sections.length > 0) {
        const activeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const link = navLinksMap.get(`#${entry.target.id}`);
                if (!link || !entry.isIntersecting) {
                    return;
                }
                document.querySelectorAll(".nav-links a").forEach((navLink) => {
                    navLink.classList.remove("active");
                });
                link.classList.add("active");
            });
        }, {
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0
        });

        sections.forEach((section) => activeObserver.observe(section));
    }

    const year = document.getElementById("year");
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    const form = document.getElementById("contact-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const formStatus = document.getElementById("form-status");

    if (form && nameField && emailField && messageField && formStatus) {
        const fields = [nameField, emailField, messageField];
        const markInvalid = (field, invalid) => {
            field.setAttribute("aria-invalid", invalid ? "true" : "false");
        };

        fields.forEach((field) => {
            field.addEventListener("input", () => {
                markInvalid(field, false);
                formStatus.textContent = "";
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let hasError = false;

            fields.forEach((field) => {
                const value = field.value.trim();
                const invalid = value.length === 0;
                markInvalid(field, invalid);
                hasError = hasError || invalid;
            });

            if (hasError) {
                formStatus.textContent = "Please complete all fields before creating the email draft.";
                return;
            }

            if (!emailPattern.test(email)) {
                markInvalid(emailField, true);
                formStatus.textContent = "Please enter a valid email address.";
                return;
            }

            const subject = `Portfolio inquiry from ${name}`;
            const body = [
                `Name: ${name}`,
                `Email: ${email}`,
                "",
                message
            ].join("\n");

            const mailtoUrl = `mailto:paloma28loma@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            formStatus.textContent = "Your email app should open with a drafted message to Paul.";
            window.location.href = mailtoUrl;
        });
    }

    const skipLink = document.querySelector('.skip-link[href="#main-content"]');
    const mainContent = document.getElementById("main-content");
    if (skipLink && mainContent) {
        skipLink.addEventListener("click", () => {
            mainContent.setAttribute("tabindex", "-1");
            mainContent.focus({ preventScroll: true });
            window.setTimeout(() => {
                mainContent.removeAttribute("tabindex");
            }, 1000);
        });
    }
});
