import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../views/public/Home";
import Login from "../views/public/Login";
import Register from "../views/public/Register";
// import Dashboard from "../views/private/Dashboard";
// import Notfound from "../views/public/Notfound";

const Router = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} key="home" />
            <Route path="/register" component={Register} />
            {/* {isLoggedIn ? (
                <React.Fragment>
                    <Route path="/home" component={Home} key="home" />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Register} />
                </React.Fragment>
            )} */}

            {/* <Route path="/dashboard" component={Dashboard} />

            <Route component={Notfound} /> */}
        </Switch>
    );
};

export default Router;
