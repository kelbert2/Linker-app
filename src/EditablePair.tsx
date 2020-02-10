import React, { useState, useRef, useEffect } from 'react';
import { Pair } from './Pair';
import { ValueType, Utils, useKeyPress, useOnClickOutside } from './Utils';
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';

interface EditablePair {
    onSet: (pair: Pair, key: number) => any | void;
    pair: Pair;
    key: number;
}
function EditablePair(props: EditablePair) {
    const key = props.key;

    const [isEditing, setEditing] = useState(false);
    const [pair, setPair] = useState(props.pair);
    const [isFilled, setFilled] = useState(!(Utils.isBlank(props.pair.label) && Utils.isBlank(props.pair.value as string)));
    // const [pair, setPair] = useState(new Pair({ label: 'lab', value: 'val' }));
    // const [isDate, setIsDate] = useState(false);

    const wrapperRef = useRef(null);
    const pairRef = useRef<HTMLSpanElement>(null);
    const inputLabelRef = useRef<HTMLInputElement>(null);
    const inputValueRef = useRef<HTMLInputElement>(null);
    const inputValueTypeRef = useRef<HTMLSelectElement>(null);

    const uidLabel = Utils.generateUID();
    const uidValue = Utils.generateUID();
    const uidValueType = Utils.generateUID();
    // TODO: Check to make sure it's not just generating three for use among all pairs for editing

    const enterEvent = useKeyPress('Enter');
    const escEvent = useKeyPress('Escape');

    const save = () => {
        props.onSet(pair, key);
        setEditing(false);
    };

    const cancel = () => {
        setPair({ label: props.pair.label, value: props.pair.value, valueType: props.pair.valueType });
        setEditing(false);
    };

    useEffect(() => {
        if (isEditing) {
            if (inputValueRef.current) {
                inputValueRef.current.focus();
            } else {
                if (inputLabelRef.current) {
                    inputLabelRef.current.focus();
                }
            }
        }
    }, [isEditing]);

    // useEffect(() => {
    //     if (isDate) {
    //         if (inputValueRef.current) {
    //             inputValueRef.current.focus();
    //         }
    //     }
    // }, [isDate]);

    useEffect(() => {
        if (isEditing) {
            if (enterEvent) {
                save();
            }
            if (escEvent) {
                cancel();
            }
        }
    }, [enterEvent, escEvent]);

    useOnClickOutside(wrapperRef, () => {
        // watches for clicks outside to save and close the editor
        if (isEditing) {
            props.onSet(pair, key);
            setEditing(false);
        }
    });
    const renderInputValue = () => {
        // console.log('pair value type: ' + pair.valueType);
        // console.log('pair value: ' + pair.value);

        if (pair.valueType === ValueType.Date) {
            return (
                <DatePicker
                    value={pair.value as string}
                    onChange={e => {
                        setFilled(!(Utils.isBlank(pair.label) && Utils.isBlank(pair.value as string)));
                        setPair({ ...pair, value: Utils.sanitizeInput(e.toString()) });
                    }} />
            );
        } else {
            return (
                <input
                    id={uidValue}
                    ref={inputValueRef}
                    value={pair.value as string}
                    onChange={e => {
                        setFilled(!(Utils.isBlank(pair.label) && Utils.isBlank(pair.value as string)));
                        setPair({ ...pair, value: Utils.sanitizeInput(e.target.value)});
                    }}
                    className={`editing--${isEditing ? "active" : "hidden"}`} />
            );
        }
    }

    //     switch (pair.valueType) {
    //         case ValueType.Date: {
    //             return (
    //                 <DatePicker onChange={e => setPair({ ...pair, value: e.toString() })} />
    //             );
    //         }
    //         default: {
    //             return (
    //                 <input
    //                     placeholder="Value"
    //                     id={uidValue}
    //                     ref={inputValueRef}
    //                     value={pair.value as string}
    //                     onChange={e => setPair({ ...pair, value: e.target.value })}
    //                     className={`editing--${isEditing ? "active" : "hidden"}`} />
    //             );
    //         }
    //     }
    // }

    const renderOptions = () => {
        // console.log("rendering options");

        return (
            Object.values(ValueType).map((item, index) => {
                if (Number.isNaN(Number(item))) {
                    return (
                        <option value={index}>{item}</option>
                    );
                }
                return null;
            })
        );
    };

    const valueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log("Selection of value type changed to: " + ValueType[+e.target.value] + ", raw: " + e.target.value);
        setPair({ ...pair, valueType: Utils.getValueTypeFromIndex(+e.target.value) });
    }

    const displayText = (): string => {
        if (pair.value === '') {
            if (Utils.isBlank(pair.label)) {
                // setFilled(false);
                return '';
            } else {
                // setFilled(true);
                return pair.label;
            }
        } else {
            if (Utils.isBlank(pair.label)) {
                // setFilled(false);
                return "Value: " + pair.value;
            }
        }
        // setFilled(true);
        return pair.label + ': ' + pair.value;
    }

    return (
        <div
            ref={wrapperRef}
            className="pair"
        >
            <span
                ref={pairRef}
                onClick={() => setEditing(true)}
                className={`display--${!isEditing ? "active" : "hidden"}`}
            >
                {displayText()}
                <button
                    className={`${(isFilled) ? "invisible" : "visible"} waves-effect waves-light btn`}
                >Add +</button>
                {/* && pair.value === '' */}
            </span>
            {/* <TextInput
                label="Label"
                ref={inputLabelRef}
                value={pair.label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPair({ ...pair, label: e.target.value })}
                className={`editing--${isEditing ? "active" : "hidden"}`} />
            <TextInput
                label="Value"
                ref={inputValueRef}
                value={pair.value as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPair({ ...pair, value: e.target.value })}
                className={`editing--${isEditing ? "active" : "hidden"}`}
            /> */}

            <div className={`editing-input--${isEditing ? "active" : "hidden"}`}>
                <div className="input-field inline">
                    <input
                        id={uidLabel}
                        ref={inputLabelRef}
                        value={pair.label}
                        type="text"
                        onChange={e => {
                            setFilled(!(Utils.isBlank(pair.label) && Utils.isBlank(pair.value as string)));
                            setPair({ ...pair, label: Utils.sanitizeInput(e.target.value) });
                        }} />
                    <label
                        htmlFor={uidLabel}>
                        Label </label>
                </div>

                <div className="input-field inline">
                    {renderInputValue()}
                    <label
                        htmlFor={uidValue}>
                        Value </label>
                </div>

                <div className="input-field inline">
                    <select
                        defaultValue={ValueType.String}
                        id={uidValueType}
                        ref={inputValueTypeRef}
                        onChange={e => valueTypeChange(e)}
                        className={`editing-input--${isEditing ? "active" : "hidden"}`}>
                        {renderOptions()}
                    </select>
                    <label
                        htmlFor={uidValueType}>
                        Value Type </label>
                </div>

                <button
                    onClick={() => cancel()}
                    className="waves-effect waves-teal btn-flat">
                    Cancel
                    </button>
                <button
                    onClick={() => save()}
                    className="waves-effect waves-light btn">
                    Save
                    </button>
            </div>
        </div>
    );
}

export default EditablePair;