import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {AppStyle} from "./AppStyle";
import CatequizandosService from "../../features/catequizandos/CatequizandosService";
import {Catequizando} from "../../features/catequizandos/catequizando";
import {Typography} from "@material-ui/core";


function not(a: any[], b: any[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: any[], b: any[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props: {
    idEtapa: number,
    preSelecao?: Catequizando[],
    set: (cs: Catequizando[]) => void,
    toLabel: (e: any) => string,
}) {
    const catequizandosService = new CatequizandosService();
    const classes = AppStyle.useStyles();
    const [checked, setChecked] = React.useState<any[]>([]);
    const [left, setLeft] = React.useState<any[]>([]);
    const [right, setRight] = React.useState<any[]>([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    useEffect(() => {
        setRight(right.splice(0));
        setLeft([]);
        setRight([]);
        if (props.idEtapa)
            catequizandosService
                .findAllByIdEtapa(props.idEtapa)
                .subscribe(next => {
                        let left = next.data.object;
                        if (props.preSelecao) {
                            const ids = props.preSelecao.map(c => c.id);
                            left = left.filter((c: Catequizando) => !ids.includes(c.id));
                            setRight(props.preSelecao);
                        }
                        if (right) {
                            const ids = right.map(c => c.id);
                            left = left.filter((c: Catequizando) => !ids.includes(c.id));
                            setRight(right);
                        }
                        setLeft(left);
                    },
                    error => console.log("error.response.object", error.response.object));
    }, [props.idEtapa]);

    useEffect(() => {
        props.set(right);
    }, [right]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items: number[], title: string) => (
        <Paper className={classes.paper}>
            <Typography className={classes.heading}>{title}</Typography>
            <List dense component="div" role="list">
                {items.map((value: any) => {
                    const labelId = `transfer-list-item-${value}-label`;
                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={props.toLabel(value)}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left, 'Não selecionados')}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right, 'Selecionados')}</Grid>
        </Grid>
    );
}
