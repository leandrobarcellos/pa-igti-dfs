import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Response} from "../infra/response";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next
            .handle()
            .pipe(
                switchMap(value => {
                    if (!(value instanceof Response))
                        return of(Response.status(200).withObject(value));
                    return of(value);
                })
            );
    }
}
