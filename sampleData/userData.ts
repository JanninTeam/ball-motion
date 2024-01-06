import { Settings } from '../src/globals/settings';

export const users: User[] = [
  {
    id: '1',
    username: 'johndoe',
    completedAchievements: [
      { id: '1', dateCompleted: 1610000000000 },
      { id: '2', dateCompleted: 1610000000000 },
    ],

    prefferedSettings: Settings,
  },
  {
    id: '2',
    username: 'janedoe',
    completedAchievements: [
      { id: '1', dateCompleted: 1610000000000 },
      { id: '2', dateCompleted: 1610000000000 },
      { id: '3', dateCompleted: 1610000000000 },
    ],

    prefferedSettings: Settings,
  },
];
