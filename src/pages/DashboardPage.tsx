import ActivityList from '../components/ActivityList';
import Page from '../components/Page';
import Title from '../components/Title';
import { StyleSheet } from 'react-native';
import theme from '../globals/globalStyles';
import Button from '../components/Button';
import { NavigationProp } from '@react-navigation/native';
import { routes } from '../Routes';

type Props = {
  navigation: NavigationProp<any>;
};

export default function DashboardPage({ navigation }: Props) {
  return (
    <Page>
      <Title style={styles.sectionTitle}>Dashboard</Title>
      <Title type="h3" style={styles.sectionTitle}>
        Recent
      </Title>
      <ActivityList />
      <Button
        text="View All Runs"
        onPress={() => navigation.navigate(routes.allRuns)}
        containerStyle={styles.button}
      />
    </Page>
  );
}

// -------------------
const styles = StyleSheet.create({
  sectionTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },

  button: {
    margin: theme.spacing.medium,
    alignSelf: 'center',
  },
});
