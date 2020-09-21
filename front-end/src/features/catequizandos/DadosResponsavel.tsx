import {Container, Grid, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";


export interface Responsavel {
    nome: string,
    endereco: string,
    cep: string,
    telResidencial: string,
    celResidencial: string,
    email: string,
    religiao: string,
    praticante: string
}

interface DadosResponsavelProps {
    id: string,
    title: string,
    labelNome: string,
    setState: (e: any) => void,
    value: Responsavel | null;
    children?: any,
}

export function DadosResponsavel(props: DadosResponsavelProps) {

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [telResidencial, setTelResidencial] = useState("");
    const [celResidencial, setCelResidencial] = useState("");
    const [email, setEmail] = useState("");
    const [religiao, setReligiao] = useState("");
    const [praticante, setPraticante] = useState("");

    const responsavel = {
        id,
        nome,
        endereco,
        cep,
        telResidencial,
        celResidencial,
        email,
        religiao,
        praticante
    };

    const configurarForm = (r: Responsavel | null) => {
        setNome(r ? r.nome : "");
        setCelResidencial(r ? r.celResidencial : "");
        setCep(r ? r.cep : "");
        setEmail(r ? r.email : "");
        setEndereco(r ? r.endereco : "");
        setPraticante(r ? r.praticante : "");
        setReligiao(r ? r.religiao : "");
        setTelResidencial(r ? r.telResidencial : "");
    };

    useEffect(() => {
        if (props.value)
            configurarForm(props.value)
    });

    const getTextValue = (e: any) => {
        return e?.target ? e.target.value : "";
    }

    const setNomeFromTarget = (e: any) => {
        setNome(getTextValue(e));
        props.setState(responsavel);
    };

    const setEnderecoFromTarget = (e: any) => {
        setEndereco(getTextValue(e));
        props.setState(responsavel);
    };

    const setCepFromTarget = (e: any) => {
        setCep(getTextValue(e));
        props.setState(responsavel);
    };

    const setTelResidencialFromTarget = (e: any) => {
        setTelResidencial(getTextValue(e));
        props.setState(responsavel);
    };

    const setCelResidencialFromTarget = (e: any) => {
        setCelResidencial(getTextValue(e));
        props.setState(responsavel);
    };

    const setEmailFromTarget = (e: any) => {
        setEmail(getTextValue(e));
        props.setState(responsavel);
    };

    const setReligiaoFromTarget = (e: any) => {
        setReligiao(getTextValue(e));
        props.setState(responsavel);
    };

    const setPraticanteFromTarget = (e: any) => {
        setPraticante(getTextValue(e));
        props.setState(responsavel);
    };

    return (
        <Container id={props.id} style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                {props.title}
            </Typography>
            <Grid container spacing={3} id={props.id}>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth={true} id={props.id + "Nome"} label={props.labelNome}
                               value={nome}
                               onChange={setNomeFromTarget}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField fullWidth={true} id={props.id + "Endereco"} label="Endereço"
                               value={endereco}
                               onChange={setEnderecoFromTarget}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth={true} id={props.id + "Cep"} label="CEP"
                               value={cep}
                               onChange={setCepFromTarget}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true} id={props.id + "TelRes"}
                               label="Telefone Residencial"
                               value={telResidencial}
                               onChange={setTelResidencialFromTarget}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true} id={props.id + "CelRes"} label="Celular"
                               value={celResidencial}
                               onChange={setCelResidencialFromTarget}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth={true} id={props.id + "Email"} label="E-mail"
                               value={email}
                               onChange={setEmailFromTarget}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true} id={props.id + "Religiao"} label="Religião"
                               value={religiao}
                               onChange={setReligiaoFromTarget}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true} id={props.id + "Praticante"} label="Praticante"
                               value={praticante}
                               onChange={setPraticanteFromTarget}/>
                </Grid>
            </Grid>
        </Container>
    );
}