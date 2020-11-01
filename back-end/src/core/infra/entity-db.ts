import {Entity} from "./entity";

export interface EntityDb<K, T extends Entity<K>> {
    sequence: number,
    rows: T[]
}
