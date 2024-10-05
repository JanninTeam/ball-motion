import { Button } from 'react-native';
import BaseText from '../components/BaseText';
import Page from '../components/Page';
import { routes } from '../Routes';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};
export default function DashboardPage({ navigation }: Props) {
  return (
    <Page>
      <BaseText>Dashboard Page</BaseText>
      <BaseText>
        TODO: Have settings here to change things like units of measurement
      </BaseText>

      <Button
        title="Start"
        onPress={() => navigation.navigate(routes.cameraView)}
      />
    </Page>
  );
}
