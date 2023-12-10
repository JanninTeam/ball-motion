import { Text, TextProps, StyleSheet } from 'react-native';
import theme from '../globals/globalStyles';

type Props = TextProps & {};

export default function BaseText({ children, style, ...rest }: Props) {
  return (
    <Text {...rest} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

// -------------------
const styles = StyleSheet.create({
  text: {
    // fontFamily: 'Jost-Regular',
    color: theme.colors.black,
  },
});
