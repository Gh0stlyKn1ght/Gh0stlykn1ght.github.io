"use strict";
const navToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const sections = Array.from(document.querySelectorAll("section"));
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeLabel) {
        themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
    }
    localStorage.setItem("theme", theme);
};
const initTheme = () => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored !== null && stored !== void 0 ? stored : (prefersDark ? "dark" : "light");
    applyTheme(theme);
};
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";
        applyTheme(current === "dark" ? "light" : "dark");
    });
}
initTheme();
if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (nav) {
            nav.classList.remove("open");
        }
    });
});
const observeSections = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("data-target") === entry.target.id);
                });
            }
        });
    }, { threshold: 0.35 });
    sections.forEach((section) => observer.observe(section));
};
if ("IntersectionObserver" in window) {
    observeSections();
}
