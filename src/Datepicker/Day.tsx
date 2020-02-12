import React, { useRef, useContext } from 'react';
import { useDay } from '@datepicker-react/hooks';
import DatepickerContext from './DatepickerContext';

const NORMAL_COLOR = '#FFF';
const SELECTED_COLOR = '#71c9ced';
const SELECTED_FIRST_OR_LAST_COLOR = '#00aeef';
const HOVER_RANGE_COLOR = '#71c9ed';
const DISABLED_COLOR = '#FFF';

const getColor = (
    isSelected = false,
    isSelectedStartOrEnd = false,
    isWithinHoverRange = false,
    isDisabled = false
) => {
    if (isSelected) {
        return SELECTED_COLOR;
    } else if (isSelectedStartOrEnd) {
        return SELECTED_FIRST_OR_LAST_COLOR;
    } else if (isWithinHoverRange) {
        return HOVER_RANGE_COLOR;
    } else if (isDisabled) {
        return DISABLED_COLOR;
    } else {
        return NORMAL_COLOR;
    }
}


getColorFn({ color values }) = getColor(booleans) returns({ color values }) => color;
booleans come from where ?


    function getColor(
        isSelected = false,
        isSelectedStartOrEnd = false,
        isWithinHoverRange = false,
        isDisabled = false
    ) {
        return ({
            selectedFirstOrLastColor,
            normalColor,
            selectedColor,
            rangeHoverColor,
            disabledColor
        }) => {
            if (isSelectedStartOrEnd) {
                return selectedFirstOrLastColor;
            } else if (isSelected) {
                return selectedColor;
            } else if (isWithinHoverRange) {
                return rangeHoverColor;
            } else if (isDisabled) {
                return disabledColor;
            } else {
                return normalColor;
            }
        };
    }

const Day = ({ daylabel, date }) => {
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

    const getColorFn = getColor(
        isSelected,
        isSelectedStartOrEnd,
        isWithinHoverRange,
        disabledDate
    );

    const getDayClass = (isSelected = false,
        isSelectedStartOrEnd = false,
        isWithinHoverRange = false,
        disabledDate = false) => {
        if (isSelected) {
            return "selected";
        } else if (isSelectedStartOrEnd) {
            return "selectedStartOrEnd";
        } else if (isWithinHoverRange) {
            return "withinHoverRange";
        } else if (disabledDate) {
            return "disabled";
        } else {
            return "";
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
            className={getDayClass(isSelected, isSelectedStartOrEnd, isWithinHoverRange, disabledDate)}
        >
            {dayLabel}
        </button>
    );
}