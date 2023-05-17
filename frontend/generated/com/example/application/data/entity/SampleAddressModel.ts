import { _getPropertyModel as _getPropertyModel_1, StringModel as StringModel_1 } from "@hilla/form";
import AbstractEntityModel_1 from "./AbstractEntityModel.js";
import type SampleAddress_1 from "./SampleAddress.js";
class SampleAddressModel<T extends SampleAddress_1 = SampleAddress_1> extends AbstractEntityModel_1<T> {
    declare static createEmptyValue: () => SampleAddress_1;
    get city(): StringModel_1 {
        return this[_getPropertyModel_1]("city", StringModel_1, [false]) as StringModel_1;
    }
    get country(): StringModel_1 {
        return this[_getPropertyModel_1]("country", StringModel_1, [false]) as StringModel_1;
    }
    get postalCode(): StringModel_1 {
        return this[_getPropertyModel_1]("postalCode", StringModel_1, [false]) as StringModel_1;
    }
    get state(): StringModel_1 {
        return this[_getPropertyModel_1]("state", StringModel_1, [false]) as StringModel_1;
    }
    get street(): StringModel_1 {
        return this[_getPropertyModel_1]("street", StringModel_1, [false]) as StringModel_1;
    }
}
export default SampleAddressModel;
