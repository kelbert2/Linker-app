import React from 'react';

// from: https://medium.com/front-end-weekly/create-a-custom-react-date-picker-in-10-minutes-82fa19775f66
// Allows us to share state and callbacks through the component tree
// Pass data without having to manually pass props at every level

export const datepickerContextDefaultValue = {
    focusedDate: null as Date | null,
    isDateFocused: (date: Date) => false,
    onDateFocus: (date: Date) => { },

    isDateSelected: (date: Date) => false,
    onDateSelect: (date: Date) => { },

    isDateHovered: (date: Date) => false,
    onDateHover: (date: Date) => { },

    isDateBlocked: (date: Date) => false,
    isFirstOrLastSelectedDate: (date: Date) => false
};

export default React.createContext(datepickerContextDefaultValue);