import {Route, Switch, useHistory} from "react-router-dom";
import Login from "../../features/login/Login";
import Subscricao from "../../features/novo-registro/Subscricao";
import Catequistas from "../../features/catequistas/Catequistas";
import Responsaveis from "../../features/responsaveis/Responsaveis";
import Catequizandos from "../../features/catequizandos/Catequizandos";
import Turmas from "../../features/turmas/Turmas";
import React from "react";

export default function AppSwitch(props: {
    authorized: boolean
}) {
    const history = useHistory();

    if (!props.authorized) {
        history.push("/login");
    } else {
        history.push("/home");
    }
    return (
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/subscricao" component={Subscricao}/>
            <Route path="/catequistas" component={Catequistas}/>
            <Route path="/responsaveis" component={Responsaveis}/>
            <Route path="/signup" component={Subscricao}/>
            <Route path="/catequizandos" component={Catequizandos}/>
            <Route path="/catequizandos/{id}/turmas" component={Catequizandos}/>
            <Route path="/turmas" component={Turmas}/>
        </Switch>
    );
}
