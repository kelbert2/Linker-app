import DatepickerContext from './DatepickerContext';
import { CURRENT_MONTH, CURRENT_YEAR, getFirstDayOfMonth, getDaysPerMonth, CALENDAR_WEEKS, getPrevMonth, getNextMonth, zeroPad, MONTH_LABELS, WEEK_DAY_LABELS, sameDay, sameMonth, getDateISO } from './DatepickerUtils';
import { useState } from 'react';
import { isDate } from 'util';
import { Z_DATA_ERROR } from 'zlib';

interface CalendarProps {
    date: Date
    onChange: (e: CalendarState) => {};
}
interface CalendarState {
    today: Date,
    selectedDate: Date | null,
    month: number,
    year: number
}

function Calendar(props: CalendarProps) {

    const [state, setState] = useState({
        today: new Date(),
        selectedDate: isDate(props.date) ? props.date : new Date(),
        month: +(isDate(props.date) ? props.date : new Date()).getMonth() + 1,
        year: (isDate(props.date) ? props.date : new Date()).getFullYear()
    } as CalendarState);

    const resolveStateFromDate = (date: Date) => {
        const isDateObject = isDate(date);
        const _date = isDateObject ? date : new Date();
        return {
            selectedDate: isDateObject ? date : null,
            month: _date.getMonth(),
            year: _date.getFullYear()
        };
    }

    const getCalendarDates = () => {
        const { today: currentDate, selectedDate, month: selectedMonth, year: selectedYear } = state;
        const calendarMonth = selectedMonth || selectedDate?.getMonth() || currentDate.getMonth();
        const calendarYear = selectedYear || selectedDate?.getFullYear() || currentDate.getFullYear();
    }

    const renderMonthAndYearHeader = () => {
        const { month: selectedMonth, year: selectedYear } = state;
        const monthName = MONTH_LABELS[selectedMonth];
        <CalendarHeader>
            <ArrowLeft
                onMouseDown={handlePrevious}
                onMouseUp={clearPressureTimer}
                title="Previous Month"
            />
            <Month>{monthName} {selectedYear}</Month>
            <ArrowRight
                onMouseDown={handleNext}
                onMouseUp={clearPressureTimer}
                title="Next Month"
            />
        </CalendarHeader>
    }

    const renderDayLabel = (day, index: number) => {
        const dayLabel = WEEK_DAY_LABELS[index].toUpperCase();

        return (
            <DayLabel
                key={dayLabel}
                index={index}>{dayLabel}</DayLabel>
        );
    }

    const goToDate = (date) => evt: EventHandler => {
        evt && evt.preventDefault();
        const { today: currentDate } = state;
        const { onChange } = props;

        !(currentDate && sameDay(date, currentDate)) &&
            setState(resolveStateFromDate(date), () => {
                typeof onChange === 'function' && onChange(date);
            }); // using calendar props here
    }

    const goToPreviousMonth = () => {
        const { month: selectedMonth, year: selectedYear } = state;
        setState({ ...state, ...getPrevMonth(selectedMonth, selectedYear) });
    }
    const goToNextMonth = () => {
        const { month: selectedMonth, year: selectedYear } = state;
        setState({ ...state, ...getNextMonth(selectedMonth, selectedYear) });
    }
    const goToPreviousYear = () => {
        const { year } = state;
        setState({ ...state, year: year - 1 });
    }
    const goToNextYear = () => {
        const { year } = state;
        setState({ ...state, year: year + 1 });
    }
    const clearPressureTimer = () => {
        pressureTimer && clearInterval(pressureTimer);
        pressureTimeout && clearTimeout(pressureTimeout);
    }
    // simulates clicking in order to cycle through months and years
    const handlePressure = fn => {
        if (typeof fn === 'function') {
            fn();
            pressureTimeout = setTimeout(() => {
                pressureTimer = setInterval(fn, 100);
            }, 500);
        }
    }
    // If shift key is pressed, cycle through years, otherwise months
    const handlePrevious = evt => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? goToPreviousYear : goToPreviousMonth;
        handlePressure(fn);
    }
    const handleNext = evt => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? goToNextYear : goToNextMonth;
        handlePressure(fn);
    }

    // Lifecycle
    const componentDidMount = () => {
        // update today property when the current day ends
        const now = new Date();
        const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
        const ms = tomorrow - now;

        dayTimeout = setTimeout(() => {
            setState({ today: new Date() }, clearDayTimeout);
        }, ms);
    }

    const componentDidUpdate = (prevProps: CalendarProps) => {
        const { date, onChange } = props;
        const { date: prevDate } = prevProps;
        const dateMatch = date == prevDate || sameDay(date, prevDate);

        !dateMatch &&
            setState(resolveStateFromDate(date), () => {
                typeof onChange === "function" && onChange(date);
            });
    }

    const clearDayTimeout = () => {
        dayTimeout && clearTimeout(dayTimeout);
    }

    const componentWillUnmount = () => {
        clearPressureTimer();
        clearDayTimeout();
    }


    const dayStyle = (isSelected = false, isToday = false) => {
        return isSelected ? "selected" : isToday ? "today" : "";
    }
    const renderCalendarDate = (date: Date, index: number) => {
        const { today: currentDate, selectedDate, month: selectedMonth, year: selectedYear } = state;
        // const _date = new Date(date.join("-"));
        const isToday = sameDay(date, currentDate);
        const isSelected = sameDay(date, selectedDate ? selectedDate : currentDate);
        const inMonth = selectedMonth && selectedYear && sameMonth(date, new Date([selectedYear, selectedMonth, 1].join("-")));
        const onClick = goToDate(date);
        const props = { index, inMonth, onClick, title: date.toDateString() };

        return (
            <Day
                key={getDateISO(date)}
                props={props}
                className={`${dayStyle(isSelected, isToday)}`}>
                {date.getDate()}
            </Day>
        )

    }

}

export default Calendar;