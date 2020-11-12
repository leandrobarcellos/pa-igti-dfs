import HttpClient from "../../components/core/HttpClient";

export class TurmaDispatcher extends HttpClient {
    constructor() {
        super('/turmas');
    }
}
