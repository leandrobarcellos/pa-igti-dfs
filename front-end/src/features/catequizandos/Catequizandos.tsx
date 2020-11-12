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

    const notificadorDadosPai = new Subject<Responsavel>();
    const notificadorDadosMae = new Subject<Responsavel>();

    const classes = AppStyle.useStyles();
    const catequizandoPipe = new CatequizandoPipe();
    const [showResults, setShowResults] = useState(false);
    const [dadosMae, setDadosMae] = React.useState({} as Responsavel);
    const [dadosPai, setDadosPai] = React.useState({} as Responsavel);
    const [rows, setRows] = React.useState([] as Catequizando[]);

    const doSetCatequizando = (c: Catequizando) => {
        console.log("doSetCatequizando", c);
        catequizando = c;
    }

    useEffect(() => {
        if (SessionUtil.isAuthenticated()) {
            if (SessionUtil.isAdmin() || SessionUtil.isCatequista()) {
                catequizandoPipe.findAll.next({
                    callback: (value: Catequizando[]) => setRows(value)
                })
            } else if (SessionUtil.isResponsavel()) {
                const usr = SessionUtil.getUser();
                catequizandoPipe.findAllByUser.next({
                    filter: {idUsuario: usr.id},
                    callback: (value: Catequizando[]) => setRows(value)
                })
            }
        }
    }, []);

    useEffect(() => {
        notificadorDadosMae.subscribe((dadosMae: Responsavel) => {
            setDadosMae(dadosMae);
        });
        notificadorDadosPai.subscribe((dadosPai: Responsavel) => {
            setDadosPai(dadosPai);
        });
        return () => {
            catequizandoPipe.unsubscribe();
        };
    }, []);

    const onNext = (step: number) => {
        console.log(catequizando);
        console.log("storage", localStorage.getItem("catequizandos"));
        // onNavigate[step].set({touch: true});
    };

    const handleChangeAccordion = (e: any) => {
        setShowResults(!showResults);
    }

    const handleEditing = (row: Catequizando) => {
        console.log("handleEditing", row);
        doSetCatequizando(row);
        setShowResults(false);

    }

    const onComplete = () => {

    }

    const onCompleteResponsavel = (tipoResponsavel: "dadosPai" | "dadosMae") => {
        if (tipoResponsavel === "dadosPai")
            setDadosPai({} as Responsavel);
        if (tipoResponsavel === "dadosMae")
            setDadosMae({} as Responsavel);
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
