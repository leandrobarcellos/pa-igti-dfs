import {Entity} from "./entity";
import {CrudRepository} from "./crud.repository";

export abstract class CrudSequencialRepository<T extends Entity<number>> extends CrudRepository<number, T> {

    constructor(dbName: string) {
        super(dbName);
    }

    protected configurarNovoIdSequencial(entity: T, newId: number) {
        entity.id = newId;
    }
}