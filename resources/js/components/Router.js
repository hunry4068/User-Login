import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../views/private/Home';
import Login from '../views/public/Login';
import Register from '../views/public/Register';
import Dashboard from '../views/private/Dashboard';
// import Notfound from '../views/public/Notfound';

const PrivateRoute = ({
    component: PrivateComponent /* rename component prop as pascalcased name (React component syntax) */,
    ...rest
}) => {
    const appState = localStorage["appState"]
        ? JSON.parse(localStorage["appState"])
        : { isLoggedIn: false, userInfo: {} };

    return (
        <Route {...rest} render={({ location }) =>
                appState.isLoggedIn
                ? (<PrivateComponent />)
                : (<Redirect to={
                    {
                        pathname: "/login",
                        state: { from: location } /* set the value of props/location/state to navigate the redirect path */
                    }} />
                )
            }
        />
    );
};

const Router = (props) => {
    const redirectPath = props.history && props.history.location.pathname;

    let routeArr = [
        <Route exact path="/" key="root" component={Login} />,
        <Route path="/login" key="login" component={Login} />,
        <Route path="/register" key="register" component={Register} />,
        <PrivateRoute path="/home" key="home" component={Home} />,
        // <PrivateRoute path='/home' key='home' >
        //     <Home />
        // </PrivateRoute>,
        <PrivateRoute path='/dashboard' key='dashboard' component={Dashboard} />,
        <PrivateRoute exact path='/dashboard/:id' key='dashboard' component={Dashboard} />
        /* <Route path='/notfound' key='notfound' component={Notfound} /> */
    ];

    return (
        <Switch>
            {routeArr}
        </Switch>
    );
};

export default Router;
