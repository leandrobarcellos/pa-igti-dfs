import React, {useEffect, useState} from "react";
import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FormCatequista} from "./FormCatequista";
import {CatequistaPipe} from "./CatequistaPipe";
import {AppStyle} from "../../components/core/AppStyle";
import {combineLatest, forkJoin, Observable, of, Subject} from "rxjs";
import {concat, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {FormAction} from "../../components/core/FormAction";
import TabelaCatequistas from "./TabelaCatequistas";
import {flatMap} from "rxjs/internal/operators";
import {Catequista} from "./catequista";


export default function Catequistas() {

    const classes = AppStyle.useStyles();
    const catequistaPipe = new CatequistaPipe();
    const [catequista, setCatequista] = React.useState<Catequista>({} as Catequista);
    const [showResults, setShowResults] = useState(false);
    const [rows, setRows] = React.useState<Catequista[]>([]);
    const updatePipe = new Subject<FormAction<Catequista>>();
    const removePipe = new Subject<FormAction<Catequista>>();

    useEffect(() => {
        registerInsert();
        registerUpdate();
        registerRemove();
    }, []);

    useEffect(() => {
            reloadListaCatequistas();
            return () => {
                catequistaPipe.unsubscribe();
            };
        }
        , [catequista]
    );

    const registerInsert = () => {
        console.log("registerInsert");
        let subject = new Subject<string>();
        subject.pipe(
            map(str => str.split(" ")),
            tap(str=> console.log(str)),
        ).subscribe();
    }


    const registerUpdate = () => {
        updatePipe.pipe(
            switchMap(formAction => catequistaPipe.update.pipe(
                tap(() => reloadListaCatequistas(true)),
                tap(() => {
                    if (formAction.actionCompleted) formAction.actionCompleted()
                })
            ))
        ).subscribe();
    }

    const registerRemove = () => {
        removePipe.pipe(
            switchMap(formAction => catequistaPipe.remove.pipe(
                tap(() => reloadListaCatequistas(true)),
                tap(() => {
                    if (formAction.actionCompleted) formAction.actionCompleted()
                })
            ))
        ).subscribe()
    }

    const handleEditing = (entity: Catequista) => {
        console.log(entity);
        setCatequista(entity);
        setShowResults(false);
    }

    const reloadListaCatequistas = (showResults?: boolean) => {
        catequistaPipe.findAll.next({
            callback: (catequistas: Catequista[]) => {
                console.log("acabei de atualizar os catequista: ", catequistas);
                setRows(catequistas);
                setShowResults(showResults ? true : false);
            }
        });
        ;
    }

    const onComplete = () => {
        reloadListaCatequistas(true);
    }

    const handleChangeAccordion = () => {
        setShowResults(!showResults);
    }

    return (
        <Container id="12" style={{marginTop: "25px"}}>
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
                    <FormCatequista id="form" formData={catequista}
                                    saveAction={catequistaPipe.save}
                                    updateAction={catequistaPipe.update}
                                    onSaveComplete={onComplete}
                                    onUpdateComplete={onComplete}
                                    onCancelar={onComplete}
                    ></FormCatequista>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel2a-content"
                                       id="panel2a-header">
                    <Typography className={classes.heading}>Catequistas Registrados</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TabelaCatequistas onEditing={handleEditing}
                                       deleteAction={catequistaPipe.remove}
                                       rows={rows}
                                       onDeleteComplete={onComplete}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}