(() => {
    "use strict";

    const root = document.documentElement;
    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Navbar, scroll progress, back-to-top ---------- */

    const navbar = document.querySelector(".navbar");

    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    const toTop = document.createElement("button");
    toTop.type = "button";
    toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    toTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
    );
    document.body.appendChild(toTop);

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const max = root.scrollHeight - window.innerHeight;
            navbar?.classList.toggle("scrolled", y > 30);
            progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
            toTop.classList.toggle("visible", y > 700);
            ticking = false;
        });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile menu ---------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    function setMenu(open) {
        if (!menuToggle || !navLinks) return;
        navLinks.classList.toggle("active", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute(
            "aria-label",
            open ? "Close navigation menu" : "Open navigation menu"
        );
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () =>
            setMenu(!navLinks.classList.contains("active"))
        );
        navLinks.addEventListener("click", (e) => {
            if (e.target.closest("a")) setMenu(false);
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("active")) {
                setMenu(false);
                menuToggle.focus();
            }
        });
        document.addEventListener("click", (e) => {
            if (
                navLinks.classList.contains("active") &&
                !e.target.closest(".nav-links, .menu-toggle")
            ) {
                setMenu(false);
            }
        });
    }

    /* ---------- Scroll spy ---------- */

    const navAnchors = [...document.querySelectorAll(".nav-links a[href^='#']")];
    const spyTargets = navAnchors
        .map((a) => document.querySelector(a.getAttribute("href")))
        .filter(Boolean);

    if (spyTargets.length && "IntersectionObserver" in window) {
        const visible = new Map();
        const spy = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => visible.set(en.target.id, en.isIntersecting));
                const current = spyTargets.find((t) => visible.get(t.id));
                navAnchors.forEach((a) => {
                    const on = current && a.getAttribute("href") === "#" + current.id;
                    if (on) a.setAttribute("aria-current", "true");
                    else a.removeAttribute("aria-current");
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        spyTargets.forEach((t) => spy.observe(t));
    }

    /* ---------- Reveal on scroll ---------- */

    const revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
        if (!("IntersectionObserver" in window) || prefersReducedMotion) {
            revealEls.forEach((el) => el.classList.add("active"));
        } else {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((en) => {
                        if (en.isIntersecting) {
                            en.target.classList.add("active");
                            io.unobserve(en.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );
            revealEls.forEach((el) => io.observe(el));
        }
    }

    /* ---------- Copy email ---------- */

    document.querySelectorAll(".copy-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(btn.dataset.copy);
                btn.textContent = "Copied ✓";
                btn.classList.add("copied");
            } catch {
                btn.textContent = "Press Ctrl+C";
            }
            setTimeout(() => {
                btn.textContent = "Copy";
                btn.classList.remove("copied");
            }, 1800);
        });
    });

    /* ---------- Theme ---------- */

    const themeColor = document.querySelector('meta[name="theme-color"]');

    function currentTheme() {
        return root.dataset.theme === "light" ? "light" : "dark";
    }

    function syncThemeColor() {
        themeColor?.setAttribute(
            "content",
            currentTheme() === "light" ? "#f4f7f9" : "#080d16"
        );
    }

    function setTheme(theme) {
        if (theme === "light") root.dataset.theme = "light";
        else root.removeAttribute("data-theme");
        syncThemeColor();
        try {
            localStorage.setItem("theme", theme);
        } catch {}
    }

    document
        .getElementById("theme-toggle")
        ?.addEventListener("click", () =>
            setTheme(currentTheme() === "dark" ? "light" : "dark")
        );
    syncThemeColor();
})();
