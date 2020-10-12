import {Subject} from "rxjs";
import {FormAction} from "./FormAction";

export interface TableProps<T> {
    rows: T[],
    onEditing: any,
    deleteAction: Subject<FormAction<T>>,
    onDeleteComplete: () => void
}