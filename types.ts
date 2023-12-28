export {}; // needed to make this a module

declare global {
  type Activity = {
    id: string;
    date: number;
    speed: number;
    username: string;
    videoUri: string;
  };

  type AchievementType = {
    id: string;
    title: string;
    description: string;
    icon: string;
  } & (
    | { completed: true; dateCompleted: number }
    | { completed: false; dateCompleted?: never }
  );

  type User = {
    id: string;
    username: string;
    achievementIds: string[]; // achievement ids
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
