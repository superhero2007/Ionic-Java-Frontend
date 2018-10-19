import { BaseEntity } from './../../../models';

export class Book implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public genre?: string,
        public language?: string,
        public year?: number,
        public author?: BaseEntity,
    ) {
    }
}
