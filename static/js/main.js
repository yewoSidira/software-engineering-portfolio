/* ==========================================
   NAVBAR
========================================== */

const navbar = document.querySelector(".navbar");

if(navbar){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 30){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    }, { passive:true });

}


/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle && navLinks){

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==========================================
   SCROLL SPY
========================================== */

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

function updateActiveLink(){

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if(
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ){

            current = section.id;

        }

    });


    links.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") === "#" + current
        ){

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive:true }
);

updateActiveLink();


/* ==========================================
   REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(".reveal");

if(revealElements.length){

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                }

            });

        },
        {
            threshold:0.15
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});


/* ==========================================
   PROJECTS
========================================== */

const projectsContainer =
    document.querySelector("#github-projects");


async function loadProjects(){

    if(!projectsContainer) return;

    try{

        const response = await fetch("/projects.json");

        const projects = await response.json();

        projectsContainer.innerHTML = "";


        projects.forEach(project => {

            const stack = project.stack
                .map(item => `<span>${item}</span>`)
                .join("");


            const repositoryButton = project.repository

                ? `
                    <a
                        href="${project.repository}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link"
                    >
                        View Source on GitHub →
                    </a>
                  `

                : `
                    <span class="project-link disabled">
                        Source code is private
                    </span>
                  `;


            const demoButton = project.demo

                ? `
                    <a
                        href="${project.demo}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link"
                    >
                        Open Live Demo →
                    </a>
                  `

                : "";


            const card =
                document.createElement("article");

            card.className = "project-card";


            card.innerHTML = `

                <div class="project-header">

                    <h3>${project.title}</h3>

                    <span
                        class="status ${project.statusClass}"
                    >
                        ● ${project.status}
                    </span>

                </div>


                <p>
                    ${project.description}
                </p>


                <div class="project-role">

                    <strong>
                        ${project.roleTitle}
                    </strong>

                    <span>
                        ${project.role}
                    </span>

                </div>


                ${stack.length || project.projectType ? `<div class="project-tags">

                    ${stack}

                    ${project.projectType ? `<span>${project.projectType}</span>` : ""}

                </div>` : ""}


                <div class="project-footer">

                    ${repositoryButton}

                    ${demoButton || (project.repository ? `<span class="project-link disabled">No live demo</span>` : "")}

                </div>

            `;


            projectsContainer.appendChild(card);

        });

    }catch(error){

        console.error(error);

        projectsContainer.innerHTML =
            "<p>Unable to load projects.</p>";

    }

}

loadProjects();


/* ==========================================
   THEME SWITCHER
========================================== */

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    document.getElementById("theme-icon");


const themes = [
    "dark",
    "light"
];


let currentTheme =
    localStorage.getItem("theme") || "dark";


function applyTheme(theme){

    if(theme === "dark"){

        document.documentElement
            .removeAttribute("data-theme");

        if(themeIcon){

            themeIcon.textContent = "🌙";

        }

    }else{

        document.documentElement
            .setAttribute("data-theme", "light");

        if(themeIcon){

            themeIcon.textContent = "☀️";

        }

    }


    localStorage.setItem(
        "theme",
        theme
    );

}


applyTheme(currentTheme);


themeToggle?.addEventListener(
    "click",
    () => {

        let index =
            themes.indexOf(currentTheme);

        index =
            (index + 1) % themes.length;

        currentTheme =
            themes[index];

        applyTheme(currentTheme);

    }
);
