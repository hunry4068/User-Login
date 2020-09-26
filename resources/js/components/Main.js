import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../../css/Main.css'; // customerized css for main

import Router from './Router';
import Header from './Header';
import Footer from './Footer';

export default class Main extends Component{
    constructor() {
        super();

        this.defaultAppState = { isLoggedIn: false, userInfo: {} };
        this.state = this.defaultAppState;

        this.handleStateChange = this.handleStateChange.bind(this);
    }

    // check localStorage['appState'] content and update current state
    UNSAFE_componentWillMount() {
        const jsonState = localStorage['appState'];
        if (jsonState) {
            const appState = JSON.parse(jsonState);
            if (
                appState.hasOwnProperty('isLoggedIn') &&
                appState.hasOwnProperty('userInfo')
            ) this.setState(appState);
        }
    }

    /*  this method is assigned to child components to update and sync state,
        currently use location.reload to refresh whole the page and state, just keep for further needs. */
    handleStateChange (appState) {
        this.setState(appState);
    }

    render() {
        return (
            <BrowserRouter>
                <div className='Main'>
                    <Header appState={this.state} onStateChange={this.handleStateChange}/>
                    <Router />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
