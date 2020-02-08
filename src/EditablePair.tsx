import React, { useState, useReducer, useRef, useEffect } from 'react';
import { Pair } from './Pair';
import { ValueType, Utils, useKeyPress, useOnClickOutside } from './Utils';

interface EditablePair {
    onSet: (pair: Pair) => any | void;
    pair: Pair;
}
function EditablePair(props: EditablePair) {

    const [isEditing, setEditing] = useState(false);
    //const [pair, setPair] = useState({ label: '', value: '', uid: Utils.generateUID(), valueType: ValueType.String } as Pair)
    const [pair, setPair] = useState(new Pair());

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
        if (isEditing) {
            if (enterEvent) {
                props.onSet(pair);
                setEditing(false);
            }
            if (escEvent) {
                setPair({ label: props.pair.label, value: props.pair.value, valueType: props.pair.valueType });
                setEditing(false);
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

    return (
        <span
            ref={wrapperRef}
            className="inline">
            <span
                ref={pairRef}
                onClick={() => setEditing(true)}
                className={`inline inline--${!isEditing ? "active" : "hidden"}`}
            >
                {props.pair.label}: {props.pair.value}
            </span>
            <label
                htmlFor={uidLabel}>Label </label>
            <input
                placeholder="Label"
                id={uidLabel}
                ref={inputLabelRef}
                value={pair.label}
                onChange={e => setPair({ ...pair, label: e.target.value })}
                className={`inline-input inline-input--${isEditing ? "active" : "hidden"}`} />
            <label htmlFor={uidValue}>Value </label>
            <input
                placeholder="Value"
                id={uidValue}
                ref={inputValueRef}
                value={pair.value as string}
                onChange={e => setPair({ ...pair, value: e.target.value })}
                className={`inline-input inline-input--${isEditing ? "active" : "hidden"}`} />
            <label htmlFor={uidValueType}>Value Type </label>
            {/* <input
                placeholder="Value Type"
                id={uidValueType}
                ref={inputValueTypeRef}
                value={pair.valueType}
                onChange={e => setPair({ ...pair, valueType: e.target.value })}
               className={`inline-input inline-input--${isEditing ? "active" : "hidden"}`} /> */}
            {/* Need validator to convert to proper type before can add type choice */}
        </span>
    );
}

export default EditablePair;