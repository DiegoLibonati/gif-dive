import * as Undici from "undici";

const TEST_BASE_URL = "http://localhost";

const resolveRelative = (input: RequestInfo | URL): RequestInfo | URL => {
  if (typeof input === "string" && input.startsWith("/")) {
    return `${TEST_BASE_URL}${input}`;
  }
  return input;
};

const fetchPolyfill = ((input: RequestInfo | URL, init?: RequestInit) => {
  return Undici.fetch(resolveRelative(input) as Undici.RequestInfo, init as Undici.RequestInit);
}) as unknown as typeof fetch;

Object.defineProperties(globalThis, {
  fetch: { value: fetchPolyfill, writable: true, configurable: true },
  FormData: { value: Undici.FormData, writable: true, configurable: true },
  Headers: { value: Undici.Headers, writable: true, configurable: true },
  Request: { value: Undici.Request, writable: true, configurable: true },
  Response: { value: Undici.Response, writable: true, configurable: true },
});
