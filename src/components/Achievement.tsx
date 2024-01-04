import { View, StyleSheet } from 'react-native';
import BaseText from './BaseText';
import Title from './Title';
import theme from '../globals/globalStyles';
import { formatDate } from '../util/formatDate';

type Props = { dateCompleted?: number } & AchievementType;

export default function Achievement({
  title,
  description,
  icon,
  dateCompleted,
}: Props) {
  const iconSize = 24;
  const isCompleted = !!dateCompleted;

  return (
    <View style={[styles.container, isCompleted ? styles.completed : {}]}>
      <BaseText style={{ fontSize: iconSize }}>{icon}</BaseText>
      <View>
        <Title type="h4" center={false}>
          {title}
        </Title>
        <BaseText>{description}</BaseText>
        {dateCompleted ? (
          <BaseText>Completed on: {formatDate(dateCompleted)}</BaseText>
        ) : null}
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

  completed: {
    backgroundColor: theme.colors.success,
  },
});
