import React, { useState } from 'react';
import { START_DATE, useDatepicker } from '@datepicker-react/hooks';
import Month from './Month';
import NavButton from './NavButton';
import DatepickerContext from './DatepickerContext';

interface DatepickerProps {
    startDate: Date | null;
    endDate: Date | null;
    focusedInput?: any;

    rangePicker?: boolean;
    minDate?: Date;
    maxDate?: Date;
    yearPicker?: boolean;
    monthPicker?: boolean;
    dayPicker?: boolean;
}
interface IChangeable<T> {
    onChange: (value: T) => any | void;
}

const Datepicker = (props: DatepickerProps & IChangeable<DatepickerProps>) => {
    const [state, setState] = useState({
        startDate: props.startDate,
        endDate: props.endDate,
        focusedInput: START_DATE,

        rangePicker: props.rangePicker ? props.rangePicker : false,
        minDate: props.minDate,
        maxDate: props.maxDate,
        yearPicker: props.yearPicker ? props.yearPicker : true,
        monthPicker: props.monthPicker ? props.monthPicker : true,
        dayPicker: props.dayPicker ? props.dayPicker : true
    } as DatepickerProps);



    const handleDateChange = (data: DatepickerProps) => {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
            props.onChange(state);
        } else {
            setState(data);
            props.onChange(state);
        }
    }


    // const {
    //     firstDayOfWeek,
    //     activeMonths,
    //
    //     isDateSelected,
    //     isDateHovered,
    //     isFirstOrLastSelectedDate,
    //     isDateBlocked,
    //     isDateFocused,
    //
    //     focusedDate,
    //     onDateHover,
    //     onDateSelect,
    //     onDateFocus,
    //     goToPreviousMonths,
    //     goToNextMonths
    //   }
    const {
        firstDayOfWeek,
        activeMonths,

        focusedDate,
        isDateFocused,
        onDateFocus,

        isDateSelected,
        onDateSelect,

        isDateHovered,
        onDateHover,

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
                isDateFocused,
                onDateFocus,

                isDateSelected,
                onDateSelect,

                isDateHovered,
                onDateHover,

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
                className={`active-${activeMonths} months`}>
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