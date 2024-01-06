import { StyleSheet, TextStyle, View, Image } from 'react-native';
import theme from '../globals/globalStyles';
import BaseText from './BaseText';
import { formatDate } from '../util/formatDate';
import DefaultImage from './FallbackImage';
import { getThumbnail } from '../util/getThumbnail';
import { WIDTH } from '../constants/screenSize';
import { pagePaddingHorizontal } from './Page';
import { getHexOpacity } from '../util/getHexOpacity';
import getConvertedUnits, { getUnitsText } from '../util/getConvertedUnits';
import { useContext } from 'react';
import { SettingsContext } from '../../App';

type Props = {
  activity: Activity;
};

const width = (WIDTH - pagePaddingHorizontal) * 0.7;
const height = (width / 16) * 9;
export default function ActivityThumbnail({ activity }: Props) {
  const { settings } = useContext(SettingsContext);

  const { username, date, speed } = activity;
  // const thumbnail = activity.thumbnail ?? getThumbnail(activity.videoUri);
  const thumbnail = getThumbnail(activity.videoUri);

  // You should be able to see the first thumbnail and a little bit of the second thumbnail
  return (
    <View style={styles.container}>
      <DefaultImage source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.cover} />
      <View style={styles.coverTextWrapper}>
        <BaseText style={styles.usernameText}>{username}</BaseText>
        <View style={styles.speedWrapper}>
          <BaseText style={styles.speedText} fontFamily="Jost-SemiBold">
            {getUnitsText(activity, settings)}
          </BaseText>
        </View>
      </View>
      <BaseText style={styles.dateText}>{formatDate(date)}</BaseText>
    </View>
  );
}

const borderRadius = theme.borderRadius.large;
const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    borderRadius,
  },

  image: { borderRadius, width, height },

  cover: {
    width,
    height,
    position: 'absolute',
    backgroundColor: theme.colors.black + getHexOpacity(0.5),
    borderRadius,
  },

  usernameText: {
    width,
    textAlign: 'center',
    color: theme.colors.white,
    padding: theme.spacing.small,
  },

  coverTextWrapper: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  dateWrapper: {
    padding: theme.spacing.small,
  },

  dateText: {
    textAlign: 'center',
  },

  speedWrapper: {
    width,
    height,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  speedText: {
    color: theme.colors.white,
    fontSize: 32,
  },
});
