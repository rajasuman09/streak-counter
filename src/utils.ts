export const dateFormatted = (date: Date):string => {
    return date.toLocaleDateString('en-US');
};

export interface Streak {
    currentCount: number,
    startDate: string,
    lastLoginDate: string
}

export const diffInDays = (firstDate:Date, secondDate:Date):number =>{
    const diff = Math.abs(firstDate.getTime() - secondDate.getTime());
    return diff/(1000*3600*24);
}