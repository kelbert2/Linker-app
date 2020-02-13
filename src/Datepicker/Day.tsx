import React, { useRef, useContext } from 'react';
import { useDay } from '@datepicker-react/hooks';
import DatepickerContext from './DatepickerContext';

const NORMAL_CLASS = 'normal';
const SELECTED_CLASS = 'selected';
const SELECTED_FIRST_OR_LAST_CLASS = 'selectedFirstOrLast';
const HOVER_RANGE_CLASS = 'inHoverRange';
const DISABLED_CLASS = 'disabled';

// const getClass = ({
//     isSelected = false,
//     isSelectedStartOrEnd = false,
//     isWithinHoverRange = false,
//     isDisabled = false
// }) => {
//     if (isSelected) {
//         return SELECTED_CLASS;
//     } else if (isSelectedStartOrEnd) {
//         return SELECTED_FIRST_OR_LAST_CLASS;
//     } else if (isWithinHoverRange) {
//         return HOVER_RANGE_CLASS;
//     } else if (isDisabled) {
//         return DISABLED_CLASS;
//     } else {
//         return NORMAL_CLASS;
//     }
// }

/*
In the tutorial:
function expression
getColorFn({ color values }) = getColor(booleans) returns({ color values }) => color of the first true boolean;
booleans come from destructuring Context object
The getColor booleans are assigned in Day
*/

// function getColor(
//     isSelected = false,
//     isSelectedStartOrEnd = false,
//     isWithinHoverRange = false,
//     isDisabled = false
// ) {
//     return ({
//         selectedFirstOrLastColor,
//         normalColor,
//         selectedColor,
//         rangeHoverColor,
//         disabledColor
//     }) => {
//         if (isSelectedStartOrEnd) {
//             return selectedFirstOrLastColor;
//         } else if (isSelected) {
//             return selectedColor;
//         } else if (isWithinHoverRange) {
//             return rangeHoverColor;
//         } else if (isDisabled) {
//             return disabledColor;
//         } else {
//             return normalColor;
//         }
//     };
// }

const Day = ({ dayLabel, date }: { dayLabel: string, date: Date }) => {
    const {
        onDateFocus,
        focusedDate,
        isDateFocused,
        onDateSelect,
        isDateSelected,
        onDateHover,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate
    } = useContext(DatepickerContext);

    const dayRef = useRef(null);

    const {
        isSelected,
        isSelectedStartOrEnd,
        isWithinHoverRange,
        disabledDate,
        onClick,
        onKeyDown,
        onMouseEnter,
        tabIndex
    } = useDay({
        date,
        onDateFocus,
        focusedDate,
        isDateFocused,
        onDateSelect,
        isDateSelected,
        onDateHover,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        dayRef
    });

    if (!dayLabel) {
        return (<div></div>);
    }

    // const getColorFn = getColor(
    //     isSelected,
    //     isSelectedStartOrEnd,
    //     isWithinHoverRange,
    //     disabledDate
    // );

    const getDayClass = (isSelected = false,
        isSelectedStartOrEnd = false,
        isWithinHoverRange = false,
        disabledDate = false) => {
        if (isSelected) {
            return SELECTED_CLASS;
        } else if (isSelectedStartOrEnd) {
            return SELECTED_FIRST_OR_LAST_CLASS;
        } else if (isWithinHoverRange) {
            return HOVER_RANGE_CLASS;
        } else if (disabledDate) {
            return DISABLED_CLASS;
        } else {
            return NORMAL_CLASS;
        }
    }

    return (
        <button
            type="button"
            onClick={onClick}
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            tabIndex={tabIndex}
            ref={dayRef}
            className={`${getDayClass(
                isSelected,
                isSelectedStartOrEnd,
                isWithinHoverRange,
                disabledDate)} day`}
        >
            {dayLabel}
        </button>
    );
}

export default Day;