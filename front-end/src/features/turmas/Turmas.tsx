import React from "react";
import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormTurma from "./FormTurma";
import {AppStyle} from "../../components/core/AppStyle";
import {Turma} from "../../../../back-end/features/turma/Turma";
import {TurmaPipe} from "./TurmaPipe";

export default function Turmas() {
    const classes = AppStyle.classes();
    const [turma, setTurma] = React.useState({} as Turma);
    const turmaPipe = new TurmaPipe();
    const onComplete = () => {

    }
    return (
        <Container maxWidth="lg" style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                Turmas
            </Typography>
            <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Formulário de cadastramento</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormTurma id="fmrCatequizando"
                               formData={turma}
                               saveAction={turmaPipe.save}
                               updateAction={turmaPipe.update}
                               onCancelar={onComplete}
                               onSaveComplete={onComplete}
                               onUpdateComplete={onComplete}>
                    </FormTurma>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}
