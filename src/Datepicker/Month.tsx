import React from 'react';
import { useMonth } from '@datepicker-react/hooks';
import Day from './Day';

function Month({ year, month, firstDayOfWeek }: { year: number, month: number, firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6 }) {
    const { days, weekdayLabels, monthLabel } = useMonth({
        year, month, firstDayOfWeek
    });

    return (
        <div>
            <strong
                className="monthLabel">
                {monthLabel}
            </strong>
            <div
                className="week">
                {weekdayLabels.map(dayLabel => (
                    <div key={dayLabel} className="day-label">
                        {dayLabel}
                    </div>
                ))}
            </div>
            <div
                className="day">
                {days.map((day, index) => {
                    if (typeof day === 'object') {
                        return (
                            <Day
                                date={day.date}
                                key={day.date.toString()}
                                dayLabel={day.dayLabel}
                            />
                        );
                    }
                    return <div key={index} />
                })}
            </div>
        </div>
    );
}

export default Month;