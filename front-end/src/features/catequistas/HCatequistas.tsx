import React, {useState} from "react";
import CatequistasService from "./CatequistasService";
import {
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FaceIcon from '@material-ui/icons/Face';
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TabelaCatequistas from "./TabelaCatequistas";
import Chip from "@material-ui/core/Chip";


export default function HCatequistas(props: any) {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: '100%',
            },
            button: {
                marginRight: theme.spacing(1),
                marginTop: 15
            },
            instructions: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
        }),
    );
    const classes = useStyles();
    const service: CatequistasService = new CatequistasService();
    let rows: any[] = [];
    const [showResults, setShowResults] = useState(false);
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [telResidencial, setTelResidencial] = useState('');
    const [celResidencial, setCelResidencial] = useState('');
    const [email, setEmail] = useState('');
    const [casado, setCasado] = useState('');

    const catequista = {
        id,
        nome,
        sobrenome,
        casado,
        telResidencial,
        celResidencial,
        email,
        endereco: {
            cidade,
            cep,
            logradouro,
            numero
        }
    };

    const handleChangeNome = (evt: any) => {
        setNome(evt.target.value);
    }

    const handleChangeSobrenome = (evt: any) => {
        setSobrenome(evt.target.value);
    }
    const handleChangeCidade = (evt: any) => {
        setCidade(evt.target.value);
    }
    const handleChangeCep = (evt: any) => {
        setCep(evt.target.value);
    }
    const handleChangeLogradouro = (evt: any) => {
        setLogradouro(evt.target.value);
    }

    const handleChangeNumero = (evt: any) => {
        setNumero(evt.target.value);
    }

    const handleSalvar = (evt: any) => {
        if (catequista.id) {
            service.merge(catequista).then(next => {

            })
        } else {
            service.persist(catequista).then(next => {
                console.log(next.message);
                console.log(next.object.nome);
                console.log(next);
            }).catch(error => console.log(error));
        }

    }

    const handleChangeCheck = (evt: any) => {

    }

    const setValues = (entity: any) => {
        setId(entity ? entity.id : "");
        setNome(entity ? entity.nome : "");
        setSobrenome(entity ? entity.sobrenome : "");
        setCasado(entity ? entity.casado : "");
        setTelResidencial(entity ? entity.telResidencial : "");
        setCelResidencial(entity ? entity.celResidencial : "");
        setEmail(entity ? entity.email : "");
        setCidade(entity ? entity.endereco?.cidade : "");
        setCep(entity ? entity.endereco?.cep : "");
        setLogradouro(entity ? entity.endereco?.logradouro : "");
        setNumero(entity ? entity?.endereco?.numero : "");
    };

    const handleEditing = (entity: any) => {
        setValues(entity);
        setShowResults(false);
    }

    const reloadListaCatequistas = (evt: any) => {
        console.log("reloadListaCatequistas");
        service.findAll().then(resolve => {
            rows = resolve.object;
        });
    }

    const handleChangeAccordion = () => {
        setShowResults(!showResults);
    }

    const getRows = () => {
        return rows;
    }

    const handleCancelar = (e: any) => {
        setValues(null);
        setShowResults(true);
    }

    return (

        <Container id={props.id} style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                Catequista
            </Typography>
            <ExpansionPanel expanded={!showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Formulário de cadastramento</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3} id={props.id}>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id={props.id + "Nome"} label="Nome"
                                       value={nome}
                                       onChange={(e) => setNome(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="endereco" label="Endereço"
                                       value={logradouro}
                                       onChange={(e) => setLogradouro(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cep" label="CEP"
                                       value={cep}
                                       onChange={(e) => setCep(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="telRes"
                                       label="Telefone Residencial"
                                       value={telResidencial}
                                       onChange={(e) => setTelResidencial(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="celRes" label="Celular"
                                       value={celResidencial}
                                       onChange={(e) => setCelResidencial(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="email" label="E-mail"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                        </Grid>
                        <Button variant="contained"
                                color="default"
                                onClick={handleCancelar}
                                className={classes.button}>
                            Cancelar
                        </Button>
                        <Button variant="contained"
                                color="primary"
                                onClick={handleSalvar}
                                className={classes.button}>
                            Salvar
                        </Button>
                    </Grid>

                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel2a-content"
                                       id="panel2a-header"
                >
                    <Typography className={classes.heading}>Catequistas Registrados</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TabelaCatequistas onEditing={handleEditing}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>

    );
}