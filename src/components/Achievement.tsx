import { View, StyleSheet } from 'react-native';
import BaseText from './BaseText';
import Title from './Title';
import theme from '../globals/globalStyles';

type Props = {} & AchievementType;

export default function Achievement({
  title,
  description,
  icon,
  completed,
  dateCompleted,
}: Props) {
  const iconSize = 24;

  return (
    <View style={styles.container}>
      <BaseText style={{ fontSize: iconSize }}>{icon}</BaseText>
      <View>
        <Title type="h3" center={false}>
          {title}
        </Title>
        <BaseText>{description}</BaseText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.medium,

    padding: theme.spacing.medium,
    backgroundColor: theme.colors.gray,
    borderRadius: theme.borderRadius.medium,
  },
});
