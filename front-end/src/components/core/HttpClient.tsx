import axios, {AxiosRequestConfig} from "axios";
import {from, Observable} from "rxjs";
import {SessionUtil} from "./session.util";

let href = window.location.href;
let newHref = "http:" + href.substr(href.indexOf("//"));
newHref = newHref.substr(0, newHref.lastIndexOf(":")) + ":3333/e-catequese";
const basePath = newHref;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = SessionUtil.getToken();
    if (!config) {
        config = {};
        config.headers = {};
    }
    if (token)
        config.headers["Authorization"] = `Bearer ${token}`;
    return config;
})

export const _ = '';

export default class HttpClient {

    private readonly baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    public get(endpoint?: string): Observable<any> {
        return this.doRequest(axios.get, endpoint);
    }

    public post(endpoint?: string, value?: any): Observable<any> {
        return this.doRequest(axios.post, endpoint, value);
    }

    public put(endpoint?: string, value?: any): Observable<any> {
        return this.doRequest(axios.put, endpoint, value);
    }

    public delete(endpoint?: string): Observable<any> {
        return this.doRequest(axios.delete, endpoint);
    }

    private doRequest(request: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>,
                      endpoint?: string, body?: any, config?: AxiosRequestConfig | any): Observable<any> {
        if (!endpoint) endpoint = "";
        const requestPath = `${basePath}${this.baseUrl}${endpoint}`;
        console.log("requestPath", requestPath);
        return from(request(requestPath, body, config));
    }

    private doFetchNoBody(endpoint: string, method: string): Promise<any> {
        console.log(`${method}: fetching ${basePath}${this.baseUrl}/${endpoint}`);
        let fetching = fetch(`${basePath}${this.baseUrl}/${endpoint}`, {
            method: method,
            mode: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return this.newPromiseFromFetching(fetching);
    }

    private doFetch(endpoint: string, method: string, value: any): Promise<any> {
        let fetching = fetch(`${basePath}${this.baseUrl}/${endpoint}`, {
            method: method,
            mode: "cors",
            body: value,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return this.newPromiseFromFetching(fetching);
    }


    private newPromiseFromFetching(fetching: Promise<any>) {
        const bodyReader = (body: any) => {
            return new Promise<any>((resolve, reject) => {
                body.getReader().read().then((slv: any) => {
                    let result = String.fromCharCode.apply(null, slv.value);
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        console.error(result);
                    }
                    resolve(result);
                })
            });
        }

        return new Promise<any>((resolve, reject) => {
            fetching.then(first => {
                if (first.ok) {
                    bodyReader(first.body.toStrin).then(bResolve => resolve(bResolve))
                } else {
                    bodyReader(first.body).then(bResolve => reject({
                        status: first.status,
                        statusText: first.statusText,
                        error: bResolve
                    }));
                }
            });
        });
    }
}
