import { BaseEntity } from './../../../models';
import {Book} from "../book";

export class Author implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public age?: number,
        public country?: string,
        public books?: Book[]
    ) {
    }
}
