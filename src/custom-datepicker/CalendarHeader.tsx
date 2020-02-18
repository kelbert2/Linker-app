import React, { useContext, useState } from 'react';
import DatepickerContext from './DatepickerContext';
import { getYear, getMonth, VIEW, addCalendarMonths, addCalendarYears, YEARS_PER_PAGE } from './CalendarUtils';

interface CalenderHeaderProps {
    currentView: VIEW,
    setCurrentView: (view: VIEW) => {} | void
}
function CalendarHeader({ currentView, setCurrentView }: CalenderHeaderProps) {
    let {
        selectedDate,
        todayDate,
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
        nextMonthLabel,
        nextMultiYearLabel,
        nextYearLabel,
        openCalendarLabel,
        prevMonthLabel,
        prevMultiYearLabel,
        prevYearLabel,
        switchToMonthViewLabel,
        switchToYearViewLabel,
        switchToMultiYearViewLabel
    } = useContext(DatepickerContext);

    // const [currentView, setCurrentView] = useState(startView);



    /** Whether the two dates represent the same view in the current view mode (month or year). */
    const isSameView = (date1: Date, date2: Date) => {
        if (currentView === 'month') {
            return getYear(date1) === getYear(date2) &&
                getMonth(date1) === getMonth(date2);
        }
        if (currentView === 'year') {
            return getYear(date1) === getYear(date2);
        }
        // TODO: link with method from this specific view
        // return isSameMultiYearView(
        //     this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate);
    }

    const getHeaderLabel = () => {
        if (currentView === 'month') {
            // return this._dateAdapter
            //     .format(this.calendar.activeDate, this._dateFormats.display.monthYearLabel)
            //     .toLocaleUpperCase();
            return formatMonthLabel(activeDate ? activeDate : new Date());
        }
        if (currentView === 'year') {
            return getYear(activeDate ? activeDate : new Date());
        }

        // The offset from the active year to the "slot" for the starting year is the
        // *actual* first rendered year in the multi-year view, and the last year is
        // just yearsPerPage - 1 away.

        const activeYear = getYear(activeDate ? activeDate : new Date());
        const minYearOfPage = activeYear - getActiveOffset(
            activeDate, minDate, maxDate);
        const maxYearOfPage = minYearOfPage + yearsPerPage - 1;
        return `${minYearOfPage} \u2013 ${maxYearOfPage}`;
        // TODO: get active offset from multi-year view
    }

    const getPeriodButtonLabel = () => {
        return currentView === 'month' ?
            switchToMultiYearViewLabel : switchToMonthViewLabel;
    }

    /** The label for the previous button. */
    const getPrevButtonLabel = () => {
        return ({
            'month': prevMonthLabel,
            'year': prevYearLabel,
            'multiyear': prevMultiYearLabel
        } as { [key: string]: string })[currentView];
    }

    /** The label for the next button. */
    const getNextButtonLabel = () => {
        return ({
            'month': nextMonthLabel,
            'year': nextYearLabel,
            'multiyear': nextMultiYearLabel
        } as { [key: string]: string })[currentView];
    }

    /** Handles user clicks on the period label.
     * Option`calendar.orderPeriodLabel` sort the label period views.
     * - Default [multiyear]: multiyear then back to month
     * - Month [month]: month > year > multi-year
     */
    const currentPeriodClicked = () => {
        // const monthFirstOrder: VIEW[] = ['month', 'year', 'multiyear']
        // const defaultOrder: VIEW[] = ['month', 'multiyear', 'month'];
        // const orderPeriod = orderPeriodLabel === 'month' ? monthFirstOrder : defaultOrder;

        switch (currentView) {
            case 'month':
                if (!disableMultiyear) {
                    setCurrentView('multiyear');
                } else if (!disableYear) {
                    setCurrentView('year');
                }
                // currentView = orderPeriod[1];
                break;
            case 'year':
                if (!disableMonth) {
                    setCurrentView('month');
                } else if (!disableMultiyear) {
                    setCurrentView('multiyear');
                }
                // currentView = orderPeriod[2]
                break;
            default:
                if (!disableYear) {
                    setCurrentView('year');
                } else if (!disableMonth) {
                    setCurrentView('month');
                }
                // currentView = orderPeriod[0]
                break;
        }
    }

    /** Handles user clicks on the previous button. */
    const previousClicked = () => {
        currentPeriodClicked();
        activeDate = currentView === 'month' ?
            addCalendarMonths(activeDate, -1) :
            addCalendarYears(activeDate, currentView === 'year' ? -1 : -YEARS_PER_PAGE);
    }

    /** Handles user clicks on the next button. */
    const nextClicked = () => {
        currentPeriodClicked();
        activeDate = currentView === 'month' ?
            addCalendarMonths(activeDate, 1) :
            addCalendarYears(
                activeDate,
                currentView === 'year' ? 1 : YEARS_PER_PAGE
            );
    }

    /** Whether the previous period button is enabled. */
    const previousEnabled = () => {
        if (!minDate) {
            return true;
        }
        return !minDate ||
            !isSameView(activeDate, minDate);
    }

    /** Whether the next period button is enabled. */
    const nextEnabled = () => {
        return !maxDate ||
            !isSameView(activeDate, maxDate);
    }

    return (
        <div
            className="header">
            <button
                onClick={previousClicked}
                disabled={!previousEnabled}
                className="left"
            ></button>
            {getHeaderLabel()}
            <button
                onClick={nextClicked}
                disabled={!nextEnabled}
                className="right"
            ></button>
        </div>
    );
}

export default CalendarHeader;