import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import CatequistasService from "./CatequistasService";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    actionIcon: {
        cursor: "pointer"
    }
});

export default function TabelaCatequistas(props: any) {

    const classes = useStyles();
    const catequistaService: CatequistasService = new CatequistasService();
    const [data, setData] = useState([]);

    useEffect(() => {
        catequistaService.findAll()
            .then(res => {
                setData(res.object)
            })
            .catch(error => {
                console.log("Cannot load user data");
            })
    }, [data]);


    const handleDelete = (row: any) => {
        let i = 0;
        let index = -1;
        while (i < data.length && -1 === index) {
            if (data[i]["id"] === row.id) {
                index = i;
            }
            i++;
        }
        if (index !== -1)
            catequistaService.remove(data[index]["id"]).then(resolve => console.log(resolve));

    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right">Residência</TableCell>
                        <TableCell align="right">Celular</TableCell>
                        <TableCell align="right"/>
                        <TableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any) => (
                        <TableRow key={row?.nome}>
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell align="right">{row?.email}</TableCell>
                            <TableCell align="right">{row?.telResidencial}</TableCell>
                            <TableCell align="right">{row?.celResidencial}</TableCell>
                            <TableCell align="right">
                                <EditIcon className={classes.actionIcon} onClick={() => props.onEditing(row)}/>
                            </TableCell>
                            <TableCell align="right">
                                <DeleteForeverIcon className={classes.actionIcon} onClick={() => handleDelete(row)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
