import {JSDOM} from 'jsdom';
import {streakCounter} from '../src/index';
import { dateFormatted } from '../src/utils';

describe("streakCounter", ()=>{
    const mockJSDOM = new JSDOM("",{url: "https://localhost"});
    let mockLocalStorage: Storage;
    
    beforeEach(()=>{
        mockLocalStorage = mockJSDOM.window.localStorage;
    })

    afterEach(()=>{
        mockLocalStorage.clear();
    })

    it("should return an object with 3 keys", ()=>{    
        const date = new Date();
        const streak = streakCounter(mockLocalStorage, date);

        expect(streak.hasOwnProperty('currentCount')).toBe(true);
        expect(streak.hasOwnProperty('startDate')).toBe(true);
        expect(streak.hasOwnProperty('lastLoginDate')).toBe(true);
    })

    it("should return streak count of 1 and track last login date",()=>{
        const date = new Date();
        
        const streak = streakCounter(mockLocalStorage, date);
        expect(streak.currentCount).toBe(1);
        expect(streak.lastLoginDate).toBe(dateFormatted(date));
    })

    it('should store the streak in local storage', ()=>{
        const date = new Date();
        streakCounter(mockLocalStorage, date);
        expect(mockLocalStorage.getItem('streak')).not.toBeNull();
    })
})