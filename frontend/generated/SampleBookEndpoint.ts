import { EndpointRequestInit as EndpointRequestInit_1, Subscription as Subscription_1 } from "@hilla/frontend";
import type SampleBook_1 from "./com/example/application/data/entity/SampleBook.js";
import client_1 from "./connect-client.default.js";
import type Pageable_1 from "./dev/hilla/mappedtypes/Pageable.js";
async function count_1(init?: EndpointRequestInit_1): Promise<number> { return client_1.call("SampleBookEndpoint", "count", {}, init); }
async function delete_1(id: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("SampleBookEndpoint", "delete", { id }, init); }
async function get_1(id: number, init?: EndpointRequestInit_1): Promise<SampleBook_1 | undefined> { return client_1.call("SampleBookEndpoint", "get", { id }, init); }
async function list_1(page: Pageable_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<SampleBook_1>> { return client_1.call("SampleBookEndpoint", "list", { page }, init); }
async function update_1(entity: SampleBook_1, init?: EndpointRequestInit_1): Promise<SampleBook_1> { return client_1.call("SampleBookEndpoint", "update", { entity }, init); }
export { count_1 as count, delete_1 as delete, get_1 as get, list_1 as list, update_1 as update };
