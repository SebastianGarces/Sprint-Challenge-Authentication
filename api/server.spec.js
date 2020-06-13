const server = require("./server");
const request = require("supertest");

describe("server.js", () => {
	it("tests should be running on testing env", () => {
		expect(process.env.DB_ENV).toBe("testing");
	});

	it("GET /", async () => {
		const res = await request(server).get("/");
		expect(res.type).toBe("application/json");
	});

	it("GET / - should return api message", async () => {
		const res = await request(server).get("/");
		expect(res.body).toEqual({ api: "API RUNNING OK" });
	});
});