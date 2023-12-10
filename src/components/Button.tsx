import {
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import BaseText from './BaseText';

// At least one of these props is required, but not all of them are needed
type OptionalPressProps =
  | { onPress: () => void; onPressIn?: () => void; onPressOut?: () => void }
  | { onPress?: () => void; onPressIn: () => void; onPressOut?: () => void }
  | { onPress?: () => void; onPressIn?: () => void; onPressOut: () => void };

type Props = {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  text: string;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
} & OptionalPressProps;

export default function Container({
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  containerStyle,
  textStyle,
  text,
  icon,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <View style={styles.innerContainer}>
        {icon}
        <BaseText style={[styles.text, textStyle]}>{text}</BaseText>
      </View>
    </TouchableOpacity>
  );
}

// -------------------
const styles = StyleSheet.create({
  container: {},
  innerContainer: {},
  text: {},
});
