import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppDrawer from "./components/nav/app-drawer";
import Catequistas from "./features/Catequistas";
import Catequizandos from "./features/catequizandos/Catequizandos";


class AppRouter extends React.Component {

    render() {
        return (
            <Router>
                <AppDrawer></AppDrawer>
                <Switch>
                    <Route path="/catequistas" component={Catequistas}/>
                    <Route path="/catequisandos" component={Catequizandos}/>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
