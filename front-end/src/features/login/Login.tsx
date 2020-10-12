import React from "react";
import {
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {AppStyle} from "../../components/core/AppStyle";
import {Field} from "../../components/core/Field";
import Button from "@material-ui/core/Button";
import {LoginPipe} from "./LoginPipe";
import {useHistory} from "react-router-dom";

export default function Login() {
    const history = useHistory();
    const classes = AppStyle.classes();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const loginPipe = new LoginPipe();

    const handleLogin = (e: any) => {
        loginPipe.login.next({
            email,
            senha: "",
            callback: () => {
                history.push("/home")
                window.location.reload();
            }
        });
    }

    return (
        <Container maxWidth="lg" style={{marginTop: "25px", maxWidth: "25%"}}>
            <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Login</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3} id="gridLogin">
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="usrEmail" label="E-mail"
                                       value={email}
                                       onChange={e => Field.change(e, setEmail)}/>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{textAlign: "center"}}>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={handleLogin}>
                                Entrar
                            </Button>
                        </Grid>
                    </Grid>

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    )

}