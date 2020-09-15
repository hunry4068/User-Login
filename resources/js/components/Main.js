import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "../../css/Main.css"; // customerized css for main

import Router from "./Router";
import Header from "./Header";
import Footer from "./Footer";

const Main = () => {
    return (
        <BrowserRouter>
            <div className="Main">
                <Header />
                <Router />
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default Main;

if (document.getElementById("app")) {
    ReactDOM.render(<Main />, document.getElementById("app"));
}
