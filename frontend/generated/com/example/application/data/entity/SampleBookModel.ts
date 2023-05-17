import { _getPropertyModel as _getPropertyModel_1, ArrayModel as ArrayModel_1, NumberModel as NumberModel_1, StringModel as StringModel_1 } from "@hilla/form";
import AbstractEntityModel_1 from "./AbstractEntityModel.js";
import type SampleBook_1 from "./SampleBook.js";
class SampleBookModel<T extends SampleBook_1 = SampleBook_1> extends AbstractEntityModel_1<T> {
    declare static createEmptyValue: () => SampleBook_1;
    get author(): StringModel_1 {
        return this[_getPropertyModel_1]("author", StringModel_1, [false]) as StringModel_1;
    }
    get image(): ArrayModel_1<number, NumberModel_1> {
        return this[_getPropertyModel_1]("image", ArrayModel_1, [false, NumberModel_1, [false]]) as ArrayModel_1<number, NumberModel_1>;
    }
    get isbn(): StringModel_1 {
        return this[_getPropertyModel_1]("isbn", StringModel_1, [false]) as StringModel_1;
    }
    get name(): StringModel_1 {
        return this[_getPropertyModel_1]("name", StringModel_1, [false]) as StringModel_1;
    }
    get pages(): NumberModel_1 {
        return this[_getPropertyModel_1]("pages", NumberModel_1, [false]) as NumberModel_1;
    }
    get publicationDate(): StringModel_1 {
        return this[_getPropertyModel_1]("publicationDate", StringModel_1, [true]) as StringModel_1;
    }
}
export default SampleBookModel;
