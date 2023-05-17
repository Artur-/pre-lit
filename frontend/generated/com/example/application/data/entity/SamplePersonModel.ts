import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, Email as Email_1, StringModel as StringModel_1 } from "@hilla/form";
import AbstractEntityModel_1 from "./AbstractEntityModel.js";
import type SamplePerson_1 from "./SamplePerson.js";
class SamplePersonModel<T extends SamplePerson_1 = SamplePerson_1> extends AbstractEntityModel_1<T> {
    declare static createEmptyValue: () => SamplePerson_1;
    get dateOfBirth(): StringModel_1 {
        return this[_getPropertyModel_1]("dateOfBirth", StringModel_1, [true]) as StringModel_1;
    }
    get email(): StringModel_1 {
        return this[_getPropertyModel_1]("email", StringModel_1, [false, new Email_1()]) as StringModel_1;
    }
    get firstName(): StringModel_1 {
        return this[_getPropertyModel_1]("firstName", StringModel_1, [false]) as StringModel_1;
    }
    get important(): BooleanModel_1 {
        return this[_getPropertyModel_1]("important", BooleanModel_1, [false]) as BooleanModel_1;
    }
    get lastName(): StringModel_1 {
        return this[_getPropertyModel_1]("lastName", StringModel_1, [false]) as StringModel_1;
    }
    get occupation(): StringModel_1 {
        return this[_getPropertyModel_1]("occupation", StringModel_1, [false]) as StringModel_1;
    }
    get phone(): StringModel_1 {
        return this[_getPropertyModel_1]("phone", StringModel_1, [false]) as StringModel_1;
    }
    get role(): StringModel_1 {
        return this[_getPropertyModel_1]("role", StringModel_1, [false]) as StringModel_1;
    }
}
export default SamplePersonModel;
