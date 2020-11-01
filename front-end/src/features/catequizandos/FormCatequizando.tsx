import {Container, Grid, TextField, Typography} from "@material-ui/core";
import {Field} from "../../components/core/Field";
import React, {useEffect, useState} from "react";
import {FormProps} from "../../components/core/FormProps";
import {AppStyle} from "../../components/core/AppStyle";
import {Subject} from "rxjs";
import {InputDate, InputSelect} from "../../components/inputs/AppInputs";
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
                    <TextField fullWidth={true} value={nome} id="nomeCtqzndo"
                               label="Nome do Catequizando"
                               onChange={(e: any) => Field.change(e, setNome, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputSelect items={etapas} toValue={(e: any)=> e?.id} toLabel={(e: any)=> e.nome}
                                 id="etapa" label="Turma Desejada" value={idEtapa} set={setIdEtapa}></InputSelect>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField fullWidth={true} value={cidadeNascimento}
                               id="localNascimentoCtqzndo"
                               label="Local Nascimento"
                               onChange={(e: any) => Field.change(e, setCidadeNascimento, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputDate value={dtNascimento} set={setDtNascimento}
                               format="dd/MM/yyyy"
                               id="dtNascimentoCtqzndo" label="Data Nascimento"></InputDate>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField fullWidth={true} value={endereco}
                               id="enderecoCtqzndo" label="Endereço"
                               onChange={(e: any) => Field.change(e, setEndereco, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth={true} value={cep}
                               id="cepCtqzndo" label="CEP"
                               onChange={(e: any) => Field.change(e, setCep, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true}
                               value={telefoneFixo}
                               id="telResCtqzndo" label="Telefone Residencial"
                               onChange={(e: any) => Field.change(e, setTelefoneFixo, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true}
                               value={telefoneMovel}
                               id="celResCtqzndo" label="Celular"
                               onChange={(e: any) => Field.change(e, setTelefoneMovel, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth={true}
                               value={email}
                               id="emailCtqzndo" label="E-mail"
                               onChange={(e: any) => Field.change(e, setEmail, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth={true}
                               value={paroquiaBatismo}
                               id="paroquiBatismoCtqzndo"
                               label="Paróquia onde foi batizado"
                               onChange={(e: any) => Field.change(e, setParoquiaBatismo, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true}
                               value={arquidioceseBatismo}
                               id="arqDioceseCtqzndo"
                               label="Arquidiocese/Diocese"
                               onChange={(e: any) => Field.change(e, setArquidioceseBatismo, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth={true}
                               value={cidadeDioceseBatismo}
                               onChange={(e: any) => Field.change(e, setCidadeDioceseBatismo, () => setCatequizando(getFormData()))}
                               id="cidadeDioceseCtqzndo" label="Cidade"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField fullWidth={true} id="ufDioceseCtqzndo" label="UF"
                               value={ufDioceseBatismo}
                               onChange={(e: any) => Field.change(e, setUfDioceseBatismo, () => setCatequizando(getFormData()))}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth={true} id="resideCom"
                               value={resideCom}
                               onChange={(e: any) => Field.change(e, setResideCom, () => setCatequizando(getFormData()))}
                               label="Catequizando reside com:"/>
                </Grid>
            </Grid>
        </Container>
    );
}