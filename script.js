document.addEventListener("DOMContentLoaded", () => {
    const topbar = document.querySelector(".topbar");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll("main section[id]");
    const navLinksMap = new Map();

    const portraitSlideshow = document.getElementById("portrait-slideshow");
    if (portraitSlideshow) {
        const portraitSources = [
            portraitSlideshow.src,
            ...portraitSlideshow.dataset.slides.split(",")
        ];
        let activePortrait = 0;

        portraitSources.slice(1).forEach((source) => {
            const preloadImage = new Image();
            preloadImage.src = source;
        });

        window.setInterval(() => {
            portraitSlideshow.classList.add("is-changing");

            window.setTimeout(() => {
                activePortrait = (activePortrait + 1) % portraitSources.length;
                portraitSlideshow.src = portraitSources[activePortrait];
                portraitSlideshow.classList.remove("is-changing");
            }, 650);
        }, 4000);
    }

    document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
            navLinksMap.set(href, link);
        }
    });

    const excludedRepositoryNames = new Set([
        "ConcepcionPaul",
        "ConcepcionPaul.github.io"
    ]);
    const webRepositoryNames = new Set([
        "EVIE-SKIN",
        "The_Mood-API",
        "Votto_system",
        "StarBucks-Ecommerce",
        "Happy-Ending",
        "DataSaurus",
        "Agri_fresh",
        "Job-on-project",
        "AI_Delas-Alas",
        "KLA_SICK",
        "Nytimes_Clone"
    ]);
    const githubRepositoriesUrl = "https://api.github.com/users/ConcepcionPaul/repos?per_page=100&sort=updated";
    const repositorySnapshot = [
        {
            name: "EVIE-SKIN",
            html_url: "https://github.com/ConcepcionPaul/EVIE-SKIN",
            description: "This site showcases a modern, responsive landing page for the EvieSkin skincare brand, featuring product highlights, ingredient details, and easy navigation.",
            language: "CSS",
            homepage: "https://evieskinapp.vercel.app/",
            updated_at: "2026-07-19T13:45:09Z"
        },
        {
            name: "The_Mood-API",
            html_url: "https://github.com/ConcepcionPaul/The_Mood-API",
            description: "This API allows users to create and share short messages called Moods with their followers. It includes CRUD features, follow actions, likes, comments, timelines, profiles, and JWT authentication.",
            language: "JavaScript",
            homepage: "",
            updated_at: "2026-07-17T07:54:46Z"
        },
        {
            name: "Votto_system",
            html_url: "https://github.com/ConcepcionPaul/Votto_system",
            description: "Voting system built with Node.js, Express, and MySQL.",
            language: "JavaScript",
            homepage: "",
            updated_at: "2026-07-15T14:55:27Z"
        },
        {
            name: "StarBucks-Ecommerce",
            html_url: "https://github.com/ConcepcionPaul/StarBucks-Ecommerce",
            description: "A Starbucks-style e-commerce web application with a PHP backend API and a vanilla HTML, CSS, and JavaScript frontend.",
            language: "PHP",
            homepage: "",
            updated_at: "2026-07-15T14:54:44Z"
        },
        {
            name: "Happy-Ending",
            html_url: "https://github.com/ConcepcionPaul/Happy-Ending",
            description: "An e-commerce platform for memorial products, built around product browsing and a respectful online purchasing experience.",
            language: "CSS",
            homepage: "",
            updated_at: "2026-07-15T14:54:27Z"
        },
        {
            name: "DataSaurus",
            html_url: "https://github.com/ConcepcionPaul/DataSaurus",
            description: "A Flask and MongoDB search engine with TF-IDF ranking, real-time scraping through SSE, type-ahead suggestions, and a vanilla JavaScript frontend.",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-15T14:54:01Z"
        },
        {
            name: "Agri_fresh",
            html_url: "https://github.com/ConcepcionPaul/Agri_fresh",
            description: "AgriFresh is a simple e-commerce web application with a PHP backend and a vanilla PHP, HTML, CSS, and JavaScript frontend.",
            language: "PHP",
            homepage: "",
            updated_at: "2026-07-15T14:53:36Z"
        },
        {
            name: "Auto-React",
            html_url: "https://github.com/ConcepcionPaul/Auto-React",
            description: "",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-14T00:13:41Z"
        },
        {
            name: "The_Mood-SPA",
            html_url: "https://github.com/ConcepcionPaul/The_Mood-SPA",
            description: "",
            language: "",
            homepage: "",
            updated_at: "2026-07-14T00:03:17Z"
        },
        {
            name: "BMR_Maker",
            html_url: "https://github.com/ConcepcionPaul/BMR_Maker",
            description: "",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-13T23:59:25Z"
        },
        {
            name: "Job-on-project",
            html_url: "https://github.com/ConcepcionPaul/Job-on-project",
            description: "",
            language: "HTML",
            homepage: "",
            updated_at: "2026-07-13T23:56:15Z"
        },
        {
            name: "AI_Delas-Alas",
            html_url: "https://github.com/ConcepcionPaul/AI_Delas-Alas",
            description: "",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-13T23:53:36Z"
        },
        {
            name: "KLA_SICK",
            html_url: "https://github.com/ConcepcionPaul/KLA_SICK",
            description: "",
            language: "JavaScript",
            homepage: "",
            updated_at: "2026-07-13T23:49:55Z"
        },
        {
            name: "Bank_Yarn",
            html_url: "https://github.com/ConcepcionPaul/Bank_Yarn",
            description: "",
            language: "C",
            homepage: "",
            updated_at: "2026-07-13T23:35:27Z"
        },
        {
            name: "QoueTy",
            html_url: "https://github.com/ConcepcionPaul/QoueTy",
            description: "",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-13T07:14:23Z"
        },
        {
            name: "Master_Beat",
            html_url: "https://github.com/ConcepcionPaul/Master_Beat",
            description: "",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-13T06:59:17Z"
        },
        {
            name: "Jejemon_Translator",
            html_url: "https://github.com/ConcepcionPaul/Jejemon_Translator",
            description: "",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-13T06:48:02Z"
        },
        {
            name: "Fact_Check",
            html_url: "https://github.com/ConcepcionPaul/Fact_Check",
            description: "",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-13T06:42:07Z"
        },
        {
            name: "Chat_Bot",
            html_url: "https://github.com/ConcepcionPaul/Chat_Bot",
            description: "A simple desktop chat bot made with Python and a Tkinter UI. It answers from a JSON knowledge base, supports English and Tagalog detection, and can enter learning mode.",
            language: "Python",
            homepage: "",
            updated_at: "2026-07-13T06:26:43Z"
        },
        {
            name: "Nytimes_Clone",
            html_url: "https://github.com/ConcepcionPaul/Nytimes_Clone",
            description: "",
            language: "JavaScript",
            homepage: "https://concepcionpaul.github.io/Nytimes_Clone/",
            updated_at: "2025-10-18T11:52:55Z"
        },
        {
            name: "Fuzzy-Logic_Shower",
            html_url: "https://github.com/ConcepcionPaul/Fuzzy-Logic_Shower",
            description: "A fuzzy logic system that determines shower water temperature from initial water temperature, water pressure, and heater temperature.",
            language: "Python",
            homepage: "",
            updated_at: "2025-10-18T10:53:27Z"
        },
        {
            name: "TapsiloganPOS",
            html_url: "https://github.com/ConcepcionPaul/TapsiloganPOS",
            description: "A simple OOP-based point of sale system built with Java and Maven for a tapsilogan restaurant.",
            language: "Java",
            homepage: "",
            updated_at: "2025-10-18T10:53:03Z"
        }
    ];
    const repositoryVideoCovers = {
        "fuzzy-logic-shower": "images/vid/Fuzzy-Logic_shower.mp4",
        "jejemon-translator": "images/vid/Jejemon_Translator.mp4",
        "master-beat": "images/vid/Master_Beat.mp4",
        "tapsiloganpos": "images/vid/TapsiloganPOS.mp4"
    };
    const repositoryImageCovers = {
        "evie-skin": "images/project/EVIE-SKIN.png",
        "the-mood-api": "images/project/The_Mood-API.png",
        "votto-system": "images/project/Votto_system.png",
        "starbucks-ecommerce": "images/project/StarBucks-Ecommerce.png",
        "happy-ending": "images/project/Happy-Ending.png",
        "datasaurus": "images/project/DataSaurus.png",
        "agri-fresh": "images/project/Agri_fresh.png",
        "job-on-project": "images/project/Job-on-project.png",
        "ai-delas-alas": "images/project/AI_Delas-Alas.png",
        "kla-sick": "images/project/KLA_SICK.png",
        "nytimes-clone": "images/project/Nytimes_Clone.png"
    };
    const repositoryDescriptions = {
        "evie-skin": "A modern, responsive landing page for the EvieSkin skincare brand, featuring product highlights, ingredient details, and easy navigation.",
        "the-mood-api": "A JWT-secured social API for sharing Moods, with accounts, profiles, timelines, follows, likes, comments, and full CRUD support.",
        "votto-system": "A Node.js, Express, and MySQL voting system with Docker deployment, Nginx load balancing, multiple backends, and database replication.",
        "starbucks-ecommerce": "A Starbucks-style e-commerce application with a PHP and MySQL API plus a vanilla HTML, CSS, and JavaScript storefront.",
        "happy-ending": "A respectful e-commerce platform for browsing and personalizing coffins and urns, with detailed products and secure purchasing options.",
        "datasaurus": "A dinosaur knowledge search engine using Flask, MongoDB, TF-IDF ranking, live SSE scraping, type-ahead suggestions, and vanilla JavaScript.",
        "agri-fresh": "A PHP and MySQL e-commerce application with OTP login, a product catalog, cart, checkout, vouchers, and product administration tools.",
        "job-on-project": "A job posting platform where applicants manage profiles and resumes while employers publish listings and track post engagement.",
        "ai-delas-alas": "A real-time Taglish chatbot inspired by Ai-Ai delas Alas, built with Flask, Socket.IO, and Groq's Llama 3.1 model.",
        "kla-sick": "A mobile browser AR role-playing game that combines the device camera, GPS movement, enemy encounters, combat, leveling, and leaderboards.",
        "nytimes-clone": "A lightweight NYTimes Hardcover Fiction list interface with search, keyboard-friendly suggestions, pagination, caching, and accessibility improvements."
    };
    const coverVariants = [
        "project-art-cover-fire",
        "project-art-cover-ocean",
        "project-art-cover-forest",
        "project-art-cover-violet",
        "project-art-cover-gold",
        "project-art-cover-rose"
    ];
    const projectGrid = document.getElementById("project-grid");
    let revealObserver = null;
    let renderedRepositorySignature = "";

    const normalizeRepositoryKey = (value) => value.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const humanizeRepositoryName = (value) => value
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
        .replace(/\bApi\b/g, "API")
        .replace(/\bAi\b/g, "AI")
        .replace(/\bBmr\b/g, "BMR")
        .replace(/\bPos\b/g, "POS");

    const truncateText = (value, maxLength = 168) => {
        const text = String(value || "").trim();
        if (text.length <= maxLength) {
            return text;
        }
        return `${text.slice(0, maxLength).trimEnd()}...`;
    };

    const formatUpdatedDate = (value) => {
        if (!value) {
            return "";
        }

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
            year: "numeric"
        }).format(date);
    };

    const createIcon = (className) => {
        const icon = document.createElement("i");
        icon.className = className;
        icon.setAttribute("aria-hidden", "true");
        return icon;
    };

    const createButton = (href, label, className, iconClass) => {
        const link = document.createElement("a");
        link.className = className;
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.append(createIcon(iconClass));

        const text = document.createElement("span");
        text.textContent = label;
        link.append(text);

        return link;
    };

    const getDisplayRepositories = (repositories) => repositories
        .filter((repository) => {
            if (!repository || !repository.name) {
                return false;
            }
            return !excludedRepositoryNames.has(repository.name)
                && webRepositoryNames.has(repository.name)
                && repository.private !== true;
        })
        .sort((first, second) => {
            const firstUpdated = new Date(first.updated_at || first.pushed_at || 0).getTime();
            const secondUpdated = new Date(second.updated_at || second.pushed_at || 0).getTime();
            return secondUpdated - firstUpdated;
        });

    const getRepositorySignature = (repositories) => JSON.stringify(repositories.map((repository) => ({
        name: repository.name,
        description: repository.description || "",
        homepage: repository.homepage || "",
        html_url: repository.html_url,
        language: repository.language || "",
        updated_at: repository.updated_at || repository.pushed_at || ""
    })));

    const observeRevealElements = () => {
        const revealElements = document.querySelectorAll(".reveal:not(.visible)");
        if ("IntersectionObserver" in window) {
            if (!revealObserver) {
                return;
            }
            revealElements.forEach((element) => revealObserver.observe(element));
            return;
        }

        revealElements.forEach((element) => element.classList.add("visible"));
    };

    const renderProjects = (repositories) => {
        if (!projectGrid) {
            return;
        }

        const displayRepositories = getDisplayRepositories(repositories);
        renderedRepositorySignature = getRepositorySignature(displayRepositories);
        projectGrid.replaceChildren();

        displayRepositories.forEach((repository, index) => {
            const normalizedName = normalizeRepositoryKey(repository.name);
            const videoCover = repositoryVideoCovers[normalizedName];
            const imageCover = repositoryImageCovers[normalizedName];
            const article = document.createElement("article");
            article.className = "project-card reveal";
            article.dataset.repoName = repository.name;

            const cover = document.createElement("div");
            cover.className = `project-art ${videoCover || imageCover ? "project-art-media" : coverVariants[index % coverVariants.length]}`;

            if (videoCover) {
                cover.setAttribute("aria-hidden", "true");
                const video = document.createElement("video");
                video.className = "project-video";
                video.src = videoCover;
                video.muted = true;
                video.defaultMuted = true;
                video.playsInline = true;
                video.autoplay = true;
                video.loop = true;
                video.setAttribute("muted", "");
                video.setAttribute("playsinline", "");
                video.setAttribute("autoplay", "");
                video.setAttribute("loop", "");
                video.setAttribute("preload", "auto");

                const startCoverVideo = () => {
                    if (!video.paused) {
                        return;
                    }

                    const playRequest = video.play();
                    if (playRequest) {
                        playRequest.catch(() => {
                            video.classList.add("project-video-paused");
                        });
                    }
                };

                cover.append(video);

                startCoverVideo();
                video.addEventListener("canplay", startCoverVideo, { once: true });
            } else if (imageCover) {
                const image = document.createElement("img");
                image.className = "project-image";
                image.src = imageCover;
                image.alt = `${humanizeRepositoryName(repository.name)} project preview`;
                image.loading = "lazy";
                image.decoding = "async";
                cover.append(image);
            } else {
                cover.setAttribute("aria-hidden", "true");
            }

            const kicker = document.createElement("p");
            kicker.className = "card-kicker";
            kicker.textContent = "Public Repository";

            const title = document.createElement("h3");
            title.textContent = repository.name;

            const description = document.createElement("p");
            description.className = "project-description";
            description.textContent = truncateText(
                repositoryDescriptions[normalizedName]
                    || repository.description
                    || `${humanizeRepositoryName(repository.name)} is a ${repository.language || "public"} project from my GitHub repository collection.`
            );

            const meta = document.createElement("p");
            meta.className = "project-meta";
            const updatedDate = formatUpdatedDate(repository.updated_at || repository.pushed_at);
            meta.textContent = updatedDate ? `Updated ${updatedDate}` : "Available on GitHub";

            const tags = document.createElement("div");
            tags.className = "tags";
            [repository.language || "Repository", "Public", repository.homepage ? "Live Site" : ""]
                .filter(Boolean)
                .forEach((tag) => {
                    const item = document.createElement("span");
                    item.textContent = tag;
                    tags.append(item);
                });

            const actions = document.createElement("div");
            actions.className = "actions";
            actions.append(createButton(repository.html_url, "Repository", "btn", "fab fa-github"));

            if (repository.homepage) {
                actions.append(createButton(repository.homepage, "Live Site", "btn btn-secondary", "fas fa-external-link-alt"));
            }

            article.append(cover, kicker, title, description, meta, tags, actions);
            projectGrid.append(article);
        });

        observeRevealElements();
    };

    renderProjects(repositorySnapshot);

    if ("IntersectionObserver" in window) {
        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        observeRevealElements();
    } else {
        observeRevealElements();
    }

    fetch(githubRepositoriesUrl, {
        headers: {
            Accept: "application/vnd.github+json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to load repositories");
            }
            return response.json();
        })
        .then((repositories) => {
            const displayRepositories = getDisplayRepositories(repositories);
            const repositorySignature = getRepositorySignature(displayRepositories);
            if (displayRepositories.length > 0 && repositorySignature !== renderedRepositorySignature) {
                renderProjects(displayRepositories);
            }
        })
        .catch(() => {
            // The local snapshot keeps the project grid available when the API cannot be reached.
        });

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

            const mailtoUrl = `mailto:paul28concepcion@gamil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
