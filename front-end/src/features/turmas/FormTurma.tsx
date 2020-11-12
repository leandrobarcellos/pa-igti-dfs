import React, {useEffect} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {Field} from "../../components/core/Field";
import {FormProps} from "../../components/core/FormProps";
import {AppStyle} from "../../components/core/AppStyle";
import {InputDate, InputSelect} from "../../components/inputs/AppInputs";
import {CatequistaPipe} from "../catequistas/CatequistaPipe";
import TransferList from "../../components/core/TransferList";
import {EtapaPipe} from "../../util/domain/EtapaPipe";
import {Turma} from "./turma";
import {Catequista} from "../catequistas/catequista";
import {Catequizando} from "../catequizandos/catequizando";
import {Etapa} from "../../../../back-end/src/features/dominios/etapa/etapa";
import {TurmasService} from "./TurmasService";

export default function FormTurma(props: FormProps<Turma>) {

    const classes = AppStyle.useStyles();
    const catequistaPipe = new CatequistaPipe();
    const etapaPipe = new EtapaPipe();
    const turmaService = new TurmasService();
    const [etapas, setEtapas] = React.useState<Etapa[]>([]);
    const [catequistas, setCatequistas] = React.useState<Catequista[]>([]);
    const [id, setId] = React.useState(0);
    const [catequista, setCatequista] = React.useState({} as Catequista);
    const [catequizandos, setCatequizandos] = React.useState<Catequizando[]>([]);
    const [etapa, setEtapa] = React.useState({} as Etapa);
    const [idCatequista, setIdCatequista] = React.useState(0);
    const [idEtapa, setIdEtapa] = React.useState(0);
    const [dataInicio, setDataInicio] = React.useState<Date>(new Date());
    const [nome, setNome] = React.useState("");

    useEffect(() => {
        configurarForm(props.formData);
    }, [props.formData]);

    useEffect(() => {
        console.log("useEffect: etapaPipe.findAll");
        configurarForm(props.formData);
        etapaPipe.findAll.next({
            callback: (value: Etapa[]) => {
                console.log("etapaPipe.findAll.next", value);
                setEtapas(value);
            }
        });
        return () => {
            catequistaPipe.unsubscribe();
            etapaPipe.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (idEtapa)
            catequistaPipe.catequistasByIdEtapa.next({
                filter: idEtapa,
                callback: (next: Catequista[]) => {
                    console.log(next);
                    setCatequistas(next);
                }
            });
    }, [idEtapa]);

    const configurarForm = (t: Turma) => {
        setId(t && t.id ? t.id : 0);
        setIdCatequista(t && t.idCatequista ? t.idCatequista : 0);
        setIdEtapa(t && t.idEtapa ? t.idEtapa : 0);
        setNome(t && t.nome ? t.nome : "");
        // setCatequista(t && t.catequista ? t.catequista : {} as Catequista);
        setCatequizandos(t && t.catequizandos ? t.catequizandos : []);
        setDataInicio(t && t.dataInicio ? t.dataInicio : new Date());
    }

    const turma: Turma = {
        id,
        catequista,
        catequizandos,
        etapa,
        idCatequista,
        idEtapa,
        dataInicio,
        nome
    }

    function handleCancelar() {
        props.onCancelar();
    }

    function handleSalvar() {
        turmaService.persist(turma);
    }

    const setDtinicio = (dtInicio: Date | null): void => {
        if (dtInicio)
            setDataInicio(dtInicio);
    };

    return (
        <Grid container spacing={3} id={props.id}>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id="nmTurma" label="Nome da Turma"
                           value={nome}
                           onChange={e => Field.change(e, setNome)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputDate id="dtNascimentoCtqzndo" label="Data de Início"
                           format="dd/MM/yyyy" value={dataInicio} set={setDtinicio}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputSelect id="selectEtapa" label="Etapa"
                             className={classes.formControl} selectClass={classes.selectClass}
                             items={etapas} toValue={(e: Etapa) => e.id} toLabel={(e: Etapa) => e.nome}
                             value={idEtapa} set={setIdEtapa}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputSelect items={catequistas} toValue={c => c.id} toLabel={c => c.nome}
                             id="catequista" label="Catequista"
                             className={classes.formControl} selectClass={classes.selectClass}
                             value={idCatequista} set={setIdCatequista}></InputSelect>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TransferList idEtapa={idEtapa} toLabel={(c: Catequizando) => c.nome}
                              set={setCatequizandos} preSelecao={catequizandos}></TransferList>
            </Grid>
            <Button variant="contained"
                    color="default"
                    onClick={handleCancelar}>
                Cancelar
            </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={handleSalvar}>
                Salvar
            </Button>
        </Grid>
    );
}
