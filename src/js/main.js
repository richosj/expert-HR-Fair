import '@/scss/main.scss';

const body = document.querySelector('body');
const openApplyBtn = document.querySelector('.open-apply__btn');
const openApply = document.querySelector('.open-apply');

// 참가신청 버튼 클릭 시 참가신청 모달 창 열기
openApplyBtn.addEventListener('click', () => {
    body.classList.toggle('apply-open');
});

