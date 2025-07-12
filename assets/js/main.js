(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
const body = document.querySelector("body");
document.querySelector(".nav");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu-close");
mobileMenu.addEventListener("click", () => {
  body.classList.add("nav-open");
});
mobileMenuClose.addEventListener("click", () => {
  body.classList.remove("nav-open");
});
const openApplyBtn = document.querySelector(".apply-s-btn button");
document.querySelector(".open-apply");
const openApplys = document.querySelector(".open-applys");
const applyClose = document.querySelector(".apply__close");
openApplys.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.toggle("apply-open");
});
openApplyBtn.addEventListener("click", () => {
  body.classList.toggle("apply-open");
});
applyClose.addEventListener("click", () => {
  body.classList.remove("apply-open");
});
const btnTop = document.querySelector("#btnTop");
document.querySelector(".open-apply");
document.querySelector(".footer");
window.addEventListener("DOMContentLoaded", () => {
  const scrollMoving = document.querySelector(".scroll-move");
  if (scrollMoving) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollMoving.classList.add("hidden");
      } else {
        scrollMoving.classList.remove("hidden");
      }
    });
  }
  if (btnTop) {
    gsap.set(btnTop, { opacity: 0, y: 50, pointerEvents: "none" });
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (self.progress > 0.1) {
          gsap.to(btnTop, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            pointerEvents: "auto"
          });
        } else {
          gsap.to(btnTop, {
            opacity: 0,
            y: 50,
            duration: 0.3,
            pointerEvents: "none"
          });
        }
      }
    });
    btnTop.addEventListener("click", () => {
      gsap.to(window, {
        duration: 0.2,
        scrollTo: { y: 0 }
        //ease: 'power2.out'
      });
    });
  }
});
const modal = document.getElementById("customModal");
const modalClose = document.getElementById("customModalClose");
const modalBackdrop = modal == null ? void 0 : modal.querySelector(".custom-modal__backdrop");
const detailsBtns = document.querySelectorAll(".details");
const mobileDetailsBtns = document.querySelectorAll(".session-detail-time");
function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
mobileDetailsBtns.forEach((btn) => {
  if (window.innerWidth < 1024) {
    btn.addEventListener("click", openModal);
  }
});
detailsBtns.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
modalClose == null ? void 0 : modalClose.addEventListener("click", closeModal);
modalBackdrop == null ? void 0 : modalBackdrop.addEventListener("click", closeModal);
