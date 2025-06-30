//import '@/scss/main.scss';
/**
 * @file map.js
 * @description 지도 페이지의 클라이언트 사이드 스크립트입니다.
 * 줌 컨트롤, 정보 툴팁, 지도 컨텍스트 메뉴 등의 기능을 처리합니다.
 */
(() => {
  'use strict';
  /**
   * 줌 컨트롤 슬라이더 기능을 초기화합니다.
   * 줌인/줌아웃 버튼과 범위 슬라이더를 연결합니다.
   */
  function setupZoomControls() {
    const range = document.getElementById("zoom-range");
    const zoomIn = document.getElementById("zoom-in");
    const zoomOut = document.getElementById("zoom-out");

    // 필수 요소가 없으면 초기화를 건너뜁니다.
    if (!range || !zoomIn || !zoomOut) {
      return;
    }

    /**
     * 현재 값에 따라 슬라이더의 배경 그라데이션을 업데이트합니다.
     */
    function updateSliderGradient() {
      const min = parseInt(range.min, 10);
      const max = parseInt(range.max, 10);
      const val = parseInt(range.value, 10);
      const percent = ((val - min) / (max - min)) * 100;
      // 세로 슬라이더의 채워진 부분을 표현하기 위해 'to top'을 사용합니다.
      //range.style.background = `linear-gradient(to bottom, #007bff ${percent}%, #ddd ${percent}%)`;
      console.log(range.value);
    }

    zoomIn.addEventListener("click", () => {
      const val = parseInt(range.value, 10);
      if (val < parseInt(range.max, 10)) {
        range.value = val + 1;
        updateSliderGradient();
      }
    });

    zoomOut.addEventListener("click", () => {
      const val = parseInt(range.value, 10);
      if (val > parseInt(range.min, 10)) {
        range.value = val - 1;
        updateSliderGradient();
      }
    });

    

    range.addEventListener("input", updateSliderGradient);

    // 초기 그라데이션 업데이트
    updateSliderGradient();
  }

  /**
   * 정보 툴팁 기능을 초기화합니다.
   * '.toggle-tooltip' 클래스를 가진 버튼 클릭 시 툴팁이 표시됩니다.
   */
  function setupInfoTooltips() {
    const infoTool = document.getElementById('info-tool');
    const tooltipButtons = document.querySelectorAll('.toggle-tooltip');

    if (!infoTool || tooltipButtons.length === 0) {
      return;
    }
    
    const infoToolText = infoTool.querySelector('.info-tool-text');
    const infoToolClose = infoTool.querySelector('.info-tool-close');
    let activeTooltip = null;

    /**
     * 클릭된 버튼을 기준으로 툴팁의 위치를 조정합니다.
     * @param {HTMLElement} button - 툴팁을 트리거한 버튼
     */
    function positionTooltip(button) {
      const rect = button.getBoundingClientRect();
      const tooltipRect = infoTool.getBoundingClientRect();
      
      let left = rect.left;
      let top = rect.bottom + 10;

      // 툴팁이 뷰포트를 벗어나지 않도록 조정합니다.
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 20;
      }
      if (top + tooltipRect.height > window.innerHeight) {
        top = rect.top - tooltipRect.height - 10;
      }

      infoTool.style.left = `${left}px`;
      infoTool.style.top = `${top}px`;
    }

    /**
     * 툴팁의 표시 여부를 토글합니다.
     * @param {HTMLElement} button - 클릭된 버튼
     */
    function toggleTooltip(button) {
      const content = button.getAttribute('data-text') || '설명이 없습니다.';

      if (activeTooltip === button) {
        infoTool.classList.remove('show');
        button.setAttribute('aria-pressed', 'false');
        activeTooltip = null;
      } else {
        if (activeTooltip) {
          activeTooltip.setAttribute('aria-pressed', 'false');
        }
        infoToolText.textContent = content;
        infoTool.classList.add('show');
        positionTooltip(button);
        button.setAttribute('aria-pressed', 'true');
        activeTooltip = button;
      }
    }

    tooltipButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTooltip(button);
      });
    });

    infoToolClose?.addEventListener('click', () => {
      infoTool.classList.remove('show');
      if (activeTooltip) {
        activeTooltip.setAttribute('aria-pressed', 'false');
        activeTooltip = null;
      }
    });

    // 외부 클릭 시 툴팁을 닫습니다.
    document.addEventListener('click', (e) => {
      if (!infoTool.contains(e.target) && !e.target.closest('.toggle-tooltip')) {
        infoTool.classList.remove('show');
        if (activeTooltip) {
          activeTooltip.setAttribute('aria-pressed', 'false');
          activeTooltip = null;
        }
      }
    });
  }

  /**
   * 지도 영역의 커스텀 컨텍스트 메뉴를 초기화합니다.
   * 지도 컨테이너 내에서 우클릭 시 메뉴가 나타납니다.
   */
  function setupMapContextMenu() {
    const mapArea = document.getElementById('map');
    const contextMenu = document.getElementById('map-context-menu');

    if (!mapArea || !contextMenu) {
      return;
    }

    mapArea.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      contextMenu.style.display = 'block';

      // 메뉴 위치를 화면을 벗어나지 않도록 조정합니다.
      let left = e.clientX;
      let top = e.clientY;
      const menuRect = contextMenu.getBoundingClientRect();

      if (left + menuRect.width > window.innerWidth) {
        left = window.innerWidth - menuRect.width - 10;
      }
      if (top + menuRect.height > window.innerHeight) {
        top = window.innerHeight - menuRect.height - 10;
      }

      contextMenu.style.left = `${left}px`;
      contextMenu.style.top = `${top}px`;
    });
    
    // 클릭, 스크롤, 리사이즈 시 메뉴를 숨깁니다.
    document.addEventListener('click', (e) => {
      if (!contextMenu.contains(e.target)) {
        contextMenu.style.display = 'none';
      }
    });
    window.addEventListener('scroll', () => { contextMenu.style.display = 'none'; });
    window.addEventListener('resize', () => { contextMenu.style.display = 'none'; });
  }

  /**
   * DOM이 준비되면 모든 페이지 기능을 초기화합니다.
   */
  function init() {
    setupZoomControls();
    setupInfoTooltips();
    setupMapContextMenu();
  }

  // DOM이 완전히 로드된 후 스크립트를 실행합니다.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM이 이미 준비된 경우 즉시 실행합니다.
    init();
  }

})();
