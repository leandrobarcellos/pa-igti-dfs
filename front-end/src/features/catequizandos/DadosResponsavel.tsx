import {Container, Grid, TextField, Typography} from "@material-ui/core";
import React from "react";

interface DadosResponsavelState {
    nome: string | null,
    endereco: string | null,
    cep: string | null,
    telResidencial: string | null,
    celResidencial: string | null,
    email: string | null,
    religiao: string | null,
    praticante: string | null
}

interface DadosResponsavelProps {
    id: string,
    title: string,
    labelNome: string,
    setState: (e: any) => void
}

class DadosResponsavel extends React.Component<DadosResponsavelProps, DadosResponsavelState> {
    getTextValue = (e: any) => {
        return e.target.value;
    };

    setNome = (e: any) => {
        this.setState({nome: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    setEndereco = (e: any) => {
        this.setState({endereco: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    setCep = (e: any) => {
        this.setState({cep: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    setTelResidencial = (e: any) => {
        this.setState({telResidencial: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    setCelResidencial = (e: any) => {
        this.setState({celResidencial: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    setEmail = (e: any) => {
        this.setState({email: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    setReligiao = (e: any) => {
        this.setState({religiao: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    setPraticante = (e: any) => {
        this.setState({praticante: this.getTextValue(e)});
        this.props.setState(this.state);
    };

    constructor(props: DadosResponsavelProps) {
        super(props);
        this.state = {
            nome: null,
            endereco: null,
            cep: null,
            telResidencial: null,
            celResidencial: null,
            email: null,
            religiao: null,
            praticante: null
        }
    }

    render() {
        return (
            <Container id={this.props.id} style={{marginTop: "25px"}}>
                <Typography variant="h5" component="h5">
                    {this.props.title}
                </Typography>
                <Grid container spacing={3} id="gridMae">
                    <Grid item xs={12} sm={12}>
                        <TextField fullWidth={true} id={this.props.id + "Nome"} label={this.props.labelNome}
                                   onChange={this.setNome}></TextField>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField fullWidth={true} id={this.props.id + "Endereco"} label="Endereço"
                                   onChange={this.setEndereco}></TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth={true} id={this.props.id + "Cep"} label="CEP"
                                   onChange={this.setCep}></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "TelRes"}
                                   label="Telefone Residencial"
                                   onChange={this.setTelResidencial}></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "CelRes"} label="Celular"
                                   onChange={this.setCelResidencial}></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField fullWidth={true} id={this.props.id + "Email"} label="E-mail"
                                   onChange={this.setEmail}></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "Religiao"}
                                   label="Religião" onChange={this.setReligiao}></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "Praticante"}
                                   label="Praticante" onChange={this.setPraticante}></TextField>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default DadosResponsavel;