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
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
if (window.innerWidth > 768) {
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
  ScrollSmoother.create({
    wrapper: "#smoother-wrapper",
    content: "#smoother-content",
    smooth: 1.1,
    speed: 1,
    normalizeScroll: true,
    ignoreMobileResize: true,
    smoothTouch: 0.1,
    effects: true,
    preventDefault: true,
    normalizeScroll: { allowNestedScroll: true }
    // 중첩 스크롤 허용
  });
}
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
document.querySelector(".open-apply");
document.querySelector(".footer");
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
