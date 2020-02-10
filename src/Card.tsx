import React, { useState } from 'react';
import { Pair } from './Pair';
import EditablePair from './EditablePair';
import { Utils } from './Utils';

export interface CardProperties {
    title: Pair;
    content?: Pair[];
}

function Card(props: CardProperties) {
    const [title, setTitle] = useState(props.title as Pair);

    const [content, setContent] = useState(props.content ? props.content : [{ label: '', value: '' }] as Pair[]);

    // const [title, setTitle] = useState(new Pair({ label: "Title", value: "Name" }) as Pair);

    // const [content, setContent] = useState([
    //     { label: "Subtype1", value: "name1", uid: '1' },
    //     { label: "subtype2", value: "name2", uid: '2' }
    // ] as Pair[]);

    // state = {
    //     title: {
    //         label: "Title",
    //         value: "Name",
    //         uid: Utils.generateUID()
    //     } as Pair,
    //     content: [
    //         { label: "Subtype1", value: "name1", uid: '1' },
    //         { label: "subtype2", value: "name2", uid: '2' }
    //     ] as Pair[],
    //     storedText: "Placeholder"
    // }

    // const history: number = 10;

    // handleInteraction(i: number) {
    //     // const content = this.state.content.slice();
    //     const prevState = this.state;
    //     // duplicate the array to replace rather than mutate
    //     // this.setState({content[i]: "edited"});
    // }


    const renderPair = (pair: Pair, key: number, set: (pair: Pair, key: number) => any | void) => {
        return (
            <EditablePair
                key={key}
                pair={pair}
                onSet={(pair: Pair) => set(pair, key)}
            />
            //onSet={(pair: Pair) => updateContent(pair, 1)}
        );
    }
    const updateTitle = (pair: Pair, key: number) => {
        setTitle(pair);
    }

    const renderTitle = () => {
        return renderPair(title, 0, updateTitle);
    }

    const addContent = (pair: Pair, key: number) => {

        // console.log('received pair: ');
        // console.log(pair);
        // console.log("key: " + key);
        // console.log(content[key]);

        const newContent = [...content];
        // content.slice()

        if (key >= newContent.length) {
            newContent.push(pair);
        } else {
            newContent[key] = pair;
        }

        setContent(newContent);

        // console.log('Current Content: ');
        // console.log(newContent[key]);

        if (content.every(element => (element.label !== '' && element.value !== ''))) {
            // addContent(new Pair({ label: '', value: '' }), content.length);
            newContent.push(new Pair({ label: '', value: '' }));
        }
    }
    // TODO: Bug - if type in a single character into label, the Add + button will still display
    const renderContent = () => {
        // Filter out blank items
        // add an Add Item button but do not save to content
        let ret = content.map((item, key) => {
            if (!(Utils.isBlank(item.label) && Utils.isBlank(item.value as string))) {
                return (
                    <li
                        className="card">
                        {renderPair(item, key, addContent)}
                    </li>
                );
            }
            return null;
        });

        ret.push(
            <li
                className="card">
                {renderPair({ label: '', value: '' }, ret.length, addContent)}
            </li>
        );
        return ret;
    }

    return (
        <div
            className="card">
            {renderTitle()}
            <ul>
                {renderContent()}
            </ul>
        </div>

        // <div>
        //     {/* <EditablePair
        //         key={1}
        //         pair={title}
        //         onSet={(pair: Pair, key: number) => updateTitle(pair, key)}
        //     /> */}
        //     {renderTitle()}
        //     <ul>
        // <EditablePair
        //             key={2}
        //             pair={content[0]}
        //             onSet={(pair: Pair, key: number) => addContent(pair, key)}
        // {renderContent()}
        //         
        //     </ul>
        // </div>
    );
}

export default Card;