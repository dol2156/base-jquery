tailwind.config = {
  content: ['./**/*.{html,js,hbs}'],
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    spacing: {
      // mobile vw 선언
      ...(() => {
        const obj = {};

        const design_width = parseInt(getCssVar('--DesignWidth_Mobile'));

        let i = 1;
        let len_i = 1000;
        while (i <= len_i) {
          obj[`mvw${i}`] = `calc(100vw/${design_width}*${i})`;
          ++i;
        }
        return obj;
      })(),

      // pc vw 선언
      ...(() => {
        const obj = {};

        const design_width = parseInt(getCssVar('--DesignWidth_PC'));

        let i = 1;
        let len_i = 1000;
        while (i <= len_i) {
          obj[`pvw${i}`] = `calc(100vw/${design_width}*${i})`;
          ++i;
        }
        return obj;
      })(),
    },
    screens: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      pc: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
    },
  },
};

/**
 * :root 에서 css 변수 값 추출
 * @param var_name
 * @returns {string}
 */
function getCssVar(var_name) {
  // CSS 변수 값을 읽을 요소를 선택합니다.
  const element = document.querySelector(':root');

  // 요소의 계산된 스타일을 가져옵니다.
  const computedStyles = getComputedStyle(element);

  // CSS 변수의 값을 가져옵니다.
  const variableValue = computedStyles.getPropertyValue(var_name);

  return variableValue;
}
