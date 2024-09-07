document.addEventListener('DOMContentLoaded', function () {
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const litters = document.querySelector('.litters');
    const back = document.querySelector('.back');

    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();
        
        aboutSection.style.display = 'block';
        setTimeout(() => {
            aboutSection.classList.add('active');
            litters.classList.add('active');
            back.style.transform = 'translateY(-100%)';
        }, 10);
    });
});


