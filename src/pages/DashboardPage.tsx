import ActivityList from '../components/ActivityList';
import Page from '../components/Page';
import Title from '../components/Title';
import { StyleSheet } from 'react-native';
import theme from '../globals/globalStyles';

export default function DashboardPage() {
  return (
    <Page>
      <Title style={styles.sectionTitle}>Dashboard</Title>
      <Title type="h3" style={styles.sectionTitle}>
        Previous Runs
      </Title>
      <ActivityList />
    </Page>
  );
}

// -------------------
const styles = StyleSheet.create({
  sectionTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },
});
