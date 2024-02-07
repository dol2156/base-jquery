tailwind.config = {
  content: ['./**/*.{html,js,hbs}'],
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    letterSpacing: {
      25: '0.025em',
      50: '0.050em',
      75: '0.075em',
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
