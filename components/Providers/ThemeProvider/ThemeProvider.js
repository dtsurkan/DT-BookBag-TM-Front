import { ThemeProvider as JSSThemeProvider } from 'react-jss';

const theme = {
  breakpoints: {
    xs: 480,
    sm: 575,
    md: 767,
    lg: 991,
    xl: 1199,
    xxl: 1599,
    down: (key) => `@media (max-width: ${key}px)`,
    up: (key) => `@media (min-width: ${key}px)`,
  },
};

const ThemeProvider = ({ children }) => {
  return <JSSThemeProvider theme={theme}>{children}</JSSThemeProvider>;
};

export default ThemeProvider;
