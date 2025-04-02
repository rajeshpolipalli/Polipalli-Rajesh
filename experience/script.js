$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // EmailJS contact form submission
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully (with some issues)");
            });
    });
});

// Visibility change event
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Polipalli";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// Typed.js effect
var typed = new Typed(".typing-text", {
    strings: ["Frontend Developer", "Backend Developer", "Embedded Systems Engineer"],
    typeSpeed: 30,
    backSpeed: 20,
    backDelay: 500,
    loop: true,
});

// Fetch and display skills and projects
async function fetchData(type = "skills") {
    let response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
    return await response.json();
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>
    `).join('');
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = projects.slice(0, 10).filter(p => p.category !== "android").map(project => `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    projectsContainer.innerHTML = projectHTML;

    // Initialize tilt effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    // Scroll reveal animation
    ScrollReveal().reveal('.work .box', { interval: 200 });
}

fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(String.fromCharCode(e.keyCode))) || (e.ctrlKey && e.keyCode == "U".charCodeAt(0))) {
        return false;
    }
};

// Live chat integration
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// Scroll reveal animation
ScrollReveal().reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
ScrollReveal().reveal('.home .image', { delay: 400 });
ScrollReveal().reveal('.home .linkedin, .home .github, .home .twitter, .home .telegram, .home .instagram, .home .dev', { interval: 600 });
ScrollReveal().reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
ScrollReveal().reveal('.skills .container, .skills .container .bar', { interval: 200 });
ScrollReveal().reveal('.education .box, .work .box, .experience .timeline, .experience .timeline .container, .contact .container, .contact .container .form-group', { interval: 200 });
