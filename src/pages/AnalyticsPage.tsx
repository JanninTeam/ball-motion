import React from 'react';
import { StyleSheet, View } from 'react-native';
import BaseText from '../components/BaseText';
import Page from '../components/Page';
import { frameData } from '../../sampleData/frameData';
import { NavigationProp } from '@react-navigation/native';
import { getAnalytics } from '../util/getAnalytics';

type AnalyticsTextProps = {
  analyticName: string;
  value: number;
};

const AnalyticsText = ({ analyticName, value }: AnalyticsTextProps) => {
  return (
    <View style={styles.textContainer}>
      <BaseText>{analyticName}</BaseText>
      <BaseText>{value}</BaseText>
    </View>
  );
};

type Props = {
  navigation: NavigationProp<any>;
  route: { params: { id: string } };
};

export default function AnalyticsPage(props: Props) {
  const frameDataId = props.route.params.id as string;
  const data = frameData.find((frameData) => frameData.id === frameDataId);

  if (!data) {
    return (
      <Page>
        <BaseText>TODO: Error Page</BaseText>
      </Page>
    );
  }

  const analytics = getAnalytics(data.data);
  const analyticNameMap = {
    maxSpeed: 'Max Speed',
    potentialDistance: 'Potential Distance',
    potentialTimeInAir: 'Potential Time In Air',
    timeInAir: 'Time In Air',
    totalDistanceInAir: 'Total Distance In Air',
  } as Record<keyof typeof analytics, string>;

  return (
    <Page>
      {Object.entries(analytics).map(([key, value]) => (
        <AnalyticsText
          key={key}
          analyticName={analyticNameMap[key as keyof typeof analyticNameMap]}
          value={value}
        />
      ))}
    </Page>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
