import fs from "fs";
import {EntityDB} from "./EntityDB";
import {Entity} from "./Entity";

export abstract class Repository<K, T extends Entity<K>> {
    private readonly dbJson: string;
    private _db: EntityDB<K, T>;

    constructor(dbName: string) {
        this.dbJson = `dbs/${dbName}.json`;
        this._db = {
            sequence: 1,
            rows: []
        };
        fs.readFile(this.dbJson, (err: any | null, data: Buffer) => {
            if (err) {
                this.updateDB();
            } else {
                this._db = JSON.parse(data.toString());
            }
        });
    }

    protected updateDB(): void {
        let data = JSON.stringify(this.db);
        fs.writeFileSync(this.dbJson, data);
    }

    protected get db(): EntityDB<K, T> {
        return this._db;
    }

    find(predicate: (o: T) => boolean): T[] {
        if (predicate) {
            return this.db.rows.filter(o => predicate(o));
        }
        return [];
    }

    findAll(): T[] {
        return this.db.rows;
    }

}