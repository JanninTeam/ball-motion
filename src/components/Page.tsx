import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
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
  safeArea?: boolean;
  backgroundColor?: string;
} & OptionalBackButton;

export default function Page({
  children,
  safeArea = true,
  backgroundColor = theme.colors.white,
  backButton,
  backButtonProps,
  navigation,
}: Props) {
  // Combine the backgroundColor prop with the default styles
  const style = { ...styles.container, backgroundColor } as ViewStyle;

  const backButtonElement = backButton ? (
    <BackButton {...backButtonProps} navigation={navigation} />
  ) : null;

  if (safeArea) {
    return (
      <SafeAreaView style={style}>
        <>
          {backButtonElement}
          {children}
        </>
      </SafeAreaView>
    );
  }

  // Not using SafeAreaView
  return (
    <View style={style}>
      <>
        {backButtonElement}
        {children}
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
