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
    constructor(props?: PairProps) {
        this.label = props?.pair.label ? props.pair.label : "label";
        this.value = props?.pair.value ? props.pair.value : "value";
        this.uid = props?.pair.uid ? props.pair.uid : Utils.generateUID();
        this.valueType = props?.pair.valueType ? props.pair.valueType : ValueType.String;
    }

}
export interface PairProps {
    pair: Pair,
    onInteraction: any
}
export interface PairFormProps {
    addPair: any
}


export const PairComp = (props: PairProps) => {
    return (
        <div
            onClick={props.onInteraction}
        >
            {props.pair.label}: {props.pair.value}
        </div>
    );
}

class PairForm extends Component {
    uidLabel: string;
    uidValue: string;

    constructor(props: PairFormProps) {
        super(props);
        this.uidLabel = Utils.generateUID();
        this.uidValue = Utils.generateUID();
    }

    addPair() {

    }
    render() {
        const uidLabel = this.uidLabel;
        const uidValue = this.uidValue;
        return (
            <form >
                <label htmlFor={uidLabel}>Label: </label><input placeholder="Label" id={uidLabel}></input>
                <label htmlFor={uidValue}>Value: </label><input placeholder="Value" id={uidValue}></input>
                <button type="submit">Add</button>
            </form>
        );
        // onSubmit={this.props.addPair}
    }
}
export default PairForm;

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