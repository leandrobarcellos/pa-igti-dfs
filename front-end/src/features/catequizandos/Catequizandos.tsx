import React, {PureComponent} from "react";
import {
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {KeyboardDatePicker,} from '@material-ui/pickers';
import DadosResponsavel from "./DadosResponsavel";
import CustomizedSteppers from "../../components/Stepper";
import {AppProps} from "../../components/core/app-component";
import ExibirDadosCatequizando from "./ExibirDadosCatequizando";
import ExibirDadosResponsavel from "./ExibirDadosResponsavel";
import CatequizandosService from "./CatequizandosService";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TabelaCatequizandos from "./TabelaCatequizandos";

interface CtqzndoProps extends AppProps {
    onNext: any,
    onPrevious: any
}

export interface CtqzndoState {
    showResults: boolean,
    id: any,
    nomeCtqzndo: string | null,
    turmaDesejada: string | null,
    localNascimentoCtqzndo: string | null,
    dtNascimentoCtqzndo: Date | null,
    enderecoCtqzndo: string | null,
    cepCtqzndo: string | null,
    telResCtqzndo: string | null,
    celResCtqzndo: string | null,
    emailCtqzndo: string | null,
    paroquiBatismoCtqzndo: string | null,
    arquidioceseBatismo: string | null,
    cidadeDioceseCtqzndo: string | null,
    ufDioceseCtqzndo: string | null,
    resideCom: string | null,
    dadosMae: any | null,
    dadosPai: any | null
}

const steps = ['Dados do Catequizando', 'Dados dos Pais', 'Resumo'];

class Catequizandos extends PureComponent<CtqzndoProps, CtqzndoState> {

    service: CatequizandosService = new CatequizandosService();
    onNext = () => {
        console.log(JSON.stringify(this.state));
        localStorage.setItem("catequizando", JSON.stringify(this.state));
    };

    onPrevious = () => {
        let item = localStorage.getItem("catequizando");
        if (item) {
            this.setState(JSON.parse(item));
        }
    };

    setDadosMae = (dados: any) => {
        this.setState({dadosMae: dados});
    };

    setDadosPai = (dados: any) => {
        this.setState({dadosPai: dados});
    };

    useStyles = () => makeStyles((theme: Theme) =>
        createStyles({
            button: {
                margin: theme.spacing(1),
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: "100%",
                width: "100%",
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
            selectClass: {
                minWidth: "100%",
                width: "100%",
            },
        }),
    );

    getTextValue = (e: any) => {
        return e ? e.target ? e.target.value : e : "";
    };

    setTurmaDesejada = (e: any) => {
        this.setState({turmaDesejada: this.getTextValue(e)});
    }

    setNomeCtqzndo = (e: any) => {
        this.setState({nomeCtqzndo: this.getTextValue(e)});
    };

    setLocalNascimentoCtqzndo = (e: any) => {
        this.setState({localNascimentoCtqzndo: this.getTextValue(e)});
    };

    setDtNascimentoCtqzndo = (e: any) => {
        this.setState({dtNascimentoCtqzndo: e});
    };

    setEnderecoCtqzndo = (e: any) => {
        this.setState({enderecoCtqzndo: this.getTextValue(e)});
    };

    setCepCtqzndo = (e: any) => {
        this.setState({cepCtqzndo: this.getTextValue(e)});
    };

    setTelResCtqzndo = (e: any) => {
        this.setState({telResCtqzndo: this.getTextValue(e)});
    };

    setCelResCtqzndo = (e: any) => {
        this.setState({celResCtqzndo: this.getTextValue(e)});
    };

    setEmailCtqzndo = (e: any) => {
        this.setState({emailCtqzndo: this.getTextValue(e)});
    };

    setParoquiBatismoCtqzndo = (e: any) => {
        this.setState({paroquiBatismoCtqzndo: this.getTextValue(e)});
    };

    setArquidioceseBatismo = (e: any) => {
        this.setState({arquidioceseBatismo: this.getTextValue(e)});
    };

    setCidadeDioceseCtqzndo = (e: any) => {
        this.setState({cidadeDioceseCtqzndo: this.getTextValue(e)});
    };

    setUfDioceseCtqzndo = (e: any) => {
        this.setState({ufDioceseCtqzndo: this.getTextValue(e)});
    };

    resideCom = (e: any) => {
        this.setState({resideCom: this.getTextValue(e)});
    };

    getFormattedDate = (dtNascimentoCtqzndo: any) => {
        if (this.state?.dtNascimentoCtqzndo?.toLocaleDateString)
            return this.state?.dtNascimentoCtqzndo?.toLocaleDateString();
        return "";
    };

    handleSubmit = (e: any) => {
        if(this.state.id){
            this.service.merge(this.state).then(res => console.log(res)).catch(err => console.log(err));
        } else{
            this.service.persist(this.state).then(res => console.log(res)).catch(err => console.log(err));
        }
    };

    handleReset = (e: any) => {
        this.setState(this.newCatequizandoState());
    };

    classes: any;

    constructor(props: CtqzndoProps) {
        super(props);
        this.state = this.newCatequizandoState();
    }

    newCatequizandoState = () => {
        return {
            showResults: false,
            id: "",
            nomeCtqzndo: "",
            turmaDesejada: "",
            localNascimentoCtqzndo: "",
            dtNascimentoCtqzndo: null,
            enderecoCtqzndo: "",
            cepCtqzndo: "",
            telResCtqzndo: "",
            celResCtqzndo: "",
            emailCtqzndo: "",
            paroquiBatismoCtqzndo: "",
            arquidioceseBatismo: "",
            cidadeDioceseCtqzndo: "",
            ufDioceseCtqzndo: "",
            resideCom: "",
            dadosMae: {},
            dadosPai: {}
        };
    };

    handleChangeAccordion = (e:any) => {
        this.setState({showResults: !this.state.showResults});
    }

    handleEditing = (row: any) => {
        this.setState(row);
        this.setState({showResults: false});
    }

    render() {
        this.classes = this.useStyles();
        return (
            <Container maxWidth="lg" style={{marginTop: "25px"}}>
                <Typography variant="h5" component="h5">
                    Catequizando
                </Typography>
                <ExpansionPanel expanded={!this.state.showResults}>
                    <ExpansionPanelSummary onClick={this.handleChangeAccordion}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography className={this.classes.heading}>Formulário de cadastramento</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <CustomizedSteppers onNext={this.onNext} onPrevious={this.onPrevious} steps={steps}
                                            onFinish={this.handleSubmit} onReset={this.handleReset}>
                            <Container maxWidth="lg">
                                <Container maxWidth="lg">
                                    <Typography variant="h5" component="h5">
                                        Dados do catequizando
                                    </Typography>
                                    <Grid container spacing={3} id="dadosCatequizando">
                                        <Grid item xs={12} sm={8}>
                                            <TextField fullWidth={true} value={this.state.nomeCtqzndo} id="nomeCtqzndo"
                                                       label="Nome do Catequizando"
                                                       onChange={this.setNomeCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={this.classes.formControl} fullWidth={true}>
                                                <InputLabel id="demo-simple-select-label">Turma Desejada</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className={this.classes.selectClass}
                                                    value={this.state.turmaDesejada}
                                                    onChange={this.setTurmaDesejada}
                                                >
                                                    <MenuItem value="">Selecione</MenuItem>
                                                    <MenuItem value="PE">Pré-Eucaristia</MenuItem>
                                                    <MenuItem value="EU">Eucaristia</MenuItem>
                                                    <MenuItem value="PR">Perseverança</MenuItem>
                                                    <MenuItem value="CR">Crisma</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField fullWidth={true} value={this.state.localNascimentoCtqzndo}
                                                       id="localNascimentoCtqzndo"
                                                       label="Local Nascimento"
                                                       onChange={this.setLocalNascimentoCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <KeyboardDatePicker fullWidth={true}
                                                                id="dtNascimentoCtqzndo"
                                                                label="Data Nascimento"
                                                                format="dd/MM/yyyy"
                                                                value={this.state.dtNascimentoCtqzndo}
                                                                onChange={this.setDtNascimentoCtqzndo}
                                                                KeyboardButtonProps={{'aria-label': 'change date'}}/>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField fullWidth={true} value={this.state.enderecoCtqzndo}
                                                       id="enderecoCtqzndo" label="Endereço"
                                                       onChange={this.setEnderecoCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField fullWidth={true} value={this.state.cepCtqzndo}
                                                       id="cepCtqzndo" label="CEP"
                                                       onChange={this.setCepCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth={true}
                                                       value={this.state.telResCtqzndo}
                                                       id="telResCtqzndo" label="Telefone Residencial"
                                                       onChange={this.setTelResCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth={true}
                                                       value={this.state.celResCtqzndo}
                                                       id="celResCtqzndo" label="Celular"
                                                       onChange={this.setCelResCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField fullWidth={true}
                                                       value={this.state.emailCtqzndo}
                                                       id="emailCtqzndo" label="E-mail"
                                                       onChange={this.setEmailCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField fullWidth={true}
                                                       value={this.state.paroquiBatismoCtqzndo}
                                                       id="paroquiBatismoCtqzndo"
                                                       label="Paróquia onde foi batizado"
                                                       onChange={this.setParoquiBatismoCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth={true}
                                                       value={this.state.arquidioceseBatismo}
                                                       id="arqDioceseCtqzndo"
                                                       label="Arquidiocese/Diocese"
                                                       onChange={this.setArquidioceseBatismo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField fullWidth={true}
                                                       value={this.state.cidadeDioceseCtqzndo}
                                                       onChange={this.setCidadeDioceseCtqzndo}
                                                       id="cidadeDioceseCtqzndo" label="Cidade"/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <TextField fullWidth={true} id="ufDioceseCtqzndo" label="UF"
                                                       value={this.state.ufDioceseCtqzndo}
                                                       onChange={this.setUfDioceseCtqzndo}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField fullWidth={true} id="resideCom"
                                                       value={this.state.resideCom}
                                                       onChange={this.resideCom}
                                                       label="Catequizando reside com:"/>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Container>
                            <Container maxWidth="lg">
                                <Grid container spacing={3} id="dadosCatequisando">
                                    <Grid item xs={12} sm={6}>
                                        <DadosResponsavel id="gridMae" title="Dados da Mãe" labelNome="Nome da Mãe"
                                                          value={this.state.dadosMae}
                                                          setState={this.setDadosMae}>
                                        </DadosResponsavel>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DadosResponsavel id="gridPai" title="Dados do Pai" labelNome="Nome do Pai"
                                                          value={this.state.dadosPai}
                                                          setState={this.setDadosPai}>
                                        </DadosResponsavel>
                                    </Grid>
                                </Grid>
                            </Container>
                            <Container maxWidth="lg">
                                <Grid container spacing={3} id="exibirDados">
                                    <Grid item xs={12} sm={12}>
                                        <ExibirDadosCatequizando value={this.state}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <ExibirDadosResponsavel id="dadosMae" labelNome="Nome da Mãe"
                                                                title="Dados da Mãe" value={this.state.dadosMae}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <ExibirDadosResponsavel id="dadosPai" labelNome="Nome do Pai"
                                                                title="Dados do Pai" value={this.state.dadosPai}/>
                                    </Grid>
                                </Grid>
                            </Container>
                        </CustomizedSteppers>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.showResults}>
                    <ExpansionPanelSummary onClick={this.handleChangeAccordion}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={this.classes.heading}>Catequizandos Registrados</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TabelaCatequizandos onEditing={this.handleEditing}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Container>
        );
    }

}

export default Catequizandos;