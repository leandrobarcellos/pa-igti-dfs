interface Logger {
    log(message?: any, optionalParams?: any): void;

    warn(message?: any, optionalParams?: any): void;

    error(message?: any, optionalParams?: any): void;

    info(message?: any, optionalParams?: any): void;
}

export class LoggerFactory {
    static newInstance(named: Function): Logger {
        return new AppLogger(named.name);
    }
}

export class AppLogger implements Logger {
    constructor(private name: string) {
    }

    error(message?: any, optionalParams?: any): void {
        this.doLog(console.error, message, optionalParams);
    }

    info(message?: any, optionalParams?: any): void {
        this.doLog(console.info, message, optionalParams);
    }

    log(message?: any, optionalParams?: any): void {
        this.doLog(console.log, message, optionalParams);
    }

    warn(message?: any, optionalParams?: any): void {
        this.doLog(console.warn, message, optionalParams);
    }

    private doLog(logger: (message?: any, ...optionalParams: any[]) => void, msg?: string, optionalParams?: any) {
        if (optionalParams)
            logger(this.getCallerLine(msg), optionalParams);
        else
            logger(this.getCallerLine(msg))

    }

    getCallerLine(message?: string) {
        if (!message)
            message = "";
        try {
            throw new Error('');
        } catch (error) {
            let stack = error.stack.split("\n");
            var callerOrigin = stack[4];
            var functionName = callerOrigin.substr(callerOrigin.indexOf("at ") + 3);
            functionName = functionName.substr(0, functionName.indexOf(" ("));
            return `src ${this.name} at ${functionName}: ${message}`;
        }
    }
}