import {HttpCRUDService} from "../../components/core/HttpCRUDService";

export class SubscricaoService extends HttpCRUDService {

    constructor() {
        super("/subscricao");
    }
}