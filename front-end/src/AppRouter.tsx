import React, {useEffect} from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
import AppDrawer from "./components/nav/app-drawer";
import AppSwitch from "./components/core/AppSwitch";
import {AppUtil} from "./components/core/AppUtil";

export default function AppRouter() {
    let loggedIn = AppUtil.loggedIn();
    useEffect(() => {
    }, [loggedIn]);

    return (
        <Router>
            <AppDrawer isLoggedIn={loggedIn}/>

            <AppSwitch authorized={loggedIn}></AppSwitch>
        </Router>
    );
}
