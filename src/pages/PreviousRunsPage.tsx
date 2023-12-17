import { ScrollView, StyleSheet, View } from 'react-native';
import Page from '../components/Page';
import { previousRuns } from '../../sampleData/previousRuns';
import BaseText from '../components/BaseText';
import theme from '../globals/globalStyles';

export default function PreviousRunsPage() {
  return (
    <Page>
      <ScrollView>
        {previousRuns.map((run) => {
          return (
            <View key={run.id} style={styles.run}>
              <BaseText>{run.username}</BaseText>
              <BaseText>{run.speed}</BaseText>
              <BaseText>{run.date}</BaseText>
            </View>
          );
        })}
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  run: {
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: theme.borderRadius.large,
  },
});
