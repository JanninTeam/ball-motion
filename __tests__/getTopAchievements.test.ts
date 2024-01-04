import { achievementMap, achievements } from '../src/common/achievements';
import { getTopAchievements } from '../src/util/getTopAchievements';
import { describe, expect, it } from '@jest/globals';

const demoUser: User = {
  id: 'demo',
  username: 'Demo User',
  completedAchievements: [
    { id: achievements[0].id, dateCompleted: 1 },
    { id: achievements[1].id, dateCompleted: 2 },
    { id: achievements[2].id, dateCompleted: 3 },
    { id: achievements[3].id, dateCompleted: 4 },
    { id: achievements[4].id, dateCompleted: 5 },
  ],
};

describe('getTopAchievements', () => {
  it('should return the correct number of achievements', () => {
    const result = getTopAchievements(demoUser, 3, 5);
    expect(result.length).toEqual(5);
  });

  it('should not exceed the number of achievements', () => {
    const achievementLength = achievements.length;
    const limit = achievementLength + 10;

    const result = getTopAchievements(demoUser, 0, limit, true);
    expect(result.length).toEqual(achievementLength);
  });

  it('should return the correct achievements without any completed', () => {
    const result = getTopAchievements(demoUser, 0, 5, true);

    const expected = [
      achievements[0],
      achievements[1],
      achievements[2],
      achievements[3],
      achievements[4],
    ];

    expect(result).toEqual(expected);
  });

  it('should return the correct achievements with some completed', () => {
    const completionCount = 3;
    const result = getTopAchievements(demoUser, completionCount, 5, true);

    // Get the completed achievements
    const completedAchievements = [];
    for (let i = 0; i < completionCount; i++) {
      completedAchievements.push({
        ...achievementMap[demoUser.completedAchievements[i].id],
        dateCompleted: demoUser.completedAchievements[i].dateCompleted,
      });
    }

    // The first 2 achievements should be the incomplete ones
    const expected = [
      achievements[3],
      achievements[4],
      ...completedAchievements,
    ];

    expect(result).toEqual(expected);
  });
});
