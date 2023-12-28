import { StyleSheet, Switch, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import Button from './Button';

type Props = {
  value: boolean;
  onValueChange: () => void;
  label?: string;
  labelPosition?: 'left' | 'right' | 'none';
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export default function ToggleSwitch({
  value,
  onValueChange,
  label = '',
  labelPosition = 'left',
  style,
  labelStyle,
}: Props) {
  if (!label) labelPosition = 'none';

  const labelElement = label ? (
    <Button text={label} onPress={onValueChange} containerStyle={labelStyle} />
  ) : null;

  return (
    <View style={[styles.container, style]}>
      {labelPosition === 'left' ? labelElement : null}
      <Switch value={value} onValueChange={onValueChange} />
      {labelPosition === 'right' ? labelElement : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
