import {Container, Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {FormProps} from "../../components/core/FormProps";
import {AppStyle} from "../../components/core/AppStyle";
import {Subject} from "rxjs";
import {InputDate, InputEmail, InputText, SelectEtapa} from "../../components/inputs/AppInputs";
import {Catequizando} from "./catequizando";
import {Responsavel} from "../responsaveis/responsavel";
import {SessionUtil} from "../../components/core/session.util";
import Button from "@material-ui/core/Button";
import CatequizandosService from "./CatequizandosService";
import {CatequizandoPipe} from "./CatequizandoPipe";

interface FormCatequizandosProps extends FormProps<Catequizando> {
    children: any,
    notificador: Subject<Catequizando>,
    sendData: (catequizando: Catequizando) => void
}

export default function FormCatequizando(props: FormCatequizandosProps) {
    const classes = AppStyle.useStyles();
    const catequizandoService = new CatequizandosService();
    const catequizandoPipe = new CatequizandoPipe();

    let configurarForm = (c: Catequizando | null) => {
        setId(c && c.id && c.id ? c.id : 0);
        setNome(c && c.nome ? c.nome : "");
        setIdEtapa(c && c.idEtapa ? c.idEtapa : 0);
        setIdPai(c && c.idPai ? c.idPai : 0);
        setIdMae(c && c.idMae ? c.idMae : 0);
        setCidadeNascimento(c && c.cidadeNascimento ? c.cidadeNascimento : "");
        setDtNascimento(c && c.dtNascimento ? c.dtNascimento : null);
        setEndereco(c && c.endereco ? c.endereco : "");
        setCep(c && c.cep ? c.cep : "");
        setTelefoneFixo(c && c.telefoneFixo ? c.telefoneFixo : "");
        setTelefoneMovel(c && c.telefoneMovel ? c.telefoneMovel : "");
        setEmail(c && c.email ? c.email : "");
        setParoquiaBatismo(c && c.paroquiaBatismo ? c.paroquiaBatismo : "");
        setArquidioceseBatismo(c && c.arquidioceseBatismo ? c.arquidioceseBatismo : "");
        setUfDioceseBatismo(c && c.ufDioceseBatismo ? c.ufDioceseBatismo : "");
        setCidadeDioceseBatismo(c && c.cidadeDioceseBatismo ? c.cidadeDioceseBatismo : "");
        setCidadeNascimento(c && c.cidadeNascimento ? c.cidadeNascimento : "");
        setResideCom(c && c.resideCom ? c.resideCom : "");
        setDadosMae(c && c.dadosMae ? c.dadosMae : {} as Responsavel);
        setDadosPai(c && c.dadosPai ? c.dadosPai : {} as Responsavel);
    };

    useEffect(() => {
        configurarForm(props.formData);
        return () => {
        };
    }, [props.formData]);

    useEffect(() => {
        const user = SessionUtil.getUser();
        if (SessionUtil.isResponsavel()) {
            catequizandoService.findResponsaveisByIdUsuario(user.id)
                .subscribe(next => {
                    console.log("next.data.object", next.data.object);
                    next.data.object.forEach((r: Responsavel) => {
                        if ('MAE' == r.parentesco) {
                            setIdMae(r.id);
                            setDadosMae(r);
                        } else if ('PAI' == r.parentesco) {
                            setIdPai(r.id);
                            setDadosPai(r);
                        }
                    })
                });
        }
        return () => {
        };
    }, []);

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
    const [dadosMae, setDadosMae] = React.useState<Responsavel>({} as Responsavel);
    const [dadosPai, setDadosPai] = React.useState<Responsavel>({} as Responsavel);

    const getFormData = () => {
        return {
            id,
            idPai,
            idMae,
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

    const handleCancelar = (e: any) => {
        configurarForm({dadosPai, dadosMae} as Catequizando);
    }

    const handleSalvar = (e: any) => {
        const catequizando = getFormData();
        if (catequizando.id && catequizando.id > 0) {
            catequizandoPipe.update.next({
                formData: catequizando,
                actionCompleted: () => props.onUpdateComplete()
            });
        } else {
            catequizandoPipe.save.next({
                formData: catequizando,
                actionCompleted: () => props.onSaveComplete()
            });
        }
        const {idPai, idMae, dadosPai, dadosMae} = catequizando;
        configurarForm({idPai, idMae, dadosPai, dadosMae} as Catequizando);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" component="h5">
                Dados do catequizando
            </Typography>
            <Grid container spacing={3} id="dadosCatequizando">
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={3} id="responsaveis">
                        <Grid item xs={12} sm={6}>
                            <label>Nome da mãe</label>
                            <h5 id="nomeMae">{dadosMae && dadosMae.nome ? dadosMae.nome : 'Não encontrado'}</h5>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Nome do pai</label>
                            <h5 id="nomePai">{dadosPai && dadosPai.nome? dadosPai.nome : 'Não encontrado'}</h5>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <InputText id="nomeCtqzndo" label="Nome do Catequizando" value={nome} set={setNome}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <SelectEtapa id="etapa" label="Turma Desejada" value={idEtapa} set={setIdEtapa}></SelectEtapa>
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
                <Grid item xs={12} sm={2}>
                    <Button variant="contained"
                            color="default"
                            onClick={handleCancelar}>
                        Cancelar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button variant="contained"
                            color="primary"
                            onClick={handleSalvar}>
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
