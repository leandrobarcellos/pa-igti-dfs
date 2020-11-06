import {CrudRepository} from "./crud.repository";

export class CrudService<E, K, T extends CrudRepository<E, K>> {
    protected constructor(protected readonly repository: T) {

    }
}
