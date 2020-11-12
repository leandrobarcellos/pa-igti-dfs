import {Entity} from "./entity";
import {Repository} from "./repository";
import {NotFoundException} from "@nestjs/common";


export abstract class CrudRepository<K, T extends Entity<K>> extends Repository<K, T> {

    protected constructor(dbName: string) {
        super(dbName);
    }

    public findById(id?: K): T {
        const find = this.db.rows.find((o: T) => o.id == id);
        if (!find)
            throw new NotFoundException("Não encontrado");
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
        console.log("public save(entity: T)", entity);
        this.configurarNovoIdSequencial(entity);
        this.db.rows.push(entity);
        this.updateDB();
    }

    protected configurarNovoIdSequencial(entity: T): void {
        const e = entity as any;
        console.log("if (typeof entity.id === 'number') {", typeof entity.id === 'number');
        if (typeof entity.id === 'number' || typeof entity.id === 'undefined') {
            const next = ++this.db.sequence;
            (entity as any).id = next;
        }
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
