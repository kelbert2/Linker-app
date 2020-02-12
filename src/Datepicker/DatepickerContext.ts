import React from 'react';

// from: https://medium.com/front-end-weekly/create-a-custom-react-date-picker-in-10-minutes-82fa19775f66
// Allows us to share state and callbacks through the component tree
// Pass data without having to manually pass props at every level

export const datepickerContextDefaultValue = {
    focusedDate: null,

    onDateFocus: () => { },
    isDateFocused: () => false,

    onDateSelect: () => { },
    isDateSelected: () => false,

    onDateHover: () => { },
    isDateHovered: () => false,

    isDateBlocked: () => false,
    isFirstOrLastSelectedDate: () => false
};

export default React.createContext(datepickerContextDefaultValue);