import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        let status = 500;
        console.log(`error:`, error);
        if (error instanceof HttpException) {
            let message = error["response"].message;
            if (Array.isArray(message))
                this.sendError(error.getStatus(), host, ...message);
            else
                this.sendError(error.getStatus(), host, message);
        } else {
            this.sendError(status, host);
        }
    }

    private sendError(status: number, host: ArgumentsHost, ...messages: string[]) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const body = {
            timestamp: new Date().toISOString(),
            statusCode: status,
            messages
        };
        console.log(`error when executing: ${request.url}`, body);
        response
            .status(status)
            .json(body).send();
    }
}
