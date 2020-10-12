import HttpClient from "./HttpClient";
import {Observable} from "rxjs";

export interface ResponseData<T> {
    object?: T,
    message?: string
}

export interface AppResponse<T> {
    data: ResponseData<T>
}

export class HttpService {
    protected readonly httpClient: HttpClient;
    constructor(basePath: string) {
        this.httpClient = new HttpClient(basePath);
    }

}

export class HttpCRUDService extends HttpService{

    public persist<T>(value: any): Observable<AppResponse<T>> {
        return this.httpClient.doPost("", value);
    }

    public merge<T>(value: any): Observable<AppResponse<T>> {
        return this.httpClient.doPut("", value);
    }

    public remove<T>(id: any): Observable<AppResponse<T>> {
        return this.httpClient.doDelete(`${id}`);
    }

    public find<T>(id: any): Observable<AppResponse<T>> {
        return this.httpClient.doGet(`${id}`);
    }

    public findAll<T>(): Observable<AppResponse<T>> {
        return this.httpClient.doGet("");
    }

}