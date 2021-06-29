import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testddd@test.com",
            password: "dfdfsds"
        })
        .expect(200);
});

it("returns a 400 with an invalided email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testdest.com",
            password: "dfdfsds"
        })
        .expect(400);
});

it("returns a 400 with an invalided password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@dest.com",
            password: "dfs"
        })
        .expect(400);
});

it("returns a 400 with an missing email and password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({ email: "test@dest.com", })
        .expect(400);
    await request(app)
        .post("/api/users/signup")
        .send({ password: "dfssdfsds" })
        .expect(400);
});

it("returns a 400 with an missing password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({ password: "dfssdfsds" })
        .expect(400);
});

it("returns a 400 with an wrong password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testddd@test.com",
            password: "dfdfsds"
        })
        .expect(200);

    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testddd@test.com",
            password: "dfdfsdsdfdfsds"
        })
        .expect(400);
});

it("returns a 400 with an existing email", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testddd@test.com",
            password: "dfdfsds"
        })
        .expect(200);

    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testddd@test.com",
            password: "dfdfsds"
        })
        .expect(400);
});


it("Set cookie after successfully signup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "testddd@test.com",
            password: "dfdfsds"
        })
        .expect(200);
    return expect(response.get("Set-Cookie")).toBeDefined();
});

