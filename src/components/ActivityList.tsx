import { ScrollView, StyleSheet, View } from 'react-native';
import { previousRuns } from '../../sampleData/previousRuns';
import ActivityThumbnail from './ActivityThumbnail';
import theme from '../globals/globalStyles';

export default function ActivityList() {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {previousRuns.map((activity) => (
          <ActivityThumbnail key={activity.id} activity={activity} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.large,
    flexDirection: 'row',
  },
});
