import axios from "axios";
import {from, Observable} from "rxjs";

const basePath = "http://localhost:3333/api";

export default class HttpClient {
    private baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    public doGet(endpoint: string): Observable<any> {
        return from(axios.get(`${basePath}${this.baseUrl}/${endpoint}`));
    }

    public doPost(endpoint: string, value: any): Observable<any> {
        return from(axios.post(`${basePath}${this.baseUrl}/${endpoint}`, value));
    }

    public doPut(endpoint: string, value: any): Observable<any> {
        return from(axios.put(`${basePath}${this.baseUrl}/${endpoint}`, value));
    }

    public doDelete(endpoint: string): Observable<any> {
        return from(axios.delete(`${basePath}${this.baseUrl}/${endpoint}`));
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
