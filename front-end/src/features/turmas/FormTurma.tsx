import React from "react";
import {FormControl, Grid, TextField} from "@material-ui/core";
import {Field} from "../../components/core/Field";
import {FormProps} from "../../components/core/FormProps";
import {Turma} from "../../../../back-end/features/turma/Turma";
import {Etapa} from "../../../../back-end/core/dominio/etapa/Etapa";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";
import {AppStyle} from "../../components/core/AppStyle";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TransferList from "../../components/core/TransferList";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

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

    const classes = AppStyle.classes();
    const [id, setId] = React.useState(0);
    const [catequista, setCatequista] = React.useState({} as Catequista);
    const [catequizandos, setCatequizandos] = React.useState([]);
    const [etapa, setEtapa] = React.useState({} as Etapa);
    const [idCatequista, setIdCatequista] = React.useState(0);
    const [idEtapa, setIdEtapa] = React.useState(0);
    const [inicio, setInicio] = React.useState<Date>(new Date());
    const [nome, setNome] = React.useState("");

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
                        onChange={e=> Field.change(e, setIdEtapa)}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {etapas.map(e=> (<MenuItem value={e.id}><em>{e.nome}</em></MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Catequista</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={idEtapa}
                        onChange={e=> Field.change(e, setIdCatequista)}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>
                            <em>Um catequista</em>
                        </MenuItem>
                        <MenuItem value={2}>
                            <em>Outro catequista</em>
                        </MenuItem>
                        <MenuItem value={3}>
                            <em>Mais um catequista</em>
                        </MenuItem>
                    </Select>
                </FormControl>
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
