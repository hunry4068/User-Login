import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../views/private/Home';
import Login from '../views/public/Login';
import Register from '../views/public/Register';
// import Dashboard from '../views/private/Dashboard';
// import Notfound from '../views/public/Notfound';

const Router = (props) => {
    const redirectPath = props.history && props.history.location.pathname;

    let routeArr = [
        <Route exact path='/' key='root' component={Login} />,
        <Route path='/login' key='login' component={Login} />,
        <Route path='/home' key='home' component={Home} />,
        <Route path='/register' key='register' component={Register} />
        /*  <Route path='/dashboard' key='dashboard' component={Dashboard} />,
            <Route path='/notfound' key='notfound' component={Notfound} /> */
    ];

    return (
        <Switch>
            {routeArr}
        </Switch>
    );
};

export default Router;
