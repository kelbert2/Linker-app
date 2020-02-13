// https://blog.logrocket.com/react-datepicker-217b4aa840da/



export interface DateData {
    startDate: Date | null;
    endDate: Date | null;
}


// Display
export const WEEK_DAY_LABELS = ["Su", "M", "T", "W", "Th", "F", "S"];
export const MONTH_LABELS = [
    "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
]
export const CALENDAR_WEEKS = 6; // to be displayed


// Months and Years
export const CURRENT_YEAR = +(new Date().getFullYear());
export const CURRENT_MONTH = +(new Date().getMonth());
// Month is 0-based
export const getDaysPerMonth = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    const monthsWith30 = [3, 5, 8, 10]; // month number starts at 0 for January
    const leapYear = (year % 4 === 0);

    return (month === 1
        ? leapYear ? 29 : 28
        : monthsWith30.includes(month) ? 30 : 31);
}
export const getPrevMonth = (month: number, year: number) => {
    return { month: (month - 1) % 12, year: (month > 0) ? year - 1 : year };
}

export const getNextMonth = (month: number, year: number) => {
    return { month: (month + 1) % 12, year: (month < 11) ? year : year + 1 };
}

export const getFirstDayOfMonth = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    return new Date(year, month, 1).getDay();
    //     +(new Date(`${year}-${zeroPad(month, 2)}`).getDay()) + 1;
    // check with non 19-- and 20--: may need to .setFullYear(year)
}
export const getDaysOfMonth = (month = CURRENT_YEAR, year = CURRENT_YEAR) => {

}

export const isDate = (date: string | Date) => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf() as number);
    // TODO: check this
    return isDate && isValidDate;
}

export const getDateISO = (date = new Date()) => {
    if (!isDate(date)) return null;
    return [
        date.getFullYear(),
        zeroPad(+date.getMonth(), 2),
        zeroPad(+date.getDate(), 2)
    ].join('-');
}

export const sameMonth = (date: Date, baseDate = new Date() as ) => {
    if (!(isDate(date) && isDate(baseDate))) return false;

    return (date.getMonth() === baseDate.getMonth())
        && (date.getFullYear() === baseDate.getFullYear());
}

export const sameDay = (date: Date, baseDate = new Date()) => {
    if (!(isDate(date) && isDate(baseDate))) return false;
    return (date.getDate() === baseDate.getDate()) && sameMonth(date, baseDate)
}

// Misch
export const zeroPad = (value: string | number, length: number) => {
    return `${value}`.padStart(length, '0');
}

export default function Calendar(month = CURRENT_MONTH, year = CURRENT_YEAR) {

    const monthFirstDay = getFirstDayOfMonth(month, year);
    const daysPerMonth = getDaysPerMonth(month, year);

    const { month: prevMonth, year: prevMonthYear } = getPrevMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    const daysPerPrevMonth = getDaysPerMonth(prevMonth, prevMonthYear);

    // want to display CALENDAR_WEEKS number of days, by default 42 days or 6 weeks, per calendar

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + daysPerMonth);

    // to display
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
        const day = index + 1 + daysPerPrevMonth - daysFromPrevMonth;
        return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
    });
    const monthDates = [...new Array(daysPerMonth)].map((n, index) => {
        const day = index + 1;
        return [year, zeroPad(month, 2), zeroPad(day, 2)];
    });
    const nextMonthDates = [new Array(daysFromNextMonth)].map((n, index) => {
        const day = index + 1;
        return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });

    // Combine all necessary dates: last week of previous month through first week of the next month
    return [...prevMonthDates, ...monthDates, ...nextMonthDates];
}