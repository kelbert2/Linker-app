import React, { Component } from 'react';
import PairForm, { Pair, PairComp } from './Pair';
import { Utils } from './Utils';
import EditableContent from './EditableContent';

export class CardProperties {
    public title: Pair;
    public content?: Pair[];

    constructor(title: Pair = { label: "Title", value: "Name" }, content?: Pair[]) {
        this.title = title;
        this.content = content;
    }
}

class Card extends Component {
    private history: number = 10;

    state = {
        title: {
            label: "Title",
            value: "Name",
            uid: Utils.generateUID()
        } as Pair,
        content: [
            { label: "Subtype1", value: "name1", uid: '1' },
            { label: "subtype2", value: "name2", uid: '2' }
        ] as Pair[],
        storedText: "Placeholder"
    }

    // const [title, setTitle] = useState( {label: "Title", value: "Name", uid: Utils.generateUID()} as Pair);

    // const [content, setContent] = useState([
    //     { label: "Subtype1", value: "name1", uid: '1' },
    //     { label: "subtype2", value: "name2", uid: '2' }
    // ] as Pair[]);

    handleInteraction(i: number) {
        // const content = this.state.content.slice();
        const prevState = this.state;
        // duplicate the array to replace rather than mutate
        // this.setState({content[i]: "edited"});
    }
    addPair = () => {

    }
    renderPair(i: number) {
        return (
            <li>
                <PairComp
                    pair={this.state.content[i]}
                    onInteraction={() => this.handleInteraction(i)}
                />
            </li>
        );
    }
    render() {
        const pairComps = this.state.content.map((pair, i) => {
            return this.renderPair(i);
        }
        );

        return (
            //<h1>{this.state.title.label}: {this.state.title.value}</h1>
            // <PairForm />
            // {(let i=0; i < this.content.length; i++){
            //     this.renderPair(item);
            // }
            // }
            <ul>
                {pairComps}
                <li>
                    <PairForm></PairForm>
                    <EditableContent onSetText={(text) => { this.setState(text) }} text={this.state.storedText}></EditableContent>
                    {/* addPair={() => this.addPair() */}
                </li>
            </ul>
        );
    }
}

export default Card;