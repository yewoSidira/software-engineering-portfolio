/* ==========================================
   NAVBAR
========================================== */

const navbar = document.querySelector(".navbar");

if(navbar){
    window.addEventListener("scroll", () => {
        if(window.scrollY > 30){
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}


/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle && navLinks){
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
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

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
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
        { threshold:0.15 }
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
        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            e.preventDefault();
            target.scrollIntoView({ behavior:"smooth" });
        }
    });
});


/* ==========================================
   PROJECTS
========================================== */

const projectsContainer = document.querySelector("#github-projects");

async function loadProjects() {
    if (!projectsContainer) return;

    try {
        const response = await fetch("/projects");
        const projects = await response.json();

        projectsContainer.innerHTML = "";

        projects.forEach(project => {
            const stack = project.stack
                .map(item => `<span>${item}</span>`)
                .join("");

            const repositoryButton = project.repository
    ? `<a href="${project.repository}" target="_blank" rel="noopener noreferrer" class="project-link">
        View Repository →
      </a>`
    : `<span class="project-link disabled">Private Repository</span>`;


const demoButton = project.demo
    ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
        View Demo →
      </a>`
    : "";

            const card = document.createElement("article");
            card.className = "project-card";
            card.innerHTML = `
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <span class="status ${project.statusClass}">● ${project.status}</span>
                </div>
                <p>${project.description}</p>
                <div class="project-role">
                    <strong>${project.roleTitle}</strong>
                    <span>${project.role}</span>
                </div>
                <div class="project-tags">${stack}<span>${project.projectType}</span></div>
                <div class="project-footer">${repositoryButton}${demoButton}</div>
            `;

            projectsContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        projectsContainer.innerHTML = "<p>Unable to load projects.</p>";
    }
}

loadProjects();


/* ==========================================
   THEME SWITCHER (UPDATED)
========================================== */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// REMOVED the "system" theme. Now it only toggles between "dark" and "light".
const themes = ["dark", "light"]; 

// Default to 'dark' instead of 'system'
let currentTheme = localStorage.getItem("theme") || "dark"; 

function applyTheme(theme){
    if(theme === "dark"){
        document.documentElement.removeAttribute("data-theme");
        themeIcon.textContent = "🌙"; // Better Dark Moon Emoji
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.textContent = "☀️"; // Better Light Sun Emoji
    }

    localStorage.setItem("theme", theme);
}

// Apply the theme immediately on load
applyTheme(currentTheme);

// Listen for the button click
themeToggle?.addEventListener("click", () => {
    // Cycle through the themes array
    let index = themes.indexOf(currentTheme);
    index = (index + 1) % themes.length;
    currentTheme = themes[index];
    applyTheme(currentTheme);
});
