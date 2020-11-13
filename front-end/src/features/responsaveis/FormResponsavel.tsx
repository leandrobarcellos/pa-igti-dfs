import {useHistory} from "react-router-dom";
import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {FormProps} from "../../components/core/FormProps";
import Button from "@material-ui/core/Button";
import {Responsavel} from "./responsavel";
import {SessionUtil} from "../../components/core/session.util";
import ResponsaveisService from "./ResponsaveisService";
import {InputText, SelectParentesco, SelectSimNao} from "../../components/inputs/AppInputs";

interface DadosResponsavelProps extends FormProps<Responsavel> {
    title?: string,
    labelNome: string | 'Nome',
    setState?: (e: any) => void,
    children?: any,
}

export function FormResponsavel(props: DadosResponsavelProps) {
    const history = useHistory();
    let r = props.formData;
    const responsavelDispatcher = new ResponsaveisService();
    const [id, setId] = useState(r ? r.id : 0);
    const [nome, setNome] = useState(r ? r.nome : "");
    const [parentesco, setParentesco] = useState(r ? r.parentesco : "");
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
        parentesco,
        endereco,
        cep,
        telefoneFixo,
        telefoneMovel,
        email,
        religiao,
        praticante,
        idUsuario: SessionUtil.isResponsavel() ? SessionUtil.getUser().id : undefined
    };

    const configurarForm = (r: Responsavel | null) => {
        setId(r ? r.id : 0);
        setNome(r ? r.nome : "");
        setParentesco(r ? r.parentesco : "");
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
    }, []);


    function handleCancelar() {
        if (!SessionUtil.isAuthenticated()) {
            history.push("/login");
        }
        configurarForm(null);
        props.onCancelar();
    }

    function handleSalvar() {
        console.log("function handleSalvar()", responsavel);
        responsavelDispatcher.persist(responsavel).subscribe(next => {
            console.log(next);
            props.onSaveComplete();
            configurarForm(null);
        });
    }

    return (

        <Grid container spacing={3} id={props.id}>
            <Grid item xs={12} sm={8}>
                <InputText id={props.id + "Nome"} label={props.labelNome} value={nome} set={setNome}></InputText>
            </Grid>
            <Grid item xs={12} sm={4}>
                <SelectParentesco id={props.id + "Parentesco"} label="Parentesco" value={parentesco}
                                  set={setParentesco}></SelectParentesco>
            </Grid>
            <Grid item xs={12} sm={8}>
                <InputText id={props.id + "Endereco"} label="Endereço" value={endereco} set={setEndereco}></InputText>
            </Grid>
            <Grid item xs={12} sm={4}>
                <InputText id={props.id + "Cep"} label="CEP"
                           value={cep} set={setCep}></InputText>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputText id={props.id + "TelRes"}
                           label="Telefone Residencial"
                           value={telefoneFixo} set={setTelefoneFixo}></InputText>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputText id={props.id + "CelRes"} label="Celular"
                           value={telefoneMovel} set={setTelefoneMovel}></InputText>
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputText id={props.id + "Email"} label="E-mail"
                           value={email} set={setEmail}></InputText>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputText id={props.id + "Religiao"} label="Religião"
                           value={religiao} set={setReligiao}></InputText>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SelectSimNao id={props.id + "Praticante"} label="Praticante" value={praticante}
                              set={setPraticante}></SelectSimNao>
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
    );
}
