import {Grid, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Responsavel} from "../../../../back-end/features/responsavel/Responsavel";
import {Field} from "../../components/core/Field";
import {FormProps} from "../../components/core/FormProps";
import Button from "@material-ui/core/Button";

interface DadosResponsavelProps extends FormProps<Responsavel> {
    title?: string,
    labelNome?: string,
    setState?: (e: any) => void,
    children?: any,
}

export function FormResponsavel(props: DadosResponsavelProps) {
    let r = props.formData;
    const [id, setId] = useState(r ? r.id : 0);
    const [nome, setNome] = useState(r ? r.nome : "");
    const [endereco, setEndereco] = useState(r ? r.endereco : "");
    const [cep, setCep] = useState(r ? r.cep : "");
    const [telefoneFixo, setTelefoneFixo] = useState(r ? r.telefoneFixo : "");
    const [telefoneMovel, setTelefoneMovel] = useState(r ? r.telefoneMovel : "");
    const [email, setEmail] = useState(r ? r.email : "");
    const [religiao, setReligiao] = useState(r ? r.religiao : "");
    const [praticante, setPraticante] = useState(r ? r.praticante : "");

    const responsavel = {
        id,
        nome,
        endereco,
        cep,
        telefoneFixo,
        telefoneMovel,
        email,
        religiao,
        praticante
    };

    const configurarForm = (r: Responsavel | null) => {
        setId(r ? r.id : 0);
        setNome(r ? r.nome : "");
        setTelefoneFixo(r ? r.telefoneFixo : "");
        setCep(r ? r.cep : "");
        setEmail(r ? r.email : "");
        setEndereco(r ? r.endereco : "");
        setPraticante(r ? r.praticante : "");
        setReligiao(r ? r.religiao : "");
        setTelefoneFixo(r ? r.telefoneFixo : "");
    };

    useEffect(() => {
        if (r)
            configurarForm(r)
    });


    function handleCancelar() {
    }

    function handleSalvar() {
    }

    return (

        <Grid container spacing={3} id={props.id}>
            <Grid item xs={12} sm={12}>
                <TextField fullWidth={true} id={props.id + "Nome"} label={props.labelNome}
                           value={nome}
                           onChange={e => Field.change(e, setNome)}/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <TextField fullWidth={true} id={props.id + "Endereco"} label="Endereço"
                           value={endereco}
                           onChange={e => Field.change(e, setEndereco)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField fullWidth={true} id={props.id + "Cep"} label="CEP"
                           value={cep}
                           onChange={e => Field.change(e, setCep)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id={props.id + "TelRes"}
                           label="Telefone Residencial"
                           value={telefoneFixo}
                           onChange={e => Field.change(e, setTelefoneFixo)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id={props.id + "CelRes"} label="Celular"
                           value={telefoneMovel}
                           onChange={e => Field.change(e, setTelefoneMovel)}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField fullWidth={true} id={props.id + "Email"} label="E-mail"
                           value={email}
                           onChange={e => Field.change(e, setEmail)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id={props.id + "Religiao"} label="Religião"
                           value={religiao}
                           onChange={e => Field.change(e, setReligiao)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id={props.id + "Praticante"} label="Praticante"
                           value={praticante}
                           onChange={e => Field.change(e, setPraticante)}/>
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