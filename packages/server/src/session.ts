import { AsyncLocalStorage } from "node:async_hooks";

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
  };
};

export const sessionStore = new AsyncLocalStorage<Session | undefined>();

// @ts-ignore
globalThis.sessionStore = sessionStore;
