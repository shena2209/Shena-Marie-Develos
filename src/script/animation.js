import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

// Dark mode toggle + spin
let toggleTurns = 0;
document.querySelector("#toggledark").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  toggleTurns += 1;
  gsap.to("#toggledark", {
    rotation: toggleTurns * 360,
    duration: 0.8,
    ease: "power2.inOut",
    overwrite: "auto",
  });
});

// Intro timeline
const tl = gsap.timeline({
  defaults: { duration: 0.8, ease: "power2.out", clearProps: "all" },
  onComplete: () => ScrollTrigger.refresh(),
});
tl.from("h1", { y: -20, opacity: 0, ease: "back.out(2.5)" });
tl.from("nav", { y: 60, opacity: 0 });
tl.from("#about", { y: 60, opacity: 0, ease: "elastic.out(1.03)" });
tl.from("#services", { y: 60, opacity: 0, ease: "elastic.out(1.03)" });
tl.from("#contact", { y: 60, opacity: 0, ease: "elastic.out(1.03)" });

document.querySelector("#Replay").addEventListener("click", () => tl.restart());

// Scroll fade for Services
gsap.from("#services", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#services",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
});

// Progress bar
gsap.fromTo(
  "#progressBar",
  { scaleX: 0 },
  {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
    },
  }
);

// Pin only the services card
ScrollTrigger.create({
  trigger: "#services",
  start: "top 100px",
  endTrigger: "#new-form-section",
  end: "bottom center",
  pin: true,
  pinSpacing: false,
});

// Flip cards
const cardsGrid = document.querySelector("#cards-grid");
const flipCards = document.querySelectorAll(".flip-card");

flipCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("form")) return;
    const state = Flip.getState(flipCards);
    cardsGrid.prepend(card);
    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      absolute: true,
      stagger: 0.05,
    });
  });
});
