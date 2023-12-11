import { StyleSheet, TextStyle, View } from 'react-native';
import theme from '../globals/globalStyles';
import BaseText from './BaseText';
import { formatDate } from '../util/formatDate';
import DefaultImage from './FallbackImage';
import { getThumbnail } from '../util/getThumbnail';
import { WIDTH } from '../constants/screenSize';
import { pagePaddingHorizontal } from './Page';
import { getHexOpacity } from '../util/getHexOpacity';

type Props = {
  activity: Activity;
};

export default function ActivityThumbnail({ activity }: Props) {
  const { username, date, speed } = activity;
  const thumbnail = getThumbnail(activity.videoUri);

  // You should be able to see the first thumbnail and a little bit of the second thumbnail
  const width = (WIDTH - pagePaddingHorizontal) * 0.7;
  const height = (width / 16) * 9;

  // Uses values calculated above so we can use them in the styles
  const speedTextStyle = {
    fontSize: width / 6, // Can fit about 4 digits nicely
    color: theme.colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    height,
    width,
  } as TextStyle;

  return (
    <View style={styles.container}>
      <DefaultImage source={{ uri: thumbnail }} style={{ width, height }} />
      <View style={styles.coverTextWrapper}>
        <BaseText style={styles.usernameText}>{username}</BaseText>
        <BaseText style={speedTextStyle}>{speed.toFixed(1)}m/s</BaseText>
      </View>
      <View style={styles.dateWrapper}>
        <BaseText style={styles.dateText}>{formatDate(date)}</BaseText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
  },

  coverTextWrapper: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',

    backgroundColor: theme.colors.black + getHexOpacity(0.5),
  },

  usernameText: {
    position: 'absolute', // To keep the speed text in the center
    color: theme.colors.white,
    width: '100%',
    textAlign: 'center',
  },

  dateWrapper: {
    backgroundColor: theme.colors.black,
    padding: theme.spacing.small,
  },

  dateText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
});
