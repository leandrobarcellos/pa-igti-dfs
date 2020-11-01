import React from "react";
import {
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography
} from "@material-ui/core";
import {AppStyle} from "../../components/core/AppStyle";
import Button from "@material-ui/core/Button";
import {LoginPipe} from "./LoginPipe";
import {useHistory} from "react-router-dom";
import {InputEmail} from "../../components/inputs/AppInputs";
import {LoggerFactory} from "../../components/core/LoggerFactory";

const LOGGER  = LoggerFactory.newInstance(Login);

export default function Login() {
    const history = useHistory();
    const classes = AppStyle.useStyles();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const loginPipe = new LoginPipe();

    const handleLogin = (e: any) => {
        LOGGER.warn("testing the warn");
        loginPipe.login.next({
            username: email,
            password: "secret",
            callback: () => {
                window.location.reload();
            }
        });
    }

    return (
        <Container maxWidth="xl" className={classes.loginCard} style={{marginTop: "25px"}}>
            <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Login</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3} id="gridLogin">
                        <Grid item xs={12} sm={12}>
                            <InputEmail id="usrEmail" label="E-mail" value={email} set={setEmail}></InputEmail>
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