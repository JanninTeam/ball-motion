import { ScrollView, StyleSheet, View } from 'react-native';
import Page from '../components/Page';
import { previousRuns } from '../../sampleData/previousRuns';
import BaseText from '../components/BaseText';
import theme from '../globals/globalStyles';
import { formatDate } from '../util/formatDate';
import { SettingsContext } from '../../App';
import { useContext } from 'react';
import getConvertedUnits, { getUnitsText } from '../util/getConvertedUnits';
import { Sport } from '../constants/units';

export default function PreviousRunsPage() {
  const { settings } = useContext(SettingsContext);

  return (
    <Page>
      <ScrollView>
        {previousRuns.map((run) => (
          <View key={run.id} style={styles.run}>
            <BaseText>{run.username}</BaseText>
            <BaseText>{run.sport}</BaseText>
            <BaseText>{getUnitsText(run, settings)}</BaseText>
            <BaseText>{formatDate(run.date)}</BaseText>
          </View>
        ))}
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
