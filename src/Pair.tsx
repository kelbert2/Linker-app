import { Utils, ValueType } from './Utils';
import React, { Component } from 'react';

// export interface IBasicPair {
//     label: string;
//     value: string | number | Date | string[] | number[] | Date[] | Pair[];

// }

export class Pair {
    label: string;
    value: string | number | Date | string[] | number[] | Date[] | Pair[];
    readonly uid?: string;
    valueType?: ValueType;
    // constructor(props?: PairProps) {
    //     this.label = props?.pair.label ? props.pair.label : "label";
    //     this.value = props?.pair.value ? props.pair.value : "value";
    //     this.uid = props?.pair.uid ? props.pair.uid : Utils.generateUID();
    //     this.valueType = props?.pair.valueType ? props.pair.valueType : ValueType.String;
    // }
    constructor(props?: Pair) {
        this.label = props?.label ? props.label : "label";
        this.value = props?.value ? props.value : "value";
        this.uid = props?.uid ? props.uid : Utils.generateUID();
        this.valueType = props?.valueType ? props.valueType : ValueType.String;
    }

    public toString = () => {
        return this.label + ": " + this.value;
    }
}

// With Hooks:
/*
const PairForm = () => {
    const [uidLabel] = useState(Utils.generateUID());
    const [uidValue] = useState((Utils.generateUID()));
    return (
        <form>
            <label htmlFor={uidLabel}>Label: </label><input placeholder="Label" id={uidLabel}></input>
            <label htmlFor={uidValue}>Value: </label><input placeholder="Value" id={uidValue}></input>
        </form>
    )
}
*/