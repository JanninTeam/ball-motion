import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import Page from '../components/Page';
import Title from '../components/Title';
import {
  DISTANCES,
  Distance,
  SPEEDS,
  SPORTS,
  Speed,
  Sport,
  UnitEnum,
  UnitPresets,
  UnitType,
  unitPresets,
} from '../constants/units';
import theme from '../globals/globalStyles';
import { SettingsType } from '../globals/settings';
import { SettingsContext } from '../context/settingsContext';

type NewUnit = { speed: Speed } | { distance: Distance };
type UnitButtonProps = { unitType: UnitEnum; units: UnitType[] };
type SportSectionProps = {
  settings: SettingsType;
  setSettings: SetState<SettingsType>;
  sport: Sport;
};

function SportSection({ settings, setSettings, sport }: SportSectionProps) {
  const updateSportUnit = (sport: Sport, newUnit: NewUnit) => {
    setSettings((prev) => {
      const newUnits = { ...prev.units[sport], ...newUnit };
      const newSportUnits = { ...prev.units, [sport]: newUnits };

      return { ...prev, units: newSportUnits };
    });
  };

  const UnitButton = ({ unitType, units }: UnitButtonProps) => {
    const isSelected = (val: UnitType) => {
      return settings.units[sport][unitType] === val;
    };

    const getSelectedStyle = (unit: UnitType) => {
      if (!isSelected(unit)) return {};

      return {
        containerStyle: styles.selectedUnit,
        textStyle: styles.selectedUnitText,
      };
    };

    return (
      <View style={styles.unit}>
        <Title type="h3">{unitType}</Title>
        <View style={styles.unitWrapper}>
          {units.map((unit) => {
            return (
              <Button
                key={unit}
                text={unit}
                // @ts-ignore TODO: Fix this
                onPress={() => updateSportUnit(sport, { [unitType]: unit })}
                {...getSelectedStyle(unit)}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.sportContainer}>
      <Title type="h3" center={false}>
        {sport}
      </Title>
      <UnitButton unitType="speed" units={[...SPEEDS]} />
      <UnitButton unitType="distance" units={[...DISTANCES]} />
    </View>
  );
}

export default function UnitSettingsPage() {
  const { settings, setSettings } = useContext(SettingsContext);

  // Sets the units to a preset (metric or imperial)
  const setUnitPreset = (preset: UnitPresets) => {
    setSettings((prev) => ({ ...prev, units: unitPresets[preset] }));
  };

  // Get which unit preset is currently selected
  const getCurrentPreset = () => {
    const stringUnits = JSON.stringify(settings.units);
    const stringMetric = JSON.stringify(unitPresets.metric);
    const stringImperial = JSON.stringify(unitPresets.imperial);

    if (stringUnits === stringMetric) return 'metric';
    if (stringUnits === stringImperial) return 'imperial';
    return 'custom';
  };

  const unitPreset = getCurrentPreset();
  const getSelectedStyle = (preset: UnitPresets | 'custom') => {
    if (preset !== unitPreset) return {};

    if (preset === 'custom') return { style: styles.selectedUnitText };
    return {
      containerStyhle: styles.selectedUnit,
      textStyle: styles.selectedUnitText,
    };
  };

  return (
    <Page>
      <View style={styles.container}>
        <Title type="h2">Units</Title>

        <Title type="h3" center={false}>
          Presets
        </Title>
        <View style={styles.unitWrapper}>
          {Object.keys(unitPresets).map((presetName) => (
            <Button
              key={presetName}
              text={presetName}
              onPress={() => setUnitPreset(presetName as UnitPresets)}
              {...getSelectedStyle(presetName as UnitPresets)}
            />
          ))}
          <BaseText {...getSelectedStyle('custom')}>Custom</BaseText>
        </View>

        {SPORTS.map((sport) => (
          <SportSection
            key={sport}
            sport={sport}
            settings={settings}
            setSettings={setSettings}
          />
        ))}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {},

  selectedUnit: {
    // backgroundColor: theme.colors.white,
    // fontWeight: 'bold',
  },

  unit: {
    marginBottom: theme.spacing.medium,
  },

  selectedUnitText: {
    fontWeight: 'bold',
  },

  unitWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

    marginBottom: theme.spacing.medium,
  },

  sportContainer: {
    borderColor: theme.colors.gray,
    margin: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.gray,
  },
});
