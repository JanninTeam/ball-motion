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
import { useContext, useState } from 'react';
import BaseText from '../components/BaseText';
import Modal from 'react-native-modal';
import { HEIGHT, WIDTH } from '../constants/screenSize';
import BaseModal from '../components/BaseModal';
import { users } from '../../sampleData/userData';
import Icon from '../components/Icon';
import { UserContext } from '../../App';
import { getTopAchievements } from '../util/getTopAchievements';

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

type AchievementProps = { user: User | null };

function AchievementList({ user }: AchievementProps) {
  const achievementData = getTopAchievements(user);

  return (
    <ScrollView>
      <View style={styles.achievementContainer}>
        {achievementData.map((achievement) => (
          <Achievement key={achievement.id} {...achievement} />
        ))}
      </View>
    </ScrollView>
  );
}

type Props = { navigation: NavigationProp<any> };
export default function DashboardPage({ navigation }: Props) {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
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

        <AchievementList user={user} />

        <Button
          text="View All Achievements"
          onPress={() => navigation.navigate(routes.achievements)}
          containerStyle={styles.button}
        />

        <BaseText>Current User: {user?.username ?? 'None'}</BaseText>
        <Button text="Switch Users" onPress={() => setUserModalOpen(true)} />
      </Page>

      <BaseModal
        isVisible={userModalOpen}
        onDismiss={() => setUserModalOpen(false)}
        position="bottom"
      >
        <Title type="h3">Select User</Title>
        <ScrollView horizontal>
          <View style={styles.userContainer}>
            {users.map((user) => (
              <View style={styles.user} key={user.id}>
                <Icon name="person" size={50} />
                <BaseText>{user.username}</BaseText>
              </View>
            ))}
            <View style={styles.user}>
              <Icon name="plus1" size={50} />
              <BaseText>Add User</BaseText>
            </View>
          </View>
        </ScrollView>
      </BaseModal>
    </>
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

  user: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.medium,
  },

  userContainer: {
    gap: theme.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
