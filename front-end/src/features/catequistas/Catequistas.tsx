import React, {useEffect, useState} from "react";
import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TabelaCatequistas from "./TabelaCatequistas";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";
import {FormCatequista} from "./FormCatequista";
import {CatequistaPipe} from "./CatequistaPipe";
import {AppStyle} from "../../components/core/AppStyle";




export default function Catequistas() {

    const classes = AppStyle.classes();
    const catequistaPipe = new CatequistaPipe();
    const [catequista, setCatequista] = React.useState<Catequista>({} as Catequista);
    const [showResults, setShowResults] = useState(false);
    const [rows, setRows] = React.useState<Catequista[]>([]);

    useEffect(() => {
            reloadListaCatequistas();
            return () => {
                catequistaPipe.unsubscribe();
            };
        }
        , [catequista]
    );

    const handleEditing = (entity: any) => {
        console.log(entity);
        setCatequista(entity);
        setShowResults(false);
    }

    const reloadListaCatequistas = (showResults?: boolean) => {
        catequistaPipe.findAll.next({
            callback: (catequistas: Catequista[]) => {
                console.log("acabei de atualizar os catequistas: ", catequistas);
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