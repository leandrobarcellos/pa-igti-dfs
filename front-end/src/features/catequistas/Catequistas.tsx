import React from "react";
import TextField from "@material-ui/core/TextField";
import {Container, Grid, Typography} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";

class Catequistas extends React.Component {


    render() {
        return (
            <Container maxWidth="lg">
                <Container maxWidth="lg">
                    <Typography variant="h5" component="h5">
                        Dados do catequista
                    </Typography>
                    <Grid container spacing={3} id="dadosCatequista">
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="nomeCtqsndo" label="Nome do Catequista"/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="localNascimentoCtqsndo"
                                       label="Local Nascimento"/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <KeyboardDatePicker fullWidth={true} id="dtNascimentoCtqsndo"
                                                label="Data Nascimento"
                                                format="dd/MM/yyyy" value={new Date()}
                                                KeyboardButtonProps={{'aria-label': 'change date'}}
                                                onChange={() => console.log("changed")}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="enderecoCtqsndo" label="Endereço"/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cepCtqsndo" label="CEP"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="telResCtqsndo" label="Telefone Residencial"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="celResCtqsndo" label="Celular"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="emailCtqsndo" label="E-mail"/>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        );
    }
}

export default Catequistas;