import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useEffect} from "react";
import {FormProps} from "../../components/core/FormProps";
import {InputEmail, InputSelect, InputText} from "../../components/inputs/AppInputs";
import {Catequista} from "./catequista";

export function FormCatequista(props: FormProps<Catequista>) {

    useEffect(() => {
        configureForm(props.formData)
    }, [props.formData]);

    const [optId, setOptId] = React.useState(0);
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [optTelefoneFixo, setOptTelefoneFixo] = React.useState<string | undefined>("");
    const [telefoneCelular, setTelefoneCelular] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [casado, setCasado] = React.useState("");

    const configureForm = (catequista?: Catequista) => {
        setOptId(catequista && catequista.id ? catequista.id : 0);
        setNome(catequista ? catequista.nome : "");
        setEmail(catequista ? catequista.email : "");
        setOptTelefoneFixo(catequista ? catequista.telefoneFixo : "");
        setTelefoneCelular(catequista ? catequista.telefoneCelular : "");
        setEndereco(catequista ? catequista.endereco : "");
        setCasado(catequista ? catequista.casado : "N");
    }

    let getCatequista = function () {
        return {
            id: optId && optId > 0 ? optId : undefined,
            nome,
            email,
            telefoneCelular,
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

    return (
        <Grid container spacing={3} id="gridCat">
            <Grid item xs={12} sm={12}>
                <InputText id="nmCatequista" label="Nome" value={nome} set={setNome}></InputText>
            </Grid>
            <Grid item xs={12} sm={8}>
                <InputText id="enderecoCatequista" label="Endereço" value={endereco} set={setEndereco}></InputText>
            </Grid>
            <Grid item xs={12} sm={4}>
                <InputEmail id="emailCatequista" label="E-mail" value={email} set={setEmail}></InputEmail>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputText id="telRes" label="Telefone Residencial" value={optTelefoneFixo}
                           set={setOptTelefoneFixo}></InputText>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputText id="celRes" label="Telefone Celular" value={telefoneCelular}
                           set={setTelefoneCelular}></InputText>
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputSelect items={[{value: "S", label: "Sim"}, {value: "N", label: "Não"}]}
                             toValue={(i: any) => i.value}
                             toLabel={(i: any) => i.label}
                             id="casado" label="Casada(o)" value={casado} set={setCasado}></InputSelect>
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