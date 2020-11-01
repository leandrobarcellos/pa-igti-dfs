import {Container, Grid, Typography} from "@material-ui/core";
import React from "react";
import {Catequizando} from "./catequizando";

interface ExibirDadosCatequizandoProps {
    value: Catequizando
}

export default function ExibirDadosCatequizando(props: ExibirDadosCatequizandoProps) {
    const getFormattedDate = (toFormat: any) => {
        if (toFormat?.toLocaleDateString)
            return toFormat.toLocaleDateString();
        return "";
    };

    let getTurmaDesejada = function () {
        let toShow = "";
        let turmaDesejada = props?.value?.idEtapa;
        if (1 === turmaDesejada)
            toShow = "Pré-Eucaristia";
        if (2 === turmaDesejada)
            toShow = "Eucaristia";
        if (3 === turmaDesejada)
            toShow = "Perseverança";
        if (4 === turmaDesejada)
            toShow = "Crisma";
        // if ("PE" === turmaDesejada)
        //     toShow = "Pré-Eucaristia";
        // if ("EU" === turmaDesejada)
        //     toShow = "Eucaristia";
        // if ("PR" === turmaDesejada)
        //     toShow = "Perseverança";
        // if ("CR" === turmaDesejada)
        //     toShow = "Crisma";
        return toShow;
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" component="h5">
                Dados do catequizando
            </Typography>
            <Grid container spacing={3} id="dadosCatequisando">
                <Grid item xs={12} sm={6}>
                    <h4>Nome do Catequizando</h4>{props?.value?.nome}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h4>Turma desejada</h4>{getTurmaDesejada()}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h4>Local Nascimento</h4>{props?.value?.cidadeNascimento}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h4>Data Nascimento</h4>{getFormattedDate(props?.value?.dtNascimento)}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h4>Endereço</h4>{props?.value?.endereco}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h4>CEP</h4>{props?.value?.cep}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h4>Telefone Residencial</h4>{props?.value?.telefoneFixo}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <h4>Celular</h4>{props?.value?.telefoneMovel}
                </Grid>
                <Grid item xs={12} sm={8}>
                    <h4>E-mail</h4>{props?.value?.email}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <h4>Paróquia onde foi batizado</h4>{props?.value?.paroquiaBatismo}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <h4>Arquidiocese/Diocese</h4>{props?.value?.arquidioceseBatismo}
                </Grid>
                <Grid item xs={12} sm={2}>
                    <h4>Cidade do batismo</h4>{props?.value?.cidadeDioceseBatismo}
                </Grid>
                <Grid item xs={12} sm={2}>
                    <h4>UF do batismo</h4>{props?.value?.ufDioceseBatismo}
                </Grid>
                <Grid item xs={12} sm={12}>
                    <h4>Atualmente reside com</h4>{props?.value?.resideCom}
                </Grid>
            </Grid>
        </Container>
    );
}