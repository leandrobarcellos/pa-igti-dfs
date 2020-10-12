export interface FormAction<T> {
    formData: T;
    actionCompleted?: () => void;
}