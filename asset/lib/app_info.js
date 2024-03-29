(() => {
  // URL 의 debug 매개변수 탐지하여 DEBUG 모드 설정
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const debug = urlParams.get('debug');

  if (debug === 'true') {
    window.localStorage.setItem('DEBUG', 'true');
  }

  if (debug === 'false') {
    window.localStorage.removeItem('DEBUG');
  }

  const isDebug = window.localStorage.getItem('DEBUG');
  if (isDebug === 'true') {
    const _html = document.documentElement;

    // css 에서 사용
    _html.classList.add('DEBUG');

    // js 에서 사용
    window.DEBUG = true;
  }
})();

window.addEventListener('DOMContentLoaded', (event) => {
  const html = `
  <div id="AppInfo" class="hidden rounded-[4px] [html.DEBUG_&]:flex z-[9999] fixed top-[0] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,.7)] p-[5px_10px] [&_*]:text-[yellow] text-[12px] font-[400] whitespace-nowrap flex-row items-center justify-center gap-[10px]">
    <div>
      <a href="/sitemap.html" class="flex flex-row items-center justify-center gap-[5px]">
        <div>
          <div class="hidden xs:max-sm:!block">Xs</div>
          <div class="hidden sm:max-md:!block">Sm</div>
          <div class="hidden md:max-lg:!block">Md</div>
          <div class="hidden lg:max-xl:!block">Lg</div>
          <div class="hidden xl:max-2xl:!block">Xl</div>
          <div class="hidden 2xl:max-3xl:!block">2Xl</div>
          <div class="hidden 3xl:!block">3Xl</div>
        </div>
        <div>&diamond;</div>
        <div>
          <div class="hidden max-md:!block">휴대폰</div>
          <div class="hidden md:max-lg:!block">태블릿</div>
          <div class="hidden lg:max-xl:!block">랩탑</div>
          <div class="hidden xl:!block">데스크탑</div>
        </div>
        <div>&diamond;</div>
        <div class="wid">wid</div>
        <div>x</div>
        <div class="hei">hei</div>
      </a>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);

  const UA = UAParser();

  const init = () => {
    infoDeviceOS();
    infoWhellDirection();
    infoOnTouch();
    infoScrollDirection();
    infoReadyState();
    infoPath();
    infoScrollTop();
    infoBreakPoint();
    infoiOSSafeArea();
    set100VhCssVar();
  };
  init();

  function infoDeviceOS() {
    const device = UA.device;
    const os = UA.os;
    const cpu = UA.cpu;
    const browser = UA.browser;
    const engine = UA.engine;

    const el_html = document.querySelector('html');
    el_html.setAttribute(`data-device-model`, device.model);
    el_html.setAttribute(`data-device-type`, device.type);
    el_html.setAttribute(`data-device-vendor`, device.vendor);

    el_html.setAttribute(`data-os-name`, os.name);
    el_html.setAttribute(`data-os-version`, os.version);

    el_html.setAttribute(`data-cpu`, cpu.architecture);

    el_html.setAttribute(`data-browser-model`, browser.major);
    el_html.setAttribute(`data-browser-name`, browser.name);
    el_html.setAttribute(`data-browser-version`, browser.version);

    el_html.setAttribute(`data-engine-name`, engine.name);
    el_html.setAttribute(`data-engine-version`, engine.version);
  }

  function infoScrollTop() {
    const el_html = document.querySelector('html');

    function update() {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      el_html.setAttribute('data-scroll-top', Math.round(st));

      const header_hei = document.querySelector(`#Header`).clientHeight;

      let is_header_over = st >= header_hei ? true : false;
      el_html.setAttribute('data-scroll-top-header-over', is_header_over);

      let is_first_section_over =
        st >= window.innerHeight - header_hei ? true : false;
      el_html.setAttribute(
        'data-scroll-top-first-section-over',
        is_first_section_over,
      );
    }

    update();

    window.addEventListener('scroll', (evt) => {
      update();
    });
  }

  function infoWhellDirection() {
    const el_html = document.querySelector('html');

    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        el_html.setAttribute(`data-wheel-direction`, 'up');
      } else if (event.deltaY > 0) {
        el_html.setAttribute(`data-wheel-direction`, 'down');
      }
    });
  }

  function infoOnTouch() {
    const el_html = document.querySelector('html');
    el_html.setAttribute('data-is-touch', false);

    document.addEventListener('touchstart', (evt) => {
      el_html.setAttribute('data-is-touch', true);
    });

    document.addEventListener('touchend', (evt) => {
      el_html.setAttribute('data-is-touch', false);
    });
  }

  function infoScrollDirection() {
    const el_html = document.querySelector('html');
    el_html.setAttribute('data-scroll-diretion', '');

    let prevSt = 0;
    let prevDir;
    let distance = 0;

    function update() {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st <= 0) st = 0;
      const limit_y = el_html.scrollHeight - el_html.clientHeight;
      if (limit_y <= st) st = limit_y;

      if (st > 0 && limit_y > st) {
        let dir;
        if (prevSt - st > 0) {
          dir = 'up';
        } else {
          dir = 'down';
        }

        distance += prevSt - st;

        if (prevDir != dir) {
          // console.log('dir change!');
          distance = 0;
        }

        const distance_k = 0;
        if (Math.abs(distance) > distance_k) {
          el_html.setAttribute('data-scroll-diretion', dir);
        }

        prevDir = dir;
        prevSt = st;
      }
    }

    update();

    window.addEventListener('scroll', (evt) => {
      update();
    });
  }

  function infoReadyState() {
    document.addEventListener('readystatechange', () => {
      const el_html = document.querySelector('html');
      el_html.setAttribute(`data-ready-state`, document.readyState);
      if (document.readyState === 'complete') {
        el_html.setAttribute(`data-is-loading`, false);
      } else {
        el_html.setAttribute(`data-is-loading`, true);
      }
    });
  }

  function infoPath() {
    const el_html = document.querySelector('html');
    const path = window.location.pathname;
    el_html.setAttribute(`data-path`, path);
  }

  function infoBreakPoint() {
    const el_html = document.querySelector('html');

    function update() {
      const wid = window.innerWidth;

      const el_wid = document.querySelector(`#AppInfo .wid`);
      el_wid.textContent = wid;

      const el_hei = document.querySelector(`#AppInfo .hei`);
      el_hei.textContent = window.innerHeight;

      /*
      if (UA.device.type == 'mobile') {
      } else {
      }
      */
    }

    update();

    window.addEventListener('resize', (evt) => {
      update();
    });
  }

  function infoiOSSafeArea() {
    const el_html = document.documentElement;
    const html_style = getComputedStyle(el_html);
    const sab = html_style.getPropertyValue('--sab');
    el_html.setAttribute(`data-safe-area-bottom`, sab);
  }

  function infoWhellDirection() {
    const el_html = document.querySelector('html');
    el_html.setAttribute(`data-wheel-direction`, '');

    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        el_html.setAttribute(`data-wheel-direction`, 'up');
      } else if (event.deltaY > 0) {
        el_html.setAttribute(`data-wheel-direction`, 'down');
      }
    });
  }

  /**
   * 100vh 주소창 버그 때문에 CSS 변수 추가 해둠
   */
  window.addEventListener('resize', () => {
    set100VhCssVar();
  });
  set100VhCssVar();

  function set100VhCssVar() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh-100', `${vh}px`);
  }
});
