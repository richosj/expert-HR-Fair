import '@/scss/main.scss';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false
});

// raf loop
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// ScrollTrigger와 동기화
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
ScrollTrigger.update();


const body = document.querySelector('body');
const openApplyBtn = document.querySelector('.open-apply__btn');
const openApply = document.querySelector('.open-apply');
const applyClose = document.querySelector('.apply__close');

// 참가신청 버튼 클릭 시 참가신청 모달 창 열기
openApplyBtn.addEventListener('click', () => {
    body.classList.toggle('apply-open');
});

applyClose.addEventListener('click', () => {
  body.classList.remove('apply-open');
});

const applyBtn = document.querySelector(".open-apply");
const footer = document.querySelector(".footer");


ScrollTrigger.create({
  trigger: footer,
  start: () => `top bottom`, // footer top이 viewport bottom에 닿을 때
  end: () => `bottom bottom`, // footer bottom이 viewport bottom에 닿을 때
  scrub: false,
  onEnter: () => {
    const footerTop = footer.offsetTop;
    const btnHeight = applyBtn.offsetHeight;

    // footer 위에 딱 붙게 absolute로 변경
    gsap.set(applyBtn, {
      position: "absolute",
      top: `${footerTop - btnHeight}px`,
      right: 0,
      bottom: "auto",
    });
  },
  onLeaveBack: () => {
    // 다시 fixed로 복구
    gsap.set(applyBtn, {
      position: "fixed",
      bottom: 0,
      right: 0,
      top: "auto",
    });
  },
});

// 팝업(모달) 열기/닫기 기능
const modal = document.getElementById('customModal');
const modalClose = document.getElementById('customModalClose');
const modalBackdrop = modal?.querySelector('.custom-modal__backdrop');
const detailsBtns = document.querySelectorAll('.details');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

detailsBtns.forEach(btn => {
  btn.addEventListener('click', openModal);
});
modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);


