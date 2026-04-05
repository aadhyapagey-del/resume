const navbar = document.getElementById("navbar");
const navButtons = Array.from(document.querySelectorAll("[data-scroll]"));
const sectionIds = ["home", "objective", "education", "experience", "skills", "hobbies"];
const navLinkButtons = Array.from(document.querySelectorAll(".nav-links button"));

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateActiveSection() {
  let activeId = "home";

  for (let index = sectionIds.length - 1; index >= 0; index -= 1) {
    const section = document.getElementById(sectionIds[index]);
    if (section && window.scrollY >= section.offsetTop - 120) {
      activeId = sectionIds[index];
      break;
    }
  }

  navLinkButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.scroll === activeId);
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scrollToSection(button.dataset.scroll);
  });
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  updateActiveSection();
});

updateActiveSection();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.id === "skills") {
          const bars = entry.target.querySelectorAll(".skill-item");
          bars.forEach((item, index) => {
            const fill = item.querySelector(".skill-bar span");
            const level = item.dataset.level;
            fill.style.transitionDelay = `${index * 80}ms`;
            fill.style.width = `${level}%`;
          });
        }

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((section) => {
  revealObserver.observe(section);
});
