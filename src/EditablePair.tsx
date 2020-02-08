import React, { useState, useReducer, useRef, useEffect } from 'react';
import { Pair } from './Pair';
import { ValueType, Utils, useKeyPress, useOnClickOutside } from './Utils';
//const { TextInput } = require('react-materialize');
// import { TextInput, Button } from 'react-materialize';


interface EditablePair {
    onSet: (pair: Pair) => any | void;
    pair: Pair;
}
function EditablePair(props: EditablePair) {

    const [isEditing, setEditing] = useState(false);
    //const [pair, setPair] = useState({ label: '', value: '', uid: Utils.generateUID(), valueType: ValueType.String } as Pair)
    const [pair, setPair] = useState(new Pair({ label: '', value: '' }));
    const [isDate, setIsDate] = useState(false);

    const wrapperRef = useRef(null);
    const pairRef = useRef<HTMLSpanElement>(null);
    const inputLabelRef = useRef<HTMLInputElement>(null);
    const inputValueRef = useRef<HTMLInputElement>(null);
    const inputValueTypeRef = useRef<HTMLInputElement>(null);

    const uidLabel = Utils.generateUID();
    const uidValue = Utils.generateUID();
    const uidValueType = Utils.generateUID();
    // TODO: Check to make sure it's not just generating three for use among all pairs for editing

    const enterEvent = useKeyPress('Enter');
    const escEvent = useKeyPress('Escape');
    const save = () => {
        props.onSet(pair);
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

    useEffect(() => {
        if (isDate) {
            if (inputValueRef.current) {
                inputValueRef.current.focus();
            }
        }
    }, [isDate]);

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
            props.onSet(pair);
            setEditing(false);
        }
    });

    const renderOptions = () => {
        // Object.keys(ValueType).map(key => {
        //     return (
        //         <option value={key}>{ValueType[key]}</option>
        //     );
        // });
        return (
            Object.values(ValueType).map((item, index) => {
                if (Number.isNaN(Number(item))) {
                    return (
                        <option value={item}>{item}</option>
                    );
                }
            })
        );
    };
    return (
        <div
            ref={wrapperRef}
            className="pair">
            <span
                ref={pairRef}
                onClick={() => setEditing(true)}
                className={`editing--${!isEditing ? "active" : "hidden"}`}
            >
                {props.pair.label}: {props.pair.value}
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
            <label
                htmlFor={uidLabel}
                className={`editing--${isEditing ? "active" : "hidden"}`} >Label </label>
            <input
                placeholder="Label"
                id={uidLabel}
                ref={inputLabelRef}
                value={pair.label}
                onChange={e => setPair({ ...pair, label: e.target.value })}
                className={`editing--${isEditing ? "active" : "hidden"}`} />

            <label
                htmlFor={uidValue}
                className={`editing--${isEditing ? "active" : "hidden"}`} >
                Value </label>
            <input
                placeholder="Value"
                id={uidValue}
                ref={inputValueRef}
                value={pair.value as string}
                type={`${isDate ? "date" : "text"}`}
                onChange={e => setPair({ ...pair, value: e.target.value })}
                className={`${isDate ? "datepicker" : ""} editing--${isEditing ? "active" : "hidden"}`} />

            <label
                htmlFor={uidValueType}
                className={`editing--${isEditing ? "active" : "hidden"}`} >
                Value Type </label>
            <select
                className={`editing--${isEditing ? "active" : "hidden"}`} >
                {renderOptions()}
            </select>
            {/* <input
                placeholder="Value Type"
                id={uidValueType}
                ref={inputValueTypeRef}
                value={pair.valueType}
                onChange={e => setPair({ ...pair, valueType: e.target.value })}
               className={`inline-input inline-input--${isEditing ? "active" : "hidden"}`} />
            {/* Need validator to convert to proper type before can add type choice */}

            <button
                onClick={() => cancel()}
                className={`waves-effect waves-teal btn-flat editing-input--${isEditing ? "active" : "hidden"}`}>
                Cancel
                    </button>
            <button
                onClick={() => save()}
                className={`waves-effect waves-light btn editing-input--${isEditing ? "active" : "hidden"}`}>
                Save
                    </button>
        </div>
    );
}

export default EditablePair;