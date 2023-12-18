import { Text, TextProps, StyleSheet } from 'react-native';
import theme from '../globals/globalStyles';

type FontFamily =
  | 'Jost-Regular'
  | 'Jost-Bold'
  | 'Jost-SemiBold'
  | 'Jost-Medium'
  | 'Jost-Light'
  | 'Jost-Thin'
  | undefined;
type Props = TextProps & {
  fontFamily?: FontFamily;
};
export default function BaseText({
  children,
  style,
  fontFamily = 'Jost-Regular',
  ...rest
}: Props) {
  return (
    <Text {...rest} style={[styles.text, { fontFamily }, style]}>
      {children}
    </Text>
  );
}

// -------------------
const styles = StyleSheet.create({
  text: {
    color: theme.colors.black,
  },
});
