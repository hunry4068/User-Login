import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        };
        this.LogOut = this.logOut.bind(this);
    }

    // check if user is authenticated and storing authentication data as states if true
    componentWillMount() {
        let jsonState = localStorage["appState"];
        if (jsonState) {
            let appState = JSON.parse(jsonState);
            if (
                appState.hasOwnProperty("isLoggedIn") &&
                appState.hasOwnProperty("user")
            ) {
            }
            this.setState(appState);
        }
    }

    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push("/login");
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <Link className="navbar-brand" to="/login">
                        Login
                    </Link>
                    {this.state.isLoggedIn ? (
                        <Link className="navbar-brand" to="/home">
                            Home
                        </Link>
                    ) : (
                        <Link className="navbar-brand" to="/register">
                            Register
                        </Link>
                    )}
                </div>
            </nav>
        );
    }
}

export default withRouter(Header);
