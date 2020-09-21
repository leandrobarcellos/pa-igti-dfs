import {Container, Grid, Typography} from "@material-ui/core";
import React from "react";
import {Responsavel} from "./DadosResponsavel";

interface ExibirDadosResponsavelProps {
    id: string,
    title: string,
    labelNome: string,
    value: Responsavel | null
}

export default function ExibirDadosResponsavel(props: ExibirDadosResponsavelProps) {

    return (
        <Container id={props.id} maxWidth="lg" style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                {props.title}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <h4>{props.labelNome}</h4>{props.value?.nome}
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid item xs={12} sm={6}>
                        <h4>Endereço</h4>{props?.value?.endereco}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h4>CEP</h4>{props?.value?.cep}
                </Grid>
                <Grid item xs={12} sm={5}>
                    <h4>Telefone Residencial</h4>{props?.value?.telResidencial}
                </Grid>
                <Grid item xs={12} sm={5}>
                    <h4>Celular</h4>{props?.value?.celResidencial}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h4>E-mail</h4>{props?.value?.email}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h4>Religião</h4>{props?.value?.religiao}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h4>Praticante</h4>{props?.value?.praticante}
                </Grid>
            </Grid>
        </Container>
    );
}