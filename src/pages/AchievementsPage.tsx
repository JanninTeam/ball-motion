import React from 'react';
import { StyleSheet, View } from 'react-native';
import BaseText from '../components/BaseText';
import Page from '../components/Page';
import { achievements } from '../common/achievements';
import Achievement from '../components/Achievement';
import theme from '../globals/globalStyles';

type Props = {};

export default function AchievementsPage(props: Props) {
  return (
    <Page>
      <View style={styles.container}>
        {achievements.map((achievement) => (
          <Achievement key={achievement.id} {...achievement} />
        ))}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.medium,
  },
});
