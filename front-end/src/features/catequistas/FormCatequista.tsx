import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useEffect} from "react";
import {FormProps} from "../../components/core/FormProps";
import {InputEmail, InputNumber, InputText, SelectEtapa, SelectSimNao} from "../../components/inputs/AppInputs";
import {Catequista} from "./catequista";

export function FormCatequista(props: FormProps<Catequista>) {

    useEffect(() => {
        configureForm(props.formData)
    }, [props.formData]);

    const [optId, setOptId] = React.useState(0);
    const [nome, setNome] = React.useState("");
    const [idEtapa, setIdEtapa] = React.useState<number>(0);
    const [email, setEmail] = React.useState("");
    const [optTelefoneFixo, setOptTelefoneFixo] = React.useState<string | undefined>("");
    const [telefoneMovel, setTelefoneMovel] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [casado, setCasado] = React.useState<string>("");

    const configureForm = (catequista?: Catequista) => {
        setOptId(catequista && catequista.id ? catequista.id : 0);
        setNome(catequista ? catequista.nome : "");
        setIdEtapa(catequista ? catequista.idEtapa : 0);
        setEmail(catequista ? catequista.email : "");
        setOptTelefoneFixo(catequista ? catequista.telefoneFixo : "");
        setTelefoneMovel(catequista ? catequista.telefoneMovel : "");
        setEndereco(catequista ? catequista.endereco : "");
        setCasado(catequista ? catequista.casado : "");
    }

    let getCatequista = function () {
        return {
            id: optId && optId > 0 ? optId : undefined,
            idEtapa,
            nome,
            email,
            telefoneMovel,
            telefoneFixo: optTelefoneFixo ? optTelefoneFixo : undefined,
            endereco,
            casado
        };
    };

    const save = () => {
        props.saveAction.next({
            formData: getCatequista() as Catequista,
            actionCompleted: () => {
                configureForm();
                props.onSaveComplete();
            }
        });
    }

    const update = () => {
        props.updateAction.next({
            formData: getCatequista() as Catequista,
            actionCompleted: () => {
                configureForm();
                props.onUpdateComplete();
            }
        });
    }

    function handleCancelar() {
        configureForm();
        props.onCancelar();
    }

    function handleSalvar() {
        if (optId > 0) {
            update();
        } else {
            save();
        }
    }

    const handleCasado = (e: string) => {
        console.log("setCasado(e)", e);
        setCasado(e);
    }

    return (
        <Grid container spacing={3} id="gridCat">
            <Grid item xs={12} sm={6}>
                <InputText id="nmCatequista" label="Nome" value={nome} set={setNome}></InputText>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SelectEtapa id="etapa" label="Etapa" value={idEtapa} set={setIdEtapa}></SelectEtapa>
            </Grid>
            <Grid item xs={12} sm={8}>
                <InputText id="enderecoCatequista" label="Endereço" value={endereco} set={setEndereco}></InputText>
            </Grid>
            <Grid item xs={12} sm={4}>
                <InputEmail id="emailCatequista" label="E-mail" value={email} set={setEmail}></InputEmail>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputNumber id="telRes" label="Telefone Residencial" value={optTelefoneFixo}
                             set={setOptTelefoneFixo}></InputNumber>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputNumber id="celRes" label="Telefone Celular" value={telefoneMovel}
                             set={setTelefoneMovel}></InputNumber>
            </Grid>
            <Grid item xs={12} sm={12}>
                <SelectSimNao id="casado" label="Casado(a)" value={casado} set={e => handleCasado(e)}></SelectSimNao>
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
