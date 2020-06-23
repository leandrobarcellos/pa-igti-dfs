import React from "react";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DadosResponsavel from "./DadosResponsavel";

interface CtqzndoProps {

}

interface CtqzndoState {
    nomeCtqsndo: string | null,
    localNascimentoCtqsndo: string | null,
    dtNascimentoCtqsndo: Date | null,
    enderecoCtqsndo: string | null,
    cepCtqsndo: string | null,
    telResCtqsndo: string | null,
    celResCtqsndo: string | null,
    emailCtqsndo: string | null,
    paroquiBatismoCtqsndo: string | null
    dadosMae: any | null,
    dadosPai: any | null
}

class Catequizandos extends React.Component<CtqzndoProps, CtqzndoState> {

    setDadosMae = (dados: any) => {
        this.setState({dadosMae: dados});
    }

    setDadosPai = (dados: any) => {
        this.setState({dadosPai: dados});
    }

    useStyles = () => makeStyles((theme: Theme) =>
        createStyles({
            button: {
                margin: theme.spacing(1),
            },
        }),
    );

    getTextValue = (e: any) => {
        return e.target.value;
    }

    setNomeCtqsndo = (e: any) => {
        this.setState({nomeCtqsndo: this.getTextValue(e)});
    };

    setLocalNascimentoCtqsndo = (e: any) => {
        this.setState({localNascimentoCtqsndo: this.getTextValue(e)});
    };

    setDtNascimentoCtqsndo = (e: any) => {
        this.setState({dtNascimentoCtqsndo: e});
    };

    setEnderecoCtqsndo = (e: any) => {
        this.setState({enderecoCtqsndo: this.getTextValue(e)});
    };

    setCepCtqsndo = (e: any) => {
        this.setState({cepCtqsndo: this.getTextValue(e)});
    };

    setTelResCtqsndo = (e: any) => {
        this.setState({telResCtqsndo: this.getTextValue(e)});
    };

    setCelResCtqsndo = (e: any) => {
        this.setState({celResCtqsndo: this.getTextValue(e)});
    };

    setEmailCtqsndo = (e: any) => {
        this.setState({emailCtqsndo: this.getTextValue(e)});
    };

    setParoquiBatismoCtqsndo = (e: any) => {
        this.setState({paroquiBatismoCtqsndo: this.getTextValue(e)});
    };

    handleSubmit = () => {
        console.log(JSON.stringify(this.state));
    }

    classes: any;

    constructor(props: any) {
        super(props);
        this.state = {
            nomeCtqsndo: null,
            localNascimentoCtqsndo: null,
            dtNascimentoCtqsndo: null,
            enderecoCtqsndo: null,
            cepCtqsndo: null,
            telResCtqsndo: null,
            celResCtqsndo: null,
            emailCtqsndo: null,
            paroquiBatismoCtqsndo: null,
            dadosMae: null,
            dadosPai: null
        };
    }

    render() {
        this.classes = this.useStyles();
        return (
            <Container maxWidth="lg" style={{marginTop: "25px"}}>
                <Container maxWidth="lg">
                    <Typography variant="h5" component="h5">
                        Dados do catequisando
                    </Typography>
                    <Grid container spacing={3} id="dadosCatequisando">
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="nomeCtqsndo" label="Nome do Catequisando"
                                       onChange={this.setNomeCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="localNascimentoCtqsndo"
                                       label="Local Nascimento"
                                       onChange={this.setLocalNascimentoCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <KeyboardDatePicker
                                fullWidth={true}
                                id="dtNascimentoCtqsndo"
                                label="Data Nascimento"
                                format="dd/MM/yyyy"
                                value={this.state.dtNascimentoCtqsndo}
                                onChange={this.setDtNascimentoCtqsndo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="enderecoCtqsndo" label="Endereço"
                                       onChange={this.setEnderecoCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cepCtqsndo" label="CEP"
                                       onChange={this.setCepCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="telResCtqsndo" label="Telefone Residencial"
                                       onChange={this.setTelResCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="celResCtqsndo" label="Celular"
                                       onChange={this.setCelResCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="emailCtqsndo" label="E-mail"
                                       onChange={this.setEmailCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="paroquiBatismoCtqsndo"
                                       label="Paróquia onde foi batizado"
                                       onChange={this.setParoquiBatismoCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="arqDioceseCtqsndo"
                                       label="Arquidiocese/Diocese"
                                       onChange={this.setParoquiBatismoCtqsndo}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cidadeDioceseCtqsndo" label="Cidade"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField fullWidth={true} id="ufDioceseCtqsndo" label="UF"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="resideCom" label="Catequisando reside com:"></TextField>
                        </Grid>
                    </Grid>
                </Container>
                <DadosResponsavel id="gridMae" title="Dados da Mãe" labelNome="Nome da Mãe" setState={this.setDadosMae}>
                </DadosResponsavel>
                <DadosResponsavel id="gridPai" title="Dados do Pai" labelNome="Nome do Pai" setState={this.setDadosPai}>
                </DadosResponsavel>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "30px",
                    marginTop: "25px"
                }}>
                    <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={this.classes.button}
                        startIcon={<CancelIcon/>}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={this.classes.button}
                        startIcon={<SaveIcon/>}
                        onClick={this.handleSubmit}>
                        Save
                    </Button>
                </div>
            </Container>
        );
    }
}

export default Catequizandos;