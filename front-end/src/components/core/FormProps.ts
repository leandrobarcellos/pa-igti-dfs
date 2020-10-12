import {Subject} from "rxjs";
import {FormAction} from "./FormAction";


export interface FormProps<T> {
    id: string;
    formData: T;
    saveAction: Subject<FormAction<T>>;
    updateAction: Subject<FormAction<T>>;
    onCancelar: () => void,
    onSaveComplete: () => void,
    onUpdateComplete: () => void,
    children?:any
}
