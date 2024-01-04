export const achievements: AchievementType[] = [
  {
    id: '0',
    title: 'First Ball',
    description: 'You Kicked Your First Ball!',
    icon: '⚽',
  },
  {
    id: '1',
    title: 'Two Balls!',
    description: 'You Kicked Your First Pair Of Balls',
    icon: '⚽⚽',
  },
  {
    id: '2',
    title: 'Speedster',
    description: 'Achieve a speed of 20m/s',
    icon: '💨',
  },
  {
    id: '3',
    title: 'Champion Kick',
    description: 'Track a ball going over 45m/s',
    icon: '🏃',
  },
  {
    id: '4',
    title: 'Rocket',
    description: 'Achieve a ball speed of 60m/s or more',
    icon: '🚀',
  },
  {
    id: '5',
    title: 'Precision Master',
    description: 'Consistently hit a ball 20m/s or more 5 times in a row',
    icon: '🎯',
  },
  {
    id: '6',
    title: 'Around the World',
    description: 'Track the ball in 3 different countries',
    icon: '🌍',
  },
  {
    id: '7',
    title: 'Night Owl',
    description: 'Track ball movements after sunset',
    icon: '🌙',
  },
  {
    id: '8',
    title: 'Early Bird',
    description: 'Start tracking before sunrise',
    icon: '🌅',
  },
  {
    id: '9',
    title: 'Endurance Champion',
    description: 'Track ball speeds 100 times',
    icon: '⏱️',
  },
  {
    id: '10',
    title: 'Meteor Strike',
    description: 'Achieve a record speed after your 10th track',
    icon: '🌠',
  },
  {
    id: '11',
    title: 'Globe Trotter',
    description: 'Track the ball in 5 different cities',
    icon: '🏙️',
  },
];

// To quickly look up an achievement by id
export const achievementMap = achievements.reduce((map, achievement) => {
  map[achievement.id] = achievement;
  return map;
}, {} as Record<string, AchievementType>);
