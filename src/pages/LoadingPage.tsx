import { StyleSheet, View } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import Page from '../components/Page';
import theme from '../globals/globalStyles';

export default function LoadingPage() {
  return (
    <Page>
      <View style={styles.container}>
        <LoadingSpinner
          fps={24}
          backgroundColor={theme.colors.primary}
          lineWidth={2}
          scale={4}
        />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
