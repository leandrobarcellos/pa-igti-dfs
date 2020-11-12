import {BadRequestException} from "@nestjs/common";

export class FieldChecker<T> {
    private readonly errors: string[];
    private toCheck: T;

    constructor(toCheck?: T) {
        this.toCheck = toCheck;
        this.errors = [];
    }

    static begin<T>(toCheck?: T): FieldChecker<T> {
        return new FieldChecker<T>(toCheck);
    }

    public checkIf(check: (o: T) => boolean, errorMsg: string): FieldChecker<T> {
        if (check(this.toCheck)) {
            this.errors.push(errorMsg);
        }
        return this;
    }

    public checkIfNull(value: any, errorMsg: string): FieldChecker<T> {
        if (!value || null == value) {
            this.errors.push(errorMsg);
        }
        return this;
    }

    public checkIfUndefined(value: any, errorMsg: string): FieldChecker<T> {
        if (value === undefined) {
            this.errors.push(errorMsg);
        }
        return this;
    }

    public checkIfUndefinedOrNull(value: any, errorMsg: string): FieldChecker<T> {
        if (value === undefined) {
            this.errors.push(errorMsg);
            return this;
        }
        return this.checkIfNull(value, errorMsg);
    }

    public checkIfHasItens(value: any[], errorMsg: string): FieldChecker<T> {
        if (value && 0 == value.length) {
            this.errors.push(errorMsg);
        }
        return this.checkIfNull(value, errorMsg);
    }

    public validate(): FieldChecker<T> {
        if (0 < this.errors.length) {
            throw new BadRequestException(this.errors);
        }
        return this;
    }

}
