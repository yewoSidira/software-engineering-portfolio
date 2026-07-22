/* ==========================================
   NAVBAR
========================================== */

const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


if(menuToggle){

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}



/* Close mobile menu after clicking */

document.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});



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


        const href = link.getAttribute("href");


        if(href === "#" + current){

            link.classList.add("active");

        }

    });

}



window.addEventListener(
    "scroll",
    updateActiveLink
);



updateActiveLink();



/* ==========================================
   REVEAL ANIMATION
========================================== */


const revealElements = document.querySelectorAll(".reveal");


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



/* ==========================================
   SMOOTH SCROLL OFFSET
========================================== */


document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {


    anchor.addEventListener("click", function(e){


        const target =
            document.querySelector(
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