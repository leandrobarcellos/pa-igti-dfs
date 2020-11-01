import axios, {AxiosRequestConfig} from "axios";
import {from, Observable} from "rxjs";

let href = window.location.href;
let newHref = "http:" + href.substr(href.indexOf("//"));
newHref = newHref.substr(0, newHref.lastIndexOf(":")) + ":3333/api";
const basePath = newHref;

export default class HttpClient {
    private baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    public doGet(endpoint?: string): Observable<any> {
        return this.doRequest(axios.get, endpoint);
    }

    public doPost(endpoint?: string, value?: any): Observable<any> {
        return this.doRequest(axios.post, endpoint, value);
    }

    public doPut(endpoint?: string, value?: any): Observable<any> {
        return this.doRequest(axios.put, endpoint, value);
    }

    public doDelete(endpoint?: string): Observable<any> {
        return this.doRequest(axios.delete, endpoint);
    }

    private doRequest(request: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>,
                      endpoint?: string, body?: any, config?: AxiosRequestConfig): Observable<any> {
        if (!endpoint) endpoint = "";
        return from(request(`${basePath}${this.baseUrl}${endpoint}`, body, config));
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
