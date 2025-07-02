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
const body = document.querySelector("body");
const openApplyBtn = document.querySelector(".open-apply__btn");
document.querySelector(".open-apply");
const applyClose = document.querySelector(".apply__close");
openApplyBtn.addEventListener("click", () => {
  body.classList.toggle("apply-open");
});
applyClose.addEventListener("click", () => {
  body.classList.remove("apply-open");
});
gsap.registerPlugin(ScrollTrigger);
const applyBtn = document.querySelector(".open-apply");
const footer = document.querySelector(".footer");
ScrollTrigger.create({
  trigger: footer,
  start: () => `top bottom`,
  // footer top이 viewport bottom에 닿을 때
  end: () => `bottom bottom`,
  // footer bottom이 viewport bottom에 닿을 때
  scrub: false,
  onEnter: () => {
    const footerTop = footer.offsetTop;
    const btnHeight = applyBtn.offsetHeight;
    gsap.set(applyBtn, {
      position: "absolute",
      top: `${footerTop - btnHeight}px`,
      right: 0,
      bottom: "auto"
    });
  },
  onLeaveBack: () => {
    gsap.set(applyBtn, {
      position: "fixed",
      bottom: 0,
      right: 0,
      top: "auto"
    });
  }
});
const modal = document.getElementById("customModal");
const modalClose = document.getElementById("customModalClose");
const modalBackdrop = modal == null ? void 0 : modal.querySelector(".custom-modal__backdrop");
const detailsBtns = document.querySelectorAll(".details");
function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
detailsBtns.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
modalClose == null ? void 0 : modalClose.addEventListener("click", closeModal);
modalBackdrop == null ? void 0 : modalBackdrop.addEventListener("click", closeModal);
