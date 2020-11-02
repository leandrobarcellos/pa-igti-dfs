import {Container, Grid, TextField, Typography} from "@material-ui/core";
import {Field} from "../../components/core/Field";
import React, {useEffect, useState} from "react";
import {FormProps} from "../../components/core/FormProps";
import {AppStyle} from "../../components/core/AppStyle";
import {Subject} from "rxjs";
import {InputDate, InputEmail, InputSelect, InputText} from "../../components/inputs/AppInputs";
import {Catequizando} from "./catequizando";
import {Responsavel} from "../responsaveis/responsavel";

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

interface FormCatequizandosProps extends FormProps<Catequizando> {
    children: any,
    notificador: Subject<Catequizando>,
    sendData: (catequizando: Catequizando) => void
}

export default function FormCatequizando(props: FormCatequizandosProps) {
    const classes = AppStyle.useStyles();
    // let c = props.formData;

    const setCatequizando = (c:any) => {
        c = getFormData();
        props.notificador.next(c);
        let strCatequizando = JSON.stringify(c);
        let item = localStorage.getItem("catequizandos");
        if (item) {
            localStorage.removeItem("catequizandos");
            localStorage.setItem("catequizandos", strCatequizando);
        } else {
            localStorage.setItem("catequizandos", strCatequizando);
        }
    }

    let configurarForm =  (c: Catequizando) => {
        setId(c ? c.id : 0);
        setIdEtapa(c ? c.idEtapa : 0);
        setIdPai(c ? c.idPai : 0);
        setIdMae(c ? c.idMae : 0);
        setCidadeNascimento(c ? c.cidadeNascimento : "");
        setDtNascimento(c ? c.dtNascimento : null);
        setEndereco(c ? c.endereco : "");
        setCep(c ? c.cep : "");
        setTelefoneFixo(c ? c.telefoneFixo : "");
        setTelefoneMovel(c ? c.telefoneMovel : "");
        setEmail(c ? c.email : "");
        setParoquiaBatismo(c ? c.paroquiaBatismo : "");
        setArquidioceseBatismo(c ? c.arquidioceseBatismo : "");
        setUfDioceseBatismo(c ? c.ufDioceseBatismo : "");
        setCidadeNascimento(c ? c.cidadeNascimento : "");
        setResideCom(c ? c.resideCom : "");
        setDadosPai(c ? c.dadosPai : {} as Responsavel);
        setDadosMae(c ? c.dadosMae : {} as Responsavel);
    };

    useEffect(() => {
        configurarForm(props.formData);
        return () => {
        };
    }, [props.formData]);

    const [showResults, setShowResults] = useState(false);
    const [id, setId] = useState<number | unknown>(0);
    const [idPai, setIdPai] = React.useState<number | unknown>(0);
    const [idMae, setIdMae] = React.useState<number | unknown>(0);
    const [nome, setNome] = React.useState("");
    const [idEtapa, setIdEtapa] = React.useState(0);
    const [cidadeNascimento, setCidadeNascimento] = React.useState("");
    const [dtNascimento, setDtNascimento] = React.useState<Date | null>(null);
    const [endereco, setEndereco] = React.useState("");
    const [cep, setCep] = React.useState("");
    const [telefoneFixo, setTelefoneFixo] = React.useState("");
    const [telefoneMovel, setTelefoneMovel] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [paroquiaBatismo, setParoquiaBatismo] = React.useState("");
    const [arquidioceseBatismo, setArquidioceseBatismo] = React.useState("");
    const [cidadeDioceseBatismo, setCidadeDioceseBatismo] = React.useState("");
    const [ufDioceseBatismo, setUfDioceseBatismo] = React.useState("");
    const [resideCom, setResideCom] = React.useState("");
    const [dadosMae, setDadosMae] = React.useState<Responsavel | unknown>({} as Responsavel);
    const [dadosPai, setDadosPai] = React.useState<Responsavel | unknown>({} as Responsavel);

    const getFormData = () => {
        return {
            id,
            nome,
            idEtapa,
            cidadeNascimento,
            dtNascimento,
            endereco,
            cep,
            telefoneFixo,
            telefoneMovel,
            email,
            paroquiaBatismo,
            arquidioceseBatismo,
            cidadeDioceseBatismo,
            ufDioceseBatismo,
            resideCom,
            dadosMae,
            dadosPai,
        } as Catequizando;
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" component="h5">
                Dados do catequizando
            </Typography>
            <Grid container spacing={3} id="dadosCatequizando">
                <Grid item xs={12} sm={8}>
                    <InputText id="nomeCtqzndo" label="Nome do Catequizando" value={nome} set={setNome}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputSelect items={etapas} toValue={(e: any)=> e?.id} toLabel={(e: any)=> e.nome}
                                 id="etapa" label="Turma Desejada" value={idEtapa} set={setIdEtapa}></InputSelect>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <InputText id="localNascimentoCtqzndo" label="Local Nascimento"
                               value={cidadeNascimento} set={setCidadeNascimento}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputDate value={dtNascimento} set={setDtNascimento}
                               format="dd/MM/yyyy"
                               id="dtNascimentoCtqzndo" label="Data Nascimento"></InputDate>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <InputText id="enderecoCtqzndo" label="Endereço"
                               value={endereco} set={setEndereco}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputText id="cepCtqzndo" label="CEP" value={cep} set={setCep}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputText id="telResCtqzndo" label="Telefone Residencial"
                               value={telefoneFixo} set={setTelefoneFixo}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputText id="celResCtqzndo" label="Celular"
                               value={telefoneMovel} set={setTelefoneMovel}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputEmail id="emailCtqzndo" label="E-mail"
                               value={email} set={setEmail}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputText id="paroquiBatismoCtqzndo" label="Paróquia onde foi batizado"
                               value={paroquiaBatismo} set={setParoquiaBatismo}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputText id="arqDioceseCtqzndo" label="Arquidiocese/Diocese"
                               value={arquidioceseBatismo} set={setArquidioceseBatismo}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputText id="cidadeDioceseCtqzndo" label="Cidade"
                               value={cidadeDioceseBatismo} set={setCidadeDioceseBatismo}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <InputText id="ufDioceseCtqzndo" label="UF"
                               value={ufDioceseBatismo} set={setUfDioceseBatismo}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputText id="resideCom" label="Catequizando reside com:"
                               value={resideCom} set={setResideCom}/>
                </Grid>
            </Grid>
        </Container>
    );
}