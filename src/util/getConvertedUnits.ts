import { Distance, Speed, Sport, Unit, UnitEnum } from '../constants/units';
import { SettingsType } from '../globals/settings';

/*
 * value: number - the value to convert
 * settings: SettingsType - the user's settings
 * sport: Sport - the sport to convert for (e.g. 'baseball')
 * unitType: UnitEnum - the type of unit to convert ('speed' or 'distance')
 */

type Props = {
  value: number;
  settings: SettingsType;
  sport: Sport;
  unitType: UnitEnum;
};

export default function getConvertedUnits({
  value,
  settings,
  sport,
  unitType,
}: Props) {
  const { units } = settings;

  // Convert from meters per second
  const speedFactorMap: Record<Speed, number> = {
    mph: 2.23694,
    kph: 3.6,
    'm/s': 1,
  };

  // Convert from meters
  const distanceFactorMap: Record<Distance, number> = {
    yards: 1.09361,
    meters: 1,
    feet: 3.28084,
  };

  // Speed
  if (unitType === 'speed') {
    const targetUnit = units[sport][unitType] as Speed;
    return {
      value: value * speedFactorMap[targetUnit],
      unit: targetUnit,
    };
  }

  // Distance
  const targetUnit = units[sport][unitType] as Distance;
  return {
    value: value * distanceFactorMap[targetUnit],
    unit: targetUnit,
  };
}

export function getUnitsText(activity: Activity, settings: SettingsType) {
  const { value, unit } = getConvertedUnits({
    value: activity.speed,
    settings,
    sport: activity.sport,
    unitType: 'speed', // TODO: Add distance
  });

  return `${value.toFixed(1)} ${unit}`;
}
