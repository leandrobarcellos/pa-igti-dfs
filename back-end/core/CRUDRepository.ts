import {Entity} from "./Entity";
import {Repository} from "./Repository";
import {APIException} from "./exception/APIException";

export abstract class CRUDRepository<K, T extends Entity<K>> extends Repository<K, T> {

    constructor(dbName: string) {
        super(dbName);
    }

    public findById(id?: K): T {
        let find = this.db.rows.find((o: T) => o.id === id);
        if (!find)
            throw new APIException("Não encontrado", 404);
        return find;
    }

    public update(entity: T): void {
        let found = this.findById(entity.id);
        if (found) {
            this.remove(found);
            this.db.rows.push(entity);
            this.updateDB();
        }
    }

    public save(entity: T): void {
        let next = ++this.db.sequence;
        this.configurarNovoIdSequencial(entity, next);
        this.db.rows.push(entity);
        this.updateDB();
    }

    protected configurarNovoIdSequencial(entity: T, newId: number): void {

    }

    public delete(id: K): void {
        try {
            let found = this.findById(id);
            this.remove(found);
            this.updateDB();
        } catch (e) {
            console.log("considerando excluído id não encontrado...");
        }
    }

    private remove(found: T) {
        let index = this.db.rows.indexOf(found);
        if (index != -1) {
            this.db.rows.splice(index, 1);
        }
    }

}