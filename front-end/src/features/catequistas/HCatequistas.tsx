import React, {useState} from "react";
import CatequistasService from "./CatequistasService";
import {Container, Grid, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


export default function HCatequistas(props: any) {
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
        }),
    );
    const classes = useStyles();
    const service: CatequistasService = new CatequistasService();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [telResidencial, setTelResidencial] = useState('');
    const [celResidencial, setCelResidencial] = useState('');
    const [email, setEmail] = useState('');
    const [casado, setCasado] = useState('');

    const catequista = {
        nome,
        sobrenome,
        casado,
        telResidencial,
        celResidencial,
        email,
        endereco: {
            cidade,
            cep,
            logradouro,
            numero
        }
    };

    const handleChangeNome = (evt: any) => {
        setNome(evt.target.value);
    }

    const handleChangeSobrenome = (evt: any) => {
        setSobrenome(evt.target.value);
    }
    const handleChangeCidade = (evt: any) => {
        setCidade(evt.target.value);
    }
    const handleChangeCep = (evt: any) => {
        setCep(evt.target.value);
    }
    const handleChangeLogradouro = (evt: any) => {
        setLogradouro(evt.target.value);
    }

    const handleChangeNumero = (evt: any) => {
        setNumero(evt.target.value);
    }

    const handleClick = (evt: any) => {
        service.persist(catequista).then(next => console.log(next)).catch(error => console.log(error));
    }

    const handleChangeCheck = (evt: any) => {

    }

    return (

        <Container id={props.id} style={{marginTop: "25px"}}>
            <Typography variant="h5" component="h5">
                Catequista
            </Typography>
            <Grid container spacing={3} id={props.id}>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth={true} id={props.id + "Nome"} label="Nome"
                               value={nome}
                               onChange={(e) => setNome(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField fullWidth={true} id="endereco" label="Endereço"
                               value={logradouro}
                               onChange={(e) => setLogradouro(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth={true} id="cep" label="CEP"
                               value={cep}
                               onChange={(e) => setCep(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true} id="telRes"
                               label="Telefone Residencial"
                               value={telResidencial}
                               onChange={(e) => setTelResidencial(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth={true} id="celRes" label="Celular"
                               value={celResidencial}
                               onChange={(e) => setCelResidencial(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth={true} id="email" label="E-mail"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                </Grid>

            </Grid>
            <Button variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className={classes.button}>
                Cadastrar
            </Button>
        </Container>
        // <div>
        //     <input type="text" name="nome" id="nm" value={nome} onChange={handleChangeNome}/>
        //     <input type="text" name="sobrenome" id="snm" value={sobrenome} onChange={handleChangeSobrenome}/>
        //     <input type="text" name="cidade" id="cid" value={cidade} onChange={handleChangeCidade}/>
        //     <input type="text" name="cep" id="cep" value={cep} onChange={handleChangeCep}/>
        //     <input type="text" name="logr" id="logr" value={logradouro} onChange={handleChangeLogradouro}/>
        //     <input type="text" name="nro" id="nro" value={numero} onChange={handleChangeNumero}/>
        //     <input type="checkbox" name="csdo" id="csdo" value={casado} onChange={handleChangeCheck}/>
        //     <input type="checkbox" name="sltr" id="sltr" value={casado} onChange={handleChangeCheck}/>
        //     <button onClick={handleClick}>Click-me</button>
        // </div>
    );
}