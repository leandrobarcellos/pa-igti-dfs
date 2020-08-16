import {Container, Grid, TextField, Typography} from "@material-ui/core";
import React from "react";

export interface DadosResponsavelState {
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
    value: DadosResponsavelState;
}

class DadosResponsavel extends React.Component<DadosResponsavelProps, DadosResponsavelState> {

    getTextValue = (e: any) => {
        return e?.target ? e.target.value : "";
    }

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
        this.setStateValueFor({praticante: this.getTextValue(e)});
    };

    private setStateValueFor(stateValue: any) {
        this.setState(stateValue);
        this.props.setState(this.state);
    }

    constructor(props: DadosResponsavelProps) {
        super(props);
        this.state = {
            nome: "",
            endereco: "",
            cep: "",
            telResidencial: "",
            celResidencial: "",
            email: "",
            religiao: "",
            praticante: "",
        }
    }

    componentDidMount() {
        this.setState(this.props.value);
    }

    render() {

        return (
            <Container id={this.props.id} style={{marginTop: "25px"}}>
                <Typography variant="h5" component="h5">
                    {this.props.title}
                </Typography>
                <Grid container spacing={3} id={this.props.id}>
                    <Grid item xs={12} sm={12}>
                        <TextField fullWidth={true} id={this.props.id + "Nome"} label={this.props.labelNome}
                                   value={this.state.nome}
                                   onChange={this.setNome}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField fullWidth={true} id={this.props.id + "Endereco"} label="Endereço"
                                   value={this.state.endereco}
                                   onChange={this.setEndereco}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth={true} id={this.props.id + "Cep"} label="CEP"
                                   value={this.state.cep}
                                   onChange={this.setCep}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "TelRes"}
                                   label="Telefone Residencial"
                                   value={this.state.telResidencial}
                                   onChange={this.setTelResidencial}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "CelRes"} label="Celular"
                                   value={this.state.celResidencial}
                                   onChange={this.setCelResidencial}/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField fullWidth={true} id={this.props.id + "Email"} label="E-mail"
                                   value={this.state.email}
                                   onChange={this.setEmail}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "Religiao"} label="Religião"
                                   value={this.state.religiao}
                                   onChange={this.setReligiao}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth={true} id={this.props.id + "Praticante"} label="Praticante"
                                   value={this.state.praticante}
                                   onChange={this.setPraticante}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default DadosResponsavel;