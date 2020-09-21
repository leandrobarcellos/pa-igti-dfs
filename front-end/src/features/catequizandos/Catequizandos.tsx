import React, {useState} from "react";
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
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {DadosResponsavel, Responsavel} from "./DadosResponsavel";
import CustomizedSteppers from "../../components/Stepper";
import ExibirDadosCatequizando from "./ExibirDadosCatequizando";
import ExibirDadosResponsavel from "./ExibirDadosResponsavel";
import CatequizandosService from "./CatequizandosService";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TabelaCatequizandos from "./TabelaCatequizandos";
import DateFnsUtils from "@date-io/date-fns";

export interface Catequizando {
    id: any,
    nomeCtqzndo: string,
    turmaDesejada: string,
    localNascimentoCtqzndo: string,
    dtNascimentoCtqzndo: Date | null,
    enderecoCtqzndo: string,
    cepCtqzndo: string,
    telResCtqzndo: string,
    celResCtqzndo: string,
    emailCtqzndo: string,
    paroquiBatismoCtqzndo: string,
    arquidioceseBatismo: string,
    cidadeDioceseCtqzndo: string,
    ufDioceseCtqzndo: string,
    resideCom: string,
    dadosMae: Responsavel | null,
    dadosPai: Responsavel | null
}

const steps = ['Dados do Catequizando', 'Dados dos Pais', 'Resumo'];

