import request from "supertest";
import { app } from "../../app";

it("Fail when a email that does not exist in supplied", async () => {
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "testdest.com",
            password: "dfdfsds"
        })
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

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "testddd@test.com",
            password: "dfdfdddsds"
        })
        .expect(400);
});


it("returns a 400 with an wrong email", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testddd@test.com",
            password: "dfdfsds"
        })
        .expect(200);

    return request(app)
        .post("/api/users/signin")
        .send({
            email: "testdddddd@test.com",
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

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "testddd@test.com",
            password: "dfdfsds"
        })
        .expect(200);
    return expect(response.get("Set-Cookie")).toBeDefined();
});

