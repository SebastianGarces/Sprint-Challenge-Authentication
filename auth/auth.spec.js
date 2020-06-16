const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConfig");

describe("auth-router.js", () => {
	describe("/register", () => {
		const newUser = { username: "gsgarces", password: "password" };

		it("should return status 201", async () => {
			const res = await request(server)
				.post("/api/auth/register")
				.send(newUser);

			expect(res.status).toBe(201);
		});

		it("should return back the created username", async () => {
			const res = await request(server)
				.post("/api/auth/register")
				.send(newUser);

			expect(res.body.username).toEqual(newUser.username);
		});

		beforeEach(async () => {
			await db("users").truncate();
		});
	});

	describe("/login", () => {
		const user = { username: "gsgarces", password: "password" };

		it("creates user", async () => {
			const res = await request(server)
				.post("/api/auth/register")
				.send(user);

			expect(res.body.username).toBe(user.username);
		});

		it("login should return status 200", async () => {
			const res = await request(server)
				.post("/api/auth/login")
				.send(user);

            expect(res.status).toBe(200)
		});

		beforeAll(async () => {
			await db("users").truncate();
		});
	});
});
