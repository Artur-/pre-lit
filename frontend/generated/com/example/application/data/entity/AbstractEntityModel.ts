import { _getPropertyModel as _getPropertyModel_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1 } from "@hilla/form";
import type AbstractEntity_1 from "./AbstractEntity.js";
class AbstractEntityModel<T extends AbstractEntity_1 = AbstractEntity_1> extends ObjectModel_1<T> {
    declare static createEmptyValue: () => AbstractEntity_1;
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", NumberModel_1, [true]) as NumberModel_1;
    }
    get version(): NumberModel_1 {
        return this[_getPropertyModel_1]("version", NumberModel_1, [false]) as NumberModel_1;
    }
}
export default AbstractEntityModel;
