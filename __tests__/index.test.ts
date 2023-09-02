import { JSDOM } from 'jsdom';
import { streakCounter } from '../src/index';
import { dateFormatted } from '../src/utils';

describe('streakCounter', () => {
  const mockJSDOM = new JSDOM('', { url: 'https://localhost' });
  let mockLocalStorage: Storage;

  beforeEach(() => {
    mockLocalStorage = mockJSDOM.window.localStorage;
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should return an object with 3 keys', () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);
    expect(streak.hasOwnProperty('currentCount')).toBe(true);
    expect(streak.hasOwnProperty('startDate')).toBe(true);
    expect(streak.hasOwnProperty('lastLoginDate')).toBe(true);
  });

  it('should return streak count of 1 and track last login date', () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);
    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted(date));
  });

  it('should store the streak in local storage', () => {
    const date = new Date();
    streakCounter(mockLocalStorage, date);
    expect(mockLocalStorage.getItem('streak')).not.toBeNull();
  });

  it('should increment the streak', () => {
    // Initialize the streak
    const startDate = new Date('8/2/2023');
    streakCounter(mockLocalStorage, startDate);
    // Login with new date
    const loginDate = new Date('8/3/2023');
    const streak = streakCounter(mockLocalStorage, loginDate);
    expect(streak.currentCount).toBe(2);
    expect(streak.lastLoginDate).toBe(dateFormatted(loginDate));
    expect(streak.startDate).toBe(dateFormatted(startDate));
  });

  it('should reset the streak', () => {
    // Initialize the streak
    let date = new Date('8/2/2023');
    streakCounter(mockLocalStorage, date);
    date = new Date('8/4/2023');
    const streak = streakCounter(mockLocalStorage, date);
    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted(date));
    expect(streak.startDate).toBe(dateFormatted(date));
  });
});
