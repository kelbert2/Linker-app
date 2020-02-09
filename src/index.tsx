import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import EditableContent from './EditableContent';
import { Pair } from './Pair';
import EditablePair from './EditablePair';

function App() {
    const [storedPair, setStoredPair] = useState(new Pair());
    const [storedText, setStoredText] = useState("Here's some more, edit away!");

    return (
        // <head>
        //     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        //     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        // </head>

        <div className="App">
            <h1>Categories</h1>
            <div>
                <EditablePair
                    pair={storedPair}
                    onSet={(pair: Pair) => setStoredPair(pair)}
                />
            </div>
            <div>
                <EditableContent text={storedText} onSetText={text => setStoredText(text)} />
            </div>
        </div>
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
