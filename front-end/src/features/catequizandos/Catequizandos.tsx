import React, {useEffect, useState} from "react";
import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TabelaCatequizandos from "./TabelaCatequizandos";
import {CatequizandoPipe} from "./CatequizandoPipe";
import {AppStyle} from "../../components/core/AppStyle";
import FormCatequizando from "./FormCatequizando";
import {Subject} from "rxjs";
import {Catequizando} from "./catequizando";
import {Responsavel} from "../responsaveis/responsavel";
import {SessionUtil} from "../../components/core/session.util";


const steps = ['Dados do Catequizando', 'Dados dos Pais', 'Resumo'];
let catequizando: Catequizando;

const notificadorCatequizando = new Subject<Catequizando>();

notificadorCatequizando.subscribe((c: Catequizando) => {
    console.log("storageCatequizando: ", localStorage.getItem("catequizandos"));
    console.log("notificadorCatequizando", c);
    catequizando = c;
});

export default function Catequizandos(props: any) {

    const classes = AppStyle.useStyles();
    const catequizandoPipe = new CatequizandoPipe();
    const [showResults, setShowResults] = useState(false);
    const [catequizando, setCatequizando] = React.useState({} as Catequizando);
    const [rows, setRows] = React.useState([] as Catequizando[]);

    const doSetCatequizando = (c: Catequizando) => {
        console.log("doSetCatequizando", c);
        setCatequizando(c);
    }

    const carregarCatequizandosByUsuarioSessao = () => {
        const usr = SessionUtil.getUser();
        catequizandoPipe.findAllByUser.next({
            filter: {idUsuario: usr.id},
            callback: (value: Catequizando[]) => setRows(value)
        })
    };

    const carregarTodosCatequizandos = () => {
        catequizandoPipe.findAll.next({
            callback: (value: Catequizando[]) => setRows(value)
        })
    };

    const carregarCatequizandos = () => {
        if (SessionUtil.isAuthenticated()) {
            if (SessionUtil.isAdmin() || SessionUtil.isCatequista()) {
                carregarTodosCatequizandos();
            } else if (SessionUtil.isResponsavel()) {
                carregarCatequizandosByUsuarioSessao();
            }
        }
    };

    useEffect(() => {
        carregarCatequizandos();
    }, []);

    const handleChangeAccordion = (e: any) => {
        carregarCatequizandos();
        setShowResults(!showResults);
    }

    const handleEditing = (row: Catequizando) => {
        console.log("handleEditing", row);
        doSetCatequizando(row);
        setShowResults(false);
    }

    const onComplete = () => {
        carregarCatequizandos();
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
                    <FormCatequizando id="fmrCatequizando"
                                      formData={catequizando}
                                      saveAction={catequizandoPipe.save}
                                      updateAction={catequizandoPipe.update}
                                      onCancelar={onComplete}
                                      onSaveComplete={onComplete}
                                      onUpdateComplete={onComplete}
                                      notificador={notificadorCatequizando}
                                      sendData={c => doSetCatequizando(c)}>
                    </FormCatequizando>
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
                    <TabelaCatequizandos rows={rows}
                                         deleteAction={catequizandoPipe.remove}
                                         onDeleteComplete={onComplete}
                                         onEditing={handleEditing}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}
