import { dateFormatted } from './utils';
import { Streak, diffInDays } from './utils';

export function streakCounter(storage: Storage, date: Date): Streak {
  let streak = storage.getItem('streak');
  let object: Streak;
  if (streak) {
    object = JSON.parse(streak);
    const diff = diffInDays(new Date(object.lastLoginDate), date);
    if (diff === 1) {
      object.currentCount += 1;
      object.lastLoginDate = dateFormatted(date);
    } else if (diff === 0) {
      object.lastLoginDate = dateFormatted(date);
    } else {
      object.currentCount = 1;
      object.lastLoginDate = dateFormatted(date);
      object.startDate = dateFormatted(date);
    }
    storage.setItem('streak', JSON.stringify(object));
    return object;
  }

  object = {
    currentCount: 1,
    startDate: dateFormatted(date),
    lastLoginDate: dateFormatted(date),
  };

  storage.setItem('streak', JSON.stringify(object));
  return object;
}
