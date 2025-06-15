import { Router } from "./route.js";

const router = new Router();

router.add("#/", "/pages/home.html");
router.add("#/vikings", "/pages/vikings.html");
router.add("#/spartacus", "/pages/spartacus.html");
router.add(404, "/pages/404.html");

router.handle();

window.onpopstate = () => router.handle();
window.route = () => router.route();

window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  if (hash && !hash.startsWith("#/")) {
    const anchor = hash.replace("#", "");
    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    router.handle();
  }
});

function handleAnchorClick(event) {
  const anchor = event.target.getAttribute("data-anchor");
  if (!anchor) return;

  event.preventDefault();

  const target = document.getElementById(anchor);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

document.querySelectorAll(".anchors a").forEach((link) => {
  link.addEventListener("click", handleAnchorClick);
});
