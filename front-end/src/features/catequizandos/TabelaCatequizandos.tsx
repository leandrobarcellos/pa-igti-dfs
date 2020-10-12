import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {TableProps} from "../../components/core/CRUDProps";
import {Catequizando} from "../../../../back-end/features/catequizando/Catequizando";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    actionIcon: {
        cursor: "pointer"
    }
});

export default function TabelaCatequizandos(props: TableProps<Catequizando>) {
    const classes = useStyles();
    const [rows, setRows] = React.useState<Catequizando[]>(props.rows);

    let pRows = props.rows;
    useEffect(() => {
        pRows = props.rows;
        setRows(props && pRows ? pRows : []);
    }, [rows, pRows]);

    const handleDelete = (row: Catequizando) => {
        props.deleteAction.next({
            formData: row,
            actionCompleted: () => {
                alert("excluidocomsucesso");
                props.onDeleteComplete();
            }
        });
    }
    const getTurmaDesejada = (row: any) => {
        let toShow = "";
        let turmaDesejada = row?.turmaDesejada;
        if ("PE" === turmaDesejada)
            toShow = "Pré-Eucaristia";
        if ("EU" === turmaDesejada)
            toShow = "Eucaristia";
        if ("PR" === turmaDesejada)
            toShow = "Perseverança";
        if ("CR" === turmaDesejada)
            toShow = "Crisma";
        return toShow;
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Data Nascimento</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right">Telefone</TableCell>
                        <TableCell align="right">Turma Desejada</TableCell>
                        <TableCell align="right"/>
                        <TableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row: any) => (
                        <TableRow key={row?.nomeCtqzndo}>
                            <TableCell component="th" scope="row">
                                {row?.nomeCtqzndo}
                            </TableCell>
                            <TableCell align="right">{row?.dtNascimentoCtqzndo}</TableCell>
                            <TableCell align="right">{row?.emailCtqzndo}</TableCell>
                            <TableCell align="right">{row?.telResCtqzndo}</TableCell>
                            <TableCell align="right">{getTurmaDesejada(row)}</TableCell>
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
