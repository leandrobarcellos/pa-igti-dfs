import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import {AppStyle} from "./core/AppStyle";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {AppUtil} from "./core/AppUtil";

export interface TableAction {
    label: string,
    call: (row: any) => void,
    icon?: any
}

export interface Column<T> {
    attribute: string,
    label: string
}

export interface AppTableProps<T> {
    columns: Column<T>[],
    actions?: TableAction[],
    editAction?: (row: T) => void,
    removeAction?: (row: T) => void,
    dataSource: T[]
}

export default function AppTable(props: AppTableProps<any>) {
    const classes = AppStyle.useStyles();
    const columns = props.columns;
    const [rows, setRows] = React.useState<any[]>();
    const editAction = props.editAction ? props.editAction : (row: any) => {
        console.log("no edit action defined", row)
    };
    const removeAction = props.removeAction ? props.removeAction : (row: any) => {
        console.log("no remove action defined", row)
    };

    useEffect(() => {
        setRows(props.dataSource);
    }, [props.dataSource])

    function getActionColumnHeader(action?: Function) {
        let edit = (<></>);
        if (action) {
            edit = (<TableCell align="left"/>);
        }
        return edit;
    }

    function getEditColumn(row: any) {
        let edit = (<></>);
        if (props.editAction) {
            edit = (
                <TableCell align="right">
                    <EditIcon className={classes.actionIcon} onClick={() => editAction(row as any)}/>
                </TableCell>
            )
        }
        return edit;
    }

    function getRemoveColumn(row: any) {
        let remove = (<></>);
        if (props.removeAction) {
            remove = (
                <TableCell align="right">
                    <DeleteForeverIcon className={classes.actionIcon} onClick={() => removeAction(row)}/>
                </TableCell>
            );
        }
        return remove;
    }

    const randomInt = () => {
        return AppUtil.randomIntFromInterval(0, 9999);
    };

    const getKey = (row: any) => {
        if (row && columns && columns.length > 0)
            return `${row[columns[0].attribute]}_${(randomInt())}`;
        return undefined;
    }

    const getRowValue = (row: any, attribute: string) => {
        const discover = attribute.split('.');
        let value = row;
        if (discover && 0 < discover.length) {
            for (let a of discover) {
                value = value[a];
            }
        } else {
            value = row[attribute];
        }
        try{
            value = Intl.DateTimeFormat('pt-BR').format(new Date(value));
        }catch (e) {
            //ignoring...
        }
        return value;
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map(c => (<TableCell key={`th_${c.attribute}_${(randomInt())}`} align="left">{c.label}</TableCell>))}
                        {
                            props.actions?.map(a => (<TableCell key={a.label}
                                                                className={classes.actionColumn}
                                                                align="left"></TableCell>))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row: any) => (
                        <TableRow key={getKey(row)}>
                            {
                                columns.map(c => (
                                    <TableCell key={`td_${row[c.attribute]}_${(randomInt())}`} component="th" scope="row" align="left">
                                        {getRowValue(row, c.attribute)}
                                    </TableCell>
                                ))
                            }
                            {
                                props.actions?.map(a => (
                                    <TableCell key={`${a.label}_row_${(randomInt())}`} className={classes.actionColumn}
                                               component="th" scope="row" align="right">
                                        {(<em className={classes.actionIcon}
                                              onClick={() => a.call(row)}>{(a.icon)}</em>)}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
