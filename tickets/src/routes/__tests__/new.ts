import request from "supertest";
import { app } from "../../app";
import { Ticket } from '../../models/ticket';

it("returns a 401 if user didn't signup", async () => {
    return request(app)
        .post("/api/tickets")
        .send({
            title: "brabrabra",
            price: 10
        })
        .expect(401);
});

it("returns a 400 with an invalided title", async () => {

    return request(app)
        .post("/api/tickets")
        .set('Cookie', global.signin())
        .send({
            title: "",
            price: 10
        })
        .expect(400);
});

it("returns a 400 with an invalided price", async () => {

    return request(app)
        .post("/api/tickets")
        .set('Cookie', global.signin())
        .send({
            title: "brabrabra",
            price: -10
        })
        .expect(400);
});

it("returns a 400 with an missing email and password", async () => {
    await request(app)
        .post("/api/tickets")
        .set('Cookie', global.signin())
        .send({ title: "sample title", })
        .expect(400);
    await request(app)
        .post("/api/tickets")
        .set('Cookie', global.signin())
        .send({ price: 10 })
        .expect(400);
});

it("return 200 successfully create new tickets", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "brabrabra";
    const response = await request(app)
        .post("/api/tickets")
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20
        })
        .expect(200);


    expect(response.body.title).toBe("brabrabra");
    expect(response.body.price).toBe(20);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
});

