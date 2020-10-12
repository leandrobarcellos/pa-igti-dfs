import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {FormResponsavel} from "./FormResponsavel";
import {ResponsavelPipe} from "./ResponsavelPipe";
import {Responsavel} from "../../../../back-end/features/responsavel/Responsavel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {AppStyle} from "../../components/core/AppStyle";
import {FormCatequista} from "../catequistas/FormCatequista";
import TabelaCatequistas from "../catequistas/TabelaCatequistas";


export default function Responsaveis() {

    const responsavelPipe = new ResponsavelPipe();
    const [responsavel, setResponsavel] = React.useState({} as Responsavel);
    const classes = AppStyle.classes();

    useEffect(() => {
        let item = localStorage.getItem("emailUsuario");
        if (item)
            responsavelPipe.findByEmail.next({
                filter: item,
                callback: r => setResponsavel(r)
            });
    });
    const onComplete = () => {

    }


    return (
        <Container maxWidth="lg" style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                Responsável pelo Catequizando
            </Typography>
            <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Formulário de cadastramento</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormResponsavel title="Responsavel" labelNome="Nome do Responsável"
                                     id="frmResponsavel"
                                     formData={responsavel}
                                     saveAction={responsavelPipe.save}
                                     updateAction={responsavelPipe.update}
                                     onCancelar={onComplete}
                                     onSaveComplete={onComplete}
                                     onUpdateComplete={onComplete}></FormResponsavel>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}