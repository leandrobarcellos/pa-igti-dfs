import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppDrawer from "./components/nav/app-drawer";
import Catequizandos from "./features/catequizandos/Catequizandos";
import Turmas from "./features/turmas/Turmas";
import Catequistas from "./features/catequistas/Catequistas";

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

export default function AppRouter() {

    return (
        <Router>
            <AppDrawer/>
            <Switch>
                <Route path="/catequistas" component={Catequistas}/>
                <Route path="/catequizandos/{id}/turmas" component={Catequizandos}/>
                <Route path="/turmas" component={Turmas}/>
            </Switch>
        </Router>
    );
}
