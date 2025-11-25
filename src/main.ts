const navToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const nav = document.querySelector<HTMLElement>(".nav");
const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav a");
const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
const themeToggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
const themeLabel = document.querySelector<HTMLElement>(".theme-label");

type Theme = "light" | "dark";

const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
  }
  localStorage.setItem("theme", theme);
};

const initTheme = (): void => {
  const stored = localStorage.getItem("theme") as Theme | null;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme: Theme = stored ?? (prefersDark ? "dark" : "light");
  applyTheme(theme);
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("data-target") === entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
};

if ("IntersectionObserver" in window) {
  observeSections();
}
