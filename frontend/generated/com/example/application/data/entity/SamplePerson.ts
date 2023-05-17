import type AbstractEntity_1 from "./AbstractEntity.js";
interface SamplePerson extends AbstractEntity_1 {
    dateOfBirth?: string;
    email: string;
    firstName: string;
    important: boolean;
    lastName: string;
    occupation: string;
    phone: string;
    role: string;
}
export default SamplePerson;
