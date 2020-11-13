import {Container, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {FormResponsavel} from "./FormResponsavel";
import {ResponsavelPipe} from "./ResponsavelPipe";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {AppStyle} from "../../components/core/AppStyle";
import AppTable from "../../components/AppTable";
import PeopleIcon from '@material-ui/icons/People';
import {Responsavel} from "./responsavel";
import {SessionUtil} from "../../components/core/session.util";


export default function Responsaveis() {
    const history = useHistory();
    const classes = AppStyle.useStyles();
    const responsavelPipe = new ResponsavelPipe();
    const [responsavel, setResponsavel] = React.useState({} as Responsavel);
    const [showResults, setShowResults] = React.useState(false);
    const [rows, setRows] = React.useState<Responsavel[]>([]);

    const carregarResponsaveis = () => {
        let user = SessionUtil.getUser();
        if (user) {
            if (user.roles && (user.roles.includes("CATEQUISTA") || user.roles.includes("ADMIN"))) {
                responsavelPipe.findAll.next({
                    callback: (n: Responsavel[]) => {
                        console.log("responsavelPipe.findAll.next", n);
                        setRows(n);
                    }
                });
            } else {
                responsavelPipe.findAllByIdUsuario.next({
                    filter: {idUsuario: user.id},
                    callback: (n: Responsavel[]) => {
                        console.log("responsavelPipe.findAllByIdUsuario.next", n);
                        setRows(n);
                    }
                });
            }
        } else {
            history.push('/');
        }
    };

    useEffect(() => {
        carregarResponsaveis();
    }, []);


    const onComplete = () => {
        carregarResponsaveis();
    }

    const handleChangeAccordion = () => {
        carregarResponsaveis();
        if (SessionUtil.isAuthenticated())
            setShowResults(!showResults);
    }


    return (
        <Container maxWidth="lg" style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                {SessionUtil.isAuthenticated() ? 'Responsável pelo Catequizando' : 'Novo registro'}
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

            {SessionUtil.isAuthenticated() ? (<ExpansionPanel expanded={showResults}>
                <ExpansionPanelSummary onClick={handleChangeAccordion}
                                       expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header">
                    <Typography className={classes.heading}>Responsáveis registrados</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <AppTable columns={[
                        {label: "Nome", attribute: "nome"},
                        {label: "Parentesco", attribute: "parentesco"},
                        {label: "Residência", attribute: "endereco"},
                        {label: "E-mail", attribute: "email"},
                        {label: "Telefone Celular", attribute: "telefoneMovel"}]}
                              actions={[
                                  {label: "teste", icon: (<PeopleIcon/>), call: row => console.log(row)}
                              ]}
                              dataSource={rows}></AppTable>
                </ExpansionPanelDetails>
            </ExpansionPanel>) : (<></>)}
        </Container>
    );
}
