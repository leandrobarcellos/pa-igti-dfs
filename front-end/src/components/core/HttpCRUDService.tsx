import HttpClient from "./HttpClient";
import {Observable} from "rxjs";

export interface ResponseData<T> {
    object?: T,
    message?: string
}

export interface AppResponse<T> {
    data: ResponseData<T> | any
}

export class HttpService {
    protected readonly httpClient: HttpClient;

    constructor(basePath: string, httpClient?: HttpClient) {
        this.httpClient = new HttpClient(basePath);
        if (httpClient)
            this.httpClient = httpClient;
    }

}

export class HttpCRUDService extends HttpService {

    public persist<T>(value: any): Observable<AppResponse<T>> {
        return this.httpClient.post("", value);
    }

    public merge<T>(value: any): Observable<AppResponse<T>> {
        return this.httpClient.put("", value);
    }

    public remove<T>(id: any): Observable<AppResponse<T>> {
        return this.httpClient.delete(`/${id}`);
    }

    public find<T>(id: any): Observable<AppResponse<T>> {
        return this.httpClient.get(`/${id}`);
    }

    public findAll<T>(): Observable<AppResponse<T>> {
        return this.httpClient.get();
    }

}
