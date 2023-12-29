import { TextStyle } from 'react-native';
import { WIDTH } from '../constants/screenSize';
import { StyleSheet } from 'react-native';

const colors = {
  white: '#ffffff',
  gray: '#f5f5f5',
  black: '#000000',
  primary: '#3f51b5',
  secondary: '#f50057',
  error: '#f44336',
  red: '#f44336',
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

const borderRadius = {
  small: 6,
  medium: 10,
  large: 14,
  xlarge: 18,

  circle: 100_000, // Should be large enough to support any circle
};

const fontStyles = {
  h1: { fontSize: 48, fontWeight: '500' },
  h2: { fontSize: 32, fontWeight: '500' },
  h3: { fontSize: 24, fontWeight: '500' },
  h4: { fontSize: 18, fontWeight: '500' },
  h5: { fontSize: 16, fontWeight: '500' },
} as Record<string, TextStyle>;

const theme = {
  colors,
  fontStyles,
  borderRadius,
  spacing,
};

// Common styles such as centering, flexing, etc.
export const globalStyles = StyleSheet.create({
  justifyCenter: { justifyContent: 'center' },
  alignCenter: { alignItems: 'center' },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  marginSmall: { margin: spacing.small },
  marginMedium: { margin: spacing.medium },
  marginLarge: { margin: spacing.large },
  marginXlarge: { margin: spacing.xlarge },
  marginXxlarge: { margin: spacing.xxlarge },

  capitalize: { textTransform: 'capitalize' },
});

export default theme;
