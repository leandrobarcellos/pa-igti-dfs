export class Field {
    static change = (event: any, set: (value: any) => void, callback?: () => void): void => {
        if (event) {
            if (event?.target) {
                set(event.target.value);
            } else {
                set(event)
            }
        }
        if (callback) {
            callback();
        }
    }
}