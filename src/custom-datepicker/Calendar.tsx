import React, { useEffect, useContext, useState } from 'react';
import DatepickerContext from './DatepickerContext';
import { sameDay } from '../ClassDatepicker/DatepickerUtils';
import { VIEW } from './CalendarUtils';
import CalendarHeader from './CalendarHeader';

function Calendar() {
    let {
        selectedDate,
        activeDate,

        dateChange,
        dateInput,
        yearSelected,
        monthSelected,
        daySelected,

        startAt,
        startView,

        minDate,
        maxDate,
        dateFilter,

        rangeMode,
        beginDate,
        endDate,

        disableMonth,
        disableYear,
        disableMultiyear,

        formatMonthLabel,
        formatMonthText,

        formatYearLabel,
        formatYearText,

        formatMultiyearLabel,
        formatMultiyearText,

        calendarLabel,
        openCalendarLabel,

        nextMonthLabel,
        nextMultiyearLabel,
        nextYearLabel,

        prevMonthLabel,
        prevYearLabel,
        prevMultiyearLabel,

        switchToMonthViewLabel,
        switchToYearViewLabel,
        switchToMultiyearViewLabel,

        dispatch
    } = useContext(DatepickerContext);

    const [currentView, setCurrentView] = useState(startView);
    // const [activeDate, setActiveDate] = useState();
    const [beginDateSelected, setBeginDateSelected] = useState(false);

    // runs on mount
    useEffect(() => {
        dispatch({ type: 'set-active-date', payload: startAt ? startAt : new Date() });
    }, [])

    const dateSelected = (date: Date) => {
        if (rangeMode) {
            if (!beginDateSelected) {
                setBeginDateSelected(true);
                beginDate = date;
                endDate = date;
                //   this.beginDateSelectedChange.emit(date);
            } else {
                setBeginDateSelected(false);
                if (beginDate && beginDate <= date) {
                    endDate = date;
                } else {
                    endDate = beginDate;
                    beginDate = date;
                }
                // this.dateRangesChange.emit({begin: <D>this.beginDate, end: this.endDate});
            }
        } else if (!selectedDate || (selectedDate && !sameDay(date, selectedDate))) {
            // this.selectedChange.emit(date);
        }

        /** Handles year selection in the multiyear view. */
        const yearSelectedInMultiYearView = (normalizedYear: Date) => {
            // this.yearSelected.emit(normalizedYear);
        }

        /** Handles month selection in the year view. */
        const monthSelectedInYearView = (normalizedMonth: Date) => {
            // this.monthSelected.emit(normalizedMonth);
        }

        /** Handles year/month selection in the multi-year/year views. */
        const goToDateInView = (date: Date, view: VIEW) => {
            dispatch({ type: 'set-active-date', payload: date });
            setCurrentView(view);
        }
    }

    return (
        <CalendarHeader currentView={currentView} setCurrentView={setCurrentView}></CalendarHeader>

    );
}

export default Calendar;