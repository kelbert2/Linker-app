



interface dayName {
    long: string,
    short: string
}

export type VIEW = 'month' | 'year' | 'multiyear';

export const DAYS_PER_WEEK = 7;
export const YEARS_PER_PAGE = 12;
// Months and Years
export const CURRENT_YEAR = +(new Date().getFullYear());
export const CURRENT_MONTH = +(new Date().getMonth());

export const WEEKDAY_NAMES = [
    { long: "Sunday", short: "S" },
    { long: "Monday", short: "M" },
    { long: 'Tuesday', short: 'T' },
    { long: 'Wednesday', short: 'W' },
    { long: 'Thursday', short: "T" },
    { long: 'Friday', short: 'F' },
    { long: 'Saturday', short: 'S' }
] as dayName[];

// create
export const createDate = (year: number, month: number, day = 1) => {
    return new Date(year, month, day);
}
// get Date
export const getYear = (date: Date) => {
    return date.getFullYear();
}
export const getMonth = (date: Date) => {
    return date.getMonth();
}
export const getDay = (date: Date) => {
    return date.getDay();
}
export const getDateISO = (date = new Date()) => {
    if (!isDate(date)) return null;
    return [
        date.getFullYear(),
        zeroPad(+date.getMonth(), 2),
        zeroPad(+date.getDate(), 2)
    ].join('-');
}
// get day
export const getDayOfWeek = (date: Date) => {
    return date.getDay();
}
// get month
export const getFirstDayOfWeek = () => {
    return 0;
}
export const getFirstDateOfMonth = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    return new Date(year, month, 1);
}
export const getFirstWeekOffset = (firstOfMonth: Date) => {
    return (DAYS_PER_WEEK + getDayOfWeek(firstOfMonth) - getFirstDayOfWeek()) % DAYS_PER_WEEK;
}
export const getPrevMonth = (month: number, year: number) => {
    return { month: (month - 1) % 12, year: (month > 0) ? year - 1 : year };
}

export const getNextMonth = (month: number, year: number) => {
    return { month: (month + 1) % 12, year: (month < 11) ? year : year + 1 };
}

// Month is 0-based
export const getDaysPerMonth = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    const monthsWith30 = [3, 5, 8, 10]; // month number starts at 0 for January
    const leapYear = (year % 4 === 0);

    return (month === 1
        ? leapYear ? 29 : 28
        : monthsWith30.includes(month) ? 30 : 31);
}

// 

// validation
export const isDate = (date: string | Date) => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf() as number);
    // TODO: check this
    return isDate && isValidDate;
}
export const sameMonth = (date: Date, baseDate = new Date()) => {
    if (!(isDate(date) && isDate(baseDate))) return false;

    return (date.getMonth() === baseDate.getMonth())
        && (date.getFullYear() === baseDate.getFullYear());
}

export const sameDay = (date: Date, baseDate = new Date()) => {
    if (!(isDate(date) && isDate(baseDate))) return false;
    return (date.getDate() === baseDate.getDate()) && sameMonth(date, baseDate)
}
// tools
export const zeroPad = (value: string | number, length: number) => {
    return `${value}`.padStart(length, '0');
}
// comparison

// Calendar
export const addCalendarYears = (date: Date, add: number) => {
    return new Date(getYear(date) + add, getMonth(date), getDay(date));
}
export const addCalendarMonths = (date: Date, add: number) => {
    return new Date(getYear(date), (getMonth(date) + add) % 11, getDay(date));
}

export const addCalendarDays = (date: Date, add: number) => {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + add);
    return date;
}