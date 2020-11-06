import {BadRequestException} from "@nestjs/common";

export class FieldChecker {
    private readonly errors: string[];

    constructor() {
        this.errors = [];
    }

    static begin(): FieldChecker {
        return new FieldChecker();
    }

    public checkIfNull(value: any, errorMsg: string): FieldChecker {
        if (!value || null == value) {
            this.errors.push(errorMsg);
        }
        return this;
    }

    public checkIfUndefined(value: any, errorMsg: string): FieldChecker {
        if (value === undefined) {
            this.errors.push(errorMsg);
        }
        return this;
    }

    public validate(): FieldChecker {
        if (0 < this.errors.length) {
            throw new BadRequestException(this.errors);
        }
        return this;
    }

}
