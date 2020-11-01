import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {FormResponsavel} from "./FormResponsavel";
import {ResponsavelPipe} from "./ResponsavelPipe";
import {Responsavel} from "../../../../back-end/features/responsavel/Responsavel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {AppStyle} from "../../components/core/AppStyle";
import AppTable from "../../components/AppTable";
import PeopleIcon from '@material-ui/icons/People';


export default function Responsaveis() {
    const classes = AppStyle.useStyles();
    const responsavelPipe = new ResponsavelPipe();
    const [responsavel, setResponsavel] = React.useState({} as Responsavel);
    const [showResults, setShowResults] = React.useState(false);
    const [rows, setRows] = React.useState<Responsavel[]>([]);

    useEffect(() => {
        let item = localStorage.getItem("emailUsuario");
        if (item)
            responsavelPipe.findByEmail.next({
                filter: item,
                callback: r => setResponsavel(r)
            });
        responsavelPipe.findAll.next({
            callback: (n: Responsavel[]) => setRows(n)
        })
    });

    const onComplete = () => {

    }

    const handleChangeAccordion = () => {
        setShowResults(!showResults);
    }


    return (
        <Container maxWidth="lg" style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                Responsável pelo Catequizando
            </Typography>
            <ExpansionPanel expanded={!showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
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

            <ExpansionPanel expanded={showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Responsáveis registrados</Typography>
                </ExpansionPanelSummary>
                {/*nome: string,*/}
                {/*endereco: string,*/}
                {/*cep: string,*/}
                {/*telefoneFixo: string,*/}
                {/*telefoneMovel: string,*/}
                {/*email: string,*/}
                {/*religiao: string,*/}
                {/*praticante: 'S' | 'N'*/}
                <ExpansionPanelDetails>
                    <AppTable columns={[
                        {label: "Nome", attribute: "nome"},
                        {label: "Residência", attribute: "endereco"},
                        {label: "E-mail", attribute: "email"},
                        {label: "Telefone Celular", attribute: "telefoneMovel"},
                    ]}
                              actions={[
                                  {label: "teste", icon: (<PeopleIcon/>), call: row => console.log(row)}
                              ]}
                              dataSource={rows}></AppTable>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}