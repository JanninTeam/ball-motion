import { achievementMap, achievements } from '../common/achievements';

/*
 * user: The user to get the achievements for
 * completedCount: The number of achievements completed by the user to get
 * limit: The total number of achievements to get (including the completed achievements)
 */

export function getTopAchievements(
  user: User | null,
  completedCount = 1,
  limit = 3,
  ignoreWarnings = false
) {
  if (limit > achievements.length) {
    if (!ignoreWarnings)
      console.warn(
        `The limit of ${limit} is greater than the number of achievements (${achievements.length})`
      );
    limit = achievements.length;
  }

  if (completedCount > limit) {
    if (!ignoreWarnings)
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
  const achievementData: AchievementType[] =
    getTopAchievements?.map((achievement) => {
      const achievementInfo = achievementMap[achievement.id];
      return {
        ...achievementInfo,
        dateCompleted: achievement.dateCompleted,
      };
    }) ?? [];

  let currentIndex = 0;
  const incompleteAchievements = [];
  const completedLength = achievementData.length;
  const max = limit - completedLength;

  while (incompleteAchievements.length < max) {
    const alreadyCompleted = achievementData.some(
      (achievement) => achievement.id === achievements[currentIndex].id
    );

    // If you have already completed the achievement, skip it
    if (alreadyCompleted) {
      currentIndex++;
      continue;
    }

    const achievementInfo = achievementMap[achievements[currentIndex].id];
    incompleteAchievements.push(achievementInfo);

    currentIndex++;
  }

  achievementData.unshift(...incompleteAchievements);

  return achievementData;
}
