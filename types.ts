import { Sport } from './src/constants/units';
import { SettingsType } from './src/globals/settings';

export {}; // needed to make this a module

declare global {
  type Activity = {
    id: string;
    date: number;
    speed: number;
    username: string;
    videoUri: string;
    sport: Sport;
  };

  type AchievementType = {
    id: string;
    title: string;
    description: string;
    icon: string;
    dateCompleted?: number;
  };

  type User = {
    id: string;
    username: string;
    completedAchievements: { id: string; dateCompleted: number }[];
    prefferedSettings: SettingsType;
  };

  type ErrorType = {
    title: string;
    description: string;
  };

  type Analytics = {
    maxSpeed: number;
    totalDistanceInAir: number;
    potentialDistance: number;
    timeInAir: number;
    potentialTimeInAir: number;
  };

  type FrameData = {
    speed: number;
    direction: number;
  };

  // Commonly used types
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
}
