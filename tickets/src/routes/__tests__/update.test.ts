import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const expectedTicket = {
    title: "brabrabra",
    price: 10
};

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/ticket/${id}`)
        .set("Cookie", global.signin())
        .send(expectedTicket)
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", global.signin())
        .send(expectedTicket)
        .expect(200);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", global.signin())
        .send(expectedTicket)
        .expect(401);

});

it('returns a 401 if the user does not own the ticket', async () => {
    const res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", global.signin())
        .send(expectedTicket)
        .expect(200);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", global.signin())
        .send(expectedTicket)
        .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", global.signin())
        .send(expectedTicket)
        .expect(200);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", global.signin())
        .send({ price: 200 })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", global.signin())
        .send({ title: "changed title" })
        .expect(400);
});


it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();

    const res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", cookie)
        .send(expectedTicket)
        .expect(200);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .send({ price: 200 })
        .expect(400);


    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .send({ price: -200 })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .send({ title: "changed title" })
        .expect(400);
});


it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();

    let res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", cookie)
        .send(expectedTicket)
        .expect(200);

    res = await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .send({ title: "changed title", price: 200 })
        .expect(200);

    res = await request(app)
        .get(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .expect(200);

    expect(res.body.title).toEqual("changed title");
    expect(res.body.price).toEqual(200);
});
