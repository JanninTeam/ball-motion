import { TextStyle } from 'react-native';

const colors = {
  white: '#ffffff',
  black: '#000000',
  primary: '#3f51b5',
  secondary: '#f50057',
  error: '#f44336',
};

// const themes = {
//   'light': {
//     background: colors.white,
//     text: colors.black,
//   },

//   'dark': {
//     background: colors.black,
//     text: colors.white,
//   },
// }

const spacing = {
  small: 6,
  medium: 12,
  large: 18,
  xlarge: 24,
  xxlarge: 36,
};

const fontStyles = {
  h1: { fontSize: 48, fontWeight: 'bold' },
  h2: { fontSize: 32, fontWeight: 'bold' },
  h3: { fontSize: 24, fontWeight: 'bold' },
  h4: { fontSize: 18, fontWeight: 'bold' },
  h5: { fontSize: 16, fontWeight: 'bold' },
} as Record<string, TextStyle>;

const theme = {
  colors,
  fontStyles,
  spacing,
};

export default theme;
