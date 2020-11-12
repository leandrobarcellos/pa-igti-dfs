import React, {useEffect} from "react";
import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormTurma from "./FormTurma";
import {AppStyle} from "../../components/core/AppStyle";
import {TurmaPipe} from "./TurmaPipe";
import AppTable from "../../components/AppTable";
import {Turma} from "./turma";
import {TurmasService} from "./TurmasService";
import {AppUtil} from "../../components/core/AppUtil";
import {EditOutlined} from "@material-ui/icons";

export default function Turmas() {
    const classes = AppStyle.useStyles();
    const turmaService = new TurmasService();
    const [turma, setTurma] = React.useState({} as Turma);
    const [rows, setRows] = React.useState([] as Turma[]);
    const [toggle, setToggle] = React.useState(false);
    const turmaPipe = new TurmaPipe();

    const onComplete = () => {
        setTurma({} as Turma);
    }

    useEffect(()=> {
        turmaService.findAll()
            .subscribe(next=> setRows(next.data.object));
    },[]);

    const togglePanel = () => {
        setToggle(!toggle);
    }

    const handleEditar= (t: Turma)=> {
        setTurma(t);
        togglePanel();
    }

    const handleCancelar= ()=> {
        setTurma({} as Turma);
        togglePanel();
    }

    return (
        <Container maxWidth="lg" style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                Turmas
            </Typography>
            <ExpansionPanel expanded={!toggle}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header" onClick={togglePanel}>
                    <Typography className={classes.heading}>Formulário de cadastramento {AppUtil.getFormattedDate(new Date())}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormTurma id="fmrCatequizando"
                               formData={turma}
                               saveAction={turmaPipe.save}
                               updateAction={turmaPipe.update}
                               onCancelar={handleCancelar}
                               onSaveComplete={onComplete}
                               onUpdateComplete={onComplete}>
                    </FormTurma>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={toggle}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header" onClick={togglePanel}>
                    <Typography className={classes.heading}>Turmas Formadas</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <AppTable columns={[
                        {label: "Nome", attribute: "nome"},
                        {label: "Inicio", attribute: "dataInicio"},
                        {label: "Catequista", attribute: "catequista.nome"},
                        {label: "Etapa", attribute: "etapa.nome"}
                    ]} actions={[
                        {label: "Editar", icon:  (<EditOutlined/>) ,call: (c: Turma) => handleEditar(c)}
                    ]}  dataSource={rows}></AppTable>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}
