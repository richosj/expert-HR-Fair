import '@/scss/main.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
// ScrollSmoother.create({
//   smooth: 1,
//   effect: true,
// });

// var smoothscroll = {
//   passive: function passive() {
//     var supportsPassive = false;
//     try {
//       document.addEventListener('test', null, {
//         get passive() {
//           supportsPassive = true;
//         }
//       });
//     } catch (e) {}
//     return supportsPassive;
//   },
//   init: function init() {
//     var userAgent = navigator.userAgent.toLowerCase();
//     var isMobile = /iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
//     var isMac = /macintosh|mac os x/i.test(userAgent);
//     var isWindows = /windows/i.test(userAgent);
//     var isLinux = /linux/i.test(userAgent);
//     if (isMobile || isMac) return;

//     //if (document.documentElement.classList.contains('mobile') || document.documentElement.classList.contains('mac')) return;

//     if (this.passive()) {
//       window.addEventListener('wheel', this.scrolling, {
//         passive: false
//       });
//     } else {
//       window.addEventListener('mousewheel', this.scrolling);
//       window.addEventListener('DOMMouseScroll', this.scrolling);
//     }
//   },
//   destroy: function destroy() {
//     if (this.passive()) {
//       window.removeEventListener('wheel', this.scrolling);
//     } else {
//       window.removeEventListener('mousewheel', this.scrolling);
//       window.removeEventListener('DOMMouseScroll', this.scrolling);
//     }
//     gsap.killTweensOf(window, {
//       scrollTo: true
//     });
//   },
//   scrolling: function scrolling(event) {
//     event.preventDefault();
//     var scrollTime = 1;
//     var distanceOffset = 2.5;
//     var scrollDistance = window.innerHeight / distanceOffset;
//     var delta = 0;
//     if (smoothscroll.passive()) {
//       delta = event.wheelDelta / 120 || -event.deltaY / 3;
//     } else {
//       if (typeof event.originalEvent.deltaY != 'undefined') {
//         delta = -event.originalEvent.deltaY / 120;
//       } else {
//         delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
//       }
//     }
//     var scrollTop = document.documentElement.scrollTop;
//     var finalScroll = scrollTop - parseInt(delta * scrollDistance);
//     gsap.to(window, {
//       duration: scrollTime,
//       scrollTo: {
//         y: finalScroll,
//         autoKill: true
//       },
//       ease: 'power3.out',
//       overwrite: 5
//     });
//   }
// };

// smoothscroll.init();


const body = document.querySelector('body');

const nav = document.querySelector('.nav');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');


mobileMenu.addEventListener('click', () => {
  body.classList.add('nav-open');
});

mobileMenuClose.addEventListener('click', () => {
  body.classList.remove('nav-open');
});




const openApplyBtn = document.querySelector('.apply-s-btn button');
const openApply = document.querySelector('.open-apply');
const openApplys = document.querySelector('.open-applys');
const applyClose = document.querySelector('.apply__close');

openApplys.addEventListener('click', (e) => {
  e.preventDefault();
  body.classList.toggle('apply-open');
});

// 참가신청 버튼 클릭 시 참가신청 모달 창 열기
openApplyBtn.addEventListener('click', () => {
    body.classList.toggle('apply-open');
});

applyClose.addEventListener('click', () => {
  body.classList.remove('apply-open');
});

const btnTop = document.querySelector("#btnTop");

const applyBtn = document.querySelector(".open-apply");
const footer = document.querySelector(".footer");

// DOM이 완전히 로드된 후 ScrollTrigger 실행
window.addEventListener('DOMContentLoaded', () => {
  const scrollMoving = document.querySelector('.scroll-move');
  if(scrollMoving){
  window.addEventListener('scroll', () => {
    
    if(window.scrollY > 100) {
      scrollMoving.classList.add('hidden');
    } else {
      scrollMoving.classList.remove('hidden');
    }
  })
  }

  // btnTop 스크롤 기능
  if (btnTop) {
    // 초기 상태 설정 (숨김)
    gsap.set(btnTop, { opacity: 0, y: 50, pointerEvents: 'none' });

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.progress > 0.1) { // 10% 스크롤 후 나타남
          gsap.to(btnTop, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            pointerEvents: 'auto'
          });
        } else {
          gsap.to(btnTop, {
            opacity: 0,
            y: 50,
            duration: 0.3,
            pointerEvents: 'none'
          });
        }
      }
    });

    // btnTop 클릭 시 맨 위로 스크롤
    btnTop.addEventListener('click', () => {
      gsap.to(window, {
        duration: .2,
        scrollTo: { y: 0 },
        //ease: 'power2.out'
      });
    });
  }

  if (applyBtn && footer) {
    const updateApplyPosition = () => {
      const applyHeight = applyBtn.offsetHeight;
      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top + window.scrollY;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const windowBottom = scrollY + windowHeight;
  
      if (windowBottom > footerTop) {
        const offset = windowBottom - footerTop;
        gsap.set(applyBtn, {
          position: 'absolute',
          bottom: 'auto',
          top: `${footerTop - applyHeight - 16}px`, // footer 위 16px
        });
      } else {
        gsap.set(applyBtn, {
          position: 'fixed',
          top: 'auto',
          bottom: '1.5rem'
        });
      }
    };
  
    // 최초 설정
    //updateApplyPosition();
  
    // 스크롤/리사이즈 반응
    //window.addEventListener('scroll', updateApplyPosition);
    //window.addEventListener('resize', updateApplyPosition);
  
    // ScrollTrigger의 업데이트 주기에 위치 갱신
    //ScrollTrigger.addEventListener('refresh', updateApplyPosition);
    //ScrollTrigger.refresh();
  }
  
});

// 팝업(모달) 열기/닫기 기능
const modal = document.getElementById('customModal');
const modalClose = document.getElementById('customModalClose');
const modalBackdrop = modal?.querySelector('.custom-modal__backdrop');
const detailsBtns = document.querySelectorAll('.details');
const mobileDetailsBtns = document.querySelectorAll('.session-detail-time');
function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

mobileDetailsBtns.forEach(btn => {
  if(window.innerWidth < 1024){
    btn.addEventListener('click', openModal);
  }
});

detailsBtns.forEach(btn => {
  btn.addEventListener('click', openModal);
});
modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);


