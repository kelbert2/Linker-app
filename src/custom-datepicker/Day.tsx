import DatepickerContext from './DatepickerContext';
import React, { useContext, useRef } from 'react';
import { sameDay } from '../ClassDatepicker/DatepickerUtils';

// Styling Classes
const SELECTED = 'selected';
const SELECTED_FIRST_OR_LAST = 'selectedFirstOrLast';
const IN_RANGE = 'inRange';
const DISABLED = 'disabled';
const TODAY = 'today';

interface DayProps {
    date: Date,
    dayLabel: string
};

const Day = (props: DayProps) => {

    const {
        selectedDate,
        todayDate,

        dateChange,
        dateInput,
        daySelected,

        minDate,
        maxDate,
        dateFilter,

        rangeMode,
        beginDate,
        endDate
    } = useContext(DatepickerContext);

    const dayRef = useRef(null);

    const getDayStyle = () => {
        if (minDate) {
            if (props.date < minDate) {
                return DISABLED;
            }
        }
        if (maxDate) {
            if (props.date > maxDate) {
                return DISABLED;
            }
        }

        if (dateFilter(props.date)) {
            return DISABLED;
        }

        if (selectedDate) {
            if (sameDay(props.date, selectedDate)) {
                return SELECTED;
            }
        }

        if (rangeMode) {
            if (beginDate) {
                if (endDate) {
                    if (props.date > beginDate && props.date < endDate) {
                        return IN_RANGE;
                    }
                }
                if (sameDay(props.date, beginDate)) {
                    return SELECTED_FIRST_OR_LAST;
                }
            }
            if (endDate) {
                if (sameDay(props.date, endDate)) {
                    return SELECTED_FIRST_OR_LAST;
                }
            }
        }
    }

    const isToday = () => {
        return (todayDate) ? sameDay(props.date, todayDate) ? TODAY : ""
            : sameDay(props.date, new Date()) ? TODAY : "";
    }
    return (
        <button
            type="button"
            onClick={() => daySelected({ date: props.date, beginDate, endDate })}
            ref={dayRef}
            className={`${getDayStyle()} ${isToday()} day`}
        >
            {props.dayLabel}
        </button>
    );
}

export default Day;
