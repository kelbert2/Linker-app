import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './Card';
import * as serviceWorker from './serviceWorker';
import EditableContent from './EditableContent';
import { Pair } from './Pair';
import EditablePair from './EditablePair';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

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
            <p>
                <EditablePair
                    pair={storedPair}
                    onSet={(pair: Pair) => setStoredPair(pair)}
                />
            </p>
            <p>
                <EditableContent text={storedText} onSetText={text => setStoredText(text)} />
            </p>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>

    , rootElement);


// ReactDOM.render(<Card />, document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
