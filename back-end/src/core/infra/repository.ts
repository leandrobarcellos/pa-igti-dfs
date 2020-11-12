import {EntityDb} from "./entity-db";
import {Entity} from "./entity";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export abstract class Repository<K, T extends Entity<K>> {
    private readonly dbJson: string;
    private _db: EntityDb<K, T>;

    constructor(dbName: string) {
        this.dbJson = `src/core/dbs/${dbName}.json`;
        this._db = {
            sequence: 1,
            rows: []
        };
        this.refreshDB();
    }

    protected updateDB(): void {
        const data = JSON.stringify(this.db);
        fs.writeFileSync(this.dbJson, data);
        this.refreshDB();
    }


    private refreshDB() {
        fs.readFile(this.dbJson, (err: any | null, data: Buffer) => {
            if (err) {
                console.log("error reading DB", this.dbJson);
                const data = JSON.stringify(this._db);
                fs.writeFileSync(this.dbJson, data);
            } else {
                this._db = JSON.parse(data.toString());
            }
        });
        setTimeout(() => {
        }, 300);
    }

    protected get db(): EntityDb<K, T> {
        this.refreshDB();
        return this._db;
    }

    filter(predicate: (o: T) => boolean): T[] {
        if (predicate) {
            return this.db.rows.filter(o => predicate(o));
        }
        return [];
    }

    find(predicate: (o: T) => boolean): T {
        if (predicate) {
            return this.db.rows.find(o => predicate(o));
        }
        return null as T;
    }

    findAll(): T[] {
        const arr: T[] = [];
        arr.push(...this.db.rows);
        return arr;
    }

}
