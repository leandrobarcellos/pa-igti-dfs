import {HttpCRUDService} from "../../components/core/HttpCRUDService";

export class TurmasService extends HttpCRUDService {
    constructor() {
        super("/turmas");
    }
}