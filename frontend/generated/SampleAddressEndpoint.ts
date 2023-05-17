import { EndpointRequestInit as EndpointRequestInit_1, Subscription as Subscription_1 } from "@hilla/frontend";
import type SampleAddress_1 from "./com/example/application/data/entity/SampleAddress.js";
import client_1 from "./connect-client.default.js";
import type Pageable_1 from "./dev/hilla/mappedtypes/Pageable.js";
async function count_1(init?: EndpointRequestInit_1): Promise<number> { return client_1.call("SampleAddressEndpoint", "count", {}, init); }
async function delete_1(id: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("SampleAddressEndpoint", "delete", { id }, init); }
async function get_1(id: number, init?: EndpointRequestInit_1): Promise<SampleAddress_1 | undefined> { return client_1.call("SampleAddressEndpoint", "get", { id }, init); }
async function list_1(page: Pageable_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<SampleAddress_1>> { return client_1.call("SampleAddressEndpoint", "list", { page }, init); }
async function update_1(entity: SampleAddress_1, init?: EndpointRequestInit_1): Promise<SampleAddress_1> { return client_1.call("SampleAddressEndpoint", "update", { entity }, init); }
export { count_1 as count, delete_1 as delete, get_1 as get, list_1 as list, update_1 as update };
