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
        return fetch(`${basePath}/${this.baseUrl}/${endpoint}`, {
            method: method,
            mode: "cors",
            headers: {}
        });
    }

    private doFetch(endpoint: string, method: string, value: any): Promise<any> {
        return fetch(`${basePath}/${this.baseUrl}/${endpoint}`, {
            method: method,
            mode: "cors",
            body: value,
            headers: {
                "Content-type": "application/json"
            }
        });
    }
}
