import DatepickerContext from './DatepickerContext';
import { CURRENT_MONTH } from './DatepickerUtils';
import React, { useState } from 'react';
import { DateData, MONTH_LABELS } from './DatepickerUtils';
import { stat } from 'fs';

interface MonthProps {
    selectedDate: Date | null,
    todayDate: Date | null,

    dateChange: (d: DateData) => {},
    daySelected: (d: DateData) => {},

    startAt: Date | null,

    minDate: Date | null,
    maxDate: Date | null,
    dateFilter: (date: Date | null) => boolean,

    rangeMode: boolean,
    beginDate: Date | null,
    endDate: Date | null,


    formatMonthLabel: (date: Date) => string,
    formatMonthText: (date: Date) => string,
}

function Month(props: MonthProps) {

    const [state, setState] = useState({
        selectedDate: props.selectedDate ? props.selectedDate : new Date(),
        todayDate: props.todayDate ? props.todayDate : new Date(),

        dateChange: (d: DateData) => { },
        daySelected: (d: DateData) => { },

        startAt: props.startAt ? props.startAt : new Date(),

        minDate: props.minDate,
        maxDate: props.maxDate,
        dateFilter: props.dateFilter ? props.dateFilter : (date: Date | null) => true,

        rangeMode: props.rangeMode ? props.rangeMode : false,
        beginDate: props.beginDate ? props.beginDate : new Date(),
        endDate: props.endDate ? props.endDate : new Date(),

        formatMonthLabel: props.formatMonthLabel ? props.formatMonthLabel : (date: Date) => MONTH_LABELS[date.getMonth()],
        formatMonthText: props.formatMonthText ? props.formatMonthText : (date: Date) => MONTH_LABELS[date.getMonth()],

    } as MonthProps);

    // ClampDate
    const validDate = (date: Date) => {
        if (state.rangeMode) {
            if (state.minDate) {
                if (date < state.minDate) {
                    return false;
                }
            }
            if (state.maxDate) {
                if (date > state.maxDate) {
                    return false;
                }
            }
        }


        return true;
    }

}