import React from "react";
import {Container, Grid} from "@material-ui/core";
import {InputEmail, InputPassword, InputText} from "../../components/inputs/AppInputs";
import Button from "@material-ui/core/Button";
import {AppStyle} from "../../components/core/AppStyle";
import {NovaSubscricao} from "./NovaSubscricao";
import {SubscricaoService} from "./SubscricaoService";
import { Alert, AlertTitle } from '@material-ui/lab';
import {SessionUtil} from "../../components/core/session.util";


export default function Subscricao() {
    const subscricaoService = new SubscricaoService();
    const classes = AppStyle.useStyles();
    const [nome, setNome] = React.useState<string>('');
    const [sobrenome, setSobrenome] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [senha, setSenha] = React.useState<string>('');
    const [senhaConfirmada, setSenhaConfirmada] = React.useState<string>('');
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
    const handleRegistrar = () => {
        const usr: NovaSubscricao = {
            nome, sobrenome, email, senha
        };
        subscricaoService.novoRegistro(usr).subscribe((next:any) => {
                SessionUtil.setToken(next.data.object["access_token"]);
                SessionUtil.setUser(next.data.object["user"]);
                window.location.reload();
            },
            error => {
                setErrorMessages(error.response.data.messages)
            });
    }

    const verificarSenha = () => {
        if (senhaConfirmada && senhaConfirmada.length > 0)
            return senha !== senhaConfirmada;
        return false;
    }

    return (
        <Container maxWidth="xl" className={classes.loginCard} style={{marginTop: "25px"}}>
            <h3>Bem vindo ao e-Catequese</h3>
            <Grid container spacing={3} id="gridReg">
                <Grid item xs={12} sm={4}>
                    <InputText id="nome" label="Nome" value={nome} set={setNome}></InputText>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <InputEmail id="sobrenome" label="Sobrenome" value={sobrenome} set={setSobrenome}></InputEmail>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputText id="email" label="E-mail" value={email} set={setEmail}></InputText>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputPassword id="senha" label="Senha" value={senha}
                                   set={setSenha}></InputPassword>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputPassword error={verificarSenha()} id="senhaconfirmada" label="Confirmar Senha"
                                   value={senhaConfirmada}
                                   set={setSenhaConfirmada} errorText="Senha não confere"></InputPassword>
                </Grid>
                <Button variant="contained"
                        color="primary"
                        onClick={handleRegistrar}>
                    Confirmar registro
                </Button>
            </Grid>
            {errorMessages.map(msg=>
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {msg}
                </Alert>
            )}
        </Container>
    );
}
