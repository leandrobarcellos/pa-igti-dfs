import {Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useEffect} from "react";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";
import {Subject} from "rxjs";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export interface FormProps<T> {
    id: string;
    formData: T;
    saveAction: Subject<FormAction<T>>;
    updateAction: Subject<FormAction<T>>;
    onCancelar: () => void,
    onSaveComplete: () => void,
    onUpdateComplete: () => void
}

export interface FormAction<T> {
    formData: T;
    actionCompleted?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
            marginTop: 15
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);


export function FormCatequista(props: FormProps<Catequista>) {
    const classes = useStyles();
    let catequista = props.formData;

    useEffect(() => {
        catequista = props.formData;
        setOptId(catequista && catequista.id ? catequista.id : 0);
        setNome(catequista && catequista.nome ? catequista.nome : "");
        setEmail(catequista && catequista.email ? catequista.email : "");
        setOptTelefoneFixo(catequista && catequista.telefoneFixo ? catequista.telefoneFixo : "");
        setTelefoneCelular(catequista && catequista.telefoneCelular ? catequista.telefoneCelular : "");
        setEndereco(catequista && catequista.endereco ? catequista.endereco : "");
        setCasado(catequista && catequista.casado ? catequista.casado : "N");
    }, [catequista]);


    const [optId, setOptId] = React.useState(0);
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [optTelefoneFixo, setOptTelefoneFixo] = React.useState<string | undefined>("");
    const [telefoneCelular, setTelefoneCelular] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [casado, setCasado] = React.useState("");

    const resetForm = () => {
        setOptId(0);
        setNome("");
        setEmail("");
        setOptTelefoneFixo("");
        setTelefoneCelular("");
        setEndereco("");
        setCasado("N");
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
                resetForm();
                props.onSaveComplete();
            }
        });
    }

    const update = () => {
        props.updateAction.next({
            formData: getCatequista() as Catequista,
            actionCompleted: () => {
                resetForm();
                props.onUpdateComplete();
            }
        });
    }

    const fieldChange = (event: any, set: (value: any) => void): void => {
        set(event.target.value);
    }

    function handleCancelar() {
        resetForm();
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
                <TextField fullWidth={true} id="Nome" label="Nome"
                           value={nome}
                           onChange={(e) => fieldChange(e, setNome)}/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <TextField fullWidth={true} id="endereco" label="Endereço"
                           value={endereco}
                           onChange={(e) => fieldChange(e, setEndereco)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField fullWidth={true} id="cep" label="CEP"
                           value={email}
                           onChange={(e) => fieldChange(e, setEmail)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id="telRes"
                           label="Telefone Residencial"
                           value={optTelefoneFixo}
                           onChange={(e) => fieldChange(e, setOptTelefoneFixo)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth={true} id="celRes" label="Celular"
                           value={telefoneCelular}
                           onChange={(e) => fieldChange(e, setTelefoneCelular)}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField fullWidth={true} id="email" label="E-mail"
                           value={casado}
                           onChange={(e) => fieldChange(e, setCasado)}/>
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