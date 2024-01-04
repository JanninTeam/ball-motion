import { achievementMap, achievements } from '../common/achievements';

/*
 * user: The user to get the achievements for
 * completedCount: The number of achievements completed by the user to get
 * limit: The total number of achievements to get (including the completed achievements)
 */

export function getTopAchievements(
  user: User | null,
  completedCount = 1,
  limit = 3
) {
  if (limit > achievements.length) {
    console.warn(
      `The limit of ${limit} is greater than the number of achievements (${achievements.length})`
    );
    limit = achievements.length - 1;
  }

  if (completedCount > limit) {
    console.warn(
      `The completedCount of ${completedCount} is greater than the limit of ${limit}`
    );
    completedCount = limit;
  }

  const completedAchievements = user?.completedAchievements;
  const sortedAchievements = completedAchievements?.sort((a, b) => {
    return a.dateCompleted - b.dateCompleted;
  });

  // If the completedCount is greater than the number of completed achievements, use the number of completed achievements
  completedCount = Math.min(completedCount, completedAchievements?.length || 0);

  // Get the top achievements
  const getTopAchievements = sortedAchievements?.slice(0, completedCount);
  const achievementData =
    getTopAchievements?.map((achievement) => {
      const achievementInfo = achievementMap[achievement.id];
      return {
        ...achievementInfo,
        dateCompleted: achievement.dateCompleted,
      };
    }) ?? [];

  const length = achievementData?.length || 0;

  // If the user has less than limit achievements, fill the rest with the first achievements
  for (let i = length; i < limit; i++) {
    const alreadyCompleted = achievementData.some(
      (achievement) => achievement.id === achievements[i].id
    );

    // If you have already completed the achievement, skip it
    if (alreadyCompleted) {
      limit++;
      continue;
    }

    // Add the achievement to the front of the array
    const achievementInfo = achievementMap[achievements[i].id];
    achievementData.unshift({ ...achievementInfo, dateCompleted: 0 });
  }

  return achievementData;
}
