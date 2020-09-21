import {Entity} from "./Entity";

export interface EntityDB<K, T extends Entity<K>> {
    sequence: number,
    rows: T[]
}
