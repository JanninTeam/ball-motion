import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import theme from '../globals/globalStyles';

type Props = {
  children?: React.ReactNode;
  safeArea?: boolean;
  backgroundColor?: string;
};

export default function Page({
  children,
  safeArea = true,
  backgroundColor = theme.colors.white,
}: Props) {
  // Combine the backgroundColor prop with the default styles
  const style = { ...styles.container, backgroundColor } as ViewStyle;

  if (safeArea) return <SafeAreaView style={style}>{children}</SafeAreaView>;
  return <View style={style}>{children}</View>;
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
