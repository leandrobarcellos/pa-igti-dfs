import React from 'react';
import './App.css';
import AppRouter from "./AppRouter";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

class App extends React.Component {

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <AppRouter/>
            </MuiPickersUtilsProvider>
        );
    }
}

export default App;
