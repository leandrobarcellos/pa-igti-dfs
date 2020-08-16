import HttpClient from "./HttpClient";

export class HttpService {
    private httpClient: HttpClient;

    constructor(basePath: string) {
        this.httpClient = new HttpClient(basePath);
    }

    public persist(value: any): Promise<any> {
        return this.httpClient.doPost("", JSON.stringify(value));
    }

    public merge(value: any): Promise<any> {
        return this.httpClient.doPut("", JSON.stringify(value));
    }

    public remove(id: any): Promise<any> {
        return this.httpClient.doDelete(`${id}`);
    }

    public find(id: any): Promise<any> {
        return this.httpClient.doGet(`${id}`);
    }

    public findAll(): Promise<any> {
        return this.httpClient.doGet("");
    }

}