import React from 'react';
import { DateData } from './DatepickerUtils';

// https://github.com/SaturnTeam/saturn-datepicker/tree/master/saturn-datepicker/src/datepicker

export const datepickerContextDefaultValue = {
    selectedDate: new Date() as Date | null,
    todayDate: new Date() as Date | null,

    dateChange: (d: DateData) => { },
    dateInput: (d: DateData) => { },
    yearSelected: (d: DateData) => { },
    monthSelected: (d: DateData) => { },
    daySelected: (d: DateData) => { },

    startAt: new Date() as Date | null,
    startView: 'month' as 'month' | 'year' | 'multiyear',

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







};

export default React.createContext(datepickerContextDefaultValue);

// Screen readers:
// calendarLabel: 'Calendar',
//     nextMonthLabel: 'Next month',
//     nextMultiYearLabel: 'Next years',
//     nextYearLabel: 'Next year',
//     openCalendarLabel: 'Open calendar',
//     prevMonthLabel: 'Previous month',
//     preMultiYearLabel: 'Previous years',
//     prevYearLabel: 'Previous year',
//     switchToMonthViewLabel: 'Switch to month view',
//     switchToMultiYearViewLabel: 'Switch to year view'