import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginFilter = (props) => {
    let renderComponent = [];

    const appState = localStorage['appState']
        ? JSON.parse(localStorage['appState'])
        : { isLoggedIn: false, userInfo: {} };
    const redirect = props.redirect;

    if (!appState.isLoggedIn) renderComponent.push(<Redirect to='/login' key='login' push={true} />);
    else if (redirect) renderComponent.push(<Redirect to={redirect} key='redirect' push={true} />);

    return (
        <div id='loginFilter'>
            {renderComponent}
        </div>
    );
}

export default LoginFilter;
