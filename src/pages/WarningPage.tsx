import BaseText from '../components/BaseText';
import Page from '../components/Page';
import Title from '../components/Title';
import { HEIGHT, WIDTH } from '../constants/screenSize';
import theme, { globalStyles } from '../globals/globalStyles';
import { Button, StyleSheet, View } from 'react-native';

type Props = {
  message: string;
  fix: string;
  visible: boolean;
  setVisible: SetState<boolean>;
};

export default function WarningPage({
  message,
  fix,
  visible,
  setVisible,
}: Props) {
  if (!visible) return null;

  const hide = () => setVisible(false);

  return (
    <Page noPadding safeArea={false}>
      <View style={styles.container}>
        <Title style={styles.warningText}>Warning</Title>
        <BaseText style={styles.warningText}>{message}</BaseText>
        <BaseText style={styles.fixText}>Fix:</BaseText>
        <BaseText style={styles.fixText}>{fix}</BaseText>
        <Button title="Dismiss" onPress={hide} />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    height: HEIGHT,
    gap: 25,
  },

  warningText: {
    color: theme.colors.warning,
  },

  fixText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
});
