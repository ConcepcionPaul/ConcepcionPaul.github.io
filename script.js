document.addEventListener('DOMContentLoaded', function () {
    const aboutLink = document.getElementById('about-link');
    const educationLink = document.getElementById('education-link');
    const projectsLink = document.getElementById('projects-link');
    const contactLink = document.getElementById('contact-link');

    const aboutSection = document.getElementById('about-section');
    const educationSection = document.getElementById('education-section');
    const projectsSection = document.getElementById('projects-section');
    const contactSection = document.getElementById('contact-section');

    const litters = document.querySelector('.litters');
    const back = document.querySelector('.back');

    function showSection(section) {
        aboutSection.classList.remove('active');
        educationSection.classList.remove('active');
        projectsSection.classList.remove('active');
        contactSection.classList.remove('active');

        section.style.display = 'block';
        setTimeout(() => {
            section.classList.add('active');
            litters.classList.add('active');
            back.style.transform = 'translateY(-100%)';
        }, 10);
    }

    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(aboutSection);
    });

    educationLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(educationSection);
    });

    projectsLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(projectsSection);
    });

    contactLink.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(contactSection);
    });
});

