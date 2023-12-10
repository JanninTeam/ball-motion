import { Text, TextStyle, StyleSheet } from 'react-native';
import theme from '../globals/globalStyles';
import BaseText from './BaseText';

type Props = {
  children?: React.ReactNode;
  style?: TextStyle;
};

export default function Title({ children, style }: Props) {
  return <BaseText style={[styles.title, style]}>{children}</BaseText>;
}

// -------------------
const styles = StyleSheet.create({
  title: {
    ...theme.fontStyles.h1,
    color: theme.colors.primary,
  },
});
