import request from "supertest";
import app from "index";

describe("POST /user", () => {
    describe("user signup with credentials", () => {
        it("should return a 201 status code", async () => {
            const response = await request(app).post("/user/signup").send({
                username: "myUsername",
                password: "myPassword"
            });

            expect(response.statusCode).toBe(201);
        });
    });
});