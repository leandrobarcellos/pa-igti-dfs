import React, {useEffect} from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
import AppDrawer from "./components/nav/app-drawer";
import AppSwitch from "./components/core/AppSwitch";
import {AppUtil} from "./components/core/AppUtil";

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
    useEffect(() => {
        console.log("AppRouterEffect");
    }, [AppUtil.loggedIn()]);

    return (
        <Router>
            <AppDrawer isLoggedIn={AppUtil.loggedIn()}/>
            <AppSwitch authorized={AppUtil.loggedIn()}></AppSwitch>
        </Router>
    );
}
