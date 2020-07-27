import {HttpService} from "../../components/core/HttpService";

export default class CatequistasService extends HttpService {
    constructor() {
        super("v1/catequistas");
    }

}