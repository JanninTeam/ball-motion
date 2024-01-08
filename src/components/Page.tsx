import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../globals/globalStyles';
import { NavigationProp } from '@react-navigation/native';
import BackButton, { BackButtonProps } from './BackButton';

type OptionalBackButton =
  | {
      backButton: true;
      backButtonProps: BackButtonProps;
      navigation: NavigationProp<any>;
    }
  | {
      backButton?: false;
      backButtonProps?: never;
      navigation?: never;
    };

type Props = {
  children?: React.ReactNode;
  scrollView?: boolean;
  noPadding?: boolean;
  safeArea?: boolean;
  backgroundColor?: string;
} & OptionalBackButton;

export default function Page({
  children,
  safeArea = true,
  scrollView = true,
  noPadding = false,
  backgroundColor = theme.colors.white,
  backButton,
  backButtonProps,
  navigation,
}: Props) {
  const paddingStyle = noPadding
    ? { paddingHorizontal: 0, paddingVertical: 0 }
    : {};

  // Combine the backgroundColor prop with the default styles
  const style = {
    ...styles.container,
    backgroundColor,
    ...paddingStyle,
  } as ViewStyle;

  const backButtonElement = backButton ? (
    <BackButton {...backButtonProps} navigation={navigation} />
  ) : null;

  const childElement = scrollView ? (
    <ScrollView>{children}</ScrollView>
  ) : (
    children
  );

  if (safeArea) {
    return (
      <SafeAreaView>
        <View style={style}>
          {backButtonElement}
          {childElement}
        </View>
      </SafeAreaView>
    );
  }

  // Not using SafeAreaView
  return (
    <View style={style}>
      <>
        {backButtonElement}
        {childElement}
      </>
    </View>
  );
}

// -------------------
export const pagePaddingHorizontal = theme.spacing.medium;
export const pagePaddingVertical = theme.spacing.medium;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pagePaddingHorizontal,
    paddingVertical: pagePaddingVertical,
  },
});
