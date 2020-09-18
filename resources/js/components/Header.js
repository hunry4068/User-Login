import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(e) {
        e.preventDefault();

        const defaultAppState = { isLoggedIn: false, userInfo: {} };
        localStorage['appState'] = JSON.stringify(defaultAppState);

        location.reload();
    }

    render() {
        // Test: instead of using localStorage, apply this.props shared from Main component to read isLoogedIn
        let headerMenuArr = this.props.appState.isLoggedIn
            ? [<Link className='navbar-brand' key='home' to='/home'>Home</Link>,
               <Link className='navbar-brand' key='logout' to='/' onClick={this.handleLogOut}>Log Out</Link>]
            : [<Link className='navbar-brand' key='login 'to='/login'>Login</Link>,
               <Link className='navbar-brand' key='register' to='/register'>Register</Link>];

        return (
            <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
                <div className='container'>
                    {headerMenuArr}
                </div>
                <div>
                    <p className='text-primary'>LocalStorage[appState]:</p>
                    <p className='text-secondary'>Val: {localStorage['appState']}</p>
                    <p className='text-success'>Bool: {!!localStorage['appState']}</p>
                </div>
            </nav>
        );
    }
}

export default withRouter(Header);
