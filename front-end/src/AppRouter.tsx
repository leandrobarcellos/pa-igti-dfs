import React, {useEffect} from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
import AppDrawer from "./components/nav/app-drawer";
import AppSwitch from "./components/core/AppSwitch";
import {AppUtil} from "./components/core/AppUtil";
import {SessionUtil} from "./components/core/session.util";

export default function AppRouter() {
    let loggedIn = AppUtil.loggedIn();
    useEffect(() => {
        console.log("SessionUtil.LOGGED_USR", JSON.stringify(SessionUtil.LOGGED_USR));
    }, [loggedIn]);

    return (
        <Router>
            <AppDrawer isLoggedIn={loggedIn}/>
            <AppSwitch authorized={loggedIn}></AppSwitch>
        </Router>
    );
}
