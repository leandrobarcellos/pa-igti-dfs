import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppDrawer from "./components/nav/app-drawer";
import Catequizandos from "./features/catequizandos/Catequizandos";
import Turmas from "./features/turmas/Turmas";
import HCatequistas from "./features/catequistas/HCatequistas";

const teste = {
    nome: "Leandro",
    sobrenome: "Barcellos",
    endereco: {
        cep: "70660082",
        cidade: "Brasília",
        logradouro: "AOS 8 Bloco B",
        numero: "209"
    }
};

class AppRouter extends React.Component {

    render() {
        return (
            <Router>
                <AppDrawer/>
                <Switch>
                    <Route path="/catequistas" component={HCatequistas}/>
                    <Route path="/catequizandos" component={Catequizandos}/>
                    <Route path="/turmas" component={Turmas}/>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
