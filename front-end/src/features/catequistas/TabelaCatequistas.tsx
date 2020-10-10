import React, {useEffect} from 'react';
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
import {Subject} from "rxjs";
import {FormAction} from "./FormCatequista";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    actionIcon: {
        cursor: "pointer"
    }
});

export interface TabCatequistaProps {
    rows: Catequista[],
    onEditing: any,
    deleteAction: Subject<FormAction<Catequista>>,
    onDeleteComplete: () => void

}

export default function TabelaCatequistas(props: TabCatequistaProps) {

    const classes = useStyles();
    const [rows, setRows] = React.useState<Catequista[]>(props.rows);

    let pRows = props.rows;
    useEffect(() => {
        pRows = props.rows;
        setRows(props && pRows ? pRows : []);
    }, [rows, pRows]);

    const handleDelete = (row: Catequista) => {
        props.deleteAction.next({
            formData: row,
            actionCompleted: () => {
                alert("excluidocomsucesso");
                props.onDeleteComplete();
            }
        });
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
                    {props?.rows?.map((row: any) => (
                        <TableRow key={row?.nome}>
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell align="right">{row?.email}</TableCell>
                            <TableCell align="right">{row?.endereco}</TableCell>
                            <TableCell align="right">{row?.telefoneCelular}</TableCell>
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
