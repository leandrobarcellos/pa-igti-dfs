import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {Field} from "../core/Field";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Etapa} from "../../util/domain/etapa";
import {EtapasService} from "../../util/domain/EtapasService";
import {AppStyle} from "../core/AppStyle";

interface AppInputProps<T> {
    id: string,
    type?: string,
    label: string,
    value: T | unknown,
    set: (value: T) => void,
    className?: string,
    error?: boolean,
    helperText?: string,
    errorText?: string
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

const controlShrink = (props: AppInputProps<string>, set: (b: boolean) => void) => {
    if (props.value && null != props.value) {
        const strValue = props.value as string;
        set(strValue.length != 0);
    } else {
        set(false);
    }
};

export function InputText(props: AppInputProps<string>) {
    const type = props.type || 'text';
    const [shrinkLabel, setShrinkLabel] = React.useState<boolean>(false);
    useEffect(() => {
        controlShrink(props, setShrinkLabel);
    }, [props.value]);
    return (
        <TextField fullWidth={true} id={props.id} label={props.label} type={type}
                   InputLabelProps={{shrink: shrinkLabel}}
                   value={props.value}
                   onChange={e => Field.change(e, props.set)}
                   helperText={props.error ? props.errorText : props.helperText}
        />
    );
}

export function InputNumber(props: AppInputProps<string>) {
    return (
        <InputText id={props.id} label={props.label} type="number"
                   value={props.value} set={props.set}/>
    );
}

export function InputEmail(props: AppInputProps<string>) {
    return (
        <InputText id={props.id} label={props.label} type="email"
                   value={props.value} set={props.set}
                   helperText={props.error ? props.errorText : props.helperText}/>

    );
}

export function InputPassword(props: AppInputProps<string>) {
    return (
        <InputText id={props.id} label={props.label} type="password"
                   value={props.value} set={props.set}
                   helperText={props.error ? props.errorText : props.helperText}/>
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
    const classes = AppStyle.useStyles();
    useEffect(() => {
        props.set("");
    }, [props.items]);

    const [shrinkLabel, setShrinkLabel] = React.useState<boolean>(false);
    return (
        <FormControl className={props.className ? props.className : classes.formControl} fullWidth={true}>
            <InputLabel id={`${props.id}_label`}>{props.label}</InputLabel>
            <Select
                labelId={`${props.id}_label`}
                id={`${props.id}select`}
                className={props.selectClass? props.selectClass: classes.selectClass}
                value={props.value}
                onChange={(e: any) => Field.change(e, props.set)}>
                <MenuItem key={`${props.id}_empty`} value="">Selecione</MenuItem>
                {props?.items?.map(i => (
                    <MenuItem key={`key${props.toValue(i)}${props.id}`}
                              value={props.toValue(i)}>{props.toLabel(i)}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export function SelectSimNao(props: AppInputProps<string>) {

    const [options, setOptions] = React.useState([
        {label: 'Sim', value: 'S'},
        {label: 'Não', value: 'N'}
    ]);

    return (
        <InputSelect items={options} toValue={i => i.value} toLabel={i => i.label} id={props.id}
                     label={props.label} value={props.value} set={props.set}></InputSelect>
    );
}

export function SelectSexo(props: AppInputProps<string>) {

    const [options, setOptions] = React.useState([
        {label: 'Masculino', value: 'M'},
        {label: 'Feminino', value: 'F'}
    ]);

    return (
        <InputSelect items={options} toValue={i => i.value} toLabel={i => i.label} id={props.id}
                     label={props.label} value={props.value} set={props.set}></InputSelect>
    );
}

export function SelectEtapa(props: AppInputProps<number>) {
    const etapasDispatcher = new EtapasService();
    const [options, setOptions] = React.useState<Etapa[]>([]);

    useEffect(() => {
        etapasDispatcher.findAll().subscribe(next => setOptions(next.data.object));
    }, []);

    return (
        <InputSelect items={options} toValue={i => i.id} toLabel={i => i.nome} id={props.id}
                     label={props.label} value={props.value} set={props.set}></InputSelect>
    );
}

export function SelectParentesco(props: AppInputProps<'PAI' | 'MAE'>) {
    const [options, setOptions] = React.useState<any[]>([
        {label: 'Pai', value: 'PAI'},
        {label: 'Mãe', value: 'MAE'}
    ]);

    return (
        <InputSelect items={options} toValue={i => i.value} toLabel={i => i.label} id={props.id}
                     label={props.label} value={props.value} set={props.set}></InputSelect>
    );
}
