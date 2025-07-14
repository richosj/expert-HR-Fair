document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

    ScrollSmoother.create({
        smooth: 1,
        effects: true,
    });

    // ✅ 비디오 로딩 처리
    const video = document.querySelector(".visual__video video");
    video.addEventListener("loadeddata", () => {
        video.classList.add("loaded");
    });

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
            // ✅ s1 애니메이션
            const year = document.querySelector('.s1-title-1 .l');
            const fair = document.querySelector('.s1-title-1 .r');
            const date = document.querySelector('.s1-title-2 span');

            gsap.set([year, fair], { opacity: 0, x: (i) => i === 0 ? '-50%' : '50%' });
            //gsap.set(date, { y: '110%' });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.s1-title',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            })
                .to(year, { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' })
                .to(fair, { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }, '<0.1')
                .to(date, { opacity: 1, duration: 1.4, ease: 'power2.out' }, '<0.2');

            // ✅ s2 텍스트
            gsap.set('.s2-title div.fir', { y: '100%', opacity: 0 });
            gsap.set('.s2-title div.sec', { y: '100%', opacity: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.s2-title',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            })
                .to('.s2-title div.fir', { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
                .to('.s2-title div.sec', { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '<0.2');

            // ✅ hexagon 도형 & 텍스트 순차 등장
            gsap.set('.hexagon-1', { x: -50, opacity: 0, scale: 1.1 });
            gsap.set('.hexagon-2', { y: 50, opacity: 0 });
            gsap.set('.shape-4', { opacity: 0 });

            gsap.set('.hexagon-1 .box span, .hexagon-2 .box span', { y: 20, opacity: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.hexagon-wrap-inner',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            })
                .to('.hexagon-1', { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' })
                .to('.hexagon-2', { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }, '-=0.5')
                .to('.hexagon-1 .box span', {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power2.out',
                    duration: 0.6,
                }, '-=0.3')
                .to('.hexagon-2 .box span', {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power2.out',
                    duration: 0.6,
                }, '-=0.2')
                .to('.shape-4', { opacity: 1, duration: 0.6 }, '-=0.1');

            // ✅ s3 타이틀 + 카드
            gsap.set('.s3-title span', { y: 40, opacity: 0 });
            gsap.set('.square-flip', { opacity: 0, scale: 1.1 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.s3-title',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            })
                .to('.s3-title span', { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.s3-content',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                }
            })
                .to('.square-flip', {
                    opacity: 1,
                    scale: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power3.out',
                });

        },
    });

    // ✅ 비디오 소스 스위칭
    function handleVideoSource() {
        const video = document.getElementById("heroVideo");
        if (!video) return;

        const isMobile = window.innerWidth <= 1024;
        const targetSrc = isMobile ? "./randing-mobile.mp4" : "./randing.mp4";

        if (!video.src.includes(targetSrc.split("/").pop())) {
            const currentTime = video.currentTime;
            const wasPlaying = !video.paused;
            video.src = targetSrc;
            video.load();
            video.addEventListener(
                "loadeddata",
                function onLoad() {
                    video.currentTime = currentTime;
                    if (wasPlaying) video.play();
                    video.removeEventListener("loadeddata", onLoad);
                },
                { once: true }
            );
        }
    }

    // ✅ 리사이즈 처리
    let resizeTimer = null;
    let isDesktop = window.innerWidth >= 1024;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newIsDesktop = window.innerWidth >= 1024;
            handleVideoSource();
            if (newIsDesktop !== isDesktop) {
                isDesktop = newIsDesktop;
                ScrollTrigger.refresh();
            } else {
                ScrollTrigger.refresh();
            }
        }, 250);
    });
});
