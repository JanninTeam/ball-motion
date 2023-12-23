import { NavigationProp } from '@react-navigation/native';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import Page from '../components/Page';
import Title from '../components/Title';
import { routes } from '../Routes';

type Props = {
  navigation: NavigationProp<any>;
};

export default function NewActivityPage({ navigation }: Props) {
  return (
    <Page>
      <Title>New Activity</Title>
      <BaseText>New Activity</BaseText>
      <Button
        onPress={() => navigation.navigate(routes.cameraView)}
        text="Start"
      />
    </Page>
  );
}
