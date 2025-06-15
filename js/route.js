export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    const href = event.target.getAttribute("href");
    window.history.pushState({}, "", href);

    this.handle();
  }

  handle() {
    const hash = window.location.hash;

    if (hash && !hash.startsWith("#/")) return;

    const path = hash || "#/";
    const route = this.routes[path] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;

        const anchorsAside = document.querySelector(".anchors");
        if (path === "#/") {
          anchorsAside.style.display = "none";
        } else {
          anchorsAside.style.display = "block";
        }

        const main = document.querySelector("#app");
        main.focus();

        const anchor = window.location.hash.split("#")[2];

        if (anchor) {
          setTimeout(() => {
            const target = document.getElementById(anchor);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      });
  }
}
