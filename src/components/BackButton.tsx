import { NavigationProp } from '@react-navigation/native';
import Button from './Button';

export type BackButtonProps = {};

type Props = {
  navigation: NavigationProp<any>;
} & BackButtonProps;

export default function BackButton({ navigation }: Props) {
  return <Button text="Back" onPress={() => navigation.goBack()} />;
}
