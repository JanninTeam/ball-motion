import { NavigationProp } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../../App';
import { previousRuns } from '../../sampleData/previousRuns';
import { users } from '../../sampleData/userData';
import { routes } from '../Routes';
import Achievement from '../components/Achievement';
import ActivityThumbnail from '../components/ActivityThumbnail';
import BaseModal from '../components/BaseModal';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Page from '../components/Page';
import Title from '../components/Title';
import theme from '../globals/globalStyles';
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
  const { user, setUser } = useContext(UserContext);

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
              <TouchableOpacity
                style={styles.user}
                key={user.id}
                onPress={() => {
                  setUserModalOpen(false);
                  setUser(user);
                }}
              >
                <Icon name="person" size={50} />
                <BaseText>{user.username}</BaseText>
              </TouchableOpacity>
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
