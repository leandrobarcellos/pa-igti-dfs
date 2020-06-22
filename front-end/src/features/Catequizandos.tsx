import React from "react";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

class Catequizandos extends React.Component {
    useStyles = () => makeStyles((theme: Theme) =>
        createStyles({
            button: {
                margin: theme.spacing(1),
            },
        }),
    );

    classes: any;

    render() {
        this.classes = this.useStyles();
        return (
            <Container maxWidth="lg" style={{marginTop: "25px"}}>
                <Container maxWidth="lg">
                    <Typography variant="h5" component="h5">
                        Dados do catequisando
                    </Typography>
                    <Grid container spacing={3} id="dadosCatequisando">
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="nomeCtqsndo" label="Nome do Catequisando"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="localNascimentoCtqsndo"
                                       label="Local Nascimento"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="dtNascimentoCtqsndo" label="Data Nascimento"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="enderecoCtqsndo" label="Endereço"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cepCtqsndo" label="CEP"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="telResCtqsndo" label="Telefone Residencial"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="celResCtqsndo" label="Celular"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="emailCtqsndo" label="E-mail"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="paroquiBatismoCtqsndo"
                                       label="Paróquia onde foi batizado"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="arqDioceseCtqsndo" label="Arquidiocese/Diocese"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cidadeDioceseCtqsndo" label="Cidade"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField fullWidth={true} id="ufDioceseCtqsndo" label="UF"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="resideCom" label="Catequisando reside com:"></TextField>
                        </Grid>
                    </Grid>
                </Container>
                <Container id="dadosMae" style={{marginTop: "25px"}}>
                    <Typography variant="h5" component="h5">
                        Dados da Mãe
                    </Typography>
                    <Grid container spacing={3} id="gridMae">
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="nomeMae" label="Nome da Mãe"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="enderecoMae" label="Endereço"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cepMae" label="CEP"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="telResMae" label="Telefone Residencial"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="celResMae" label="Celular"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="emailMae" label="E-mail"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="religiaoMae"
                                       label="Religião"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="maePraticante"
                                       label="Praticante"></TextField>
                        </Grid>
                    </Grid>
                </Container>
                <Container id="dadosPai" style={{marginTop: "25px"}}>
                    <Typography variant="h5" component="h5">
                        Dados do Pai
                    </Typography>
                    <Grid container spacing={3} id="gridPai">
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="nomePai" label="Nome do Pai"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth={true} id="enderecoPai" label="Endereço"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth={true} id="cepPai" label="CEP"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="telResPai" label="Telefone Residencial"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="celResPai" label="Celular"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth={true} id="emailPai" label="E-mail"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="religiaoPai"
                                       label="Religião"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth={true} id="paiPraticante"
                                       label="Praticante"></TextField>
                        </Grid>
                    </Grid>
                </Container>
                <div style={{display: "flex", justifyContent: "space-around", marginBottom: "30px", marginTop: "25px"}}>
                    <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={this.classes.button}
                        startIcon={<CancelIcon/>}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={this.classes.button}
                        startIcon={<SaveIcon/>}>
                        Save
                    </Button>
                </div>
            </Container>
        );
    }
}

export default Catequizandos;