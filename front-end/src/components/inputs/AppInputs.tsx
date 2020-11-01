import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {Field} from "../core/Field";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

interface AppInputProps<T> {
    id: string,
    label: string,
    value: T | unknown,
    set: (value: T) => void,
    className?: string
}

interface AppInputDateProps extends AppInputProps<Date> {
    value: Date | null,
    set: (value: Date | null) => void,
    format: string
}

interface AppInputSelectProps extends AppInputProps<any> {
    items: any[],
    toValue: (i: any) => any,
    toLabel: (i: any) => string,
    selectClass?: string
}

export function AppInputs(props: AppInputProps<number>) {
    return (
        <TextField fullWidth={true} id={props.id} label={props.label} type="number"
                   InputLabelProps={{shrink: true}}
                   value={props.value}
                   onChange={e => Field.change(e, props.set)}
        />
    );
}

export function InputText(props: AppInputProps<string>) {
    return (
        <TextField fullWidth={true} id={props.id} label={props.label} type="text"
                   InputLabelProps={{shrink: true}}
                   value={props.value}
                   onChange={e => Field.change(e, props.set)}
        />
    );
}

export function InputEmail(props: AppInputProps<string>) {
    return (
        <TextField fullWidth={true} id={props.id} label={props.label} type="email"
                   InputLabelProps={{shrink: true}}
                   value={props.value}
                   onChange={e => Field.change(e, props.set)}
        />
    );
}

export function InputPassword(props: AppInputProps<string>) {
    return (
        <TextField fullWidth={true} id={props.id} label={props.label} type="password"
                   InputLabelProps={{shrink: true}}
                   value={props.value}
                   onChange={e => Field.change(e, props.set)}
        />
    );
}

export function InputDate(props: AppInputDateProps) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker fullWidth={true}
                                id={props.id}
                                label={props.label}
                                format={props.format}
                                value={props.value}
                                onChange={e => Field.change(e, props.set)}
                                KeyboardButtonProps={{'aria-label': 'change date'}}/>
        </MuiPickersUtilsProvider>
    );
}

export function InputSelect(props: AppInputSelectProps) {
    useEffect(()=>{
        console.log(props.items);
    }, [props.items]);

    return (
        <FormControl className={props.className} fullWidth={true}>
            <InputLabel id={`${props.id}_label`}>{props.label}</InputLabel>
            <Select
                labelId={`${props.id}_label`}
                id={`${props.id}select`}
                className={props.selectClass}
                value={props.value}
                onChange={(e: any) => Field.change(e, props.set)}>
                <MenuItem value="">Selecione</MenuItem>
                {props?.items?.map(i=> (
                    <MenuItem  key={`key${props.toValue(i)}`} value={props.toValue(i)}>{props.toLabel(i)}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