export default function Catequizandos(props: any) {

    const [showResults, setShowResults] = useState(false);
    const [id, setId] = useState(null);
    const [nomeCtqzndo, setNomeCtqzndo] = useState("");
    const [turmaDesejada, setTurmaDesejada] = useState("");
    const [localNascimentoCtqzndo, setLocalNascimentoCtqzndo] = useState("");
    const [dtNascimentoCtqzndo, setDtNascimentoCtqzndo] = React.useState<Date | null>(null);
    const [enderecoCtqzndo, setEnderecoCtqzndo] = useState("");
    const [cepCtqzndo, setCepCtqzndo] = useState("");
    const [telResCtqzndo, setTelResCtqzndo] = useState("");
    const [celResCtqzndo, setCelResCtqzndo] = useState("");
    const [emailCtqzndo, setEmailCtqzndo] = useState("");
    const [paroquiBatismoCtqzndo, setParoquiBatismoCtqzndo] = useState("");
    const [arquidioceseBatismo, setArquidioceseBatismo] = useState("");
    const [cidadeDioceseCtqzndo, setCidadeDioceseCtqzndo] = useState("");
    const [ufDioceseCtqzndo, setUfDioceseCtqzndo] = useState("");
    const [resideCom, setResideCom] = useState("");
    const [dadosMae, setDadosMae] = React.useState<Responsavel | null>(null);
    const [dadosPai, setDadosPai] = React.useState<Responsavel | null>(null);

    const catequizando: Catequizando = {
        id,
        nomeCtqzndo,
        turmaDesejada,
        localNascimentoCtqzndo,
        dtNascimentoCtqzndo,
        enderecoCtqzndo,
        cepCtqzndo,
        telResCtqzndo,
        celResCtqzndo,
        emailCtqzndo,
        paroquiBatismoCtqzndo,
        arquidioceseBatismo,
        cidadeDioceseCtqzndo,
        ufDioceseCtqzndo,
        resideCom,
        dadosMae,
        dadosPai
    };

    const configurarForm = (value: Catequizando | null) => {
        setId(value ? value.id : "");
        setArquidioceseBatismo(value ? value.arquidioceseBatismo : "");
        setCelResCtqzndo(value ? value.celResCtqzndo : "");
        setCepCtqzndo(value ? value.cepCtqzndo : "");
        setCidadeDioceseCtqzndo(value ? value.cidadeDioceseCtqzndo : "");
        setDadosMae(value ? value.dadosMae : null);
        setDadosPai(value ? value.dadosPai : null);
        setDtNascimentoCtqzndo(value ? value.dtNascimentoCtqzndo : null);
        setEmailCtqzndo(value ? value.emailCtqzndo : "");
        setEnderecoCtqzndo(value ? value.enderecoCtqzndo : "");
    }

    const service: CatequizandosService = new CatequizandosService();

    const onNext = () => {
        localStorage.setItem("catequizando", JSON.stringify(catequizando));
    };

    const onPrevious = () => {
        let item = localStorage.getItem("catequizando");
        if (null != item)
            configurarForm(JSON.parse(item));
    };

    const useStyles = makeStyles((theme: Theme) =>
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

    const classes = useStyles();

    const getTextValue = (e: any) => {
        return e ? e.target ? e.target.value : e : "";
    };

    const getFormattedDate = (dtNascimentoCtqzndo: any) => {
        if (dtNascimentoCtqzndo?.toLocaleDateString)
            return dtNascimentoCtqzndo?.toLocaleDateString();
        return "";
    };

    const handleSubmit = (e: any) => {
        if (id) {
            service.merge(catequizando).then(res => console.log(res)).catch(err => console.log(err));
        } else {
            service.persist(catequizando).then(res => console.log(res)).catch(err => console.log(err));
        }
    };

    const handleReset = (e: any) => {
        configurarForm(null);
    };

    const handleChangeAccordion = (e: any) => {
        setShowResults(!showResults);
    }

    const handleEditing = (row: Catequizando) => {
        configurarForm(row);
        setShowResults(false);
    }

    const setStateTarget = (e: any, toState: (v: any) => void) => {
        toState(e.target.value);
    }

    return (
        <Container maxWidth="lg" style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                Catequizando
            </Typography>
            <ExpansionPanel expanded={!showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Formulário de cadastramento</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <CustomizedSteppers onNext={onNext} onPrevious={onPrevious} steps={steps}
                                        onFinish={handleSubmit} onReset={handleReset}>
                        <Container maxWidth="lg">
                            <Container maxWidth="lg">
                                <Typography variant="h5" component="h5">
                                    Dados do catequizando
                                </Typography>
                                <Grid container spacing={3} id="dadosCatequizando">
                                    <Grid item xs={12} sm={8}>
                                        <TextField fullWidth={true} value={nomeCtqzndo} id="nomeCtqzndo"
                                                   label="Nome do Catequizando"
                                                   onChange={(e: any) => setStateTarget(e, setNomeCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl className={classes.formControl} fullWidth={true}>
                                            <InputLabel id="demo-simple-select-label">Turma Desejada</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                className={classes.selectClass}
                                                value={turmaDesejada}
                                                onChange={(e: any) => setStateTarget(e, setTurmaDesejada)}
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
                                        <TextField fullWidth={true} value={localNascimentoCtqzndo}
                                                   id="localNascimentoCtqzndo"
                                                   label="Local Nascimento"
                                                   onChange={(e: any) => setStateTarget(e, setLocalNascimentoCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker fullWidth={true}
                                                                id="dtNascimentoCtqzndo"
                                                                label="Data Nascimento"
                                                                format="dd/MM/yyyy"
                                                                value={dtNascimentoCtqzndo}
                                                                onChange={setDtNascimentoCtqzndo}
                                                                KeyboardButtonProps={{'aria-label': 'change date'}}/>
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField fullWidth={true} value={enderecoCtqzndo}
                                                   id="enderecoCtqzndo" label="Endereço"
                                                   onChange={(e: any) => setStateTarget(e, setEnderecoCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth={true} value={cepCtqzndo}
                                                   id="cepCtqzndo" label="CEP"
                                                   onChange={(e: any) => setStateTarget(e, setCepCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth={true}
                                                   value={telResCtqzndo}
                                                   id="telResCtqzndo" label="Telefone Residencial"
                                                   onChange={(e: any) => setStateTarget(e, setTelResCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth={true}
                                                   value={celResCtqzndo}
                                                   id="celResCtqzndo" label="Celular"
                                                   onChange={(e: any) => setStateTarget(e, setCelResCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField fullWidth={true}
                                                   value={emailCtqzndo}
                                                   id="emailCtqzndo" label="E-mail"
                                                   onChange={(e: any) => setStateTarget(e, setEmailCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField fullWidth={true}
                                                   value={paroquiBatismoCtqzndo}
                                                   id="paroquiBatismoCtqzndo"
                                                   label="Paróquia onde foi batizado"
                                                   onChange={(e: any) => setStateTarget(e, setParoquiBatismoCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth={true}
                                                   value={arquidioceseBatismo}
                                                   id="arqDioceseCtqzndo"
                                                   label="Arquidiocese/Diocese"
                                                   onChange={(e: any) => setStateTarget(e, setArquidioceseBatismo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth={true}
                                                   value={cidadeDioceseCtqzndo}
                                                   onChange={(e: any) => setStateTarget(e, setCidadeDioceseCtqzndo)}
                                                   id="cidadeDioceseCtqzndo" label="Cidade"/>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <TextField fullWidth={true} id="ufDioceseCtqzndo" label="UF"
                                                   value={ufDioceseCtqzndo}
                                                   onChange={(e: any) => setStateTarget(e, setUfDioceseCtqzndo)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField fullWidth={true} id="resideCom"
                                                   value={resideCom}
                                                   onChange={(e: any) => setStateTarget(e, setResideCom)}
                                                   label="Catequizando reside com:"/>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Container>
                        <Container maxWidth="lg">
                            <Grid container spacing={3} id="dadosCatequisando">
                                <Grid item xs={12} sm={6}>
                                    <DadosResponsavel id="gridMae" title="Dados da Mãe" labelNome="Nome da Mãe"
                                                      value={dadosMae}
                                                      setState={setDadosMae}>
                                    </DadosResponsavel>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DadosResponsavel id="gridPai" title="Dados do Pai" labelNome="Nome do Pai"
                                                      value={dadosPai}
                                                      setState={setDadosPai}>
                                    </DadosResponsavel>
                                </Grid>
                            </Grid>
                        </Container>
                        <Container maxWidth="lg">
                            <Grid container spacing={3} id="exibirDados">
                                <Grid item xs={12} sm={12}>
                                    <ExibirDadosCatequizando value={catequizando}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ExibirDadosResponsavel id="dadosMae" labelNome="Nome da Mãe"
                                                            title="Dados da Mãe" value={catequizando.dadosMae}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ExibirDadosResponsavel id="dadosPai" labelNome="Nome do Pai"
                                                            title="Dados do Pai" value={catequizando.dadosPai}/>
                                </Grid>
                            </Grid>
                        </Container>
                    </CustomizedSteppers>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel2a-content"
                                       id="panel2a-header"
                >
                    <Typography className={classes.heading}>Catequizandos Registrados</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TabelaCatequizandos onEditing={handleEditing}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}
