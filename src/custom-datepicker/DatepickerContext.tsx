import React from 'react';
import { DateData } from '../ClassDatepicker/DatepickerUtils';
import { VIEW } from './CalendarUtils';

// https://github.com/SaturnTeam/saturn-datepicker/tree/master/saturn-datepicker/src/datepicker

interface IDatepickerContext {
    selectedDate: Date | null,
    todayDate: Date | null,
    activeDate: Date,

    dateChange: (d: DateData) => {},
    dateInput: (d: DateData) => {},
    yearSelected: (d: DateData) => {},
    monthSelected: (d: DateData) => {},
    daySelected: (d: DateData) => {},

    startAt: Date | null,
    startView: VIEW,

    minDate: Date | null,
    maxDate: Date | null,
    dateFilter: (date: Date | null) => true,

    rangeMode: boolean,
    beginDate: Date | null,
    endDate: Date | null,

    disableMonth: boolean,
    disableYear: boolean,
    disableMultiyear: boolean,

    disable: boolean,
    disablePopup: boolean,
    disableInput: boolean,
    popupLarge: boolean,

    formatMonthLabel: (date: Date) => string,
    formatMonthText: (date: Date) => string,

    formatYearLabel: (date: Date) => string,
    formatYearText: (date: Date) => string,

    formatMultiyearLabel: (date: Date) => string,
    formatMultiyearText: (date: Date) => string,

    calendarLabel: string,
    nextMonthLabel: string,
    nextMultiYearLabel: string,
    nextYearLabel: string,
    openCalendarLabel: string,
    prevMonthLabel: string,
    prevMultiYearLabel: string,
    prevYearLabel: string,
    switchToMonthViewLabel: string,
    switchToYearViewLabel: string,
    switchToMultiYearViewLabel: string
}

export const datepickerContextDefaultValue = {
    selectedDate: new Date() as Date | null,
    todayDate: new Date() as Date | null,
    activeDate: new Date() as Date,

    dateChange: (d: DateData) => { },
    dateInput: (d: DateData) => { },
    yearSelected: (d: DateData) => { },
    monthSelected: (d: DateData) => { },
    daySelected: (d: DateData) => { },

    startAt: new Date() as Date | null,
    startView: 'month' as VIEW,

    minDate: null as Date | null,
    maxDate: null as Date | null,
    dateFilter: (date: Date | null) => true,

    rangeMode: false,
    beginDate: new Date() as Date | null,
    endDate: new Date() as Date | null,

    disableMonth: false,
    disableYear: false,
    disableMultiyear: false,

    disable: false,
    disablePopup: false,
    disableInput: false,
    popupLarge: false,

    formatMonthLabel: (date: Date) => date.getMonth().toString(),
    formatMonthText: (date: Date) => date.getMonth().toString(),

    formatYearLabel: (date: Date) => date.getFullYear().toString(),
    formatYearText: (date: Date) => date.getFullYear().toString(),

    formatMultiyearLabel: (date: Date) => 'Years',
    formatMultiyearText: (date: Date) => '',

    calendarLabel: 'Calendar',
    nextMonthLabel: 'Next month',
    nextMultiYearLabel: 'Next years',
    nextYearLabel: 'Next year',
    openCalendarLabel: 'Open calendar',
    prevMonthLabel: 'Previous month',
    prevMultiYearLabel: 'Previous years',
    prevYearLabel: 'Previous year',
    switchToMonthViewLabel: 'Switch to month view',
    switchToYearViewLabel: 'Switch to year view',
    switchToMultiYearViewLabel: 'Switch to multi-year view'
} as IDatepickerContext;
const DatepickerContext = React.createContext(datepickerContextDefaultValue);
// export default React.createContext(datepickerContextDefaultValue);

export function DatepickerContextProvider({ children }: { children: any }) {
    return (
        <DatepickerContext.Provider value={datepickerContextDefaultValue} > {children} </DatepickerContext.Provider>
    );
}

export const DatepickerContextConsumer = DatepickerContext.Consumer;

//export { DatepickerContext, DatepickerContextProvider, DatepickerContextConsumer };
export default DatepickerContext;