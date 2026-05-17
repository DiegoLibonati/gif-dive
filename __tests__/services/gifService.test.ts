import { http, HttpResponse } from "msw";

import gifService from "@/services/gifService";

import { mockSearchResponse, mockRandomResponse } from "@tests/__mocks__/mswHandlers.mock";
import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

jest.mock("@/constants/envs", () => {
  const mockData = jest.requireActual("@tests/__mocks__/envs.mock");
  return {
    __esModule: true,
    default: mockData.mockEnvs,
  };
});

describe("gifService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should return the response with gif data", async () => {
        const result = await gifService.getAll("cats", 10);

        expect(result).toEqual(mockSearchResponse);
      });

      it("should call the search endpoint with the api key, category and limit", async () => {
        let capturedUrl = "";
        mockMswServer.use(
          http.get("/v1/gifs/search", ({ request }) => {
            capturedUrl = request.url;
            return HttpResponse.json(mockSearchResponse);
          })
        );

        await gifService.getAll("cats", 10);

        expect(capturedUrl).toContain("/v1/gifs/search");
        expect(capturedUrl).toContain("api_key=api_key");
        expect(capturedUrl).toContain("q=cats");
        expect(capturedUrl).toContain("limit=10");
        expect(capturedUrl).toContain("offset=0");
        expect(capturedUrl).toContain("rating=r");
        expect(capturedUrl).toContain("lang=en");
      });

      it("should include the category sent by the caller", async () => {
        let capturedQ: string | null = null;
        mockMswServer.use(
          http.get("/v1/gifs/search", ({ request }) => {
            capturedQ = new URL(request.url).searchParams.get("q");
            return HttpResponse.json(mockSearchResponse);
          })
        );

        await gifService.getAll("dogs", 5);

        expect(capturedQ).toBe("dogs");
      });

      it("should include the limit sent by the caller", async () => {
        let capturedLimit: string | null = null;
        mockMswServer.use(
          http.get("/v1/gifs/search", ({ request }) => {
            capturedLimit = new URL(request.url).searchParams.get("limit");
            return HttpResponse.json(mockSearchResponse);
          })
        );

        await gifService.getAll("cats", 20);

        expect(capturedLimit).toBe("20");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the 500 HTTP status", async () => {
        mockMswServer.use(
          http.get("/v1/gifs/search", () => new HttpResponse(null, { status: 500 }))
        );

        await expect(gifService.getAll("cats", 10)).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with the 404 HTTP status", async () => {
        mockMswServer.use(
          http.get("/v1/gifs/search", () => new HttpResponse(null, { status: 404 }))
        );

        await expect(gifService.getAll("cats", 10)).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(http.get("/v1/gifs/search", () => HttpResponse.error()));

        await expect(gifService.getAll("cats", 10)).rejects.toThrow();
      });
    });
  });

  describe("getRandomGifsByCategory", () => {
    describe("when fetch succeeds", () => {
      it("should return the response with a single gif", async () => {
        const result = await gifService.getRandomGifsByCategory();

        expect(result).toEqual(mockRandomResponse);
      });

      it("should call the random endpoint with the api key and rating", async () => {
        let capturedUrl = "";
        mockMswServer.use(
          http.get("/v1/gifs/random", ({ request }) => {
            capturedUrl = request.url;
            return HttpResponse.json(mockRandomResponse);
          })
        );

        await gifService.getRandomGifsByCategory();

        expect(capturedUrl).toContain("/v1/gifs/random");
        expect(capturedUrl).toContain("api_key=api_key");
        expect(capturedUrl).toContain("tag=");
        expect(capturedUrl).toContain("rating=g");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the 503 HTTP status", async () => {
        mockMswServer.use(
          http.get("/v1/gifs/random", () => new HttpResponse(null, { status: 503 }))
        );

        await expect(gifService.getRandomGifsByCategory()).rejects.toThrow(
          "HTTP error! status: 503"
        );
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(http.get("/v1/gifs/random", () => HttpResponse.error()));

        await expect(gifService.getRandomGifsByCategory()).rejects.toThrow();
      });
    });
  });
});
