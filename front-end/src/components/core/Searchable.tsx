export interface Searchable<F, T> {

    findById<ID>(id: ID, consumer: (value: T) => void): void;

    findByFilter(filter: F, consumer: (value: T[]) => void): void;

    findAll(consumer: (value: T[]) => void): void;

}