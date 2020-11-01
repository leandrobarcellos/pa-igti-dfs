import {Entity} from "./entity";
import {Repository} from "./repository";
import {ApiException} from "../exception/api.exception";


export abstract class CrudRepository<K, T extends Entity<K>> extends Repository<K, T> {

    constructor(dbName: string) {
        super(dbName);
    }

    public findById(id?: K): T {
        const find = this.db.rows.find((o: T) => o.id == id);
        if (!find)
            throw new ApiException("Não encontrado", 404);
        return find;
    }

    public update(entity: T): void {
        const found = this.findById(entity.id);
        if (found) {
            this.remove(found);
            this.db.rows.push(entity);
            this.updateDB();
        }
    }

    public save(entity: T): void {
        const next = ++this.db.sequence;
        this.configurarNovoIdSequencial(entity, next);
        this.db.rows.push(entity);
        this.updateDB();
    }

    protected configurarNovoIdSequencial(entity: T, newId: number): void {
        //novo id sequencial
    }

    public delete(id: K): void {
        try {
            const found = this.findById(id);
            this.remove(found);
            this.updateDB();
        } catch (e) {
            console.log("considerando excluído id não encontrado...");
        }
    }

    private remove(found: T) {
        const index = this.db.rows.indexOf(found);
        if (index != -1) {
            this.db.rows.splice(index, 1);
        }
    }

}