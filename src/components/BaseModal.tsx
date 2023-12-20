import { Button, View, StyleSheet } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import theme from '../globals/globalStyles';
import { HEIGHT, WIDTH } from '../constants/screenSize';

type Props = {
  onDismiss: () => void;
  isVisible: boolean;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'center';
};

export default function BaseModal(props: Props) {
  const justifyContentMap = {
    top: 'flex-start',
    bottom: 'flex-end',
    center: 'center',
  } as const;

  const justifyContent = justifyContentMap[props.position ?? 'center'];

  return (
    <Modal
      onDismiss={props.onDismiss}
      isVisible={props.isVisible}
      deviceHeight={HEIGHT}
      deviceWidth={WIDTH}
      onBackdropPress={props.onDismiss}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ justifyContent }}
    >
      <View style={styles.container}>
        {props.children}
        <Button title="Close" onPress={props.onDismiss} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
  },
});
