import { http, HttpResponse } from "msw";

import type { Gif } from "@/types/app";
import type { ResponseMetaData } from "@/types/responses";

import { gifs } from "@tests/__mocks__/gifs.mock";

export const mockSearchResponse: ResponseMetaData<Gif[]> = {
  data: gifs,
  meta: { status: 200, msg: "OK", response_id: "test" },
  pagination: { total_count: gifs.length, count: gifs.length, offset: 0 },
};

export const mockRandomResponse: ResponseMetaData<Gif> = {
  data: gifs[0]!,
  meta: { status: 200, msg: "OK", response_id: "test" },
};

export const mockMswHandlers = [
  http.get("/v1/gifs/search", () => {
    return HttpResponse.json(mockSearchResponse);
  }),
  http.get("/v1/gifs/random", () => {
    return HttpResponse.json(mockRandomResponse);
  }),
];
