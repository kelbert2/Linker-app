import React, { Component } from 'react';
import { CardProperties } from './Card';

class Page extends Component {

    private static historySize: number = 10;
    // keeps track of the history of card states
    state = {
        history: [] as CardProperties[]
    };

    constructor(props: any) {
        super(props);
        this.state = {
            history: Array(Page.historySize).fill(null) as CardProperties[]
        };
    }

    handleInteraction(i: number) {
        const history = this.state.history;
        const current = history[history.length - 1];
    }


}