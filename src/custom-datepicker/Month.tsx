import React, { useContext, useState } from 'react';
import Day from './Day';
import DatepickerContext from './DatepickerContext';
import { DAYS_PER_WEEK, WEEKDAY_NAMES, getYear, getMonth, createDate, getDaysPerMonth, getFirstDateOfMonth, getFirstWeekOffset, getDateISO } from './CalendarUtils';
// : { year: number, month: number, firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6 }
function Month({ year = getYear(new Date()), month = getMonth(new Date()), firstDayOfWeek = 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6 }) {
    const {
        dateChange,
        dateInput,

        formatMonthText
    } = useContext(DatepickerContext);

    const [days, setDays] = useState([[]] as [JSX.Element[]]);

    const createDays = () => {
        const daysInMonth = getDaysPerMonth(month, year);
        // const dateNames = this._dateAdapter.getDateNames();
        let weeks = [[]] as [JSX.Element[]];
        const firstDayOfMonth = getFirstDateOfMonth(month, year);
        const firstWeekOffset = getFirstWeekOffset(firstDayOfMonth);
        for (let i = 0, cell = firstWeekOffset; i < daysInMonth; i++ , cell++) {
            if (cell === DAYS_PER_WEEK) {
                // created a week, move to the next row
                weeks.push([]);
                cell = 0;
            }
            // const date = createDate(getYear(firstDayOfMonth), getMonth(firstDayOfMonth), i + 1);
            // const enabled = this._shouldEnableDate(date);
            // const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
            // const cellClasses = this.dateClass ? this.dateClass(date) : undefined;

            //     weeks[weeks.length - 1]
            //         .push(new Cell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses));
            weeks[weeks.length - 1].push(
                createDay(cell, i)
            );
        }
        setDays(weeks);
    }

    const createWeek = (days: JSX.Element[], index: number) => {
        return (
            <tr>
                {days.map((day, dayIndex) => { return day; })}
            </tr>
        )
    }
    const createDay = (weekdayIndex: number, dayOfMonth: number) => {
        return (
            <td><Day
                dayLabel={WEEKDAY_NAMES[weekdayIndex].short}
                date={createDate(year, month, dayOfMonth)}
            ></Day></td>
            // key={getDateISO(createDate(year, month, dayOfMonth))}
        );
    }

    const renderWeekdayLabels = () => {
        return (
            <tr
                className="week-labels">
                {WEEKDAY_NAMES.map(dayLabel => (
                    <th
                        key={dayLabel.long}>
                        {dayLabel.short}
                    </th>
                ))}
            </tr>
        );
    }

    const renderDays = () => {
        createDays();
        return (
            <tr
                className="days">
                {days.map((week, weekIndex) => {
                    return createWeek(week, weekIndex);
                })}
                <td></td>
            </tr>
        );
    };

    return (
        <div>
            <tr>
                <td>{formatMonthText(createDate(year, month))}</td>
            </tr>
            {renderWeekdayLabels()}
            {renderDays()}
        </div>
    );
}

export default Month;