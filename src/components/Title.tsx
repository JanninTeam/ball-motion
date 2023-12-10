import { Text, TextStyle, StyleSheet } from 'react-native';
import theme from '../globals/globalStyles';
import BaseText from './BaseText';

type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Props = {
  children?: React.ReactNode;
  style?: TextStyle;
  type?: TitleType;
  center?: boolean;
};

export default function Title({ children, style, type, center = true }: Props) {
  const typeStyle = theme.fontStyles[type || 'h1'];

  return (
    <BaseText
      style={[styles.title, typeStyle, center ? styles.center : {}, style]}
    >
      {children}
    </BaseText>
  );
}

// -------------------
const styles = StyleSheet.create({
  title: {
    color: theme.colors.black,
  },

  center: {
    textAlign: 'center',
  },
});
