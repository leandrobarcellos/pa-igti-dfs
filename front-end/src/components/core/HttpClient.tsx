const basePath = "http://localhost:3333/api";

export default class HttpClient {
    private baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    public doGet(endpoint: string): Promise<any> {
        return this.doFetchNoBody(endpoint, "GET");
    }

    public doPost(endpoint: string, value: any): Promise<any> {
        return this.doFetch(endpoint, "POST", value);
    }

    public doPut(endpoint: string, value: any): Promise<any> {
        return this.doFetch(endpoint, "PUT", value);
    }

    public doDelete(endpoint: string): Promise<any> {
        return this.doFetchNoBody(endpoint, "DELETE");
    }

    private doFetchNoBody(endpoint: string, method: string): Promise<any> {
        let fetching = fetch(`${basePath}/${this.baseUrl}/${endpoint}`, {
            method: method,
            mode: "cors",
            headers: {}
        });
        return this.newPromiseFromFetching(fetching);
    }

    private doFetch(endpoint: string, method: string, value: any): Promise<any> {
        let fetching = fetch(`${basePath}/${this.baseUrl}/${endpoint}`, {
            method: method,
            mode: "cors",
            body: value,
            headers: {
                "Content-type": "application/json"
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
                    bodyReader(first.body).then(bResolve => resolve(bResolve))
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
