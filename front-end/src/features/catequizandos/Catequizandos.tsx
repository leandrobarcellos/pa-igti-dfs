import React, {useEffect, useState} from "react";
import {
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography
} from "@material-ui/core";
import {FormResponsavel} from "../responsaveis/FormResponsavel";
import CustomizedSteppers from "../../components/Stepper";
import ExibirDadosCatequizando from "./ExibirDadosCatequizando";
import ExibirDadosResponsavel from "./ExibirDadosResponsavel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TabelaCatequizandos from "./TabelaCatequizandos";
import {CatequizandoPipe} from "./CatequizandoPipe";
import {AppStyle} from "../../components/core/AppStyle";
import FormCatequizando from "./FormCatequizando";
import {Subject} from "rxjs";
import {ResponsavelPipe} from "../responsaveis/ResponsavelPipe";
import {Catequizando} from "./catequizando";
import {Responsavel} from "../responsaveis/responsavel";


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
    const responsavelPipe = new ResponsavelPipe();
    const [showResults, setShowResults] = useState(false);
    const [dadosMae, setDadosMae] = React.useState({} as Responsavel);
    const [dadosPai, setDadosPai] = React.useState({} as Responsavel);
    const [rows, setRows] = React.useState([] as Catequizando[]);

    const doSetCatequizando = (c: Catequizando) => {
        console.log(c);
        catequizando = c;
    }

    const onNavigate = {
        // 0: {set: (flg: boolean) => notificadorCatequizando.next(flg)},
        // 1: {set: (flg: boolean) => notificadorResponsavel.next(flg)},
    } as any;

    useEffect(() => {
        catequizandoPipe.findAll.next({
            callback: (value: Catequizando[]) => setRows(value)
        })
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

    const onPrevious = (step: number) => {
        // onNavigate[step].set({touch: true});
    };

    const getFormattedDate = (dtNascimentoCtqzndo: any) => {
        if (dtNascimentoCtqzndo?.toLocaleDateString)
            return dtNascimentoCtqzndo?.toLocaleDateString();
        return "";
    };

    const handleSubmit = (e: any) => {
        if (catequizando.id && catequizando.id > 0) {
            catequizandoPipe.update.next({
                formData: catequizando
            });
        } else {
            catequizandoPipe.save.next({
                formData: catequizando
            });
        }
    };

    const handleReset = (e: any) => {
        // configurarForm(null);
    };

    const handleChangeAccordion = (e: any) => {
        setShowResults(!showResults);
    }

    const handleEditing = (row: Catequizando) => {
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
                    <CustomizedSteppers onNext={onNext} onPrevious={onPrevious} steps={steps}
                                        onFinish={handleSubmit} onReset={handleReset}>
                        <Container maxWidth="lg">
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
                        </Container>
                        <Container maxWidth="lg">
                            <Grid container spacing={3} id="dadosCatequisando">
                                <Grid item xs={12} sm={6}>
                                    <Container id={props.id} style={{marginTop: "25px"}}>
                                        <Typography variant="h5" component="h5">
                                            {"Dados da Mãe"}
                                        </Typography>
                                        <FormResponsavel id="gridMae" title="Dados da Mãe" labelNome="Nome da Mãe"
                                                         formData={dadosMae}
                                                         saveAction={responsavelPipe.save}
                                                         updateAction={responsavelPipe.update}
                                                         onCancelar={() => onCompleteResponsavel("dadosMae")}
                                                         onSaveComplete={() => onCompleteResponsavel("dadosMae")}
                                                         onUpdateComplete={() => onCompleteResponsavel("dadosMae")}
                                                         setState={setDadosMae}>
                                        </FormResponsavel>
                                    </Container>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Container id={props.id} style={{marginTop: "25px"}}>
                                        <Typography variant="h5" component="h5">
                                            {"Dados do Pai"}
                                        </Typography>
                                        <FormResponsavel id="gridPai" title="Dados do Pai" labelNome="Nome do Pai"
                                                         formData={dadosPai}
                                                         saveAction={responsavelPipe.save}
                                                         updateAction={responsavelPipe.update}
                                                         onCancelar={() => onCompleteResponsavel("dadosPai")}
                                                         onSaveComplete={() => onCompleteResponsavel("dadosPai")}
                                                         onUpdateComplete={() => onCompleteResponsavel("dadosPai")}
                                                         setState={setDadosPai}>
                                        </FormResponsavel>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Container>
                        <Container maxWidth="lg">
                            <Grid container spacing={3} id="exibirDados">
                                <Grid item xs={12} sm={12}>
                                    <ExibirDadosCatequizando value={catequizando}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ExibirDadosResponsavel id="dadosMae" labelNome="Nome da Mãe"
                                                            title="Dados da Mãe" value={dadosMae}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ExibirDadosResponsavel id="dadosPai" labelNome="Nome do Pai"
                                                            title="Dados do Pai" value={dadosPai}/>
                                </Grid>
                            </Grid>
                        </Container>
                    </CustomizedSteppers>
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
