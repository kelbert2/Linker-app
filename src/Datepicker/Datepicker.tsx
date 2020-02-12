import React, { useState } from 'react';
import { START_DATE, monthLabelFormat, useDatepicker } from '@datepicker-react/hooks';
import Month from './Month';
import { datepickerContextDefaultValue } from './DatepickerContext';
import NavButton from './NavButton';
import DatepickerContext from './DatepickerContext';

interface DatepickerProps {
    startDate: Date | null;
    endDate: Date | null;
    focusedInput?: any;
}

const Datepicker = () => {
    const [state, setState] = useState({
        startDate: null,
        endDate: null,
        focusedInput: START_DATE
    } as DatepickerProps);

    const handleDateChange = (data: DatepickerProps) => {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
        } else {
            setState(data);
        }
    }

    const {
        firstDayOfWeek,
        activeMonths,

        onDateSelect,
        isDateSelected,

        onDateHover,
        isDateHovered,

        onDateFocus,
        isDateFocused,
        focusedDate,

        isDateBlocked,
        isFirstOrLastSelectedDate,
        goToPreviousMonths,
        goToNextMonths
    } = useDatepicker({
        startDate: state.startDate,
        endDate: state.endDate,
        focusedInput: state.focusedInput,
        onDatesChange: handleDateChange
    });



    return (
        <DatepickerContext.Provider
            value={{
                focusedDate,
                onDateFocus,
                isDateFocused,

                onDateSelect,
                isDateSelected,

                onDateHover,
                isDateHovered,

                isDateBlocked,
                isFirstOrLastSelectedDate
            }}
        >
            <div>
                <strong>Focused input: </strong>
                {state.focusedInput}
            </div>
            <div>
                <strong>Start date: </strong>
                {state.startDate && state.startDate.toLocaleString()}
            </div>
            <div>
                <strong>End date: </strong>
                {state.endDate && state.endDate.toLocaleString()}
            </div>

            <NavButton onClick={goToPreviousMonths}>Previous</NavButton>
            <NavButton onClick={goToNextMonths}>Next</NavButton>

            <div
                className="months">
                {activeMonths.map(month => (
                    <Month
                        key={`${month.year}-${month.month}`}
                        year={month.year}
                        month={month.month}
                        firstDayOfWeek={firstDayOfWeek}
                    />
                ))}
            </div>
        </DatepickerContext.Provider>
    );
}

export default Datepicker;