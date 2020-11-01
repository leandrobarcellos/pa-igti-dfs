import React, {useEffect} from "react";
import {Button, FormControl, Grid, TextField} from "@material-ui/core";
import {Field} from "../../components/core/Field";
import {FormProps} from "../../components/core/FormProps";
import {Turma} from "../../../../back-end/features/turma/Turma";
import {Etapa} from "../../../../back-end/core/dominio/etapa/Etapa";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";
import {AppStyle} from "../../components/core/AppStyle";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {InputSelect} from "../../components/inputs/AppInputs";
import {CatequistaPipe} from "../catequistas/CatequistaPipe";
import TransferList from "../../components/core/TransferList";
import {Catequizando} from "../../../../back-end/features/catequizando/Catequizando";
import {EtapaPipe} from "../../util/domain/EtapaPipe";

const etapas = [
    {
        "id": 1,
        "codigo": "PE",
        "nome": "Pré-Eucaristia"
    },
    {
        "id": 2,
        "codigo": "EU",
        "nome": "Eucaristia"
    },
    {
        "id": 3,
        "codigo": "PR",
        "nome": "Perseverança"
    },
    {
        "id": 4,
        "codigo": "CR",
        "nome": "Crisma"
    }
];
export default function FormTurma(props: FormProps<Turma>) {

    const classes = AppStyle.useStyles();
    const catequistaPipe = new CatequistaPipe();
    const etapaPipe = new EtapaPipe();
    const [catequistas, setCatequistas] = React.useState<Catequista[]>([]);
    const [id, setId] = React.useState(0);
    const [catequista, setCatequista] = React.useState({} as Catequista);
    const [catequizandos, setCatequizandos] = React.useState<Catequizando[]>([]);
    const [etapa, setEtapa] = React.useState({} as Etapa);
    const [idCatequista, setIdCatequista] = React.useState(0);
    const [idEtapa, setIdEtapa] = React.useState(0);
    const [inicio, setInicio] = React.useState<Date>(new Date());
    const [nome, setNome] = React.useState("");

    useEffect(() => {
        configurarForm(props.formData);
        return () => {
            catequistaPipe.unsubscribe();
        };
    }, []);

    const configurarForm = (t: Turma) => {

        setId(t && t.id? t.id : 0);
        setIdCatequista(t? t.idCatequista: 0);
        setIdEtapa(t? t.idEtapa: 0);
        setNome(t? t.nome: "");
        setCatequizandos(t? t.catequizandos : []);
        setInicio(t? t.inicio : new Date());
    }

    const turma: Turma = {
        id,
        catequista,
        catequizandos,
        etapa,
        idCatequista,
        idEtapa,
        inicio,
        nome
    }

    function handleCancelar() {
    }

    function handleSalvar() {
    }

    const changeEtapa = (e: any) => {
        Field.change(e, setIdEtapa);
        catequistaPipe.catequistasByIdEtapa.next({
            filter: idEtapa,
            callback: (next: Catequista[]) => {
                console.log(next);
                setCatequistas(next);
            }
        })
    }
    return (
        <Grid container spacing={3} id={props.id}>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id="nmTurma" label="Nome da Turma"
                           value={nome}
                           onChange={e => Field.change(e, setNome)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker fullWidth={true}
                                        id="dtNascimentoCtqzndo"
                                        label="Data de Início"
                                        format="dd/MM/yyyy"
                                        value={inicio}
                                        onChange={e => Field.change(e, setInicio)}
                                        KeyboardButtonProps={{'aria-label': 'change date'}}/>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Etapa</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={idEtapa}
                        onChange={e => changeEtapa(e)}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {etapas.map(e => (<MenuItem key={`${e.id}_key`} value={e.id}><em>{e.nome}</em></MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputSelect items={catequistas} toValue={c=> c.id} toLabel={c=> c.nome}
                             id="catequista" label="Catequista"
                             className={classes.formControl} selectClass={classes.selectClass}
                             value={idCatequista} set={setIdCatequista}></InputSelect>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TransferList></TransferList>
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
