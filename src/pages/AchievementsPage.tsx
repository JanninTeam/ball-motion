import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { achievements } from '../common/achievements';
import Achievement from '../components/Achievement';
import Page from '../components/Page';
import theme from '../globals/globalStyles';
import { UserContext } from '../../App';

type Props = {};
export default function AchievementsPage(props: Props) {
  const { user } = useContext(UserContext);
  const completedAchievements = user?.completedAchievements || [];

  // Map to pass in achievement id, to get the date completed
  const completionMap = completedAchievements.reduce((acc, achievement) => {
    acc[achievement.id] = achievement.dateCompleted;
    return acc;
  }, {} as Record<string, number>);

  const getDateCompleted = (id: string) => completionMap[id];

  return (
    <Page>
      <View style={styles.container}>
        {achievements.map((achievement) => {
          return (
            <Achievement
              key={achievement.id}
              {...achievement}
              dateCompleted={getDateCompleted(achievement.id)}
            />
          );
        })}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.medium,
  },
});
