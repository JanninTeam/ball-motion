import Page from '../components/Page';
import Title from '../components/Title';
import { ScrollView, StyleSheet, View } from 'react-native';
import theme from '../globals/globalStyles';
import Button from '../components/Button';
import { NavigationProp } from '@react-navigation/native';
import { routes } from '../Routes';
import ActivityThumbnail from '../components/ActivityThumbnail';
import { previousRuns } from '../../sampleData/previousRuns';
import { achievements } from '../common/achievements';
import Achievement from '../components/Achievement';

function ActivityList() {
  return (
    <ScrollView horizontal>
      <View style={styles.activityContainer}>
        {previousRuns.map((activity) => (
          <ActivityThumbnail key={activity.id} activity={activity} />
        ))}
      </View>
    </ScrollView>
  );
}

function AchievementList() {
  // TODO: When we have users and user data, we can just take the top 3 completed achievements
  // For now we will create a list of the first 3 achievements
  const data = achievements.slice(0, 3);

  return (
    <ScrollView>
      <View style={styles.achievementContainer}>
        {data.map((achievement) => (
          <Achievement key={achievement.id} {...achievement} />
        ))}
      </View>
    </ScrollView>
  );
}

type Props = { navigation: NavigationProp<any> };
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

      <Title type="h3" style={styles.sectionTitle}>
        Achievements
      </Title>
      <AchievementList />

      <Button
        text="View All Achievements"
        onPress={() => navigation.navigate(routes.achievements)}
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

  activityContainer: {
    gap: theme.spacing.large,
    flexDirection: 'row',
  },

  achievementContainer: {
    gap: theme.spacing.medium,
    flexDirection: 'column',
  },
});
