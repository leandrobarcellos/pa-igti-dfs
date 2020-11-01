import React, {useEffect} from 'react';
import {Catequista} from "../../../../back-end/features/catequista/Catequista";
import {TableProps} from "../../components/core/CRUDProps";
import AppTable from "../../components/AppTable";
import {AppStyle} from "../../components/core/AppStyle";
import PeopleIcon from '@material-ui/icons/People';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

export default function TabelaCatequistas(props: TableProps<Catequista>) {

    const classes = AppStyle.useStyles();
    const [rows, setRows] = React.useState<Catequista[]>(props.rows);

    useEffect(() => {
        setRows(props && props.rows ? props.rows : []);
    }, [rows, props, props.rows]);

    const handleDelete = (row: Catequista) => {
        props.deleteAction.next({
            formData: row,
            actionCompleted: () => {
                props.onDeleteComplete();
            }
        });
    }

    return (
        <AppTable columns={[
            {label: "Nome", attribute: "nome"},
            {label: "E-mail", attribute: "email"},
            {label: "Residência", attribute: "endereco"},
            {label: "Celular", attribute: "telefoneCelular"}
        ]}
                  dataSource={rows}
                  actions={[
                      {label: "turmas", icon: (<PeopleIcon/>), call: row => console.log(row)},
                      {label: "editar", icon: (<EditIcon/>), call: props.onEditing},
                      {label: "remover", icon: (<DeleteForeverIcon/>), call: handleDelete},
                  ]}></AppTable>
    );
}
