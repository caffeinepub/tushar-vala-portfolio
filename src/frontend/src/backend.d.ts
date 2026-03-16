import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    content: string;
    name: string;
    email: string;
}
export interface backendInterface {
    getAllMessages(owner: Principal): Promise<Array<Message>>;
    submitMessage(name: string, email: string, content: string): Promise<void>;
}
