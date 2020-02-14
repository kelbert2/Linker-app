import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import EditableContent from './EditableContent';
import { Pair } from './Pair';
import EditablePair from './EditablePair';
import Card from './Card';
import { DatepickerContextProvider } from './custom-datepicker/DatepickerContext';
import Month from './custom-datepicker/Month';

function App() {
    const [storedPair, setStoredPair] = useState(new Pair({ label: "Labelll", value: "Vallluee" }));
    // const [storedText, setStoredText] = useState("Here's some more, edit away!");

    const [storedContent, setStoredContent] = useState([{ label: "lab1", value: "val1" }, { label: "lab2", value: "val2" }] as Pair[]);

    const updateContent = (pair: Pair, index: number) => {
        const newContent = [...storedContent];
        newContent[index] = pair;
        setStoredContent(newContent);
    }

    return (
        // <head>
        //     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        //     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        // </head>

        <div className="App">
            <h1>Categories</h1>
            <Card
                title={storedPair}
                content={storedContent}
            />
            <div>
                <EditablePair
                    pair={storedContent[1]}
                    onSet={(pair: Pair) => updateContent(pair, 1)}
                    key={1}
                />
            </div>
            {/* <div>
                <EditableContent text={storedText} onSetText={text => setStoredText(text)} />
            </div> */}


            <DatepickerContextProvider><Month></Month></DatepickerContextProvider>
        </div >
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />
    , rootElement);


// ReactDOM.render(<Card />, document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
