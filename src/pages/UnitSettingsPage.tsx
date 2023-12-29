import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingsContext } from '../../App';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import Title from '../components/Title';
import {
  DISTANCES,
  Distance,
  NewUnit,
  SPEEDS,
  SPORTS,
  Speed,
  Sport,
  UnitEnum,
  UnitType,
  unitPresets,
} from '../constants/units';
import theme from '../globals/globalStyles';
import Page from '../components/Page';
import { SettingsType } from '../globals/settings';

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

  type UnitButtonProps = { unitType: UnitEnum; units: UnitType[] };
  const UnitButton = ({ unitType, units }: UnitButtonProps) => {
    const isSelected = (val: UnitType) => {
      return settings.units[sport][unitType] === val;
    };

    return (
      <>
        <Title type="h3">{unitType}</Title>
        {units.map((unit) => {
          return (
            <Button
              key={unit}
              // @ts-ignore
              onPress={() => updateSportUnit(sport, { [unitType]: unit })}
              text={unit}
              containerStyle={isSelected(unit) ? styles.selectedUnit : {}}
            />
          );
        })}
      </>
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
  const setUnitPreset = (preset: keyof typeof unitPresets) => {
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
  const getSelectedStyle = (preset: keyof typeof unitPresets | 'custom') => {
    return preset === unitPreset ? styles.selectedUnit : {};
  };

  return (
    <Page>
      <View style={styles.container}>
        <Title type="h2">Units</Title>

        <Title type="h3" center={false}>
          Presets
        </Title>
        <View style={styles.unitWrapper}>
          {Object.keys(unitPresets).map((preset) => (
            <Button
              key={preset}
              onPress={() => setUnitPreset(preset as keyof typeof unitPresets)}
              text={preset}
              containerStyle={getSelectedStyle(
                preset as keyof typeof unitPresets
              )}
            />
          ))}
          <BaseText style={getSelectedStyle('custom')}>Custom</BaseText>
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
    backgroundColor: theme.colors.gray,
    fontWeight: 'bold',
  },

  unitWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

    marginBottom: theme.spacing.medium,
  },

  sportContainer: {
    marginBottom: theme.spacing.large,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
  },
});
