import type AbstractEntity_1 from "./AbstractEntity.js";
interface SampleBook extends AbstractEntity_1 {
    author: string;
    image: Array<number>;
    isbn: string;
    name: string;
    pages: number;
    publicationDate?: string;
}
export default SampleBook;
