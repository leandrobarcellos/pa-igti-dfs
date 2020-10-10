import {HttpService} from "../../components/core/HttpService";

export default class CatequizandosService extends HttpService {
    constructor() {
        super("/catequizandos");
    }

}