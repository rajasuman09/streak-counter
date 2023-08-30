import { dateFormatted } from "./utils"
import { Streak } from "./utils";

export function streakCounter(storage: Storage, date: Date): Streak {
    const streak = {
        currentCount: 1,
        startDate: dateFormatted(date),
        lastLoginDate: dateFormatted(date)
    }
    storage.setItem('streak', JSON.stringify(streak));
    return streak;
}