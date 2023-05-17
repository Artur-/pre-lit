import { EndpointRequestInit as EndpointRequestInit_1, Subscription as Subscription_1 } from "@hilla/frontend";
import client_1 from "./connect-client.default.js";
async function sayHello_1(name: string, init?: EndpointRequestInit_1): Promise<string> { return client_1.call("HelloWorldLitEndpoint", "sayHello", { name }, init); }
export { sayHello_1 as sayHello };
