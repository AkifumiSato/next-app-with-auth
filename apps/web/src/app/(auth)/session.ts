import type { AsyncLocalStorage } from "node:async_hooks";
import type { Session } from "auth-server";

// eslint-disable-next-line @typescript-eslint/no-namespace -- use globalThis
declare namespace globalThis {
  let sessionStore: AsyncLocalStorage<Session | undefined> | undefined;
}

export function getSession(): Session | undefined {
  return globalThis.sessionStore?.getStore();
}
